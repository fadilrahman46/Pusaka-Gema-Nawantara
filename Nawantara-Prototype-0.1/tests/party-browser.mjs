const {chromium}=await import(process.env.PLAYWRIGHT_MODULE||'playwright');
import {fresh} from '../src/state.js';import assert from 'node:assert/strict';import {writeFileSync} from 'node:fs';
const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH,headless:true,args:['--no-sandbox','--enable-unsafe-swiftshader']});
const page=await browser.newPage({viewport:{width:1280,height:800}}),errors=[],checks=[];
page.on('pageerror',e=>errors.push(e.message));
const state=()=>page.evaluate(()=>Nawantara.inspect());
const press=name=>page.getByRole('button',{name,exact:true}).click();
try{
 await page.goto(new URL('../dist/Nawantara-3D.html',import.meta.url).href);await page.click('#newGame');
 const old=fresh();delete old.party;old.chapter=6;old.roster=[1,2,9,85];old.flags.flag_ranaya_song_stage=4;
 await page.click('#menuBtn');await page.locator('#importSave').setInputFiles({name:'production-02.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify(old))});
 await page.click('#codexBtn');await press('Atur party');assert.deepEqual((await state()).state.party,[0,1,2,9]);
 await press('Keluarkan Lampah Sinaru');await press('Tambahkan Saras Pertiwi');assert.deepEqual((await state()).state.party,[0,2,9,85]);
 await press('Latihan party');assert.equal((await state()).combat.activeId,'a:85');checks.push('0.2 import, four-slot edit, source SPD order');
 await page.selectOption('#allyTarget','a:0');await page.click('#strike');assert.equal((await state()).combat.allies.find(u=>u.characterId===85).prana,1);
 await page.click('#guard');await page.click('#guard');await page.click('#guard');assert.equal((await state()).combat.activeId,'a:85');
 await page.click('#guard');await page.click('#guard');await page.click('#guard');await page.click('#guard');
 await page.selectOption('#allyTarget','a:2');await page.click('#skill');assert.ok((await state()).combat.allies.find(u=>u.characterId===2).effects.some(e=>e.id==='shield'));checks.push('Saras target healing/shield and independent Prana');
 await page.screenshot({path:'qa/party-desktop-03.png'});await page.setViewportSize({width:640,height:640});
 const bounds=await page.locator('.battleBottom').boundingBox();assert.ok(bounds.x>=0&&bounds.x+bounds.width<=640&&bounds.y>=0&&bounds.y+bounds.height<=640);
 await page.locator('#guard').scrollIntoViewIfNeeded();assert.ok(await page.locator('#guard').isVisible());await page.screenshot({path:'qa/party-responsive-03.png'});checks.push('640px party controls fit and remain operable');
 await page.click('#flee');assert.equal((await state()).state.chapter,6);assert.equal((await state()).state.kepeng,old.kepeng);
 await page.reload();await page.click('#continueGame');assert.deepEqual((await state()).state.party,[0,2,9,85]);checks.push('Training does not grant quest reward; party survives reload');
 assert.deepEqual(errors,[]);writeFileSync('qa/party-browser-03.json',JSON.stringify({passed:true,checks,errors},null,2));console.log(checks.join('\n'));
}catch(e){await page.screenshot({path:'qa/party-browser-failure.png'});throw e;}finally{await browser.close();}
