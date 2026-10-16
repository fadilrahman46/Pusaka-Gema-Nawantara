import test from 'node:test';import assert from 'node:assert/strict';
import {fresh,migrateSave,persistSave,chooseAdi} from '../src/state.js';import {awaken,awakenCost,ensureProgression} from '../src/progression.js';
import {awardQuestSukma,awardTrainingSukma} from '../src/economy.js';import {completeEncounter} from '../src/quest-graph.js';import {finishSide} from '../src/side-quests.js';import {burial} from '../src/core.js';
test('all tiers charge exact cost once; insufficient balance and battle lock leave state unchanged',()=>{
 for(const [id,cost] of [[1,10],[4,15],[6,20],[8,25],[84,30],[9,50]]){
  const s=fresh();s.roster=[id];ensureProgression(s);s.progression[id].level=40;s.sukma=cost-1;const before=JSON.stringify(s);
  assert.equal(awakenCost(id),cost);assert.equal(awaken(s,id),false);assert.equal(JSON.stringify(s),before);
  s.sukma=cost;assert.equal(awaken(s,id,true),false);assert.equal(s.sukma,cost);assert.ok(awaken(s,id));assert.equal(s.sukma,0);assert.equal(awaken(s,id),false);
 }
});
test('quest rewards are one-time; Adi and Saras are included; training requires a real non-guest win',()=>{
 const s=fresh();completeEncounter(s,'tutorial');assert.equal(s.sukma,2);assert.equal(awardQuestSukma(s,'NR-M01'),false);assert.equal(completeEncounter(s,'tutorial'),false);
 s.chapter=2;finishSide(s,'NR-S01');assert.equal(s.sukma,3);finishSide(s,'NR-S01');assert.equal(s.sukma,3);
 chooseAdi(s,'WAITED');assert.equal(s.sukma,4);for(let i=0;i<3;i++)burial(s,i,false);assert.equal(s.sukma,5);
 for(const b of [{training:true,guest:4,done:true,outcome:'win'},{training:true,done:true,outcome:'lose'},{training:true,done:false,outcome:'win'}])assert.equal(awardTrainingSukma(s,b),false);
 const b={training:true,done:true,outcome:'win'};assert.ok(awardTrainingSukma(s,b));assert.equal(awardTrainingSukma(s,b),false);assert.equal(s.sukma,6);
});
test('legacy migration keeps Awaken, backfills only claims, rejects malformed balances and preserves original backup',()=>{
 const old=fresh();delete old.sukma;delete old.sukmaClaims;old.chapter=6;old.roster=[4];ensureProgression(old);old.progression[4]={level:40,xp:0,awakened:true};old.flags.flag_nr_s01_complete=true;
 const migrated=migrateSave(old);assert.equal(migrated.sukma,0);assert.ok(migrated.progression[4].awakened);assert.ok(migrated.sukmaClaims.includes('NR-M06'));assert.equal(awardQuestSukma(migrated,'NR-S01'),false);
 const raw=JSON.stringify(old),map=new Map([['save',raw]]),storage={getItem:k=>map.get(k)??null,setItem:(k,v)=>map.set(k,v)};persistSave(storage,'save',migrated);persistSave(storage,'save',migrated);assert.equal(map.get('save-pre-economy-backup'),raw);
 for(const amount of [-1,1.5,'10',Number.MAX_SAFE_INTEGER+1])assert.throws(()=>migrateSave({...migrated,sukma:amount}));
 assert.throws(()=>migrateSave({...migrated,sukmaClaims:['NR-M01','NR-M01']}));
});
test('failed save cannot spend shards from live state',()=>{
 const live=fresh();live.roster=[4];ensureProgression(live);live.progression[4].level=40;live.sukma=15;
 const candidate=structuredClone(live);assert.ok(awaken(candidate,4));assert.throws(()=>persistSave({getItem:()=>null,setItem:()=>{throw Error('quota');}},'save',candidate));assert.equal(live.sukma,15);assert.equal(live.progression[4].awakened,undefined);
});
