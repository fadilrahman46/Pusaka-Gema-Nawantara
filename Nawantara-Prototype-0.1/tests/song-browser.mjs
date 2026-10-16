const {chromium}=await import(process.env.PLAYWRIGHT_MODULE||'playwright');
import {fresh} from '../src/state.js';
import assert from 'node:assert/strict';
import {writeFileSync,readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH,headless:true,args:['--no-sandbox','--enable-unsafe-swiftshader']});
const page=await browser.newPage({viewport:{width:640,height:640}}),errors=[],checks=[];
page.on('pageerror',e=>errors.push(e.message));
const inspect=()=>page.evaluate(()=>Nawantara.inspect());
async function go(x,z,tol=.7){let held=[];for(let i=0;i<400;i++){const p=(await inspect()).position;const dx=x-p.x,dz=z-p.z;if(Math.hypot(dx,dz)<tol){for(const k of held)await page.keyboard.up(k);await page.waitForTimeout(100);return;}const steerZ=Math.max(-4,Math.min(4,dz)),sx=dx*Math.cos(.28)-steerZ*Math.sin(.28),sz=steerZ*Math.cos(.28)+dx*Math.sin(.28);const next=[];if(Math.abs(sx)>Math.max(.15,Math.abs(sz)*.45))next.push(sx>0?'KeyD':'KeyA');if(Math.abs(sz)>Math.max(.15,Math.abs(sx)*.45))next.push(sz>0?'KeyS':'KeyW');for(const k of held)if(!next.includes(k))await page.keyboard.up(k);for(const k of next)if(!held.includes(k))await page.keyboard.down(k);held=next;await page.waitForTimeout(90);}throw Error('Could not reach '+x+','+z);}
const press=label=>page.getByRole('button',{name:label,exact:true}).click();async function interact(id){assert.equal((await inspect()).nearest,id);await page.keyboard.press('KeyE');}

try{
 await page.goto(new URL('../dist/Nawantara-3D.html',import.meta.url).href);await page.click('#newGame');
 const s=fresh();s.chapter=4;s.position={x:4.2,z:-148};s.checkpoint={...s.position};s.fragments=['sanra','elder'];s.flags.flag_ranaya_song_stage=3;
 await page.click('#menuBtn');await page.locator('#importSave').setInputFiles({name:'m05.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify(s))});await page.waitForFunction(()=>Nawantara.inspect().state.chapter===4);
 await go(4.2,-148,.3);await interact('vendor');await press('Lihat nanti');assert.ok(!(await inspect()).state.flags.flag_vendor_refused);
 await interact('vendor');await press('Tolak tawaran');await page.reload();await page.click('#continueGame');await interact('vendor');await press('Beli · 30 Kepeng');
 assert.equal((await inspect()).state.kepeng,90);assert.equal((await inspect()).state.flags.flag_ranaya_song_stage,3);
 await go(0,-148);await go(0,-171);assert.notEqual((await inspect()).nearest,'tower');
 await go(0,-57);await go(-5,-57,.6);await interact('ranaya');await press('Dengarkan bait terakhir');assert.equal((await inspect()).state.flags.flag_ranaya_song_stage,4);
 await page.reload();await page.click('#continueGame');assert.equal((await inspect()).state.flags.flag_ranaya_song_stage,4);checks.push('Vendor dismiss vs explicit refusal, repricing/reload, atomic purchase, tower locked until Ranaya reunion');
 const m=fresh();m.chapter=3;m.position={x:0,z:-117};m.checkpoint={...m.position};await page.click('#menuBtn');await page.locator('#importSave').setInputFiles({name:'route.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify(m))});await page.waitForFunction(()=>Nawantara.inspect().state.chapter===3);
 await go(0,-117);await interact('adi');await press('Ikuti Adi');await go(3,-114,.4);await interact('wrongRoute0');assert.equal((await inspect()).state.flags.counter_wrong_turns,1);assert.equal((await inspect()).state.flags.counter_adi_landmarks,0);
 await go(-3,-114,.4);await interact('route0');await go(3,-121,.4);await interact('route1');await page.waitForTimeout(2200);await go(3,-125,.4);await interact('wrongRoute2');assert.equal((await inspect()).state.flags.counter_adi_landmarks,2);await go(-3,-125,.4);await interact('route2');assert.equal((await inspect()).state.flags.ext_adi_puzzle,true);checks.push('Wrong branches return to last intersection without losing milestones; final branch and audio scheduling run without errors');
 assert.deepEqual(errors,[]);writeFileSync('qa/song'+(process.env.QA_RUN?'-'+process.env.QA_RUN:'-07')+'.json',JSON.stringify({passed:true,buildSha256:createHash('sha256').update(readFileSync('dist/Nawantara-3D.html')).digest('hex'),checks,errors},null,2));console.log(checks.join('\n'));
}catch(e){await page.screenshot({path:'qa/song-failure.png'});throw e;}finally{await browser.close();}
