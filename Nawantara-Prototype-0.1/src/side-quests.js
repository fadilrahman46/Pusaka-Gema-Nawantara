import {awardQuestSukma} from './economy.js';
import {ensureProgression,grantXP,questDone} from './progression.js';
export const SIDE_QUESTS={
 'NR-S01':{chapter:2,character:5,item:'Jimat Gudang Barang Tertinggal'},
 'NR-S02':{chapter:3,character:6,item:'Jimat Empat Ratus Bait'},
 'NR-S04':{chapter:4,character:8,item:'Pusaka Harga Perlindungan'},
 'NR-H01':{chapter:4},
 'NR-H02':{chapter:6,character:84,item:'Senjata Musuh yang Sebenarnya'}
};
export const WAREHOUSE=[['Sandal kecil','Lila'],['Peniti berukir R','Ranu'],['Kancing jas besar','Banyu'],['Kain beraroma daun','Sari'],['Gigi susu dalam kotak','Jati']];
export const BAITS=['Air','Batu','Daun','Akar','Jalan','Jembatan','Cahaya','Gerbang','Rumah','Pulang'];
export function sideAvailable(s,id){return !!SIDE_QUESTS[id]&&s.chapter>=SIDE_QUESTS[id].chapter&&(id!=='NR-H01'||s.flags.flag_ranaya_song_stage===4)&&!questDone(s,id);}
export function finishSide(s,id){
 if(!sideAvailable(s,id))return false;const q=SIDE_QUESTS[id];s.flags['flag_'+id.toLowerCase().replace('-','_')+'_complete']=true;
 if(q.character){if(!s.roster.includes(q.character))s.roster.push(q.character);const names={5:'lare_wengi',6:'kayuri_sindu',8:'nggarindu',84:'wira_senja'};s.flags['flag_'+names[q.character]+'_recruited']=true;if(s.party.length<4&&!s.party.includes(q.character))s.party.push(q.character);}
 if(q.item&&!s.items.includes(q.item))s.items.push(q.item);
 ensureProgression(s);grantXP(s,s.party,300);awardQuestSukma(s,id);s.decisionProvenance[id]={questId:id,eventId:'completed',sourceRevision:'naw-2026-09-18.1'};return true;
}
export function warehouseChoice(s,owner){
 const f=s.flags;if(!sideAvailable(s,'NR-S01')||f.ext_warehouse_pending||!WAREHOUSE.some(row=>row[1]===owner))return false;
 f.array_warehouse_attempts??=[];const i=f.array_warehouse_attempts.length;if(i>=5)return false;
 const correct=WAREHOUSE[i][1]===owner;f.array_warehouse_attempts.push({owner,correct});f.counter_gudang_correct_matches=f.array_warehouse_attempts.filter(x=>x.correct).length;
 f.ext_warehouse_pending=!correct;if(correct&&i===4)finishSide(s,'NR-S01');return true;
}
export function rememberBaits(s,sequence,tones){
 if(!sideAvailable(s,'NR-S02')||sequence.length!==10||sequence.some((v,i)=>v!==BAITS[i])||tones.length!==2||tones.some(x=>!['Perlindungan','Pengampunan','Keberanian','Kepasrahan'].includes(x)))return false;
 s.flags.array_memorized_baits=[...sequence];s.flags.array_kayuri_tones=[...tones];s.flags.flag_kayuri_dialogue_tone=tones.join(' / ');return true;
}
export function collectMemory(s,id){
 if(!sideAvailable(s,'NR-S04')||!Number.isInteger(id)||id<0||id>4)return false;s.flags.array_nggarindu_fragments??=[];if(s.flags.array_nggarindu_fragments.includes(id))return false;
 s.flags.array_nggarindu_fragments.push(id);s.flags.counter_nggarindu_fragments=s.flags.array_nggarindu_fragments.length;return true;
}
export function sacrificeEntry(s,entry){
 if(!sideAvailable(s,'NR-S04')||s.flags.counter_nggarindu_fragments!==5||s.flags.flag_ensiklopedia_sacrificed_nggarindu||!s.collections.encyclopedia.includes(entry))return false;
 s.collections.encyclopedia=s.collections.encyclopedia.filter(x=>x!==entry);s.lostEntries??=[];s.lostEntries.push({entry,source:'NR-S04',status:'LOST'});s.flags.flag_ensiklopedia_sacrificed_nggarindu=entry;return true;
}
export function solveMurals(s,order){
 if(!sideAvailable(s,'NR-H01')||order.join(',')!=='0,1,2,3,4')return false;s.flags.array_mural_order=[...order];s.flags.flag_rumah_ranaya_lama_unlocked=true;
 for(const id of ['NR-H01:kesepakatan','NR-H01:kabut','NR-H01:rumah'])if(!s.collections.encyclopedia.includes(id)&&!s.lostEntries?.some(x=>x.entry===id))s.collections.encyclopedia.push(id);
 return finishSide(s,'NR-H01');
}
export function sideEncounterAvailable(s,kind){
 if(kind==='warehouse')return sideAvailable(s,'NR-S01')&&s.flags.ext_warehouse_pending===true;
 if(kind==='poem')return sideAvailable(s,'NR-S02')&&s.flags.array_memorized_baits?.length===10;
 if(kind==='manifest')return sideAvailable(s,'NR-S04')&&s.party.length>=2&&!!s.flags.flag_ensiklopedia_sacrificed_nggarindu;
 if(kind==='youngRanaya')return questDone(s,'NR-H01')&&!s.flags.flag_sanra_ranu_buff_permanent;
 if(kind==='restricted')return sideAvailable(s,'NR-H02')&&(s.flags.counter_restricted_battles||0)<3;
 if(kind==='sunyi')return sideAvailable(s,'NR-H02')&&s.flags.counter_restricted_battles===3;
 return false;
}
export function resolveSideEncounter(s,b){
 if(b.outcome!=='win'||!sideEncounterAvailable(s,b.kind))return false;
 if(b.kind==='warehouse'){s.flags.ext_warehouse_pending=false;if(s.flags.array_warehouse_attempts.length===5)finishSide(s,'NR-S01');}
 if(b.kind==='poem')finishSide(s,'NR-S02');
 if(b.kind==='manifest')finishSide(s,'NR-S04');
 if(b.kind==='youngRanaya'){s.flags.flag_sanra_ranu_buff_permanent=true;grantXP(s,s.party,150);}
 if(b.kind==='restricted'){if(b.history.filter(h=>h.actor==='a:84'&&['strike','skill','ultimate'].includes(h.action)).length>1)return false;s.flags.counter_restricted_battles=(s.flags.counter_restricted_battles||0)+1;}
 if(b.kind==='sunyi')finishSide(s,'NR-H02');return true;
}
