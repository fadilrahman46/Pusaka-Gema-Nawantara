const {chromium}=await import(process.env.PLAYWRIGHT_MODULE||'playwright');
import {fresh} from '../src/state.js';import assert from 'node:assert/strict';import {writeFileSync} from 'node:fs';
const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH,headless:true,args:['--no-sandbox','--enable-unsafe-swiftshader']});
const page=await browser.newPage({viewport:{width:1280,height:800}}),errors=[],checks=[];
page.on('pageerror',e=>errors.push(e.message));
const state=()=>page.evaluate(()=>Nawantara.inspect());
const press=name=>page.getByRole('button',{name,exact:true}).click();
try{
 await page.goto(new URL('../dist/Nawantara-3D.html',import.meta.url).href);await page.click('#newGame');
 const old=fresh();delete old.party;old.chapter=6;old.roster=[1,2,9,85];old.sukma=50;old.progression={0:{level:1,xp:0},1:{level:1,xp:0},2:{level:1,xp:0},9:{level:40,xp:0},85:{level:1,xp:0}};old.flags.flag_ranaya_song_stage=4;
 await page.click('#menuBtn');await page.locator('#importSave').setInputFiles({name:'production-02.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify(old))});

 await page.waitForFunction(()=>Nawantara.inspect().state.chapter===6);
 await page.click('#bagBtn');await press('Perkembangan & equipment');await press('Pilih karakter');await press('Nirsmara · Lv40');await press('Detail skill');
 assert.ok((await page.locator('#modalBody').textContent()).includes('Yang Tak Bisa Diingat'));await press('Kembali');await press('Awaken · 50 Serpihan');await press('Aktifkan');
 assert.equal((await state()).state.progression[9].awakened,true);assert.equal(await page.getByRole('button',{name:'Awaken · 50 Serpihan',exact:true}).count(),0);
 await page.setViewportSize({width:640,height:640});await page.screenshot({path:'qa/awaken-05.png'});
 await page.reload();await page.click('#continueGame');assert.equal((await state()).state.progression[9].awakened,true);
 await page.click('#codexBtn');await press('Atur party');await press('Latihan party');
 assert.equal((await state()).combat.allies.find(u=>u.characterId===9).passive,true);
 await page.click('#skillInfo');assert.ok((await page.locator('#modalBody').textContent()).includes('Prana'));await press('Kembali');
 assert.ok(await page.locator('#guard').isEnabled());await page.click('#guard');
 checks.push('Awaken level40 UI, source skill descriptions, no duplicate activation, reload, active battle passive, 640px skill modal');
 assert.deepEqual(errors,[]);writeFileSync('qa/awaken-05.json',JSON.stringify({passed:true,checks,errors},null,2));console.log(checks.join('\n'));
}catch(e){await page.screenshot({path:'qa/awaken-failure.png'});throw e;}finally{await browser.close();}
