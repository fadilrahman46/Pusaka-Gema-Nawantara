import {validWorld} from './region-world.js';
import {validLore,loreLost} from './lore.js';
import {emptySloka,validSloka,migrateSloka} from './skills.js';
import {validChallenges} from './challenges.js';
import {PLAYABLE,ensureProgression,validProgression,equip} from './progression.js';
import {validAdi} from './adi.js';
import {updateSong} from './song.js';
import {validEconomy,migrateEconomy,awardQuestSukma} from './economy.js';
export const SAVE_VERSION = 2;
export const DESIGN_REVISION = 'naw-2026-09-18.1';
export const PRESENTATION_MODES = ['NORMAL', 'GESTURE', 'ICON_BATTLE', 'NO_HUD'];
const object = x => x !== null && typeof x === 'object' && !Array.isArray(x);
const unique = a => new Set(a).size === a.length;
const point = p => object(p) && Number.isFinite(p.x) && Number.isFinite(p.z) && Math.abs(p.x)<100 && p.z>=-200 && p.z<=30;
const nullable = (v, choices) => v===null || choices.includes(v);
function safeTree(v, depth=0) {
 if(depth>20)return false;
 if(v===null || typeof v==='string' || typeof v==='boolean')return true;
 if(typeof v==='number')return Number.isFinite(v);
 if(Array.isArray(v))return v.length<=10000 && v.every(x=>safeTree(x,depth+1));
 return object(v) && Object.entries(v).every(([k,x])=>!['__proto__','constructor','prototype'].includes(k)&&safeTree(x,depth+1));
}
export function fresh() {
 return {version:SAVE_VERSION,designRevision:DESIGN_REVISION,chapter:0,position:{x:0,z:7},checkpoint:{x:0,z:7},
 flags:{flag_region_resolution_nirwasita:'NEUTRAL',flag_adi_resolution_path:null,flag_ranaya_song_stage:0},
 sloka:emptySloka(),roster:[],party:[0],progression:{0:{level:1,xp:0}},equipment:{},lostEntries:[],items:[],kepeng:120,sukma:0,sukmaClaims:[],visited:[0],burials:[],fragments:[],collections:{encyclopedia:[],warisan:[],serpihan:[]},
 options:{sound:true,accessible:false,reducedMotion:false},elapsed:0,
 endingInputs:{smaranaOffer:null,himagiriResolution:null},decisionProvenance:{},migrationIssues:[],
 presentationMode:'NORMAL',finalEnding:null};
}
function baseValid(s) {
 return object(s)&&safeTree(s)&&Number.isInteger(s.chapter)&&s.chapter>=0&&s.chapter<=6&&point(s.position)&&object(s.flags)&&
 Array.isArray(s.roster)&&unique(s.roster)&&s.roster.every(x=>Number.isInteger(x)&&x>=1&&x<=100)&&
 Array.isArray(s.items)&&unique(s.items)&&s.items.every(x=>typeof x==='string')&&
 Array.isArray(s.visited)&&unique(s.visited)&&s.visited.every(x=>Number.isInteger(x)&&x>=0&&x<7)&&
 Array.isArray(s.fragments)&&unique(s.fragments)&&s.fragments.every(x=>['sanra','vendor','elder'].includes(x))&&
 Array.isArray(s.burials)&&unique(s.burials)&&s.burials.every(x=>Number.isInteger(x)&&x>=0&&x<3)&&
 Number.isFinite(s.kepeng)&&s.kepeng>=0&&object(s.collections)&&['encyclopedia','warisan','serpihan'].every(k=>Array.isArray(s.collections[k]))&&
 object(s.options)&&(s.options.graphics===undefined||['low','standard'].includes(s.options.graphics))&&['sound','accessible','reducedMotion'].every(k=>typeof s.options[k]==='boolean')&&Number.isFinite(s.elapsed)&&s.elapsed>=0&&
 Object.entries(s.flags).every(([k,v])=>{
  if(k.startsWith('counter_'))return Number.isInteger(v)&&v>=0;
  if(k.startsWith('array_'))return Array.isArray(v);
  if(k.endsWith('_complete')||k.endsWith('_recruited')||k.endsWith('_disabled')||k==='flag_misi_gagal_permanent_playthrough')return typeof v==='boolean';
  if(k==='flag_ranaya_song_stage')return Number.isInteger(v)&&v>=0&&v<=4;
  return true;
 });
}
function validExtras(s){
 if(!validEconomy(s)||!validChallenges(s)||!validSloka(s)||!validLore(s))return false;
 if(!validAdi(s))return false;
 for(const key of ['flag_vendor_refused','flag_ranaya_song_reunited'])if(s.flags[key]!==undefined&&typeof s.flags[key]!=='boolean')return false;
 if(s.flags.counter_adi_landmarks!==undefined&&(!Number.isInteger(s.flags.counter_adi_landmarks)||s.flags.counter_adi_landmarks<0||s.flags.counter_adi_landmarks>3))return false;
 if(s.flags.counter_elder_failures!==undefined&&(!Number.isInteger(s.flags.counter_elder_failures)||s.flags.counter_elder_failures<0||s.flags.counter_elder_failures>3))return false;
 if(s.lostEntries!==undefined&&(!Array.isArray(s.lostEntries)||!s.lostEntries.every(x=>object(x)&&typeof x.entry==='string'&&x.source==='NR-S04'&&x.status==='LOST'&&!s.collections.encyclopedia.includes(x.entry))||!unique(s.lostEntries.map(x=>x.entry))))return false;
 const f=s.flags;if(f.array_warehouse_attempts!==undefined&&(!Array.isArray(f.array_warehouse_attempts)||f.array_warehouse_attempts.length>5||!f.array_warehouse_attempts.every(x=>object(x)&&typeof x.owner==='string'&&typeof x.correct==='boolean')))return false;
 if(f.array_nggarindu_fragments!==undefined&&(!Array.isArray(f.array_nggarindu_fragments)||!unique(f.array_nggarindu_fragments)||f.array_nggarindu_fragments.some(x=>!Number.isInteger(x)||x<0||x>4)))return false;
 if((f.counter_restricted_battles||0)>3)return false;return true;
}
export function validSave(s) {
 return !!((s.party===undefined||(Array.isArray(s.party)&&s.party.length>=1&&s.party.length<=4&&unique(s.party)&&s.party.every(id=>PLAYABLE.includes(id)&&(id===0||s.roster.includes(id)))))&&baseValid(s)&&validWorld(s)&&validProgression(s)&&validExtras(s)&&s.version===SAVE_VERSION&&s.designRevision===DESIGN_REVISION&&point(s.checkpoint)&&
 nullable(s.flags.flag_adi_resolution_path,['WAITED','FORCED_PAST'])&&['NEUTRAL','ADI_JOINS'].includes(s.flags.flag_region_resolution_nirwasita)&&
 s.flags.flag_region_resolution_nirwasita===(s.flags.flag_adi_resolution_path==='WAITED'?'ADI_JOINS':'NEUTRAL')&&
 object(s.endingInputs)&&nullable(s.endingInputs.smaranaOffer,['ACCEPTED','DECLINED'])&&nullable(s.endingInputs.himagiriResolution,['WITNESSED','COMBAT'])&&
 object(s.decisionProvenance)&&Array.isArray(s.migrationIssues)&&s.migrationIssues.every(x=>typeof x==='string')&&
 PRESENTATION_MODES.includes(s.presentationMode)&&nullable(s.finalEnding,['KABUT_KEMBALI','YANG_MENGINGAT','LARAS']));
}
export function migrateSave(input) {
 if(!validWorld(input)||!baseValid(input)||!validProgression(input)||!validExtras(input)||![1,SAVE_VERSION].includes(input.version))throw Error('Struktur atau versi save tidak didukung.');
 const s=JSON.parse(JSON.stringify(input));
 if(s.chapter===4&&s.flags.flag_ranaya_song_stage<4)updateSong(s);
 const legacyProgress=s.progression===undefined;
 ensureProgression(s);s.lostEntries??=[];
 // H03's item reward was absent in 0.3; recover it without replaying the permanent choice.
 if(s.burials.length===3&&!s.flags.flag_misi_gagal_permanent_playthrough&&s.roster.includes(85)&&!s.items.includes('Jimat Yang Tertanam Selamat'))s.items.push('Jimat Yang Tertanam Selamat');
 if(legacyProgress){for(let i=1;i<=s.chapter;i++){const entry='NR-M0'+i;if(!s.collections.encyclopedia.includes(entry)&&!loreLost(s,entry))s.collections.encyclopedia.push(entry);}}

 if(s.party===undefined)s.party=[0,...s.roster.filter(id=>PLAYABLE.includes(id)).slice(0,3)];
 if(legacyProgress){const best=['Kalung Jalan Pulang','Kompas Karat','Penunjuk Basah'].find(x=>s.items.includes(x));if(best)equip(s,s.party[0],best);}
 if(s.version===SAVE_VERSION){if(!validSave(s))throw Error('Save versi 2 tidak valid.');migrateEconomy(s);migrateSloka(s);return s;}
 const f=s.flags, issues=[];
 const oldPath=f.flag_adi_resolution_path, oldResolution=f.flag_region_resolution_nirwasita;
 const allowedPath=['UNSET','WAITED','FORCED_PAST',null,undefined];
 if(!allowedPath.includes(oldPath)||!['NEUTRAL','ADI_JOINS','WAITED','FORCED_PAST',undefined].includes(oldResolution))throw Error('Enum Adi tidak valid.');
 const legacyPath=oldResolution==='ADI_JOINS'||oldResolution==='WAITED'?'WAITED':oldResolution==='FORCED_PAST'?'FORCED_PAST':null;
 const explicitPath=['WAITED','FORCED_PAST'].includes(oldPath)?oldPath:null;
 if(explicitPath&&legacyPath&&explicitPath!==legacyPath)issues.push('ADI_CONFLICT');
 if(explicitPath==='WAITED'&&oldResolution==='NEUTRAL')issues.push('ADI_CONFLICT');
 f.flag_adi_resolution_path=explicitPath||legacyPath;
 f.flag_region_resolution_nirwasita=f.flag_adi_resolution_path==='WAITED'?'ADI_JOINS':'NEUTRAL';
 s.version=SAVE_VERSION;s.designRevision=DESIGN_REVISION;s.checkpoint={...s.position};
 s.endingInputs={smaranaOffer:f.ext_sm_offer==='REJECTED'?'DECLINED':f.ext_sm_offer==='ACCEPTED'?'ACCEPTED':null,
 himagiriResolution:f.ext_hm_resolution==='WITNESS'?'WITNESSED':f.ext_hm_resolution==='COMBAT'?'COMBAT':null};
 s.decisionProvenance={};
 for(const [field,value] of Object.entries(s.endingInputs))if(value)s.decisionProvenance[field]={questId:field==='smaranaOffer'?'SM-M06':'HM-M04',eventId:'legacy-explicit-'+field,sourceRevision:'prototype-0.1'};
 if(f.flag_sm_m06_complete&&!s.endingInputs.smaranaOffer)issues.push('SMARANA_UNKNOWN');
 if(f.flag_hm_m04_complete&&!s.endingInputs.himagiriResolution)issues.push('HIMAGIRI_UNKNOWN');
 s.migrationIssues=[...new Set(issues)];
 s.presentationMode=f.flag_hud_total_disabled?'NO_HUD':f.flag_battle_ui_teks_disabled?'ICON_BATTLE':f.flag_dialog_teks_disabled?'GESTURE':'NORMAL';
 s.finalEnding=null;
 if(f.flag_aw_m05_complete){
  if(!['KABUT_KEMBALI','YANG_MENGINGAT','LARAS'].includes(f.flag_ending_global))throw Error('Ending lama tidak lengkap.');
  s.finalEnding=f.flag_ending_global;
 }
 if(!validSave(s))throw Error('Hasil migrasi tidak valid.');migrateEconomy(s);migrateSloka(s);return s;
}
export function readSave(storage,key) {
 const raw=storage.getItem(key);if(raw===null)return null;
 return migrateSave(JSON.parse(raw));
}
export function persistSave(storage,key,state) {
 if(!validSave(state))throw Error('State tidak valid; save aktif tidak ditimpa.');
 const previous=storage.getItem(key);
 if(previous!==null){
  // Preserve legacy originals once; never overwrite them with an autosave.
  let old=null;try{const parsed=JSON.parse(previous);migrateSave(parsed);old=parsed;}catch{}
  // Storage failures propagate: do not replace the active save if backup failed.
  if(old){
   if(old.version===1&&storage.getItem(key+'-legacy-backup')===null)storage.setItem(key+'-legacy-backup',previous);
   if(old.version===2&&old.progression===undefined&&storage.getItem(key+'-pre-progression-backup')===null)storage.setItem(key+'-pre-progression-backup',previous);
   if(old.sloka===undefined&&storage.getItem(key+'-pre-sloka-backup')===null)storage.setItem(key+'-pre-sloka-backup',previous);
   if(old.sukma===undefined&&storage.getItem(key+'-pre-economy-backup')===null)storage.setItem(key+'-pre-economy-backup',previous);
   storage.setItem(key+'-backup',previous);
  }else if(storage.getItem(key+'-invalid-backup')===null)storage.setItem(key+'-invalid-backup',previous);
 }
 storage.setItem(key,JSON.stringify(state));
}
export function chooseAdi(s,path) {
 if(!['WAITED','FORCED_PAST'].includes(path))throw Error('Pilihan Adi tidak valid.');
 if(s.flags.flag_adi_resolution_path!==null)return false;
 s.flags.flag_adi_resolution_path=path;s.flags.flag_region_resolution_nirwasita=path==='WAITED'?'ADI_JOINS':'NEUTRAL';
 s.decisionProvenance.adi={questId:'NR-S03',eventId:'nr-s03-resolution',sourceRevision:DESIGN_REVISION};awardQuestSukma(s,'NR-S03');return true;
}
export function connectionScore(s) {
 const f=s.flags,e=s.endingInputs;
 return (f.flag_adi_resolution_path==='WAITED'?2:0)+(f.flag_kd_resolution_path==='MEANING'?2:0)+(e.smaranaOffer==='DECLINED'?2:0)+
 (f.flag_wn_resolution_path==='INFORMED'?2:0)+(f.flag_kl_resolution_path==='REVEALED'?2:0)+(e.himagiriResolution==='WITNESSED'?2:0)+
 (f.counter_warisan_total>=30?2:f.counter_warisan_total>=20?1:0)+(f.flag_jl_unity_choice==='SCATTERED'?2:0);
}
export function ending(s,percent,waited=false) {
 if(s.finalEnding)return s.finalEnding;
 if(!Number.isFinite(percent)||percent<0||percent>100)throw Error('Persentase Ensiklopedia tidak valid.');
 if(s.migrationIssues.length||(s.flags.flag_sm_m06_complete&&!s.endingInputs.smaranaOffer)||(s.flags.flag_hm_m04_complete&&!s.endingInputs.himagiriResolution))throw Error('Input ending belum lengkap; pulihkan pilihan terlebih dahulu.');
 const cs=connectionScore(s),n=new Set(s.roster).size;
 return cs>=14&&n>=95&&percent===100&&waited?'LARAS':cs>=10&&n>=75&&percent>=80?'YANG_MENGINGAT':'KABUT_KEMBALI';
}
export function presentationPolicy(mode) {
 const level=PRESENTATION_MODES.indexOf(mode);if(level<0)throw Error('Mode UI tidak valid.');
 return {dialogText:level<1,battleText:level<2,hud:level<3};
}
