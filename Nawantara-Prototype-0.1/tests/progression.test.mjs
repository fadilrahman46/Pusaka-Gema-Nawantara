import test from 'node:test';import assert from 'node:assert/strict';
import {fresh,migrateSave,validSave,persistSave} from '../src/state.js';
import {characterStats,grantXP,xpNeeded,equip,unequip,compassMultiplier,ensureProgression} from '../src/progression.js';
import registry from '../data/nirwasita-stats.js';
import {createBattle,act} from '../src/combat.js';
test('all 11 character anchors exact, growth between anchors and cap60',()=>{
 for(const [id,r] of Object.entries(registry))for(const level of [1,40,60]){const actual=characterStats(+id,level);for(const [k,v] of Object.entries(r.anchors[level]))assert.equal(actual[k],v,id+' '+level+' '+k);}
 assert.equal(characterStats(1,20).hp,1558);assert.equal(characterStats(1,60).hp,3442);assert.throws(()=>characterStats(1,61));assert.throws(()=>characterStats(1,1.5));
});
test('XP carries multiple levels, caps without overflow and persists through save',()=>{
 const s=fresh();grantXP(s,[0],225);assert.deepEqual(s.progression[0],{level:3,xp:0});grantXP(s,[0],100000);assert.deepEqual(s.progression[0],{level:60,xp:0});assert.ok(validSave(s));assert.deepEqual(migrateSave(s).progression,s.progression);
 assert.ok(!validSave({...s,progression:{0:{level:61,xp:0}}}));assert.ok(!validSave({...s,progression:{0:{level:5,xp:xpNeeded(5)}}}));
});
test('0.3 migration preserves progress, initializes L1 and equips existing compass once',()=>{
 const s=fresh();delete s.progression;delete s.equipment;delete s.lostEntries;s.chapter=6;s.roster=[1,2,9];s.items=['Kalung Jalan Pulang'];
 const m=migrateSave(s);assert.equal(m.chapter,6);assert.equal(m.progression[1].level,1);assert.equal(m.equipment[0].Jimat,'Kalung Jalan Pulang');assert.equal(compassMultiplier(m),0);assert.equal(s.equipment,undefined);
 assert.deepEqual(migrateSave(m),m);
 s.party=[9];const active=migrateSave(s);assert.equal(active.equipment[9].Jimat,'Kalung Jalan Pulang');assert.equal(compassMultiplier(active),0);
});
test('equipment ownership, category, unique instance, level/quest gates and battle lock',()=>{
 const s=fresh();s.roster=[5];ensureProgression(s);s.items=['Kompas Karat','Jimat Gudang Barang Tertinggal'];assert.equal(equip(s,0,'Kompas Karat'),true);assert.equal(equip(s,5,'Kompas Karat'),false);assert.equal(equip(s,5,'Jimat Gudang Barang Tertinggal'),false);
 s.progression[5]={level:25,xp:0};assert.equal(equip(s,5,'Jimat Gudang Barang Tertinggal'),false);s.flags.flag_nr_s01_complete=true;assert.equal(equip(s,5,'Jimat Gudang Barang Tertinggal',true),false);assert.equal(equip(s,5,'Jimat Gudang Barang Tertinggal'),true);assert.ok(validSave(s));
 assert.equal(unequip(s,0,'Jimat',true),false);assert.equal(unequip(s,0,'Jimat'),true);assert.equal(compassMultiplier(s),1);
 const bad=structuredClone(s);bad.equipment[0]={Senjata:'Jimat Gudang Barang Tertinggal'};assert.equal(validSave(bad),false);
});
test('levels and unique equipment affect real battle stats/cooldown',()=>{
 const s=fresh();s.roster=[5];s.party=[5];ensureProgression(s);s.progression[5]={level:25,xp:0};s.flags.flag_nr_s01_complete=true;s.items=['Jimat Gudang Barang Tertinggal'];equip(s,5,s.items[0]);
 const b=createBattle('mist',[5],1,s);assert.equal(b.allies[0].max,characterStats(5,25).hp);b.allies[0].prana=5;act(b,'ultimate');assert.equal(b.allies[0].cooldowns.ultimate,2);
});
test('0.3 original backup survives subsequent 0.4 autosaves and malformed additions reject',()=>{
 const old=fresh();delete old.progression;delete old.equipment;const raw=JSON.stringify(old),data=new Map([['game',raw]]),storage={getItem:k=>data.get(k)??null,setItem:(k,v)=>data.set(k,v)};
 const s=migrateSave(old);persistSave(storage,'game',s);grantXP(s,[0],100);persistSave(storage,'game',s);assert.equal(data.get('game-pre-progression-backup'),raw);
 assert.throws(()=>migrateSave({...s,progression:null}));assert.throws(()=>migrateSave({...s,equipment:{0:{Jimat:'Kompas Karat'}}}));
});
test('completed legacy Saras quest receives its newly implemented reward exactly once',()=>{
 const s=fresh();delete s.progression;delete s.equipment;s.burials=[0,1,2];s.roster=[85];s.flags.flag_saras_pertiwi_recruited=true;
 const m=migrateSave(s);assert.equal(m.items.filter(x=>x==='Jimat Yang Tertanam Selamat').length,1);assert.deepEqual(migrateSave(m),m);assert.deepEqual(s.items,[]);
});
