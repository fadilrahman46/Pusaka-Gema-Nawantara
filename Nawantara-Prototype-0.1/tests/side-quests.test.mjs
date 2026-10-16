import test from 'node:test';import assert from 'node:assert/strict';
import {fresh,validSave,migrateSave} from '../src/state.js';
import {WAREHOUSE,BAITS,warehouseChoice,rememberBaits,collectMemory,sacrificeEntry,solveMurals,resolveSideEncounter,sideEncounterAvailable} from '../src/side-quests.js';
import {createBattle,act,activeUnit,addEffect} from '../src/combat.js';
import {memoryWindow} from '../src/side-ui.js';
test('warehouse all-wrong path succeeds after five encounters, no duplicate reward',()=>{
 const s=fresh();s.chapter=2;for(let i=0;i<5;i++){assert.ok(warehouseChoice(s,WAREHOUSE[(i+1)%5][1]));assert.equal(warehouseChoice(s,'Lila'),false);assert.ok(resolveSideEncounter(s,{kind:'warehouse',outcome:'win'}));}
 assert.ok(s.roster.includes(5));assert.equal(s.flags.counter_gudang_correct_matches,0);assert.equal(warehouseChoice(s,'Lila'),false);assert.equal(s.items.length,1);assert.ok(validSave(s));
});
test('Kayuri sequence and tones persist across retry, survival four rounds',()=>{
 const s=fresh();s.chapter=3;assert.equal(rememberBaits(s,[...BAITS].reverse(),['Perlindungan','Keberanian']),false);assert.ok(rememberBaits(s,BAITS,['Perlindungan','Keberanian']));assert.ok(sideEncounterAvailable(migrateSave(s),'poem'));
 const b=createBattle('poem');for(let i=0;i<4;i++)act(b,'guard');assert.equal(b.outcome,'win');assert.ok(resolveSideEncounter(s,b));assert.ok(s.roster.includes(6));
});
test('Nggarindu sacrifice is typed recoverable loss, persists on retry and unique fragments',()=>{
 const s=fresh();s.chapter=4;s.roster=[1];s.party=[0,1];s.collections.encyclopedia=['NR-M01'];assert.equal(sacrificeEntry(s,'NR-M01'),false);for(let i=0;i<5;i++)assert.ok(collectMemory(s,i));assert.equal(collectMemory(s,0),false);assert.ok(sacrificeEntry(s,'NR-M01'));assert.equal(sacrificeEntry(s,'NR-M01'),false);
 assert.deepEqual(s.collections.encyclopedia,[]);assert.equal(s.lostEntries[0].source,'NR-S04');assert.ok(sideEncounterAvailable(migrateSave(s),'manifest'));assert.ok(validSave(s));
 const b=createBattle('manifest',[0,1]);assert.equal(b.allies.flatMap(u=>u.locked).length,1);for(const u of b.allies){u.atk=100000;u.acc=100;}let n=0;while(!b.done&&n++<30){const u=activeUnit(b);act(b,u.characterId===0&&!u.locked.includes('ultimate')&&u.prana>=4&&!u.cooldowns.ultimate?'ultimate':u.locked.includes('strike')?'guard':'strike','e:0');}assert.equal(b.outcome,'win');assert.equal(b.allies.flatMap(u=>u.locked).length,3);assert.ok(resolveSideEncounter(s,b));assert.ok(s.roster.includes(8));
});
test('mural unique entries and Wira restricted/retry/silent finale',()=>{
 const s=fresh();s.chapter=6;s.flags.flag_ranaya_song_stage=4;assert.equal(solveMurals(s,[1,0,2,3,4]),false);assert.ok(solveMurals(s,[0,1,2,3,4]));assert.equal(solveMurals(s,[0,1,2,3,4]),false);assert.equal(s.collections.encyclopedia.length,3);
 const bad={kind:'restricted',outcome:'win',history:[{actor:'a:84',action:'strike'},{actor:'a:84',action:'skill'}]};assert.equal(resolveSideEncounter(s,bad),false);assert.equal(s.flags.counter_restricted_battles,undefined);
 for(let i=0;i<3;i++)assert.ok(resolveSideEncounter(s,{kind:'restricted',outcome:'win',history:[]}));const b=createBattle('sunyi');act(b,'guard');act(b,'strike','e:0');assert.equal(b.patience,1);for(let i=0;i<4;i++)act(b,'guard');assert.equal(b.outcome,'win');assert.equal(b.allies[0].hp,b.allies[0].max);assert.ok(resolveSideEncounter(s,b));assert.ok(s.roster.includes(84));
});
test('new kits: revival once, cleanse, immunity/rest, haste, skill reset, max HP sacrifice',()=>{
 const sanra=createBattle('mist',[3,0]);sanra.allies[1].hp=0;sanra.allies[0].prana=5;act(sanra,'ultimate');assert.equal(sanra.allies[1].hp,1050);sanra.allies[1].hp=0;
 const watu=createBattle('mist',[4]);watu.allies[0].prana=5;act(watu,'ultimate');assert.equal(watu.allies[0].hp,watu.allies[0].max);
 const kayuri=createBattle('mist',[6,0]);kayuri.allies[0].prana=5;kayuri.allies[1].cooldowns.skill=2;act(kayuri,'ultimate');assert.equal(kayuri.allies[1].cooldowns.skill,0);assert.equal(kayuri.allies[1].prana,2);
 const ng=createBattle('mist',[8]);ng.allies[0].prana=5;const max=ng.allies[0].max;act(ng,'ultimate');assert.equal(ng.allies[0].max,Math.floor(max*.7));assert.ok(ng.allies[0].effects.some(e=>e.id==='reduction'));
 const lare=createBattle('mist',[5]);lare.allies[0].prana=5;addEffect(lare,lare.foes[0],'defUp',.5,4);addEffect(lare,lare.foes[0],'haste',.2,4);act(lare,'ultimate');assert.equal(lare.foes[0].effects.length,0);assert.ok(lare.allies[0].effects.length);
 for(const id of [7,84]){const b=createBattle('mist',[id]);b.allies[0].prana=5;b.allies[0].acc=100;assert.notEqual(act(b,'ultimate','e:0'),'invalid');assert.ok(b.foes[0].hp<b.max);}
});
test('fragment windows are three seconds per idle cycle, accessible mode bypasses timing',()=>{
 const s=fresh();for(let id=0;id<5;id++)for(let cycle=0;cycle<5;cycle++){let count=0;for(let sec=0;sec<15;sec++)if(memoryWindow(s,id,cycle*15+sec))count++;assert.equal(count,3);}
 assert.equal(memoryWindow(s,0,0),false);s.options.accessible=true;assert.equal(memoryWindow(s,0,0),true);
});
