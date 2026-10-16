import {awardQuestSukma} from './economy.js';
import {PLAYABLE,ensureProgression} from './progression.js';
export {SAVE_VERSION,fresh,validSave,connectionScore,ending} from './state.js';
export const elements=['Apah','Teja','Bayu','Pertiwi','Akasa'];
export function damage(atk,def,element='Bayu',target='Bayu',crit=0,critDamage=50,roll=1){
 const a=elements.indexOf(element),b=elements.indexOf(target); const mult=(a+1)%5===b?1.3:(b+1)%5===a?.7:1;
 return Math.max(1,Math.floor(atk*atk/(atk+def*1.5)*mult*(roll<crit/100?1+critDamage/100:1)));
}
export function levelStat(base,level,anchors={}){if(!Number.isInteger(level)||level<1||level>60)throw Error('Level harus 1–60.');return anchors[level]??Math.floor(base*Math.pow(1.02,level-1));}
export function recruit(s,id,flag){if(!s.roster.includes(id))s.roster.push(id);if(s.party&&s.party.length<4&&PLAYABLE.includes(id)&&!s.party.includes(id))s.party.push(id);if(flag)s.flags[flag]=true;ensureProgression(s);}
export function reward(s,item){if(!s.items.includes(item))s.items.push(item);}
export function finish(s,n){if(n!==s.chapter+1)return false;s.chapter=n;s.flags[`flag_nr_m0${n}_complete`]=true;return true;}
export function burial(s,id,dig,confirmed=false){if(s.flags.flag_misi_gagal_permanent_playthrough||s.burials.includes(id))return false;if(dig){if(!confirmed)return false;s.flags.flag_misi_gagal_permanent_playthrough=true;}else{s.burials.push(id);s.flags.counter_dig_temptation_resisted=s.burials.length;if(s.burials.length===3){recruit(s,85,'flag_saras_pertiwi_recruited');reward(s,'Jimat Yang Tertanam Selamat');awardQuestSukma(s,'NR-H03');}}return true;}
export class IdleCompass{constructor(){this.reset();}reset(){this.idle=0;this.next=5;this.angle=0;}tick(dt,moving,protectedItem=false,frequency=1){if(moving||protectedItem){this.reset();return false;}this.idle+=dt;if(this.idle>=this.next){this.next+=3/frequency;this.angle=(Math.random()<.5?-1:1)*(15+Math.random()*30);return true;}return false;}}
