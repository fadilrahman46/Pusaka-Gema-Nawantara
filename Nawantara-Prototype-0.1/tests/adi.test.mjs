import test from 'node:test';
import assert from 'node:assert/strict';
import {fresh,migrateSave,validSave,chooseAdi} from '../src/state.js';
import {answerAdi,concludeAdi,beginAdiPath,adiTone} from '../src/adi.js';
const ready=()=>{const s=fresh();s.chapter=4;s.flags.flag_adi_met=true;return s;};
test('Adi dialogue preserves both answers, ties are MIXED, conclusion is a separate beat',()=>{
 for(const first of ['HONEST','HOPEFUL','MIXED'])for(const second of ['HONEST','HOPEFUL','MIXED']){
  let s=ready();assert.ok(answerAdi(s,first));s=migrateSave(s);assert.ok(answerAdi(s,second));
  assert.equal(s.flags.flag_adi_dialogue_choice,undefined);assert.equal(answerAdi(s,'HONEST'),false);
  assert.ok(concludeAdi(s));assert.equal(s.flags.flag_adi_dialogue_choice,first===second?first:'MIXED');assert.ok(validSave(s));
 }
});
test('Adi path requires dialogue and chapter 5, persists pending, and grants no items or XP',()=>{
 for(const path of ['WAITED','FORCED_PAST']){
  let s=ready();assert.equal(beginAdiPath(s,path),false);answerAdi(s,'HONEST');answerAdi(s,'HOPEFUL');concludeAdi(s);
  assert.equal(beginAdiPath(s,path),false);s.chapter=5;assert.ok(beginAdiPath(s,path));s=migrateSave(s);
  assert.equal(beginAdiPath(s,path==='WAITED'?'FORCED_PAST':'WAITED'),false);
  const rewards=JSON.stringify([s.items,s.progression,s.kepeng]);assert.ok(chooseAdi(s,path));s.adi.pending=null;
  assert.ok(validSave(s));assert.equal(JSON.stringify([s.items,s.progression,s.kepeng]),rewards);
  assert.equal(chooseAdi(s,path),false);
 }
});
test('legacy resolved and skipped saves remain intact; malformed Adi progress rejects',()=>{
 const s=ready();s.chapter=6;assert.equal(answerAdi(s,'HONEST'),false);assert.equal(migrateSave(s).flags.flag_region_resolution_nirwasita,'NEUTRAL');
 chooseAdi(s,'WAITED');assert.equal(migrateSave(s).flags.flag_adi_resolution_path,'WAITED');
 for(const adi of [null,{answers:['INVALID'],concluded:false,pending:null},{answers:[],concluded:true,pending:null},{answers:[],concluded:false,pending:'WAITED'}]){
  const bad=ready();bad.adi=adi;assert.throws(()=>migrateSave(bad));
 }
 const bad=ready();answerAdi(bad,'HONEST');answerAdi(bad,'HONEST');concludeAdi(bad);bad.flags.flag_adi_dialogue_choice='HOPEFUL';assert.throws(()=>migrateSave(bad));
});
