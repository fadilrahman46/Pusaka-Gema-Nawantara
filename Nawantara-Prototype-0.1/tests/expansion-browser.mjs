const {chromium}=await import(process.env.PLAYWRIGHT_MODULE||'playwright');
import {fresh} from '../src/state.js';import assert from 'node:assert/strict';import {writeFileSync,readFileSync} from 'node:fs';import {createHash} from 'node:crypto';
const buildSha256=createHash('sha256').update(readFileSync(new URL('../dist/Nawantara-3D.html',import.meta.url))).digest('hex');
const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH,headless:true,args:['--no-sandbox','--enable-unsafe-swiftshader']});
const page=await browser.newPage({viewport:{width:1100,height:800}}),checks=[],errors=[];page.setDefaultTimeout(15000);page.on('pageerror',e=>errors.push(e.message));
const inspect=()=>page.evaluate(()=>Nawantara.inspect()),press=name=>page.getByRole('button',{name,exact:true}).click();
async function go(x,z,tol=.6){let held=[];for(let i=0;i<400;i++){const p=(await inspect()).position,dx=x-p.x,dz=Math.max(-4,Math.min(4,z-p.z));if(Math.hypot(dx,dz)<tol){for(const k of held)await page.keyboard.up(k);await page.waitForTimeout(100);return;}const sx=dx*Math.cos(.28)-dz*Math.sin(.28),sz=dz*Math.cos(.28)+dx*Math.sin(.28),next=[];if(Math.abs(sx)>Math.max(.15,Math.abs(sz)*.45))next.push(sx>0?'KeyD':'KeyA');if(Math.abs(sz)>Math.max(.15,Math.abs(sx)*.45))next.push(sz>0?'KeyS':'KeyW');for(const k of held)if(!next.includes(k))await page.keyboard.up(k);for(const k of next)if(!held.includes(k))await page.keyboard.down(k);held=next;await page.waitForTimeout(70);}throw Error('Cannot reach '+x+','+z);}
async function interact(id){assert.equal((await inspect()).nearest,id);await page.keyboard.press('KeyE');}
async function fight(){for(let i=0;i<240;i++){const b=(await inspect()).combat;if(!b)return;const u=b.allies.find(u=>u.id===b.activeId);let button='#strike';
 if(['poem','sunyi'].includes(b.kind)||b.kind==='restricted'&&u.characterId===84)button='#guard';
 else if(u.characterId===0&&u.prana>=4&&!u.cooldowns.ultimate&&!u.locked.includes('ultimate'))button='#heal';
 else if(u.locked.includes('strike'))button='#guard';
 await page.click(button);
 }throw Error('Battle did not resolve');}
try{
 await page.goto(new URL('../dist/Nawantara-3D.html',import.meta.url).href);await page.click('#newGame');
 const old=fresh();delete old.progression;delete old.equipment;delete old.lostEntries;old.chapter=6;old.roster=[1,2,9,85];old.party=[0,9];old.flags.flag_ranaya_song_stage=4;old.items=['Tongkat Perantau','Kalung Jalan Pulang','Lentera Nenek Ranaya'];
 await page.click('#menuBtn');await page.locator('#importSave').setInputFiles({name:'03-completed.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify(old))});
 await page.waitForFunction(()=>Nawantara.inspect().state.chapter===6);
 assert.equal((await inspect()).state.progression[9].level,1);checks.push('Completed 0.3 save migrates at L1 without retroactive XP');
 await go(0,-70);await go(-3,-70);await interact('lare');for(const name of ['Lila','Ranu','Banyu','Sari','Jati'])await press(name);assert.ok((await inspect()).state.roster.includes(5));checks.push('NR-S01 five matching choices recruit Lare and grant unique item');
 await go(0,-99);await go(3,-100);await interact('kayuri');await press('Aku sudah mengingat');for(const name of ['Air','Batu','Daun','Akar','Jalan','Jembatan','Cahaya','Gerbang','Rumah','Pulang'])await press(name);await press('Perlindungan');await press('Keberanian');await press('Bertahan empat ronde');await fight();assert.ok((await inspect()).state.roster.includes(6));checks.push('NR-S02 ten baits, two tones, four full survival rounds');
 await go(0,-39);await go(3,-39);await interact('oldHouse');for(const name of ['☀','◇','≋','▥','☾'])await press(name);await press('Lihat kenangan Ranaya');await press('Sparring opsional');await fight();assert.ok((await inspect()).state.flags.flag_sanra_ranu_buff_permanent);checks.push('NR-H01 murals, encyclopedia and optional permanent buff');
 // Use the normal compass window once, then accessibility for remaining timed fragments.
 await go(0,-113);await go(4,-113);await page.waitForFunction(()=>document.getElementById('interactName').textContent.includes('Kenangan tampak'),{},{timeout:25000});await interact('memory0');
 await page.click('#menuBtn');await press('Aksesibilitas kompas: mati');await press('Lanjutkan');
 for(const [id,x,z] of [[1,-4,-136],[2,4,-143],[3,-4,-167],[4,4,-181]]){await go(0,z);await go(x,z);await interact('memory'+id);}
 await go(0,-183);await go(-4,-183);await interact('altar');await press('Kabut Pertama');await press('Relakan Kabut Pertama');await press('Hadapi manifestasi');await fight();assert.ok((await inspect()).state.roster.includes(8));assert.equal((await inspect()).state.lostEntries[0].entry,'NR-M01');checks.push('NR-S04 timed window, five fragments, persisted sacrifice and three-phase skill absorption');
 await go(0,-163);await go(3,-163);for(let i=0;i<3;i++){await interact('wira');await press('Mulai latihan terbatas');await fight();assert.equal((await inspect()).state.flags.counter_restricted_battles,i+1);}await interact('wira');await press('Hadapi Sang Sunyi');await fight();assert.ok((await inspect()).state.roster.includes(84));checks.push('NR-H02 three restricted battles with guest Wira and peaceful finale');
 await page.click('#bagBtn');await press('Perkembangan & equipment');const level=(await inspect()).state.progression[0].level;assert.ok(level>1);await press('Senjata');await press('Pasang Tongkat Perantau');assert.equal((await inspect()).state.equipment[0].Senjata,'Tongkat Perantau');
 await press('Pusaka');await press('Pasang Lentera Nenek Ranaya');assert.equal((await inspect()).state.flags.ext_lantern_zone,6);
 await page.screenshot({path:'qa/equipment-04.png'});await page.setViewportSize({width:640,height:640});const box=await page.locator('#modal').boundingBox();assert.ok(box.x>=0&&box.x+box.width<=640);await page.screenshot({path:'qa/equipment-responsive-04.png'});await page.keyboard.press('Escape');
 await page.reload();await page.click('#continueGame');const saved=(await inspect()).state;assert.equal(saved.equipment[0].Senjata,'Tongkat Perantau');assert.equal(saved.equipment[0].Pusaka,'Lentera Nenek Ranaya');assert.equal(saved.progression[0].level,level);for(const id of [5,6,8,84])assert.ok(saved.roster.includes(id));assert.ok(!saved.collections.encyclopedia.includes('NR-M01'));checks.push('XP leveling, equipment, responsive UI and reload preserve all new progress');
 assert.deepEqual(errors,[]);writeFileSync('qa/expansion-'+(process.env.QA_RUN||'04')+'.json',JSON.stringify({passed:true,buildSha256,checks,errors,state:saved},null,2));console.log(checks.join('\n'));
}catch(e){await page.screenshot({path:'qa/expansion-failure-04.png'});writeFileSync('qa/expansion-'+(process.env.QA_RUN||'04')+'.json',JSON.stringify({passed:false,error:e.message,checks,errors,inspect:await inspect()},null,2));throw e;}finally{await browser.close();}
