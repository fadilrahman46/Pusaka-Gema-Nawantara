import {awardQuestSukma} from './economy.js';
import {ensureProgression,grantXP,questDone} from './progression.js';
import {SIDE_QUESTS,sideAvailable} from './side-quests.js';
import {adiUnresolved} from './adi.js';
import {receiveFragment} from './song.js';
// Executable subset of QUEST_SCRIPT_R1_Nirwasita.md; remaining quests stay unavailable.
export const MAIN_QUESTS = [
 {id:'NR-M01',event:'tutorial',requires:[],item:'Penunjuk Basah'},
 {id:'NR-M02',event:'lampah',requires:['NR-M01'],character:1,flag:'flag_lampah_sinaru_recruited'},
 {id:'NR-M03',event:'tandaraga',requires:['NR-M02'],character:2,flag:'flag_tandaraga_recruited',item:'Tongkat Perantau'},
 {id:'NR-M04',event:'mist',requires:['NR-M03'],item:'Kompas Karat'},
 {id:'NR-M05',event:'tower',requires:['NR-M04'],item:'Lentera Nenek Ranaya'},
 {id:'NR-M06',event:'nirsmara',requires:['NR-M05'],character:9,flag:'flag_nirsmara_recruited',item:'Peta yang Tidak Pernah Selesai'}
];
const completed=(s,id)=>Number(id.slice(-2))<=s.chapter;
export function questStatus(s,id){
 const q=MAIN_QUESTS.find(q=>q.id===id);
 if(q)return completed(s,id)?'Selesai':q.requires.every(id=>completed(s,id))?'Aktif':'Terkunci';
 if(id==='NR-S03')return s.flags.flag_adi_resolution_path!==null?'Selesai':s.chapter>=6?'Terlewat':s.chapter>=4?'Aktif':'Terkunci';
 if(id==='NR-H03')return s.flags.flag_misi_gagal_permanent_playthrough?'Gagal permanen':s.burials.length===3?'Selesai':s.chapter>=4?'Aktif':'Terkunci';
 if(SIDE_QUESTS[id])return questDone(s,id)?'Selesai':sideAvailable(s,id)?'Aktif':'Terkunci';
 return 'Belum diimplementasi';
}
export function encounterAvailable(s,event){
 const q=MAIN_QUESTS.find(q=>q.event===event);
 if(!q||questStatus(s,q.id)!=='Aktif')return false;
 if(event==='lampah')return s.flags.flag_ranaya_song_stage>=1;
 if(event==='mist')return s.flags.ext_adi_puzzle===true;
 if(event==='tower')return s.fragments.length===3&&s.flags.flag_ranaya_song_stage===4;
 if(event==='nirsmara')return !adiUnresolved(s);
 return true;
}
export function elderAttempt(s,correct=false){
 if(s.chapter!==4||s.fragments.includes('elder'))return false;
 if(!correct)s.flags.counter_elder_failures=Math.min(3,(s.flags.counter_elder_failures||0)+1);
 if(correct||s.flags.counter_elder_failures===3)receiveFragment(s,'elder');
 return true;
}
export function completeEncounter(s,event){
 if(!encounterAvailable(s,event))return false;
 const q=MAIN_QUESTS.find(q=>q.event===event);
 if(q.item&&!s.items.includes(q.item))s.items.push(q.item);
 if(q.character){if(!s.roster.includes(q.character))s.roster.push(q.character);s.flags[q.flag]=true;if(s.party&&s.party.length<4&&!s.party.includes(q.character))s.party.push(q.character);}
 if(event==='mist'){s.flags.flag_adi_met=true;s.flags.flag_hud_compass_disabled=false;}
 if(event==='tower')s.flags.ext_lantern_origin=Math.max(0,Math.min(6,Math.round(-s.position.z/30)));
 if(event==='nirsmara'&&s.flags.flag_ranaya_song_stage===4){if(!s.items.includes('Kalung Jalan Pulang'))s.items.push('Kalung Jalan Pulang');s.flags.flag_kalung_jalan_pulang_obtained=true;}
 s.chapter=Number(q.id.slice(-2));s.flags['flag_nr_m0'+s.chapter+'_complete']=true;s.kepeng+=40;
 if(!s.collections.encyclopedia.includes(q.id))s.collections.encyclopedia.push(q.id);
 ensureProgression(s);grantXP(s,s.party,350);awardQuestSukma(s,q.id);
 s.decisionProvenance[q.id]={questId:q.id,eventId:event+'-resolved',sourceRevision:'naw-2026-09-18.1'};
 return true;
}
