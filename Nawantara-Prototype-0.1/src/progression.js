import {NIRSMARA_ITEM} from '../data/lore.js';
import {UNIQUE_ITEMS,challengeFlag} from '../data/challenges.js';
import registry from '../data/nirwasita-stats.js';
import awakenData from '../data/awaken.js';
export const passiveReady=id=>[4,5,6,7,8,9,84,85].includes(id);
export const AWAKEN_COST={Common:10,Uncommon:15,Rare:20,'Super Rare':25,'Ultra Rare':30,Legendary:50};
export const awakenCost=id=>AWAKEN_COST[registry[id]?.rarity]??null;
export function awakenError(s,id,inBattle=false){if(inBattle)return 'Awaken hanya di luar battle.';if(!s.roster.includes(id)||!awakenData[id])return 'Karakter belum dimiliki atau tidak mendukung Awaken.';if(levelOf(s,id)<40)return 'Memerlukan level 40.';if(s.progression[id]?.awakened)return 'Awaken sudah aktif.';if((s.sukma||0)<awakenCost(id))return 'Kurang '+(awakenCost(id)-(s.sukma||0))+' Serpihan Sukma.';return null;}
export function awaken(s,id,inBattle=false){if(awakenError(s,id,inBattle))return false;s.sukma-=awakenCost(id);s.progression[id].awakened=true;return true;}
export const PLAYABLE=[0,1,2,3,4,5,6,7,8,9,84,85];
export const SLOTS=['Senjata','Jimat','Pusaka','Kitab'];
// Source Item §1.1, §2, §3.2. Numeric gaps explicitly remain tuning baselines.
export const EQUIPMENT={
 [NIRSMARA_ITEM]:{slot:'Pusaka',character:9,level:55,nirsmara:true,description:'Pamungkas pertama per battle memulihkan 8% HP maks sekutu hidup; tidak memperpanjang durasi tak tersasar (baseline role heal).'},
 ...Object.fromEntries(Object.entries(UNIQUE_ITEMS).map(([id,item])=>[item.name,{...item,character:+id,challenge:'item'+id}])),
 'Penunjuk Basah':{slot:'Jimat',compass:.65,description:'Distorsi kompas ×0,65 ketika dipakai party aktif (baseline).'},
 'Kompas Karat':{slot:'Jimat',compass:.25,description:'Distorsi kompas ×0,25 ketika dipakai party aktif (baseline).'},
 'Kalung Jalan Pulang':{slot:'Jimat',compass:0,description:'Menetralkan distorsi kompas ketika dipakai party aktif.'},
 'Tongkat Perantau':{slot:'Senjata',description:'Damage +10% per ronde pemakai tanpa menyerang, maks +50% (baseline).'},
 'Lentera Nenek Ranaya':{slot:'Pusaka',description:'Menyimpan penanda jalur zona perolehan saat dikenakan; dapat dilihat di peta.'},
 'Peta yang Tidak Pernah Selesai':{slot:'Pusaka',description:'Memperlihatkan petunjuk jalur berikutnya saat awal jeda kompas.'},
 'Jimat Gudang Barang Tertinggal':{slot:'Jimat',character:5,level:25,quest:'NR-S01',description:'Pamungkas Lare Wengi: cooldown berkurang 1 giliran.'},
 'Jimat Empat Ratus Bait':{slot:'Jimat',character:6,level:35,quest:'NR-S02',description:'Pamungkas Kayuri Sindu: cooldown berkurang 1 giliran.'},
 'Pusaka Harga Perlindungan':{slot:'Pusaka',character:8,level:45,quest:'NR-S04',description:'Pamungkas Nggarindu: pengurangan damage 45% (dari 40%).'},
 'Senjata Musuh yang Sebenarnya':{slot:'Senjata',character:84,level:50,quest:'NR-H02',description:'Pamungkas Wira Senja: damage 285% (dari 270%).'},
 'Jimat Yang Tertanam Selamat':{slot:'Jimat',character:85,level:45,quest:'NR-H03',description:'Pamungkas Saras Pertiwi: heal 45% (dari 40%).'}
};
export const xpNeeded=level=>100+25*(level-1); // BASELINE economy; not canonical source.
export const levelOf=(s,id)=>s?.progression?.[id]?.level||1;
export function ensureProgression(s){s.progression??={};s.equipment??={};for(const id of [0,...s.roster].filter(id=>PLAYABLE.includes(id)))s.progression[id]??={level:1,xp:0};}
export function grantXP(s,ids,amount){
 if(!Number.isSafeInteger(amount)||amount<0)throw Error('XP tidak valid.');ensureProgression(s);
 for(const id of new Set(ids)){if(!s.progression[id])continue;const p=s.progression[id];p.xp+=amount;while(p.level<60&&p.xp>=xpNeeded(p.level)){p.xp-=xpNeeded(p.level);p.level++;}if(p.level===60)p.xp=0;}
}
export function characterStats(id,level=1,awakened=false){
 if(!PLAYABLE.includes(id)||!Number.isInteger(level)||level<1||level>60)throw Error('Karakter/level tidak valid.');
 const row=registry[id],base=row?.anchors[1]||{hp:4200,atk:920,def:700,spd:105,crit:16,critDamage:54,res:0,acc:0};
 const out={...base};for(const stat of ['hp','atk','def'])out[stat]=Math.floor(base[stat]*1.02**(level-1));out.spd=Math.floor(base.spd*1.02**Math.floor(level/5));
 Object.assign(out,row?.anchors[level]||{});
 if(awakened){if(level<40||!awakenData[id])throw Error('Awaken belum tersedia.');for(const key of Object.keys(out))out[key]=Number((out[key]+awakenData[id].anchors[40][key]-row.anchors[40][key]).toFixed(4));Object.assign(out,awakenData[id].anchors[level]||{});}
 return {name:row?.name||'Pengelana',element:row?.element||'Bayu',type:row?.type||'Human',...out};
}
export function questDone(s,id){if(id==='NR-H03')return s.burials.length===3&&!s.flags.flag_misi_gagal_permanent_playthrough;return s.flags['flag_'+id.toLowerCase().replace('-','_')+'_complete']===true;}
export function equipError(s,id,name){
 const item=EQUIPMENT[name];if(!item||!s.items.includes(name))return 'Item belum dimiliki.';
 if(!PLAYABLE.includes(id)||(id!==0&&!s.roster.includes(id)))return 'Karakter belum direkrut.';
 if(item.character&&item.character!==id)return 'Item khusus karakter lain.';
 if(item.level&&levelOf(s,id)<item.level)return 'Memerlukan level '+item.level+'.';
 if(item.nirsmara&&!s.nirsmaraSacrifice)return 'Selesaikan Titah Dilupakan Demi Selamat dahulu.';
 if(item.challenge&&!s.flags[challengeFlag(item.challenge)])return 'Selesaikan Titah item ini dahulu.';
 if(item.quest&&!questDone(s,item.quest))return 'Memerlukan '+item.quest+'.';
 if(Object.entries(s.equipment||{}).some(([owner,slots])=>Number(owner)!==id&&Object.values(slots).includes(name)))return 'Sedang dipakai karakter lain; lepas dahulu.';
 return null;
}
export function equip(s,id,name,inBattle=false){if(inBattle)return false;if(equipError(s,id,name))return false;ensureProgression(s);s.equipment[id]??={};s.equipment[id][EQUIPMENT[name].slot]=name;return true;}
export function unequip(s,id,slot,inBattle=false){if(inBattle||!SLOTS.includes(slot)||!s.equipment?.[id]?.[slot])return false;delete s.equipment[id][slot];return true;}
export function compassMultiplier(s){const items=(s.party||[0]).flatMap(id=>Object.values(s.equipment?.[id]||{}));return Math.min(1,...items.map(name=>EQUIPMENT[name]?.compass??1));}
export function validProgression(s){
 if(s.progression&&Object.entries(s.progression).some(([id,p])=>p&&p.awakened!==undefined&&(typeof p.awakened!=='boolean'||p.awakened&&(!awakenData[id]||p.level<40))))return false;
 const obj=v=>v&&typeof v==='object'&&!Array.isArray(v),owned=id=>PLAYABLE.includes(+id)&&String(+id)===id&&(+id===0||s.roster?.includes(+id));
 if(s.progression!==undefined&&(!obj(s.progression)||!Object.entries(s.progression).every(([id,p])=>owned(id)&&obj(p)&&Number.isInteger(p.level)&&p.level>=1&&p.level<=60&&Number.isInteger(p.xp)&&p.xp>=0&&(p.level===60?p.xp===0:p.xp<xpNeeded(p.level)))))return false;
 if(s.equipment!==undefined){if(!obj(s.equipment))return false;const seen=new Set();for(const [id,slots] of Object.entries(s.equipment)){if(!owned(id)||!obj(slots))return false;for(const [slot,name] of Object.entries(slots)){if(!SLOTS.includes(slot)||!EQUIPMENT[name]||EQUIPMENT[name].slot!==slot||seen.has(name)||equipError(s,+id,name))return false;seen.add(name);}}}
 return true;
}
