import test from 'node:test';import assert from 'node:assert/strict';import {readFileSync} from 'node:fs';
import data from '../data/awaken.js';import {fresh,migrateSave} from '../src/state.js';
import {awaken,ensureProgression,characterStats} from '../src/progression.js';
import {createBattle,activeUnit,act,addEffect} from '../src/combat.js';
const state=ids=>{const s=fresh();s.roster=ids;ensureProgression(s);for(const id of ids)s.progression[id]={level:40,xp:0,awakened:true};return s;};
const battle=(ids,kind='mist')=>createBattle(kind,ids,17,state(ids));
test('22 Awaken anchors match source and apply once at 40/60; intermediate growth uses delta40',()=>{
 const source=readFileSync(new URL('../../GUIDE_KARAKTER_100_Nawantara_FINAL_v1_1.md',import.meta.url),'utf8');
 for(const [id,row] of Object.entries(data)){
  const start=source.search(new RegExp('^### '+id.padStart(2,'0')+' ·','m')),rest=source.slice(start+1),end=rest.search(/^### \d+ ·/m),block=end<0?rest:rest.slice(0,end);
  for(const level of [40,60]){const line=block.split('\n').find(l=>l.replaceAll('*','').startsWith('| Level '+level+' + Awaken'));const vals=line.split('|').slice(2,-1).map(x=>Number(x.replace(/[%*]/g,'').trim()));assert.deepEqual(Object.values(row.anchors[level]),vals);const c=characterStats(+id,level,true);for(const [k,v] of Object.entries(row.anchors[level]))assert.equal(c[k],v);}
  assert.equal(characterStats(+id,41,true).hp,characterStats(+id,41).hp+row.anchors[40].hp-characterStats(+id,40).hp);
 }
});
test('Awaken requires ownership/level, locks in battle, persists and rejects malformed saves',()=>{
 const s=fresh();s.roster=[2];ensureProgression(s);assert.equal(awaken(s,2),false);s.progression[2].level=40;s.sukma=10;
 assert.equal(awaken(s,2,true),false);assert.equal(awaken(s,9),false);assert.ok(awaken(s,2));assert.equal(awaken(s,2),false);assert.ok(migrateSave(s).progression[2].awakened);
 s.progression[2].level=39;assert.throws(()=>migrateSave(s));s.progression[2]={level:40,xp:0,awakened:'yes'};assert.throws(()=>migrateSave(s));
 for(const id of [1,2,3]){const b=battle([id]);assert.equal(b.allies[0].passive,false);assert.equal(b.allies[0].prana,0);}
});
test('Lare odd living count changes accuracy and round-snapshot speed without stacking',()=>{
 const b=battle([5,6]);const u=b.allies[0];assert.equal(u.acc,u.baseAcc+20);assert.equal(u.spd,u.baseSpd*1.15);
 b.allies[1].hp=0;act(b,'guard');assert.equal(u.acc,u.baseAcc);assert.equal(u.spd,u.baseSpd);
});
test('Kayuri heals living team on ultimate; Wira starts with one Prana and caps passive grants',()=>{
 const b=battle([6,84],'nirsmara');for(const u of b.allies)u.hp=Math.floor(u.max/2);const k=activeUnit(b);assert.equal(k.characterId,6);k.prana=4;const before=k.hp;act(b,'ultimate');assert.equal(k.hp,before+Math.floor(k.max*.08));
 const w=battle([84],'nirsmara'),u=w.allies[0];assert.equal(u.prana,1);for(let i=0;i<9;i++){u.prana=0;act(w,'guard');}assert.equal(u.passivePrana,2);
});
test('Nirsmara passive rejects repeat debuffs and cleanses exactly one at round start',()=>{
 const b=battle([9,6],'nirsmara'),u=b.allies[0];assert.ok(addEffect(b,u,'slow',.2,3));u.effects=[];assert.equal(addEffect(b,u,'slow',.2,3),false);
 addEffect(b,b.allies[1],'accuracyDown',10,3);addEffect(b,b.allies[1],'fear',1,3);act(b,'guard');act(b,'guard');assert.equal(b.allies[1].effects.filter(e=>['accuracyDown','fear'].includes(e.id)).length,1);
});
test('Saras transfers duration once, cannot recurse and leaves at least one full round',()=>{
 const b=battle([85,6]),u=b.allies[1],s=b.allies[0];addEffect(b,u,'slow',.2,3);assert.equal(u.effects.find(e=>e.id==='slow').expires,b.round+2);assert.equal(s.effects.find(e=>e.id==='slow').expires,b.round+1);
 addEffect(b,u,'fear',1,1);assert.ok(!s.effects.some(e=>e.id==='fear'));
});
test('Nggarindu death stacks cap at three and team ATK buff does not compound',()=>{
 const b=battle([6,8],'nirsmara'),n=b.allies[1],victim=b.allies[0];b.foes[0].acc=100;b.foes[0].atk=1000000;
 for(let i=0;i<4;i++){victim.hp=1;addEffect(b,victim,'taunt',1,999);let guard=0;while(victim.hp>0&&guard++<4)act(b,'guard');assert.equal(victim.hp,0);}
 assert.equal(n.deathStacks,3);assert.equal(n.def,n.baseDef*1.6);assert.equal(n.atk,n.baseAtk*1.1);
});
test('Tobelang resistance rotates on attacks through four elements',()=>{
 const b=battle([7],'nirsmara'),u=b.allies[0];b.foes[0].acc=100;for(const element of ['Bayu','Pertiwi','Apah','Teja','Bayu']){act(b,'guard');assert.equal(u.resistElement,element);}
});
test('Titis Ulang triggers once on lethal, coexists with Nggarindu, and survives Sanra revive without stacking',()=>{
 const b=battle([4,3,8],'nirsmara'),w=b.allies[0],sanra=b.allies[1],n=b.allies[2];b.foes[0].acc=100;b.foes[0].atk=1000000;
 addEffect(b,w,'taunt',1,999);w.hp=1;
 for(let i=0;i<4&&w.hp>0;i++)act(b,'guard');assert.equal(w.hp,0);assert.equal(w.titisUsed,true);assert.equal(b.watuLegacy,true);
 assert.equal(sanra.def,sanra.baseDef*1.25);assert.equal(n.def,n.baseDef*1.45);
 while(activeUnit(b)?.characterId!==3)act(b,'guard');sanra.prana=4;act(b,'ultimate');assert.ok(w.hp>0);
 for(let i=0;i<4&&w.hp>0;i++)act(b,'guard');assert.equal(w.hp,0);assert.equal(sanra.def,sanra.baseDef*1.25);assert.equal(n.def,n.baseDef*1.65);
 const next=battle([4,3]);assert.equal(next.watuLegacy,undefined);assert.equal(next.allies[1].def,next.allies[1].baseDef);
});
test('shield and immunity prevent Titis trigger; unawakened Watu cannot trigger it',()=>{
 for(const protection of ['shield','invulnerable']){
  const b=battle([4,3],'nirsmara'),w=b.allies[0];w.hp=1;b.foes[0].acc=100;addEffect(b,w,'taunt',1,99);addEffect(b,w,protection,10000000,99);
  act(b,'guard');act(b,'guard');assert.equal(w.hp,1);assert.equal(b.watuLegacy,undefined);
 }
 const s=state([4,3]);s.progression[4].awakened=false;const b=createBattle('nirsmara',[4,3],17,s),w=b.allies[0];w.hp=1;b.foes[0].acc=100;b.foes[0].atk=1000000;addEffect(b,w,'taunt',1,99);act(b,'guard');act(b,'guard');assert.equal(w.hp,0);assert.equal(b.watuLegacy,undefined);
});
