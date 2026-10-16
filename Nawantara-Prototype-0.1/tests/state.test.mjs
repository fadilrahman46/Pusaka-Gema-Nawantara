import test from 'node:test';
import assert from 'node:assert/strict';
import {fresh,validSave,migrateSave,persistSave,readSave,chooseAdi,connectionScore,ending,presentationPolicy} from '../src/state.js';
function legacy(){const s=fresh();s.version=1;s.flags.flag_adi_resolution_path='UNSET';for(const k of ['designRevision','checkpoint','endingInputs','decisionProvenance','migrationIssues','presentationMode','finalEnding'])delete s[k];return s;}
function memoryStorage(){const map=new Map();return {getItem:k=>map.get(k)??null,setItem:(k,v)=>map.set(k,v)};}
test('legacy Adi migration preserves originals and distinguishes skipped choice',()=>{
 const source=legacy();source.flags.flag_region_resolution_nirwasita='ADI_JOINS';
 const before=JSON.stringify(source),s=migrateSave(source);assert.equal(JSON.stringify(source),before);
 assert.equal(s.version,2);assert.equal(s.flags.flag_adi_resolution_path,'WAITED');assert.equal(connectionScore(s),2);
 assert.equal(migrateSave(legacy()).flags.flag_adi_resolution_path,null);
 source.flags.flag_adi_resolution_path='FORCED_PAST';const conflict=migrateSave(source);assert.deepEqual(conflict.migrationIssues,['ADI_CONFLICT']);assert.throws(()=>ending(conflict,100,true));
});
test('save writes retain original legacy and recoverable backup',()=>{
 const storage=memoryStorage(),raw=JSON.stringify(legacy());storage.setItem('active',raw);
 const s=readSave(storage,'active');persistSave(storage,'active',s);assert.equal(storage.getItem('active-legacy-backup'),raw);
 chooseAdi(s,'WAITED');persistSave(storage,'active',s);assert.equal(storage.getItem('active-legacy-backup'),raw);
 assert.equal(readSave(storage,'active').flags.flag_adi_resolution_path,'WAITED');
 assert.equal(readSave(storage,'active-backup').flags.flag_adi_resolution_path,null);
 const stored=storage.getItem('active');assert.throws(()=>persistSave(storage,'active',{...s,kepeng:-1}));assert.equal(storage.getItem('active'),stored);
});
test('schema rejects corrupted enums, typed flags, duplicate roster and prototype keys',()=>{
 for(const mutate of [s=>s.flags.flag_adi_resolution_path='made-up',s=>s.flags.flag_nr_m01_complete='yes',s=>s.flags.counter_x=-1,s=>s.roster=[1,1],s=>s.presentationMode='HIDDEN',s=>s.checkpoint.x=Infinity]){
  const s=fresh();mutate(s);assert.equal(validSave(s),false);assert.throws(()=>migrateSave(s));
 }
 const s=JSON.parse(JSON.stringify(fresh()).replace('"flags":{','"flags":{"__proto__":{"polluted":true},'));
 assert.equal(validSave(s),false);assert.equal({}.polluted,undefined);
});
test('unknown legacy branch never silently becomes final score zero',()=>{
 const s=legacy();s.flags.flag_sm_m06_complete=true;s.roster=[28];const m=migrateSave(s);assert.equal(m.endingInputs.smaranaOffer,null);assert.throws(()=>ending(m,100));
 s.flags.ext_sm_offer='REJECTED';const recovered=migrateSave(s);assert.equal(recovered.endingInputs.smaranaOffer,'DECLINED');assert.equal(connectionScore(recovered),2);
});
test('Adi decision is irrevocable and isolated from completion state',()=>{
 const s=fresh();assert.equal(chooseAdi(s,'WAITED'),true);assert.equal(chooseAdi(s,'FORCED_PAST'),false);assert.equal(s.flags.flag_region_resolution_nirwasita,'ADI_JOINS');
 assert.equal(migrateSave(JSON.parse(JSON.stringify(s))).flags.flag_adi_resolution_path,'WAITED');
});
test('backup storage failure aborts the save replacement',()=>{
 const previous=JSON.stringify(fresh());const storage={getItem:()=>previous,setItem:()=>{throw Error('storage unavailable');}};
 assert.throws(()=>persistSave(storage,'active',fresh()),/storage unavailable/);
 const s=fresh();s.flags.flag_region_resolution_nirwasita='ADI_JOINS';assert.equal(validSave(s),false);
});
test('ending boundary matrix, branch conjunction, and committed ending preservation',()=>{
 const s=fresh();chooseAdi(s,'WAITED');Object.assign(s.flags,{flag_kd_resolution_path:'MEANING',flag_wn_resolution_path:'INFORMED',flag_kl_resolution_path:'REVEALED',flag_jl_unity_choice:'SCATTERED',counter_warisan_total:30});
 s.endingInputs={smaranaOffer:'DECLINED',himagiriResolution:'WITNESSED'};
 for(const [n,p,wait,result] of [[74,100,true,'KABUT_KEMBALI'],[75,79,true,'KABUT_KEMBALI'],[75,80,false,'YANG_MENGINGAT'],[94,100,true,'YANG_MENGINGAT'],[95,99,true,'YANG_MENGINGAT'],[95,100,false,'YANG_MENGINGAT'],[95,100,true,'LARAS']]){
  s.roster=Array.from({length:n},(_,i)=>i+1);assert.equal(ending(s,p,wait),result);
 }
 s.finalEnding='LARAS';s.roster=[];assert.equal(ending(s,0,false),'LARAS');
});
test('presentation migration and policies preserve numerical state',()=>{
 const old=legacy();old.flags.flag_hud_total_disabled=true;const s=migrateSave(old);assert.equal(s.presentationMode,'NO_HUD');
 assert.deepEqual(presentationPolicy(s.presentationMode),{dialogText:false,battleText:false,hud:false});
 assert.deepEqual(presentationPolicy('ICON_BATTLE'),{dialogText:false,battleText:false,hud:true});assert.equal(s.kepeng,120);
});
