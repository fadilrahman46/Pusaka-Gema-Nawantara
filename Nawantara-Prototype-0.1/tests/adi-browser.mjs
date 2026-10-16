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
 for(const path of ['WAITED','FORCED_PAST']){
  const s=fresh();s.chapter=5;s.flags.flag_adi_met=true;s.position={x:3,z:-155};s.checkpoint={...s.position};
  await page.click('#menuBtn');await page.locator('#importSave').setInputFiles({name:'adi-fixture.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify(s))});
  await page.waitForFunction(()=>Nawantara.inspect().state.chapter===5&&!Nawantara.inspect().state.adi);
  await go(3,-155);await interact('adiTalk');await press('Jujur — berbahaya');await press('Lanjutkan nanti');
  await page.reload();await page.click('#continueGame');await go(3,-155);await interact('adiTalk');await press('Beri harapan');await press('Dengarkan Adi');
  assert.equal((await inspect()).state.flags.flag_adi_dialogue_choice,'MIXED');
  await go(0,-163);await go(3,-177);await interact('adiEnd');
  await press(path==='WAITED'?'Tunggu sampai ia siap':'Lewati jalan sekarang');
  await press(path==='WAITED'?'Cari persimpangan':'Tunda');
  await page.reload();await page.click('#continueGame');assert.equal((await inspect()).state.adi.pending,path);
  if(path==='WAITED'){
   await go(0,-184);await interact('nirsmara');assert.equal(await page.locator('#modalTitle').textContent(),'Persimpangan tanpa Adi');await press('Cari persimpangan');
   await go(-2.5,-181,.4);await interact('adiTrail');await press('Kembali ke gerbang');assert.equal((await inspect()).state.flags.flag_adi_resolution_path,null);
   await interact('adiTrail');await page.screenshot({path:'qa/adi-042.png'});await press('Menuju cahaya menara');
  }else{await go(3,-177);await interact('adiEnd');await press('Lakukan satu hit');}
  await press('Lanjut menjelajah');const done=(await inspect()).state;
  assert.equal(done.flags.flag_adi_resolution_path,path);assert.equal(done.flags.flag_region_resolution_nirwasita,path==='WAITED'?'ADI_JOINS':'NEUTRAL');assert.deepEqual(done.items,[]);assert.equal(done.progression[0].xp,0);
  await page.reload();await page.click('#continueGame');assert.equal((await inspect()).state.flags.flag_adi_resolution_path,path);
  checks.push(path+': dialogue/reload, pending/reload, physical traversal, resolution/reload, no rewards');
 }
 assert.deepEqual(errors,[]);writeFileSync('qa/adi'+(process.env.QA_RUN?'-'+process.env.QA_RUN:'-042')+'.json',JSON.stringify({passed:true,buildSha256:createHash('sha256').update(readFileSync('dist/Nawantara-3D.html')).digest('hex'),checks,errors},null,2));console.log(checks.join('\n'));
}catch(e){await page.screenshot({path:'qa/adi-failure.png'});throw e;}finally{await browser.close();}
