import {LORE,NIRSMARA_ITEM} from '../data/lore.js';
export {LORE,NIRSMARA_ITEM};
export const loreLost=(s,id)=>s.nirsmaraSacrifice?.entry===id||s.lostEntries?.some(e=>e.entry===id);
export function loreUnlocked(s,id){const c=LORE[id];return !!c&&(c.zone!==undefined?s.visited.includes(c.zone):c.character?s.roster.includes(c.character):c.chapter?s.chapter>=c.chapter:s.flags.flag_nr_h01_complete===true);}
export function recordLore(s,id){if(!loreUnlocked(s,id)||loreLost(s,id)||s.collections.encyclopedia.includes(id))return false;s.collections.encyclopedia.push(id);return true;}
export const nirwasitaEntries=s=>[...new Set(s.collections.encyclopedia)].filter(id=>LORE[id]&&loreUnlocked(s,id)&&!loreLost(s,id));
export function nirsmaraItemError(s){if(s.nirsmaraSacrifice)return 'Titah sudah selesai; pengorbanan tidak dapat diulang.';if(s.chapter<6)return 'Selesaikan M06 dahulu.';if(!s.roster.includes(9))return 'Nirsmara belum direkrut.';if((s.progression?.[9]?.level||1)<55)return 'Nirsmara harus mencapai level 55.';if(nirwasitaEntries(s).length<15)return 'Kumpulkan 15 entri Nirwasita yang masih dimiliki.';return null;}
export function sacrificeNirsmara(s,id,confirmed=false,inBattle=false){
 if(!confirmed||inBattle||nirsmaraItemError(s)||!nirwasitaEntries(s).includes(id))return false;
 s.collections.encyclopedia=s.collections.encyclopedia.filter(entry=>entry!==id);
 s.nirsmaraSacrifice={entry:id,source:'TITAH-NIRSMARA',permanent:true};
 if(!s.items.includes(NIRSMARA_ITEM))s.items.push(NIRSMARA_ITEM);
 s.decisionProvenance.nirsmaraItem={eventId:'permanent-entry-sacrifice',sourceRevision:'preview-0.10'};return true;
}
export function validLore(s){
 const entries=s.collections.encyclopedia;if(!entries.every(x=>typeof x==='string')||new Set(entries).size!==entries.length)return false;
 const loss=s.nirsmaraSacrifice;if(loss===undefined)return true;
 return !!loss&&typeof loss==='object'&&!Array.isArray(loss)&&Object.keys(loss).length===3&&!!LORE[loss.entry]&&loss.source==='TITAH-NIRSMARA'&&loss.permanent===true&&!entries.includes(loss.entry)&&!s.lostEntries?.some(e=>e.entry===loss.entry)&&s.chapter===6&&s.roster.includes(9)&&(s.progression?.[9]?.level||1)>=55&&s.items.includes(NIRSMARA_ITEM);
}
