import {CHALLENGES,UNIQUE_ITEMS,challengeFlag} from '../data/challenges.js';
import {createBattle} from './combat.js';
import {ensureProgression,levelOf} from './progression.js';
export {CHALLENGES,UNIQUE_ITEMS,challengeFlag};
export function challengeError(s,key){
 const c=CHALLENGES[key];if(!c)return 'Tantangan tidak dikenal.';
 if(s.chapter<5)return 'Selesaikan M05 terlebih dahulu.';
 if(s.flags[challengeFlag(key)])return 'Tantangan sudah selesai.';
 if(c.type==='recruit')return s.roster.includes(c.id)?'Karakter sudah direkrut.':null;
 if(!s.roster.includes(c.id))return 'Rekrut karakter ini dahulu.';
 if(levelOf(s,c.id)<UNIQUE_ITEMS[c.id].level)return 'Memerlukan level '+UNIQUE_ITEMS[c.id].level+'.';
 return null;
}
export function createChallenge(s,key){
 const error=challengeError(s,key);if(error)throw Error(error);
 const c=CHALLENGES[key],borrowed=c.type==='recruit';
 const party=borrowed?(c.id===4?[4,0,1,2]:[c.id,0]):[c.id,...s.party.filter(id=>id!==c.id)].slice(0,4);
 if(party.length===1)party.push(0);
 const setup=structuredClone(s);
 if(borrowed){setup.progression=Object.fromEntries(party.map(id=>[id,{level:20,xp:0}]));setup.equipment={};setup.flags={};setup.sloka=undefined;}
 const b=createBattle('challenge',party,20260922,setup);
 b.challenge={key,id:c.id,type:c.type,achieved:false,protectedRounds:0};b.name=c.title;
 if(c.id===3){const ally=b.allies.find(a=>a.characterId!==3);ally.hp=Math.floor(ally.max*.4);}
 return b;
}
export function finishChallenge(s,b){
 const c=CHALLENGES[b.challenge?.key];if(!c||b.kind!=='challenge'||!b.done||b.outcome!=='win'||!b.challenge.achieved||challengeError(s,b.challenge.key))return false;
 const key=b.challenge.key;s.flags[challengeFlag(key)]=true;
 if(c.type==='recruit'){
  s.roster.push(c.id);s.flags['flag_'+({3:'sanra_ranu',4:'watu_palindra',7:'tobelang'})[c.id]+'_recruited']=true;
  if(s.party.length<4)s.party.push(c.id);ensureProgression(s);
 }else {const name=UNIQUE_ITEMS[c.id].name;if(!s.items.includes(name))s.items.push(name);}
 s.decisionProvenance[key]={eventId:key,sourceRevision:'preview-challenges-0.9'};return true;
}
export function validChallenges(s){
 return Object.entries(CHALLENGES).every(([key,c])=>{
  const value=s.flags[challengeFlag(key)];return value===undefined||value===false||value===true&&s.chapter>=5&&s.roster.includes(c.id)&&(c.type==='recruit'||s.items.includes(UNIQUE_ITEMS[c.id].name)&&levelOf(s,c.id)>=UNIQUE_ITEMS[c.id].level);
 });
}
export function challengeProgress(b){const c=b.challenge;if(!c)return '';return c.key==='recruit4'?'Perlindungan '+c.protectedRounds+'/3 ronde':c.achieved?'Syarat terpenuhi · selesaikan battle':'Syarat belum terpenuhi';}
