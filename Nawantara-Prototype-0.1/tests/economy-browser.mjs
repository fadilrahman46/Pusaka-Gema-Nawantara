const {chromium}=await import(process.env.PLAYWRIGHT_MODULE||'playwright');
import {fresh} from '../src/state.js';import assert from 'node:assert/strict';import {readFileSync,writeFileSync} from 'node:fs';import {createHash} from 'node:crypto';
const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH,headless:true,args:['--no-sandbox','--enable-unsafe-swiftshader']});
const page=await browser.newPage({viewport:{width:640,height:640}}),errors=[],checks=[];page.on('pageerror',e=>errors.push(e.message));
const state=()=>page.evaluate(()=>Nawantara.inspect()),press=name=>page.getByRole('button',{name,exact:true}).click();
async function gear(){await page.click('#bagBtn');await press('Perkembangan & equipment');await press('Pilih karakter');await page.getByRole('button',{name:/^Watu Palindra · Lv/}).click();}
try{
 await page.goto(new URL('../dist/Nawantara-3D.html',import.meta.url).href);await page.click('#newGame');
 const s=fresh();s.chapter=6;s.roster=[4,9];s.party=[9,4];s.progression={0:{level:1,xp:0},4:{level:40,xp:0},9:{level:60,xp:0}};s.sukma=14;
 await page.click('#menuBtn');await page.locator('#importSave').setInputFiles({name:'economy.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify(s))});await page.waitForFunction(()=>Nawantara.inspect().state.sukma===14);
 await gear();await press('Awaken · 15 Serpihan');assert.equal((await state()).state.sukma,14);assert.ok(!(await state()).state.progression[4].awakened);
 await press('Latihan party');for(let i=0;i<20&&(await state()).combat;i++)await page.click('#strike');assert.equal((await state()).combat,null);assert.equal((await state()).state.sukma,15);
 await gear();await press('Awaken · 15 Serpihan');await press('Batal');assert.equal((await state()).state.sukma,15);
 await press('Awaken · 15 Serpihan');await page.screenshot({path:'qa/economy-confirm-08.png'});await press('Aktifkan');assert.equal((await state()).state.sukma,0);assert.equal((await state()).state.progression[4].awakened,true);
 await page.reload();await page.click('#continueGame');assert.equal((await state()).state.sukma,0);await gear();assert.equal(await page.getByRole('button',{name:'Awaken · 15 Serpihan',exact:true}).count(),0);await press('Detail skill');assert.ok((await page.locator('#modalBody').textContent()).includes('lethal pertama'));await press('Kembali');await press('Latihan party');assert.equal((await state()).combat.allies.find(u=>u.characterId===4).passive,true);
 checks.push('Insufficient funds unchanged; real training win grants one shard; cancel preserves balance; Awaken spends 15 once; reload and Watu passive active');assert.deepEqual(errors,[]);
 writeFileSync('qa/economy'+(process.env.QA_RUN?'-'+process.env.QA_RUN:'-08')+'.json',JSON.stringify({passed:true,buildSha256:createHash('sha256').update(readFileSync('dist/Nawantara-3D.html')).digest('hex'),checks,errors},null,2));console.log(checks.join('\n'));
}catch(e){await page.screenshot({path:'qa/economy-failure.png'});throw e;}finally{await browser.close();}

