const {chromium}=await import(process.env.PLAYWRIGHT_MODULE||'playwright');
import {fresh} from '../src/state.js';
import assert from 'node:assert/strict';
import {writeFileSync,readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH,headless:true,args:['--no-sandbox','--enable-unsafe-swiftshader']});
const page=await browser.newPage({viewport:{width:640,height:640}}),errors=[],checks=[];
page.on('pageerror',e=>errors.push(e.message));
const inspect=()=>page.evaluate(()=>Nawantara.inspect());
async function go(x,z,tol=.7){let held=[];for(let i=0;i<400;i++){const p=(await inspect()).position;const dx=x-p.x,dz=z-p.z;if(Math.hypot(dx,dz)<tol){for(const k of held)await page.keyboard.up(k);await page.waitForTimeout(100);return;}const sx=dx*Math.cos(.28)-dz*Math.sin(.28),sz=dz*Math.cos(.28)+dx*Math.sin(.28);const next=[];if(Math.abs(sx)>Math.max(.15,Math.abs(sz)*.45))next.push(sx>0?'KeyD':'KeyA');if(Math.abs(sz)>Math.max(.15,Math.abs(sx)*.45))next.push(sz>0?'KeyS':'KeyW');for(const k of held)if(!next.includes(k))await page.keyboard.up(k);for(const k of next)if(!held.includes(k))await page.keyboard.down(k);held=next;await page.waitForTimeout(90);}throw Error('Could not reach '+x+','+z);}
const press=label=>page.getByRole('button',{name:label,exact:true}).click();async function interact(id){assert.equal((await inspect()).nearest,id);await page.keyboard.press('KeyE');}

try{
 await page.goto(new URL('../dist/Nawantara-3D.html',import.meta.url).href);await page.click('#newGame');
 const s=fresh();s.position={x:0,z:-29};s.checkpoint={...s.position};s.flags.ext_observed_compass=true;
 await page.click('#menuBtn');await page.locator('#importSave').setInputFiles({name:'idle.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify(s))});await page.waitForFunction(()=>Nawantara.inspect().position.z<-28);
 await go(0,-29);await interact('checkpoint');await press('Hadapi bayang');await page.click('#guard');assert.ok((await inspect()).combat.idleInterval);
 await page.click('#skillInfo');const before=(await inspect()).combat.idleSeconds;await page.waitForTimeout(5500);assert.equal((await inspect()).combat.idleSeconds,before);await press('Kembali');
 await page.waitForFunction(()=>Nawantara.inspect().combat.foes.length===3);assert.equal((await inspect()).combat.idleSpawned,true);checks.push('Idle pauses inside skill details; exactly one extra tutorial enemy appears after timeout');
 await page.click('#flee');
 const m=fresh();m.chapter=3;m.position={x:0,z:-117};m.checkpoint={...m.position};await page.click('#menuBtn');await page.locator('#importSave').setInputFiles({name:'m04.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify(m))});await page.waitForFunction(()=>Nawantara.inspect().state.chapter===3);
 await go(0,-117);await interact('adi');await press('Ikuti Adi');await page.screenshot({path:'qa/adi-hints-012.png'});await go(-3,-114,.4);await interact('route0');
 await page.reload();await page.click('#continueGame');assert.equal((await inspect()).state.flags.counter_adi_landmarks,1);await go(3,-121,.4);await interact('route1');await go(-3,-125,.4);await interact('route2');
 await go(3,-132,.4);await interact('adiReal');await press('Serang sosok ini');assert.equal((await inspect()).state.flags.counter_wrong_turns,1);assert.equal((await inspect()).state.chapter,3);
 await go(0,-128);await interact('mist');await press('Hadapi Kabut Bersuara');assert.equal((await inspect()).combat.kind,'mist');checks.push('M04 physical landmarks, mid-route reload, wrong Adi safely retries, correct Adi starts encounter');
 assert.deepEqual(errors,[]);writeFileSync('qa/navigation'+(process.env.QA_RUN?'-'+process.env.QA_RUN:'-06')+'.json',JSON.stringify({passed:true,buildSha256:createHash('sha256').update(readFileSync('dist/Nawantara-3D.html')).digest('hex'),checks,errors},null,2));console.log(checks.join('\n'));
}catch(e){await page.screenshot({path:'qa/navigation-failure.png'});throw e;}finally{await browser.close();}
