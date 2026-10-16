// World Bible §1.8/1.12; durations, prices and supply effects are preview baselines.
export const DAY_SECONDS=600;
export const emptyWorld=()=>({seconds:0,seed:20260924,wins:0,purchases:0,supplies:{potion:0,material:0},prepared:false});
export const night=s=>Math.floor((s.regionWorld?.seconds||0)/DAY_SECONDS)%2===1;
export function worldTick(s,dt,active){if(!active||!Number.isFinite(dt)||dt<=0||dt>.5)return;s.regionWorld??=emptyWorld();s.regionWorld.seconds=(s.regionWorld.seconds+dt)%(DAY_SECONDS*2);}
export function validWorld(s){const w=s.regionWorld;if(w===undefined)return true;return !!w&&Number.isFinite(w.seconds)&&w.seconds>=0&&w.seconds<DAY_SECONDS*2&&Number.isSafeInteger(w.seed)&&w.seed>=0&&w.seed<=4294967295&&['wins','purchases'].every(k=>Number.isSafeInteger(w[k])&&w[k]>=0)&&typeof w.prepared==='boolean'&&!!w.supplies&&['potion','material'].every(k=>Number.isInteger(w.supplies[k])&&w.supplies[k]>=0&&w.supplies[k]<=99);}
export const roamKind=(s,zone)=>night(s)&&zone>=1&&zone<=3?'roamingElite':'roamingCommon';
export const supplyPrice=(s,id)=>({potion:12,material:20}[id]||0)+(s.flags.flag_vendor_refused?10:0);
export function buySupply(s,id){if(s.chapter<4||!['potion','material'].includes(id)||s.kepeng<supplyPrice(s,id))return false;s.regionWorld??=emptyWorld();if(s.regionWorld.supplies[id]>=99)return false;s.kepeng-=supplyPrice(s,id);s.regionWorld.supplies[id]++;s.regionWorld.purchases++;return true;}
export function prepareGear(s){if(!s.regionWorld?.supplies.material||s.regionWorld.prepared)return false;s.regionWorld.supplies.material--;s.regionWorld.prepared=true;return true;}
export function consumePotion(s,b){if(!s.regionWorld?.supplies.potion||!b||b.done||b.guest||b.challenge||b.potionUsed||!b.allies.some(a=>a.hp>0&&a.hp<a.max))return false;s.regionWorld.supplies.potion--;return true;}
const DROPS=[['Penunjuk Basah',45,[0,1]],['Tongkat Perantau',28,[2]],['Kompas Karat',16,[3,4]],['Lentera Nenek Ranaya',8,[5]],['Peta yang Tidak Pernah Selesai',3,[6]]];
export function roamingReward(s,b){if(!b?.roaming||!b.done||b.outcome!=='win'||b.roamClaimed||!Number.isInteger(b.roamZone)||b.roamZone<0||b.roamZone>6)return false;s.regionWorld??=emptyWorld();const w=s.regionWorld;w.seed=(Math.imul(w.seed,1664525)+1013904223)>>>0;const roll=w.seed/4294967296*100;let ceiling=0,item=null;for(const [name,weight,zones] of DROPS){ceiling+=weight;if(roll<ceiling){if(zones.includes(b.roamZone))item=name;break;}}
 s.kepeng+=b.kind==='roamingElite'?12:8;w.wins++;if(item&&!s.items.includes(item)){s.items.push(item);if(item==='Lentera Nenek Ranaya')s.flags.ext_lantern_origin=b.roamZone;}b.roamClaimed=true;return {item,xp:b.kind==='roamingElite'?125:75};}
