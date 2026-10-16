import test from 'node:test';import assert from 'node:assert/strict';
import {fresh,migrateSave,validSave} from '../src/state.js';
import {MAIN_QUESTS,completeEncounter,encounterAvailable,questStatus,elderAttempt} from '../src/quest-graph.js';
import {answerAdi,concludeAdi,beginAdiPath} from '../src/adi.js';
import {chooseAdi} from '../src/state.js';
test('graph validates prerequisites and rejects duplicate rewards',()=>{
 const s=fresh();assert.equal(completeEncounter(s,'tower'),false);assert.equal(completeEncounter(s,'tutorial'),true);const money=s.kepeng;
 assert.equal(completeEncounter(s,'tutorial'),false);assert.equal(s.kepeng,money);assert.equal(encounterAvailable(s,'lampah'),false);
 s.flags.flag_ranaya_song_stage=1;assert.equal(completeEncounter(s,'lampah'),true);assert.deepEqual(s.party,[0,1]);
 completeEncounter(s,'tandaraga');assert.equal(completeEncounter(s,'mist'),false);s.flags.ext_adi_puzzle=true;completeEncounter(s,'mist');assert.equal(completeEncounter(s,'tower'),false);
 s.fragments=['sanra','vendor','elder'];s.flags.flag_ranaya_song_stage=4;s.position={x:0,z:-171};completeEncounter(s,'tower');assert.equal(s.flags.ext_lantern_origin,6);completeEncounter(s,'nirsmara');assert.equal(s.chapter,6);assert.ok(MAIN_QUESTS.every(q=>questStatus(s,q.id)==='Selesai'));assert.equal(s.items.filter(i=>i==='Kalung Jalan Pulang').length,1);assert.ok(validSave(s));
});
test('0.2 save imports party without retroactive reward; invalid parties rejected',()=>{
 const s=fresh();delete s.party;s.chapter=6;s.roster=[1,2,9,85];const migrated=migrateSave(s);assert.deepEqual(migrated.party,[0,1,2,9]);assert.equal(migrated.kepeng,s.kepeng);assert.equal(completeEncounter(migrated,'nirsmara'),false);assert.equal(s.party,undefined);
 for(const party of [[],[0,0],[0,3],[0,1,2,9,85]])assert.equal(validSave({...migrated,party}),false);
 assert.equal(validSave({...fresh(),party:[9]}),false);
});
test('side-quest journal reflects permanent decisions and missed branch',()=>{
 const s=fresh();s.chapter=6;assert.equal(questStatus(s,'NR-S03'),'Terlewat');s.flags.flag_adi_resolution_path='WAITED';assert.equal(questStatus(s,'NR-S03'),'Selesai');s.flags.flag_misi_gagal_permanent_playthrough=true;assert.equal(questStatus(s,'NR-H03'),'Gagal permanen');assert.equal(questStatus(s,'NR-S01'),'Aktif');
});
test('partial Adi dialogue blocks boss entry and completion, while untouched and resolved paths remain legal',()=>{
 const s=fresh();s.chapter=5;s.flags.flag_adi_met=true;assert.ok(encounterAvailable(s,'nirsmara'));
 answerAdi(s,'HONEST');for(let step=0;step<4;step++){
  const before=JSON.stringify(s);assert.equal(encounterAvailable(s,'nirsmara'),false);assert.equal(completeEncounter(s,'nirsmara'),false);assert.equal(JSON.stringify(s),before);
  if(step===0)answerAdi(s,'HOPEFUL');if(step===1)concludeAdi(s);if(step===2)beginAdiPath(s,'WAITED');
 }
 chooseAdi(s,'WAITED');s.adi.pending=null;assert.ok(encounterAvailable(s,'nirsmara'));assert.ok(completeEncounter(s,'nirsmara'));
});
test('elder third failed attempt awards once, persists earlier failures, and normal success remains available',()=>{
 let s=fresh();assert.equal(elderAttempt(s),false);s.chapter=4;s.fragments=['sanra','vendor'];
 elderAttempt(s);s=migrateSave(s);elderAttempt(s);assert.ok(!s.fragments.includes('elder'));s=migrateSave(s);elderAttempt(s);
 assert.equal(s.flags.counter_elder_failures,3);assert.equal(s.flags.flag_ranaya_song_stage,3);assert.equal(s.flags.flag_fragment_elder,true);
 const before=JSON.stringify(s);assert.equal(elderAttempt(s),false);assert.equal(JSON.stringify(s),before);
 const normal=fresh();normal.chapter=4;assert.ok(elderAttempt(normal,true));assert.deepEqual(normal.fragments,['elder']);
 s.flags.counter_elder_failures=4;assert.throws(()=>migrateSave(s));
});
