import {awardQuestSloka} from './skills.js';
import {grantXP,levelOf} from './progression.js';
export const TRAINING_KEPENG=10;
// Renewable recovery for saves that spent their last Kepeng at Mandala.
export function awardTrainingRewards(s,b){
 if(!b.training||b.guest||b.challenge||b.kind==='mandalaBoss'||b.outcome!=='win'||!b.done||b.sukmaClaimed)return false;
 if(!Number.isSafeInteger(s.kepeng+TRAINING_KEPENG))return false;
 if(!awardTrainingSukma(s,b))return false;
 s.kepeng+=TRAINING_KEPENG;
 for(const id of new Set(s.party))grantXP(s,[id],Math.max(100,50*levelOf(s,id)));
 return true;
}
// Accepted preview baseline, 2026-09-22. Separate from narrative collection fragments.
export const QUEST_SUKMA=Object.fromEntries([...Array.from({length:6},(_,i)=>['NR-M0'+(i+1),2]),...Array.from({length:4},(_,i)=>['NR-S0'+(i+1),1]),...Array.from({length:3},(_,i)=>['NR-H0'+(i+1),1])]);
export function validEconomy(s){
 if(s.sukma===undefined&&s.sukmaClaims===undefined)return true;
 return Number.isSafeInteger(s.sukma)&&s.sukma>=0&&Array.isArray(s.sukmaClaims)&&s.sukmaClaims.length<=13&&new Set(s.sukmaClaims).size===s.sukmaClaims.length&&s.sukmaClaims.every(id=>Object.hasOwn(QUEST_SUKMA,id));
}
export function migrateEconomy(s){
 if(s.sukma!==undefined)return;
 s.sukma=0;s.sukmaClaims=Object.keys(QUEST_SUKMA).filter(id=>id.startsWith('NR-M')?Number(id.slice(-2))<=s.chapter:id==='NR-S03'?s.flags.flag_adi_resolution_path!==null:id==='NR-H03'?s.burials.length===3&&!s.flags.flag_misi_gagal_permanent_playthrough:s.flags['flag_'+id.toLowerCase().replace('-','_')+'_complete']===true);
}
function add(s,amount){const next=(s.sukma||0)+amount;if(!Number.isSafeInteger(next))throw Error('Saldo Serpihan Sukma melewati batas.');s.sukma=next;s.sukmaClaims??=[];}
export function awardQuestSukma(s,id){if(!Object.hasOwn(QUEST_SUKMA,id)||s.sukmaClaims?.includes(id))return false;add(s,QUEST_SUKMA[id]);s.sukmaClaims.push(id);awardQuestSloka(s,id);return true;}
export function awardTrainingSukma(s,b){if(!b.training||b.guest||b.outcome!=='win'||!b.done||b.sukmaClaimed)return false;add(s,1);b.sukmaClaimed=true;return true;}
