import CAPS from '../data/skill-caps.js';
export {CAPS};
export const emptySloka=()=>({stock:{},levels:{},claims:[],boss:0});
export const skillLevel=(s,id,action)=>s?.sloka?.levels?.[id]?.[action]||1;
export const skillPower=(levels,action)=>1+.05*((levels?.[action]||1)-1);
export const SLOKA_REWARDS={
 'NR-M02':{ids:[1]},'NR-M03':{ids:[2]},'NR-M05':{ids:[3,4,7],boss:1},'NR-M06':{ids:[9],boss:2},
 'NR-S01':{ids:[5]},'NR-S02':{ids:[6]},'NR-S04':{ids:[8],boss:1},'NR-H02':{ids:[84]},'NR-H03':{ids:[85]}
};
export function skillStock(s,id){return s.sloka?.stock?.[id]||{umum:0,misi:0,seconds:0};}
function stock(s,id){s.sloka??=emptySloka();return s.sloka.stock[id]??={umum:0,misi:0,seconds:0};}
const limit=1000000;
export function awardQuestSloka(s,key){
 const reward=SLOKA_REWARDS[key];if(!reward||s.sloka?.claims.includes(key))return false;
 s.sloka??=emptySloka();for(const id of reward.ids){const bank=stock(s,id);bank.misi=Math.min(limit,bank.misi+4);}
 s.sloka.boss=Math.min(limit,s.sloka.boss+(reward.boss||0));s.sloka.claims.push(key);return true;
}
export function migrateSloka(s){
 if(s.sloka!==undefined)return;s.sloka=emptySloka();
 // New material rewards for completed legacy quests, credited exactly once. No XP/Sukma changes.
 for(const key of Object.keys(SLOKA_REWARDS)){
  const done=key.startsWith('NR-M')?s.chapter>=+key.slice(-2):key==='NR-H03'?s.burials.length===3&&!s.flags.flag_misi_gagal_permanent_playthrough:s.flags['flag_'+key.toLowerCase().replace('-','_')+'_complete']===true;
  if(done)awardQuestSloka(s,key);
 }
}
export function upgradeCost(s,id,action){const next=skillLevel(s,id,action)+1;return {umum:action==='ultimate'?0:next*2,misi:action==='skill'?1:0,boss:action==='ultimate'?2:0};}
export function upgradeError(s,id,action,inBattle=false){
 if(inBattle)return 'Upgrade hanya di luar battle.';
 if(!CAPS[id]||!s.roster.includes(id))return 'Karakter belum dimiliki.';
 if(!Object.hasOwn(CAPS[id],action))return 'Skill tidak dapat ditingkatkan.';
 if(skillLevel(s,id,action)>=CAPS[id][action])return 'Level skill sudah maksimal.';
 const cost=upgradeCost(s,id,action),bank=skillStock(s,id);
 if(bank.umum<cost.umum||bank.misi<cost.misi||(s.sloka?.boss||0)<cost.boss)return 'Sloka belum cukup.';
 return null;
}
export function upgradeSkill(s,id,action,inBattle=false){
 if(upgradeError(s,id,action,inBattle))return false;const cost=upgradeCost(s,id,action),bank=stock(s,id),level=skillLevel(s,id,action);
 bank.umum-=cost.umum;bank.misi-=cost.misi;s.sloka.boss-=cost.boss;s.sloka.levels[id]??={strike:1,skill:1,ultimate:1};s.sloka.levels[id][action]=level+1;return true;
}
export function accrueSloka(s,ids,seconds,active=true){
 if(!active||!Number.isFinite(seconds)||seconds<=0||seconds>.5)return false;
 for(const id of new Set(ids)){if(!CAPS[id]||!s.roster.includes(id))continue;const bank=stock(s,id);bank.seconds+=seconds;if(bank.seconds>=60){bank.seconds-=60;bank.umum=Math.min(limit,bank.umum+1);}}
 return true;
}
export function mandalaError(s,id,inBattle=false){if(inBattle)return 'Mandala hanya di luar battle.';if(s.chapter<2)return 'Selesaikan M02 dahulu.';if(!CAPS[id]||!s.roster.includes(id))return 'Karakter belum dimiliki.';if(s.kepeng<20)return 'Memerlukan 20 Kepeng.';if(skillStock(s,id).umum>limit-3)return 'Persediaan Sloka penuh.';return null;}
export function trainMandala(s,id,inBattle=false){if(mandalaError(s,id,inBattle))return false;s.kepeng-=20;stock(s,id).umum+=3;return true;}
export function awardMandalaBoss(s,b){if(b.kind!=='mandalaBoss'||!b.done||b.outcome!=='win'||b.slokaClaimed||s.chapter<5)return false;s.sloka??=emptySloka();s.sloka.boss=Math.min(limit,s.sloka.boss+2);b.slokaClaimed=true;return true;}
export function validSloka(s){
 if(s.sloka===undefined)return true;
 const v=s.sloka,obj=x=>x&&typeof x==='object'&&!Array.isArray(x),amount=x=>Number.isSafeInteger(x)&&x>=0&&x<=limit,idOK=id=>Object.hasOwn(CAPS,id);
 if(!obj(v)||!obj(v.stock)||!obj(v.levels)||!amount(v.boss)||!Array.isArray(v.claims)||new Set(v.claims).size!==v.claims.length||v.claims.some(key=>!Object.hasOwn(SLOKA_REWARDS,key)))return false;
 if(!Object.entries(v.stock).every(([id,b])=>idOK(id)&&obj(b)&&Object.keys(b).length===3&&amount(b.umum)&&amount(b.misi)&&Number.isFinite(b.seconds)&&b.seconds>=0&&b.seconds<60))return false;
 return Object.entries(v.levels).every(([id,levels])=>idOK(id)&&s.roster.includes(+id)&&obj(levels)&&Object.keys(levels).length===3&&Object.entries(CAPS[id]).every(([action,max])=>Number.isInteger(levels[action])&&levels[action]>=1&&levels[action]<=max));
}
export function upgradeDescription(id,action,level){
 const power=(1+.05*(level-1)).toFixed(2);
 if(action==='strike')return 'Damage/heal Dasar ×'+power+'.';
 if(action==='skill'&&id===5)return 'Peluang penerapan lock: tambahan '+(5*(level-1))+' poin persen, maksimum 100%.';
 if(action==='skill'&&id===9)return 'Tak Teringat memberi pemulihan diri tambahan '+(3*(level-1))+'% HP maks.';
 if(action==='ultimate'&&id===4)return 'Perisai tim tambahan '+(5*(level-1))+'% HP maks Watu; kebal tetap 1 ronde.';
 if(action==='ultimate'&&id===5)return 'Jumlah buff yang dibagikan: setengah hasil curian +'+(level-1)+', dibatasi buff tersedia.';
 if(action==='ultimate'&&id===6)return 'Pamungkas memberi '+(level+1)+' Prana per sekutu (batas 5).';
 return 'Besaran damage/heal/shield/buff utama ×'+power+'. Durasi, biaya Prana dan cooldown tetap.';
}
