import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createBattle,activeUnit,act,canAct,addEffect,combatDamage,hitChance,resolveMemory,memoryAvailable,tickBattleIdle} from '../src/combat.js';
const guard=b=>act(b,'guard');
test('idle interval pauses for reading, resumes on movement and tutorial spawns only once',()=>{
 const b=createBattle('tutorial');b.idleEnabled=true;guard(b);assert.equal(b.idleInterval,true);const before=JSON.stringify(b);
 tickBattleIdle(b,.5,false,true);assert.equal(JSON.stringify(b),before);assert.equal(act(b,'guard'),'invalid');
 assert.ok(tickBattleIdle(b,0,true));assert.equal(b.foes.length,2);guard(b);
 for(let i=0;i<11;i++)tickBattleIdle(b,.5);assert.equal(b.foes.length,3);assert.ok(b.queue.includes('e:2'));assert.equal(b.foes[2].element,'Apah');
 guard(b);assert.equal(b.idleInterval,false);for(let i=0;i<20;i++)tickBattleIdle(b,.5);assert.equal(b.foes.length,3);
});
test('Lampah uses slow skill and idle applies stronger one-round penalty only during interval',()=>{
 const b=createBattle('lampah');b.idleEnabled=true;tickBattleIdle(b,.5);assert.equal(b.idleSeconds,undefined);
 guard(b);assert.ok(b.allies[0].effects.some(e=>e.id==='slow'&&e.magnitude===.2));
 for(let i=0;i<11;i++)tickBattleIdle(b,.5);assert.ok(b.allies[0].effects.some(e=>e.id==='slow'&&e.magnitude===.3));assert.equal(b.idleInterval,false);
});
test('SPD snapshot, stable ties, independent Prana and HP',()=>{
 const b=createBattle('mist',[0,1,2]);assert.equal(b.activeId,'a:1');guard(b);assert.equal(b.activeId,'a:0');
 assert.equal(b.allies[1].prana,1);assert.equal(b.allies[0].prana,0);guard(b);assert.equal(b.activeId,'a:2');guard(b);assert.equal(b.round,2);assert.equal(b.activeId,'a:1');
 assert.ok(b.allies.some(u=>u.hp<u.max));assert.equal(b.allies[2].prana,1);
 assert.equal(createBattle('mist',[9,2]).activeId,'a:2');
});
test('invalid target, cost and action leave entire battle unchanged',()=>{
 const b=createBattle('mist');const before=JSON.stringify(b);
 for(const [a,t] of [['skill','a:0'],['strike','missing'],['strike','a:0'],['unknown',null]])assert.equal(act(b,a,t),'invalid');
 assert.equal(JSON.stringify(b),before);
});
test('special blocks two following owner turns, guard caps Prana at five',()=>{
 const b=createBattle('nirsmara');guard(b);guard(b);assert.equal(act(b,'skill','a:0'),'continue');
 assert.equal(canAct(b,'skill'),false);guard(b);assert.equal(canAct(b,'skill'),false);guard(b);assert.equal(canAct(b,'skill'),true);
 for(let i=0;i<3;i++)guard(b);assert.equal(activeUnit(b).prana,5);
});
test('status keeps application round plus N full round ends; refresh does not stack',()=>{
 const b=createBattle('mist');addEffect(b,b.allies[0],'shield',100,2);addEffect(b,b.allies[0],'shield',50,1);
 assert.equal(b.allies[0].effects.length,1);assert.equal(b.allies[0].effects[0].magnitude,100);
 guard(b);assert.ok(b.allies[0].effects.length);guard(b);assert.ok(b.allies[0].effects.length);guard(b);assert.equal(b.allies[0].effects.length,0);
});
test('guard halves damage and damage floors only after all factors',()=>{
 const b=createBattle('mist'),u=b.allies[0],f=b.foes[0];
 assert.equal(combatDamage(u,f,1.85,true,.5),Math.floor(920**2/(920+1.5*540)*1.85*1.54*.5));
 assert.equal(hitChance({...u,acc:500},f),1);assert.equal(hitChance({...u,acc:-500},f),.05);
 const a=createBattle('mist', [0],17),c=createBattle('mist',[0],17);a.allies[0].acc=100;c.allies[0].acc=100;
 act(a,'guard');act(c,'strike','e:0');assert.ok(a.allies[0].max-a.allies[0].hp<c.allies[0].max-c.allies[0].hp);
});
test('Tandaraga counts complete party rounds, damage attempts reset patience',()=>{
 const b=createBattle('tandaraga',[0,1]);assert.equal(b.foes[0].type,'Human');for(let i=0;i<8;i++)guard(b);assert.equal(b.patience,4);
 act(b,'strike','e:0');assert.equal(b.patience,0);guard(b);assert.equal(b.patience,0);
 for(let i=0;i<9;i++)assert.notEqual(guard(b),'win');assert.equal(guard(b),'win');
});
test('tower requires separate even rounds for seals; Nirsmara needs song',()=>{
 const b=createBattle('tower');assert.equal(resolveMemory(b),false);guard(b);assert.equal(memoryAvailable(b),true);assert.equal(resolveMemory(b),true);assert.equal(resolveMemory(b),false);assert.equal(b.seals,2);
 const n=createBattle('nirsmara',[9]);n.allies[0].acc=100;
 for(let i=0;i<30&&n.phase<3;i++)act(n,'strike','e:0');assert.equal(n.phase,3);assert.equal(n.foes[0].hp,1815);assert.equal(n.done,false);assert.equal(act(n,'strike','e:0'),'invalid');assert.equal(resolveMemory(n),true);assert.equal(n.outcome,'win');
});
test('seed replay identical, dead units cannot act or be healed, no Common passive',()=>{
 const a=createBattle('mist',[0,1],33),b=createBattle('mist',[0,1],33);for(let i=0;i<4;i++){guard(a);guard(b);}assert.deepEqual(a,b);
 const c=createBattle('mist',[0,2]);assert.equal(c.allies[1].prana,0);c.allies[1].hp=0;guard(c);guard(c);assert.equal(act(c,'skill','a:2'),'invalid');assert.equal(c.allies[1].hp,0);
});
test('Saras healing, shielding, Nirsmara shelter and immunity effects',()=>{
 const b=createBattle('mist',[85]);b.allies[0].hp=1000;act(b,'strike','a:85');assert.ok(b.allies[0].hp>1000);guard(b);act(b,'skill','a:85');assert.ok(b.allies[0].effects.some(e=>e.id==='shield'));
 const n=createBattle('mist',[9]);guard(n);guard(n);const before=n.allies[0].hp;act(n,'skill');assert.equal(n.allies[0].hp,before);
 addEffect(n,n.allies[0],'debuffImmune',1,2);addEffect(n,n.allies[0],'slow',.2,2);assert.ok(!n.allies[0].effects.some(e=>e.id==='slow'));
});
test('Nirsmara encounter prevents repeat debuff, incomplete song requires two solutions',()=>{
 const b=createBattle('nirsmara');addEffect(b,b.foes[0],'slow',.2,2);b.foes[0].effects=[];addEffect(b,b.foes[0],'slow',.2,2);assert.equal(b.foes[0].effects.length,0);
 b.phase=3;b.requiredMemories=2;assert.equal(resolveMemory(b),true);assert.equal(b.done,false);assert.equal(resolveMemory(b),true);assert.equal(b.outcome,'win');
});
test('playable character L1 stats match extracted source registry',()=>{
 const roster=JSON.parse(readFileSync(new URL('../data/roster.json',import.meta.url)));
 const b=createBattle('mist',[1,2,9,85]);for(const u of b.allies){const ref=roster.find(c=>c.id===u.characterId);assert.equal(u.name,ref.name.split(" · ")[0]);for(const [key,value] of Object.entries(ref.stats))assert.equal(u[key],value,ref.name+' '+key);}
});
test('Nirwasita encounter identities match World Bible and tower seals reduce 33 percent each',()=>{
 for(const [kind,type,element] of [['tutorial','Ghost','Apah'],['mist','Spirit','Akasa'],['tower','Spirit','Akasa']]){
  const b=createBattle(kind);for(const foe of b.foes){assert.equal(foe.type,type);assert.equal(foe.element,element);}
 }
 for(const seals of [0,1,2,3]){
  const b=createBattle('tower',[0],17),u=b.allies[0],foe=b.foes[0];b.seals=seals;u.acc=100;u.crit=0;
  const expected=combatDamage(u,foe,1,false,1-seals*.33),before=foe.hp;
  act(b,'strike','e:0');assert.equal(before-foe.hp,expected);
 }
});

test('rejected Lare debuff cannot reset cooldown through immunity or Nirsmara repeat protection',()=>{
 for(const protection of ['immune','repeat']){
  const b=createBattle('nirsmara',[5]),u=activeUnit(b),foe=b.foes[0];
  u.prana=2;u.acc=100;
  if(protection==='immune')addEffect(b,foe,'debuffImmune',1,3);
  else {addEffect(b,foe,'specialLock',1,2);foe.effects=[];}
  assert.equal(act(b,'skill','e:0'),'continue');
  assert.equal(foe.cooldowns.skill,0);
  assert.ok(!foe.effects.some(e=>e.id==='specialLock'));
 }
 const b=createBattle('nirsmara',[5]);activeUnit(b).prana=2;activeUnit(b).acc=100;
 act(b,'skill','e:0');assert.ok(b.foes[0].effects.some(e=>e.id==='specialLock'));
 assert.equal(b.foes[0].cooldowns.skill,1); // Enemy has taken its following turn.
});

test('immunity rejection does not consume Nirsmara first successful debuff application',()=>{
 const b=createBattle('nirsmara'),foe=b.foes[0];addEffect(b,foe,'debuffImmune',1,1);
 assert.equal(addEffect(b,foe,'slow',.2,2),false);assert.deepEqual(b.seenDebuffs,[]);
 foe.effects=[];assert.equal(addEffect(b,foe,'slow',.2,2),true);
 assert.equal(addEffect(b,foe,'slow',.3,3),false);assert.equal(foe.effects[0].magnitude,.2);
});

test('Kayuri fear immunity blocks fear, expires normally, and general cleanse removes fear',()=>{
 const b=createBattle('sunyi',[6]),u=activeUnit(b);u.prana=2;
 act(b,'skill');assert.ok(u.effects.some(e=>e.id==='fearImmune'));
 assert.equal(addEffect(b,u,'fear',1,2),false);
 for(let i=0;i<3;i++)guard(b);
 assert.equal(addEffect(b,u,'fear',1,2),true);
 const n=createBattle('sunyi',[9]),nir=activeUnit(n);nir.prana=4;addEffect(n,nir,'fear',1,2);
 act(n,'ultimate');assert.ok(!nir.effects.some(e=>e.id==='fear'));
 addEffect(n,nir,'debuffImmune',1,2);assert.equal(addEffect(n,nir,'fear',1,2),false);
});
