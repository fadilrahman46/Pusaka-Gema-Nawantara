const {chromium}=await import(process.env.PLAYWRIGHT_MODULE||'playwright');
import assert from 'node:assert/strict';import {readFileSync,writeFileSync} from 'node:fs';import {createHash} from 'node:crypto';
import {fresh} from '../src/state.js';
const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH,headless:true,args:['--no-sandbox','--enable-unsafe-swiftshader']});
const page=await browser.newPage({viewport:{width:640,height:640}}),errors=[];page.on('pageerror',e=>errors.push(e.message));
const inspect=()=>page.evaluate(()=>Nawantara.inspect()),press=name=>page.getByRole('button',{name,exact:true}).click();
try{
 await page.goto(new URL('../dist/Nawantara-3D.html',import.meta.url).href);await page.click('#newGame');
 const s=fresh();s.chapter=4;s.kepeng=0;s.roster=[1];s.party=[0,1];s.progression[1]={level:60,xp:0};s.position={x:4.2,z:-148};s.visited=[0,1,2,3,4,5];s.flags.flag_vendor_refused=true;
 await page.click('#menuBtn');await page.locator('#importSave').setInputFiles({name:'broke.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify(s))});await page.waitForFunction(()=>!Nawantara.inspect().modal);
 await page.click('#journalBtn');assert.equal(await page.locator('.journalRows article').count(),13);assert.match(await page.locator('#modalBody').textContent(),/vendor \(30 Kepeng\)/);assert.match(await page.locator('#modalBody').textContent(),/latihan party/);
 const box=await page.locator('#modal').boundingBox();assert.ok(box.x>=0&&box.x+box.width<=640);await page.screenshot({path:'qa/journal-011.png'});await page.keyboard.press('Escape');
 for(let run=0;run<3;run++){
  await page.click('#bagBtn');await press('Perkembangan & equipment');await press('Latihan party');
  for(let turn=0;turn<80&&(await inspect()).combat;turn++)await page.click('#strike');
  assert.equal((await inspect()).combat,null);assert.equal((await inspect()).state.kepeng,10*(run+1));
 }
 assert.equal((await inspect()).state.sukma,3);assert.ok((await inspect()).state.progression[0].level<5);
 await page.reload();await page.click('#continueGame');assert.equal((await inspect()).state.kepeng,30);
 await page.waitForFunction(()=>Nawantara.inspect().nearest==='vendor');await page.keyboard.press('KeyE');await press('Beli · 30 Kepeng');assert.equal((await inspect()).state.kepeng,0);assert.ok((await inspect()).state.fragments.includes('vendor'));
 await page.click('#journalBtn');const journal=await page.locator('#modalBody').textContent();assert.match(journal,/Fragmen 1\/3/);assert.ok(!journal.includes('vendor (30 Kepeng)'));assert.deepEqual(errors,[]);
 writeFileSync('qa/journal-economy-011.json',JSON.stringify({passed:true,buildSha256:createHash('sha256').update(readFileSync('dist/Nawantara-3D.html')).digest('hex'),checks:['13 quest guidance rows at 640px','zero Kepeng recovers through three real wins','per-character XP','reload preserves currency','refusal price paid and journal updates'],errors},null,2));
}finally{await browser.close();}
