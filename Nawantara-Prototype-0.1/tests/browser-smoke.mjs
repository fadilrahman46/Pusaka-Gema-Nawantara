const {chromium:pw}=await import(process.env.PLAYWRIGHT_MODULE || 'playwright');

import {mkdirSync,writeFileSync} from 'node:fs';
const browser=await pw.launch({executablePath:process.env.CHROMIUM_PATH || undefined,headless:true,args:['--no-sandbox','--disable-dev-shm-usage','--enable-unsafe-swiftshader']});
const page=await browser.newPage({viewport:{width:1440,height:900}}), errors=[];
page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});
await page.goto(new URL('../dist/Nawantara-3D.html',import.meta.url).href);await page.waitForFunction(()=>window.Nawantara);await page.waitForTimeout(2000);mkdirSync('qa',{recursive:true});await page.screenshot({path:'qa/title.png'});
await page.click('#newGame');await page.waitForTimeout(1000);await page.screenshot({path:'qa/exploration.png'});console.log(await page.evaluate(()=>window.Nawantara.inspect()));
await page.click('#codexBtn');await page.fill('#searchRoster','Nirsmara');console.log('Nirsmara cards:',await page.locator('.rosterGrid article').count());await page.click('#modalClose');await page.click('#mapBtn');console.log('Region cards:',await page.locator('.region').count());await page.screenshot({path:'qa/map.png'});await page.click('#modalClose');
writeFileSync('qa/browser-smoke.json',JSON.stringify({errors,render:await page.evaluate(()=>Nawantara.rendererInfo())},null,2));console.log('Errors',errors);await browser.close();
