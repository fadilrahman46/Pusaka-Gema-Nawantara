import assert from 'node:assert/strict';import {writeFileSync,readFileSync} from 'node:fs';import {createHash} from 'node:crypto';
import {fresh} from '../src/state.js';import {CAPS,awardQuestSloka} from '../src/skills.js';import {awardTrainingRewards} from '../src/economy.js';import {characterStats} from '../src/progression.js';
const s=fresh();s.roster=Object.keys(CAPS).map(Number);s.chapter=6;
for(const type of ['M','S','H'])for(let i=1;i<=(type==='M'?6:type==='S'?4:3);i++)awardQuestSloka(s,`NR-${type}0${i}`);
const rows=Object.entries(CAPS).map(([id,caps])=>{
 const sum=n=>n*(n+1)-2,umum=sum(caps.strike)+sum(caps.skill),misi=caps.skill-1,boss=2*(caps.ultimate-1);
 assert.ok((s.sloka.stock[id]?.misi||0)>=misi,`Misi availability for ${id}`);
 return {id:Number(id),name:characterStats(Number(id)).name,caps,umum,misi,boss,activeMinutesIfNoMandala:umum,mandalaKepengIfNoActiveSloka:Math.ceil(umum/3)*20,trainingWinsToFundFromZero:Math.ceil(umum/3)*2};
});
const solo=fresh();let wins=0,level40;
while(solo.progression[0].level<60&&wins<1000){awardTrainingRewards(solo,{training:true,done:true,outcome:'win',kind:'mist'});wins++;if(!level40&&solo.progression[0].level>=40)level40=wins;}
assert.ok(wins<1000);
writeFileSync('qa/balance-011.json',JSON.stringify({passed:true,buildSha256:createHash('sha256').update(readFileSync('dist/Nawantara-3D.html')).digest('hex'),model:'Analytical baseline; excludes quest XP and simultaneous active Sloka. Does not measure fun or battle duration.',vendorRecoveryWins:{normal:2,refused:3},level40TrainingWins:level40,level60TrainingWins:wins,rows},null,2));
console.log(`Balance audit: all 11 special caps reachable with quest Misi; training-only L40 ${level40} wins, L60 ${wins} wins.`);
