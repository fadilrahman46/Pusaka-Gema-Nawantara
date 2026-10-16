import test from 'node:test';import assert from 'node:assert/strict';import {readFileSync} from 'node:fs';
import {fresh,migrateSave,persistSave,validSave} from '../src/state.js';
import {ensureProgression,equip} from '../src/progression.js';
import {LORE,NIRSMARA_ITEM,recordLore,nirwasitaEntries,sacrificeNirsmara,nirsmaraItemError} from '../src/lore.js';
import {CAPS,skillLevel,upgradeSkill,upgradeError,awardQuestSloka,trainMandala,accrueSloka,awardMandalaBoss} from '../src/skills.js';
import {createBattle,activeUnit,act,canAct,addEffect} from '../src/combat.js';
import {sacrificeEntry} from '../src/side-quests.js';
function state(){const s=fresh();s.chapter=6;s.visited=[0,1,2,3,4,5,6];s.roster=[1,2,9];s.party=[9,0];ensureProgression(s);s.progression[9].level=55;return s;}
function collect(s){for(const id of Object.keys(LORE))recordLore(s,id);return s;}
test('all 33 skill caps and 11 character lore texts match allowed Guide source',()=>{
 const source=readFileSync(new URL('../../GUIDE_KARAKTER_100_Nawantara_FINAL_v1_1.md',import.meta.url),'utf8');
 for(const [id,caps] of Object.entries(CAPS)){const start=source.search(new RegExp('^### '+id.padStart(2,'0')+' ·','m')),rest=source.slice(start+1),end=rest.search(/^### \d+ ·/m),block=end<0?rest:rest.slice(0,end);
  for(const [action,label] of [['strike','Dasar'],['skill','Spesial'],['ultimate','Pamungkas']])assert.equal(caps[action],+block.match(new RegExp('\\| '+label+' \\| (\\d+) \\|'))[1]);
  assert.equal(LORE['NR-C'+id.padStart(2,'0')].text,block.match(/^\*\*Lore:\*\* (.+)$/m)[1].replaceAll('**',''));
 }assert.equal(Object.keys(LORE).length,27);
});
test('15 real entries can be earned with main-route roster and visits; invented or duplicate IDs do not count',()=>{
 const s=collect(state());assert.equal(nirwasitaEntries(s).length,16);assert.equal(recordLore(s,'NR-C04'),false);assert.equal(recordLore(s,'NR-Z01'),false);
 s.collections.encyclopedia=['NR-Z01','NR-Z01','FAKE'];assert.equal(nirwasitaEntries(s).length,1);assert.equal(validSave(s),false);
});
test('Nirsmara requires M06/ownership/55/15, confirmation, and one permanent atomic sacrifice',()=>{
 const s=collect(state());for(const change of [x=>x.chapter=5,x=>x.roster=[1,2],x=>x.progression[9].level=54,x=>x.collections.encyclopedia=x.collections.encyclopedia.slice(0,14)]){const x=structuredClone(s);change(x);assert.ok(nirsmaraItemError(x));assert.equal(sacrificeNirsmara(x,'NR-Z01',true),false);}
 const before=JSON.stringify(s);assert.equal(sacrificeNirsmara(s,'NR-Z01'),false);assert.equal(sacrificeNirsmara(s,'NR-Z01',true,true),false);assert.equal(JSON.stringify(s),before);
 assert.ok(sacrificeNirsmara(s,'NR-Z01',true));assert.equal(nirwasitaEntries(s).length,15);assert.ok(s.roster.includes(9));assert.ok(equip(s,9,NIRSMARA_ITEM));assert.equal(sacrificeNirsmara(s,'NR-Z02',true),false);assert.equal(recordLore(s,'NR-Z01'),false);assert.ok(validSave(s));assert.deepEqual(migrateSave(s),s);
 const corrupt=structuredClone(s);corrupt.collections.encyclopedia.push('NR-Z01');assert.equal(validSave(corrupt),false);
});
test('NR-S04 loss stays separate and cannot be reused; legacy recovery cannot restore permanent sacrifice',()=>{
 const s=collect(state());s.flags.counter_nggarindu_fragments=5;assert.ok(sacrificeEntry(s,'NR-Z01'));assert.equal(nirwasitaEntries(s).length,15);assert.equal(recordLore(s,'NR-Z01'),false);assert.ok(sacrificeNirsmara(s,'NR-M01',true));assert.equal(s.lostEntries[0].source,'NR-S04');assert.equal(s.nirsmaraSacrifice.source,'TITAH-NIRSMARA');assert.equal(nirwasitaEntries(s).length,14);assert.deepEqual(migrateSave(s),s);
 const candidate=collect(state());assert.ok(sacrificeNirsmara(candidate,'NR-M01',true));const raw=structuredClone(candidate);delete raw.progression;assert.throws(()=>migrateSave(raw));assert.ok(!migrateSave(candidate).collections.encyclopedia.includes('NR-M01'));
});
test('failed storage changes neither live item/sacrifice nor skill balances',()=>{
 const live=collect(state()),candidate=structuredClone(live);assert.ok(sacrificeNirsmara(candidate,'NR-Z01',true));const storage={getItem:()=>null,setItem:()=>{throw Error('quota');}};assert.throws(()=>persistSave(storage,'save',candidate));assert.equal(live.nirsmaraSacrifice,undefined);assert.ok(!live.items.includes(NIRSMARA_ITEM));
 live.sloka.stock[1]={umum:4,misi:0,seconds:0};const upgraded=structuredClone(live);assert.ok(upgradeSkill(upgraded,1,'strike'));assert.throws(()=>persistSave(storage,'save',upgraded));assert.equal(skillLevel(live,1,'strike'),1);assert.equal(live.sloka.stock[1].umum,4);
});
test('Nirsmara item heals once, does not revive or extend untargetable, and resets next battle',()=>{
 const s=collect(state());s.party=[9,1,2];assert.ok(sacrificeNirsmara(s,'NR-Z01',true));equip(s,9,NIRSMARA_ITEM);const b=createBattle('challenge',s.party,17,s),n=b.allies[0],ally=b.allies[1];b.foes[0].hp=999999;b.foes[0].atk=0;
 n.prana=4;ally.hp=1;b.allies[2].hp=0;act(b,'ultimate');assert.equal(ally.hp,1+Math.floor(ally.max*.08));assert.equal(b.allies[2].hp,0);assert.equal(ally.effects.find(e=>e.id==='untargetable').expires,2);
 for(let i=0;i<30;i++){if(activeUnit(b)===n&&canAct(b,'ultimate')){const before=ally.hp;act(b,'ultimate');assert.equal(ally.hp,before);break;}act(b,'guard');}
 assert.equal(createBattle('challenge',s.party,17,s).allies[0].nirsmaraItemUsed,undefined);
});
test('all individual caps, costs, common ultimate locks and battle lock enforce without overspending',()=>{
 for(const [idText,caps] of Object.entries(CAPS)){const id=+idText,s=state();s.roster=[id];ensureProgression(s);s.sloka.stock[id]={umum:999,misi:999,seconds:0};s.sloka.boss=999;
  for(const [action,max] of Object.entries(caps)){assert.equal(upgradeSkill(s,id,action,true),false);while(skillLevel(s,id,action)<max)assert.ok(upgradeSkill(s,id,action));const before=JSON.stringify(s);assert.equal(upgradeSkill(s,id,action),false);assert.equal(JSON.stringify(s),before);}
  // Remove fixture progression belonging to characters removed from roster.
  s.progression=Object.fromEntries(Object.entries(s.progression).filter(([key])=>+key===0||+key===id));s.party=[id];assert.ok(validSave(s));
 }
 const s=state();assert.ok(upgradeError(s,1,'strike'));assert.equal(upgradeSkill(s,1,'passive'),false);assert.equal(upgradeSkill(s,0,'strike'),false);
});
test('active use earns character Sloka, Mandala spends atomically, quest and boss rewards cannot repeat',()=>{
 const s=state();for(let i=0;i<120;i++)accrueSloka(s,[1,1,4],.5);assert.equal(s.sloka.stock[1].umum,1);assert.equal(s.sloka.stock[4],undefined);const before=JSON.stringify(s);accrueSloka(s,[1],.5,false);accrueSloka(s,[1],60);assert.equal(JSON.stringify(s),before);
 s.kepeng=19;assert.equal(trainMandala(s,1),false);s.kepeng=20;assert.equal(trainMandala(s,1,true),false);assert.ok(trainMandala(s,1));assert.equal(s.kepeng,0);assert.equal(s.sloka.stock[1].umum,4);assert.ok(upgradeSkill(s,1,'strike'));assert.equal(s.sloka.stock[1].umum,0);
 assert.ok(awardQuestSloka(s,'NR-M02'));assert.equal(awardQuestSloka(s,'NR-M02'),false);assert.equal(s.sloka.stock[1].misi,4);
 const b={kind:'mandalaBoss',done:true,outcome:'win'};assert.ok(awardMandalaBoss(s,b));assert.equal(awardMandalaBoss(s,b),false);assert.equal(awardMandalaBoss(s,{...b,slokaClaimed:false,outcome:'lose'}),false);assert.equal(s.sloka.boss,2);
});
test('legacy Sloka catchup credits only completed missions once, backs up original and rejects corrupt data',()=>{
 const old=state();delete old.sloka;old.flags.flag_nr_s02_complete=true;const raw=JSON.stringify(old),s=migrateSave(old);assert.equal(s.sloka.stock[1].misi,4);assert.equal(s.sloka.stock[6].misi,4);assert.equal(s.sloka.stock[5],undefined);assert.equal(s.sloka.boss,3);assert.deepEqual(migrateSave(s),s);
 const map=new Map([['save',raw]]),storage={getItem:k=>map.get(k)??null,setItem:(k,v)=>map.set(k,v)};persistSave(storage,'save',s);persistSave(storage,'save',s);assert.equal(map.get('save-pre-sloka-backup'),raw);
 for(const tweak of [x=>x.sloka.boss=-1,x=>x.sloka.stock[1].umum=1.5,x=>x.sloka.stock[1].seconds=60,x=>x.sloka.levels[1]={strike:9,skill:1,ultimate:1},x=>x.sloka.claims.push('NR-M02')]){const bad=structuredClone(s);tweak(bad);assert.throws(()=>migrateSave(bad));}
});
function battle(id,upgraded=false){const s=state();s.roster=[id];s.party=[id,0];ensureProgression(s);s.progression[id].level=40;if(upgraded)s.sloka.levels[id]={...CAPS[id]};const b=createBattle('challenge',s.party,17,s);b.foes[0].hp=b.foes[0].max=100000;b.foes[0].atk=0;const u=b.allies[0];u.acc=100;u.crit=0;u.prana=5;while(activeUnit(b)!==u)act(b,'guard');return b;}
test('upgrades change real damage, heal, slow, defense, haste, shield and reduction without changing durations',()=>{
 for(const id of [1,2,3,4,6,7,8,9,84,85]){const base=battle(id),up=battle(id,true);for(const b of [base,up]){const u=b.allies[0];u.hp=Math.floor(u.max*.4);b.allies[1].hp=1;const target=[2,7,84].includes(id)?'e:0':[3,85].includes(id)?'a:0':undefined;act(b,'skill',target);}
  if([2,7,84].includes(id))assert.ok(up.foes[0].hp<base.foes[0].hp);
  if([3,85].includes(id))assert.ok(up.allies[1].hp>base.allies[1].hp);
  if(id===9)assert.ok(up.allies[0].hp>base.allies[0].hp);
  const effect={1:'slow',4:'defUp',6:'haste',8:'shield'}[id];if(effect){const a=id===1?up.foes[0]:up.allies[0],b=id===1?base.foes[0]:base.allies[0];assert.ok(a.effects.find(e=>e.id===effect).magnitude>b.effects.find(e=>e.id===effect).magnitude);assert.equal(a.effects.find(e=>e.id===effect).expires,b.effects.find(e=>e.id===effect).expires);}
 }
 for(const id of [1,7,85]){const base=battle(id),up=battle(id,true);for(const b of [base,up]){b.allies[1].hp=1;act(b,'strike',id===85?'a:0':'e:0');}if(id===85)assert.ok(up.allies[1].hp>base.allies[1].hp);else assert.ok(up.foes[0].hp<base.foes[0].hp);}
 const w=battle(4,true);act(w,'ultimate');assert.ok(w.allies[1].effects.some(e=>e.id==='shield'));assert.equal(w.allies[1].effects.find(e=>e.id==='invulnerable').expires,2);
 const k=battle(6,true);act(k,'ultimate');assert.equal(k.allies[1].prana,3);
 const l=battle(5,true);addEffect(l,l.foes[0],'defUp',.5,3);act(l,'ultimate');assert.ok(l.allies[0].effects.some(e=>e.id==='defUp'));
 const n=battle(8,true);act(n,'ultimate');assert.equal(n.allies[0].effects.find(e=>e.id==='reduction').magnitude,.4*1.05);
});
