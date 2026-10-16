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
 async function load(s){await page.click('#menuBtn');await page.locator('#importSave').setInputFiles({name:'p1.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify(s))});await page.waitForFunction(ch=>Nawantara.inspect().state.chapter===ch,s.chapter);}
 const s=fresh();s.chapter=4;s.position={x:-4.2,z:-157};s.checkpoint={...s.position};s.fragments=['sanra','vendor'];await load(s);
 await go(-4.2,-157,.3);await interact('elder');await press('⌂ Pulang');await press('⌂ Pulang');await press('Kembali');
 await page.reload();await page.click('#continueGame');assert.equal((await inspect()).state.flags.counter_elder_failures,2);
 await interact('elder');await press('⌂ Pulang');assert.equal(await page.locator('#modalTitle').textContent(),'Tetua · fragmen perjalanan');await press('Lanjut menjelajah');
 assert.equal((await inspect()).state.fragments.filter(x=>x==='elder').length,1);assert.equal((await inspect()).state.flags.flag_ranaya_song_stage,3);
 checks.push('Elder third failure awards once after reload; final song progression remains valid');
 const a=fresh();a.chapter=5;a.flags.flag_adi_met=true;a.position={x:0,z:-184};a.checkpoint={...a.position};a.adi={answers:['HONEST'],concluded:false,pending:null};await load(a);
 await go(0,-184);await interact('nirsmara');assert.equal(await page.locator('#modalTitle').textContent(),'Adi · dunia luar · 2/3');assert.equal((await inspect()).combat,null);
 await press('Beri harapan');await press('Dengarkan Adi');await press('Lewati jalan sekarang');await press('Lakukan satu hit');await press('Lanjut menjelajah');
 await interact('nirsmara');await press('Hadapi Nirsmara');assert.equal((await inspect()).combat.kind,'nirsmara');checks.push('Partial Adi blocks boss, can resolve safely, then boss unlocks');
 assert.deepEqual(errors,[]);writeFileSync('qa/p1-051.json',JSON.stringify({passed:true,buildSha256:createHash('sha256').update(readFileSync('dist/Nawantara-3D.html')).digest('hex'),checks,errors},null,2));console.log(checks.join('\n'));
}catch(e){await page.screenshot({path:'qa/p1-failure.png'});throw e;}finally{await browser.close();}
