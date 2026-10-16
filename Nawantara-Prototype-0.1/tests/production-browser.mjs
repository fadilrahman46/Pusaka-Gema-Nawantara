const {chromium}=await import(process.env.PLAYWRIGHT_MODULE||'playwright');
import assert from 'node:assert/strict';
import {writeFileSync,readFileSync} from 'node:fs';import {createHash} from 'node:crypto';
import {fresh} from '../src/state.js';
const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||undefined,headless:true,args:['--no-sandbox','--enable-unsafe-swiftshader']});
const url=new URL('../dist/Nawantara-3D.html',import.meta.url).href,checks=[],errors=[];
let page;
try{
 const context=await browser.newContext({viewport:{width:1280,height:720}});page=await context.newPage();page.on('pageerror',e=>errors.push(e.message));
 await page.goto(url);await page.click('#newGame');await page.waitForFunction(()=>Nawantara.inspect().started);
 assert.equal(await page.evaluate(()=>Nawantara.inspect().state.version),2);
 await page.keyboard.down('KeyD');await page.waitForTimeout(700);await page.keyboard.up('KeyD');
 assert.ok((await page.evaluate(()=>Nawantara.inspect().position.x))>0.5);
 await page.keyboard.press('KeyR');await page.getByRole('button',{name:'Kembali ke checkpoint',exact:true}).click();
 assert.ok(Math.abs(await page.evaluate(()=>Nawantara.inspect().position.x))<.01);checks.push('Movement and R checkpoint recovery');
 await page.click('#menuBtn');const position=await page.evaluate(()=>Nawantara.inspect().position);
 for(let i=0;i<16;i++){await page.keyboard.press('Tab');assert.ok(await page.evaluate(()=>document.getElementById('modal').contains(document.activeElement)));}
 await page.keyboard.down('KeyW');await page.waitForTimeout(300);await page.keyboard.up('KeyW');
 assert.deepEqual(await page.evaluate(()=>Nawantara.inspect().position),position);await page.keyboard.press('Escape');
 assert.equal(await page.evaluate(()=>document.activeElement.id),'menuBtn');checks.push('Modal focus trapped/restored; world input suspended');
 await page.setViewportSize({width:640,height:640});await page.click('#menuBtn');
 assert.ok(await page.evaluate(()=>{const r=document.getElementById('modal').getBoundingClientRect();return r.left>=0&&r.right<=innerWidth&&r.bottom<=innerHeight;}));
 await page.screenshot({path:'qa/production-responsive.png'});await page.keyboard.press('Escape');checks.push('640px responsive menu stays in viewport');
 await page.click('#menuBtn');const before=await page.evaluate(()=>localStorage.getItem('pusaka-nawantara-v01'));
 await page.locator('#importSave').setInputFiles({name:'invalid.json',mimeType:'application/json',buffer:Buffer.from('{"version":2,"chapter":0}')});
 await page.waitForFunction(()=>document.getElementById('toast').textContent.includes('Save tidak valid'));
 assert.equal(await page.evaluate(()=>localStorage.getItem('pusaka-nawantara-v01')),before);checks.push('Invalid import leaves stored save unchanged');
 await context.close();
 const legacy=fresh();legacy.version=1;legacy.flags.flag_adi_resolution_path='UNSET';legacy.flags.flag_region_resolution_nirwasita='ADI_JOINS';
 for(const key of ['designRevision','checkpoint','endingInputs','decisionProvenance','migrationIssues','presentationMode','finalEnding'])delete legacy[key];
 const legacyText=JSON.stringify(legacy),legacyContext=await browser.newContext();
 await legacyContext.addInitScript(raw=>{if(!localStorage.getItem('pusaka-nawantara-v01'))localStorage.setItem('pusaka-nawantara-v01',raw);},legacyText);
 page=await legacyContext.newPage();page.on('pageerror',e=>errors.push(e.message));await page.goto(url);await page.click('#continueGame');
 const migrated=await page.evaluate(()=>Nawantara.inspect().state);assert.equal(migrated.version,2);assert.equal(migrated.flags.flag_adi_resolution_path,'WAITED');
 assert.equal(await page.evaluate(()=>localStorage.getItem('pusaka-nawantara-v01-legacy-backup')),legacyText);checks.push('Continue migrates legacy save and preserves exact original backup');
 await legacyContext.close();
 const corrupt=await browser.newContext();await corrupt.addInitScript(()=>localStorage.setItem('pusaka-nawantara-v01','broken JSON'));
 page=await corrupt.newPage();page.on('pageerror',e=>errors.push(e.message));await page.goto(url);await page.click('#continueGame');
 assert.equal(await page.locator('#modalTitle').textContent(),'Perjalanan belum dapat dimuat');
 assert.equal(await page.evaluate(()=>localStorage.getItem('pusaka-nawantara-v01')),'broken JSON');checks.push('Corrupt continue shows recovery and never resets the save silently');
 await corrupt.close();assert.deepEqual(errors,[]);
 writeFileSync('qa/production-browser'+(process.env.QA_RUN?'-'+process.env.QA_RUN:'')+'.json',JSON.stringify({passed:true,buildSha256:createHash('sha256').update(readFileSync('dist/Nawantara-3D.html')).digest('hex'),checks,errors},null,2));console.log(checks.join('\n'));
}catch(error){if(page&&!page.isClosed())await page.screenshot({path:'qa/production-browser-failure.png'});writeFileSync('qa/production-browser'+(process.env.QA_RUN?'-'+process.env.QA_RUN:'')+'.json',JSON.stringify({passed:false,error:error.message,checks,errors},null,2));throw error;}
finally{await browser.close();}
