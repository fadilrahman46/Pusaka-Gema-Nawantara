import test from 'node:test';import assert from 'node:assert/strict';
import {fresh,migrateSave} from '../src/state.js';
import {awardTrainingRewards} from '../src/economy.js';
import {trainMandala} from '../src/skills.js';
import {buyFragment,refuseVendor} from '../src/song.js';
import {questGuide} from '../src/journal.js';
const victory=()=>({training:true,done:true,outcome:'win',kind:'mist'});
test('broke M05 save recovers both vendor prices through renewable training',()=>{
 for(const refused of [false,true]){
  const s=fresh();s.chapter=4;s.roster=[1];s.kepeng=20;
  assert.ok(trainMandala(s,1));assert.equal(s.kepeng,0);if(refused)refuseVendor(s);
  assert.equal(buyFragment(s),false);
  for(let i=0;i<(refused?3:2);i++)assert.ok(awardTrainingRewards(s,victory()));
  assert.ok(buyFragment(s));assert.equal(s.kepeng,0);assert.ok(migrateSave(s).fragments.includes('vendor'));
 }
});
test('training reward cannot repeat or leak from guest, challenge, loss, boss or unfinished battle',()=>{
 const s=fresh();for(const extra of [{guest:9},{challenge:{key:'recruit3'}},{kind:'mandalaBoss'},{outcome:'lose'},{done:false}]){
  const before=JSON.stringify(s);assert.equal(awardTrainingRewards(s,{...victory(),...extra}),false);assert.equal(JSON.stringify(s),before);
 }
 const b=victory();assert.ok(awardTrainingRewards(s,b));const before=JSON.stringify(s);assert.equal(awardTrainingRewards(s,b),false);assert.equal(JSON.stringify(s),before);
});
test('level 60 companion does not multiply level 1 character XP',()=>{
 const s=fresh();s.roster=[9];s.party=[0,9];s.progression[9]={level:60,xp:0};
 awardTrainingRewards(s,victory());assert.equal(s.progression[0].level,2);assert.equal(s.progression[0].xp,0);assert.equal(s.progression[9].level,60);
});
test('journal follows song, recovery, pending Adi, permanent loss and saved counters without mutating state',()=>{
 const s=fresh();s.chapter=4;s.kepeng=0;assert.match(questGuide(s,'NR-M05').step,/latihan party/);
 s.fragments=['vendor','elder','sanra'];assert.match(questGuide(s,'NR-M05').step,/Kembali ke Ranaya/);
 s.flags.flag_ranaya_song_stage=4;assert.match(questGuide(s,'NR-M05').step,/4\/4/);
 s.chapter=5;s.adi={answers:[],pending:'WAITED'};assert.match(questGuide(s,'NR-M06').step,/jalur Adi/);
 s.burials=[0,1];assert.match(questGuide(s,'NR-H03').step,/2\/3/);
 s.flags.flag_misi_gagal_permanent_playthrough=true;assert.equal(questGuide(s,'NR-H03').status,'Gagal permanen');
 const before=JSON.stringify(s);for(const type of ['M','S','H'])for(let i=1;i<=(type==='M'?6:type==='S'?4:3);i++){const g=questGuide(s,`NR-${type}0${i}`);assert.ok(g.step&&g.location&&g.status);}assert.equal(JSON.stringify(s),before);
});
