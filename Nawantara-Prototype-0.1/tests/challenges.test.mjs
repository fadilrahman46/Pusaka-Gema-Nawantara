import test from 'node:test';import assert from 'node:assert/strict';
import {fresh,validSave,migrateSave,persistSave} from '../src/state.js';
import {CHALLENGES,UNIQUE_ITEMS,challengeFlag,challengeError,createChallenge,finishChallenge} from '../src/challenges.js';
import {ensureProgression,equip,equipError} from '../src/progression.js';
import {createBattle,activeUnit,act,canAct,addEffect} from '../src/combat.js';
function state(){const s=fresh();s.chapter=5;s.roster=[1,2];s.party=[0,1,2];ensureProgression(s);return s;}
function play(b){for(let i=0;i<500&&!b.done;i++){
 const u=activeUnit(b),c=b.challenge;let action='guard',target;
 if(!c.achieved&&u.characterId===c.id){action=c.type==='recruit'?'skill':'ultimate';if(!canAct(b,action))action='guard';}
 else if(c.achieved)action='strike';
 if(action==='strike'||action==='skill'&&c.id===7||action==='ultimate'&&c.id===2)target=b.foes.find(f=>f.hp>0)?.id;
 if(action==='skill'&&c.id===3)target=b.allies.find(a=>a.characterId!==3&&a.hp>0)?.id;
 assert.notEqual(act(b,action,target),'invalid');
 }assert.ok(b.done,'battle completes');return b;}
test('three recruit challenges use actual actions, preserve party and reward exactly once',()=>{
 for(const key of ['recruit3','recruit4','recruit7']){const s=state(),before=structuredClone(s),b=createChallenge(s,key);assert.deepEqual(s,before);assert.equal(finishChallenge(s,b),false);
 play(b);assert.equal(b.outcome,'win');assert.equal(b.challenge.achieved,true);assert.equal(finishChallenge(s,b),true);assert.equal(finishChallenge(s,b),false);assert.ok(s.roster.includes(CHALLENGES[key].id));assert.equal(s.party.length,4);assert.equal(s.progression[CHALLENGES[key].id].level,1);assert.deepEqual(s.items,[]);assert.equal(s.sukma,0);assert.ok(validSave(s));assert.deepEqual(migrateSave(s),s);
 }
});
test('full party stays unchanged; failed objective, loss and exit grant nothing; retry is fresh',()=>{
 const s=state();s.roster.push(5);s.party=[0,1,2,5];ensureProgression(s);const before=structuredClone(s),b=createChallenge(s,'recruit3');
 assert.equal(finishChallenge(s,b),false);b.done=true;b.outcome='lose';b.challenge.achieved=true;assert.equal(finishChallenge(s,b),false);b.outcome='win';b.challenge.achieved=false;assert.equal(finishChallenge(s,b),false);assert.deepEqual(s,before);
 const retry=play(createChallenge(s,'recruit3'));assert.ok(finishChallenge(s,retry));assert.deepEqual(s.party,[0,1,2,5]);assert.ok(s.roster.includes(3));
});
test('all five Titah enforce chapter, ownership, level and completion; reward/equip/reload',()=>{
 for(const [idText,item] of Object.entries(UNIQUE_ITEMS)){const id=+idText,key='item'+id,s=state();s.chapter=4;assert.ok(challengeError(s,key));s.chapter=5;s.roster=s.roster.filter(x=>x!==id);assert.ok(challengeError(s,key));s.roster.push(id);ensureProgression(s);s.party=[id,0];s.progression[id].level=item.level-1;assert.throws(()=>createChallenge(s,key));s.progression[id].level=item.level;
  s.items.push(item.name);assert.ok(equipError(s,id,item.name));s.items=[];
  const b=play(createChallenge(s,key));assert.equal(b.outcome,'win',key);assert.ok(b.challenge.achieved,key);assert.ok(finishChallenge(s,b),key);assert.equal(finishChallenge(s,b),false);assert.deepEqual(s.items,[item.name]);assert.ok(equip(s,id,item.name));assert.ok(validSave(s));assert.deepEqual(migrateSave(s),s);
 }
});
test('Watu requires Menarik Batas through three protected rounds, not just survival',()=>{
 const s=state(),b=createChallenge(s,'recruit4');for(let i=0;i<20&&!b.done;i++)act(b,'guard');assert.equal(b.challenge.protectedRounds,0);assert.equal(b.challenge.achieved,false);assert.equal(finishChallenge(s,b),false);
});
test('new completion flags validate; old saves remain valid; failed storage leaves live reward unchanged',()=>{
 const s=state();assert.deepEqual(migrateSave(s),s);const bad=structuredClone(s);bad.flags[challengeFlag('item1')]=true;assert.equal(validSave(bad),false);
 const b=play(createChallenge(s,'recruit7')),candidate=structuredClone(s);assert.ok(finishChallenge(candidate,b));assert.throws(()=>persistSave({getItem:()=>null,setItem:()=>{throw Error('quota');}},'save',candidate));assert.ok(!s.roster.includes(7));assert.equal(s.flags[challengeFlag('recruit7')],undefined);
});
function gearBattle(id,geared){const s=state();s.roster=[id];s.party=[id,0];ensureProgression(s);s.progression[id].level=40;const item=UNIQUE_ITEMS[id];if(geared){s.flags[challengeFlag('item'+id)]=true;s.items=[item.name];equip(s,id,item.name);}const b=createBattle('challenge',s.party,17,s);b.foes[0].hp=b.foes[0].max=100000;b.foes[0].atk=0;const u=b.allies[0];u.acc=100;u.crit=0;u.prana=5;while(activeUnit(b)!==u)act(b,'guard');return b;}
test('five item bonuses affect real ultimates; Sanra revive unchanged; Watu bonus is once per battle',()=>{
 for(const id of [1,2,3,4,7]){const plain=gearBattle(id,false),gear=gearBattle(id,true);for(const b of [plain,gear]){b.allies[1].hp=1;act(b,'ultimate',id===2?'e:0':undefined);}
  if(id===1)assert.equal(gear.foes[0].effects.find(e=>e.id==='confused').magnitude,.3);
  if([2,7].includes(id))assert.ok(gear.foes[0].hp<plain.foes[0].hp);
  if(id===3)assert.ok(gear.allies[1].hp>plain.allies[1].hp);
  if(id===4){assert.equal(gear.allies[0].def,gear.allies[0].baseDef*1.08);assert.equal(gear.allies[0].effects.find(e=>e.id==='invulnerable').expires,plain.allies[0].effects.find(e=>e.id==='invulnerable').expires);for(let i=0;i<20;i++){const u=activeUnit(gear);if(u.characterId===4&&canAct(gear,'ultimate')){act(gear,'ultimate');break;}act(gear,'guard');}assert.equal(gear.allies[0].def,gear.allies[0].baseDef*1.08);assert.equal(createBattle('challenge',[4]).allies[0].watuItemBonus,undefined);}
 }
 const b=gearBattle(3,true);b.allies[1].hp=0;act(b,'ultimate');assert.equal(b.allies[1].hp,Math.floor(b.allies[1].max*.25));
});
test('Watu item DEF remains after immunity and combines with actual Titis death without overwrite',()=>{
 const b=gearBattle(4,true),w=b.allies[0],ally=b.allies[1];act(b,'ultimate');while(b.round<3)act(b,'guard');
 assert.equal(w.effects.some(e=>e.id==='invulnerable'),false);assert.equal(ally.def,ally.baseDef*1.08);
 w.passive=true;w.hp=1;addEffect(b,w,'taunt',1,99);b.foes[0].acc=100;b.foes[0].atk=1000000;
 for(let i=0;i<8&&w.hp>0;i++)act(b,'guard');assert.equal(w.hp,0);assert.equal(ally.def,ally.baseDef*1.33);
});
