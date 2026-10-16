import {skillPower} from './skills.js';
// Runtime contract C08. L1 kits: Guide Karakter #01/#02/#09/#85.
// Unspecified magnitudes, protagonist and enemy non-HP stats remain tuning baselines.
import {PLAYABLE,characterStats,levelOf,passiveReady} from './progression.js';
export const SUPPORTED_PARTY=PLAYABLE;
export const KITS = {
 0:{strike:['Langkah Pengelana','enemy'],skill:['Pulihkan Ingatan','ally'],ultimate:['Gema Perjalanan','enemy']},
 1:{strike:['Sapaan Jauh','enemy'],skill:['Jalan yang Menutup','allEnemies'],ultimate:['Rombongan yang Tak Sampai','allEnemies']},
 2:{strike:['Tikaman Latihan','enemy'],skill:['Enam Puluh Tahun Mengasah','enemy'],ultimate:['Perang yang Tak Datang','enemy']},
 3:{strike:['Percikan Air Dingin','enemy'],skill:['Sebut Namanya','ally'],ultimate:['Yang Masih Hafal','allAllies']},
 4:{strike:['Bayangan Batu','enemy'],skill:['Menarik Batas','self'],ultimate:['Sampai Sini Saja','allAllies']},
 5:{strike:['Sodoran Kecil','enemy'],skill:['Ini Punyamu, Kan?','enemy'],ultimate:['Gudang Barang Tertinggal','allEnemies']},
 6:{strike:['Satu Bait','enemy'],skill:['Nada Tanpa Arti','allAllies'],ultimate:['Empat Ratus Bait','allAllies']},
 7:{strike:['Sabetan Rendah','enemy'],skill:['Tak Terjelaskan','enemy'],ultimate:['Yang Tak Bisa Digambarkan','allEnemies']},
 8:{strike:['Helaan','enemy'],skill:['Kelambu','allAllies'],ultimate:['Harga Perlindungan','allAllies']},
 84:{strike:['Ayunan Warisan','enemy'],skill:['Latihan yang Terlalu Lama','enemy'],ultimate:['Musuh yang Sebenarnya','enemy']},
 9:{strike:['Pudar','enemy'],skill:['Tak Teringat','self'],ultimate:['Dilupakan Demi Selamat','allAllies']},
 85:{strike:['Endapan','ally'],skill:['Ditanam Dalam-dalam','ally'],ultimate:['Yang Tertanam Selamat','allAllies']}
};
const encounters={training:["Latihan party",2200,1,620,540,"Akasa"],roamingCommon:["Bayang Penjaga",970,1,480,350,"Apah"],roamingElite:["Bayang Penjaga · Elite malam",1455,1,600,440,"Apah"],mandalaBoss:['Penjaga Mandala',4500,1,550,400,'Akasa'],challenge:['Bayang Ujian',2200,1,350,250,'Akasa'],warehouse:['Barang yang Terusik',600,1,320,200,'Akasa'],poem:['Syair yang Menyerang',2200,1,450,300,'Akasa'],manifest:['Manifestasi Kabut',1995,1,560,450,'Bayu'],youngRanaya:['Kenangan Ranaya Muda',1200,1,400,320,'Apah'],restricted:['Latihan Terbatas',1500,1,450,350,'Teja'],sunyi:['Sang Sunyi · Manifestasi',2200,1,0,350,'Akasa'],tutorial:['Bayang Penjaga',970,2,480,350,'Apah'],lampah:['Lampah Sinaru',1422,1,711,711,'Bayu'],tandaraga:['Tandaraga',1422,1,730,665,'Teja'],mist:['Kabut Bersuara',2200,1,620,540,'Akasa'],tower:['Penjaga Menara',2200,1,670,600,'Akasa'],nirsmara:['Nirsmara',5500,1,730,650,'Akasa']};
const cost={strike:0,guard:0,skill:2,ultimate:4}, cooldown={strike:0,guard:0,skill:2,ultimate:3};
const living=u=>u.hp>0;
const damageAction=(id,action)=>action==='strike'&&id!==85||action==='skill'&&[2,7,84].includes(id)||action==='ultimate'&&[0,2,7,84].includes(id);
const effect=(u,id)=>u.effects.find(e=>e.id===id);
const isDebuff=e=>['slow','skip','confused','accuracyDown','specialLock','fear'].includes(e.id);
const buffs=u=>u.effects.filter(e=>!isDebuff(e)&&!e.id.startsWith('avoid:'));
const speed=u=>u.spd*(1-(effect(u,'slow')?.magnitude||0))*(1+(effect(u,'haste')?.magnitude||0));
export function addEffect(b,u,id,magnitude,duration,transfer=true){
 const debuff=isDebuff({id});
 if(debuff&&(effect(u,'debuffImmune')||id==='fear'&&effect(u,'fearImmune')))return false;
 if(debuff&&(b.kind==='nirsmara'&&u.side==='enemy'||u.passive&&u.characterId===9)){const seen=u.side==='enemy'?b.seenDebuffs:(u.seenDebuffs??=[]);if(seen.includes(id))return false;seen.push(id);}
 if(debuff&&transfer&&u.side==='ally'){const saras=b.allies.find(a=>a!==u&&living(a)&&a.passive&&a.characterId===85);if(saras){const amount=Math.min(duration-1,Math.ceil(duration*.2));if(amount>0){duration-=amount;const similar=effect(saras,id);if(similar)similar.expires+=amount;else addEffect(b,saras,id,magnitude,amount,false);}}}
 const old=effect(u,id),expires=b.round+duration;
 if(old){old.magnitude=Math.max(old.magnitude,magnitude);old.expires=Math.max(old.expires,expires);}
 else u.effects.push({id,magnitude,expires});
 return true;
}
function random(b){b.rng=(Math.imul(1664525,b.rng)+1013904223)>>>0;return b.rng/4294967296;}
export function hitChance(a,t){return Math.max(.05,Math.min(1,.9+(a.acc-(effect(a,'accuracyDown')?.magnitude||0)-t.res)/100));}
function battleHitChance(b,a,t){let acc=a.acc;if(b.kind==='nirsmara'&&b.phase===2&&a.side==='ally')acc-=50;if(a.side==='enemy'&&b.allies.some(u=>living(u)&&effect(u,'shield')?.mist&&effect(u,'shield').magnitude>0))acc-=25;return hitChance({...a,acc},t);}
export function combatDamage(a,t,mult=1,critical=false,mitigation=1){
 const elements=['Apah','Teja','Bayu','Pertiwi','Akasa'],x=elements.indexOf(a.element),y=elements.indexOf(t.element);
 const element=(x+1)%5===y?1.3:(y+1)%5===x?.7:1;
 return Math.max(1,Math.floor(a.atk*a.atk/(a.atk+1.5*t.def)*mult*element*(critical?1+a.critDamage/100:1)*mitigation));
}
function unit(id,row,side){const [name,max,atk,def,spd,element,crit,critDamage,res,acc]=row;return {id,characterId:side==='ally'?Number(id.slice(2)):null,side,name,max,hp:max,atk,def,spd,element,crit,critDamage,res,acc,prana:0,cooldowns:{skill:0,ultimate:0},effects:[],guard:false,hasAttacked:false,quietRounds:0,attackedRound:false};}
export function createBattle(kind,party=[0],seed=20260918,state=null){
 if(!encounters[kind]||kind==='manifest'&&party.length<2||party.length<1||party.length>4||new Set(party).size!==party.length||party.some(id=>!SUPPORTED_PARTY.includes(id)))throw Error('Encounter atau party tidak valid.');
 let [name,hp,count,atk,def,element]=encounters[kind];
 if(kind==='training'){const stats=party.map(id=>characterStats(id,levelOf(state,id)));hp=Math.max(2200,Math.floor(stats.reduce((n,c)=>n+c.atk,0)*1.3));const defense=stats.reduce((n,c)=>n+c.def,0)/stats.length;atk=Math.max(320,Math.floor(defense*.7));def=Math.max(200,Math.floor(defense*.6));}
 const allies=party.map((id,i)=>{const level=levelOf(state,id),awakened=state?.progression?.[id]?.awakened===true,c=characterStats(id,level,awakened);if(id===3&&state?.flags.flag_sanra_ranu_buff_permanent)for(const k of ['hp','atk','def'])c[k]=Math.floor(c[k]*1.05);return {...unit('a:'+id,[c.name,c.hp,c.atk,c.def,c.spd,c.element,c.crit,c.critDamage,c.res,c.acc],'ally'),skillLevels:{...(state?.sloka?.levels?.[id]||{strike:1,skill:1,ultimate:1})},type:c.type,level,awakened,passive:awakened&&passiveReady(id),gear:Object.values(state?.equipment?.[id]||{}),struckTargets:[],locked:[],slot:i,formation:i<2?'front':'back'};});
 const foes=Array.from({length:count},(_,i)=>unit('e:'+i,[name,hp,atk,def,96,element,0,50,0,0],'enemy'));for(const f of foes)f.type=kind==='tandaraga'?'Human':['manifest','tower','mist'].includes(kind)?'Spirit':'Ghost';
 const b={kind,name,max:hp,allies,foes,round:1,patience:0,phase:1,seals:kind==='tower'?3:0,lastSealRound:0,seenDebuffs:[],rng:seed>>>0,seed:seed>>>0,queue:[],cursor:0,activeId:null,done:false,outcome:null,attackedRound:false,log:'Setiap karakter bertindak sekali per ronde.',history:[],tuningRequired:true};
 for(const u of allies){u.baseAtk=u.atk;u.baseDef=u.def;u.baseSpd=u.spd;u.baseAcc=u.acc;if(u.passive&&u.characterId===84)u.prana=1;}
 if(kind==='manifest')absorbSkill(b);beginRound(b);advance(b);return b;
}
export function activeUnit(b){return b.allies.find(u=>u.id===b.activeId);}
// Preview adapter: idle is measured only in an explicit inter-round movement interval.
export function tickBattleIdle(b,dt,moved=false,paused=false){
 if(!b.idleInterval||b.done||paused||!Number.isFinite(dt)||dt<0)return false;
 if(moved){b.idleInterval=false;b.idleSeconds=0;b.log='Kamu menjaga arah dengan bergerak.';return true;}
 b.idleSeconds=(b.idleSeconds||0)+Math.min(dt,.5);if(b.idleSeconds<=5)return false;
 b.idleInterval=false;b.idleSeconds=0;
 if(b.kind==='tutorial'&&!b.idleSpawned){const f=unit('e:2',['Bayang Penjaga',970,480,350,96,'Apah',0,50,0,0],'enemy');f.type='Ghost';b.foes.push(f);b.queue.push(f.id);b.idleSpawned=true;b.log='Diam terlalu lama: satu Bayang Penjaga datang. Tidak ada gelombang tambahan lagi.';}
 else if(b.kind==='lampah'){for(const u of b.allies.filter(living))addEffect(b,u,'slow',.3,1);b.log='Kabut menyesatkan party: SPD −30% selama satu ronde penuh.';}
 sync(b);return true;
}
function sync(b){b.enemies=b.foes.map(u=>u.hp);b.heroHp=b.allies.reduce((a,u)=>a+u.hp,0);b.heroMax=b.allies.reduce((a,u)=>a+u.max,0);b.prana=activeUnit(b)?.prana||0;}
function updatePassiveStats(b){const odd=[...b.allies,...b.foes].filter(living).length%2===1;for(const u of b.allies)if(u.passive&&u.characterId===5){u.acc=u.baseAcc+(odd?20:0);u.spd=u.baseSpd*(odd?1.15:1);}}
function beginRound(b){updatePassiveStats(b);if(b.allies.some(u=>living(u)&&u.passive&&u.characterId===9)){const target=b.allies.filter(living).find(u=>u.effects.some(isDebuff));if(target){const e=target.effects.find(isDebuff);target.effects=target.effects.filter(x=>x!==e);}}b.queue=[...b.allies,...b.foes].filter(living).sort((a,c)=>speed(c)-speed(a)||(a.side===c.side?0:a.side==='ally'?-1:1)||a.id.localeCompare(c.id)).map(u=>u.id);b.cursor=0;}
function finishTurn(u,cast){for(const k of ['skill','ultimate'])if(k!==cast&&u.cooldowns[k]>0)u.cooldowns[k]--;}
function finishRound(b){
 if(b.challenge?.key==='recruit4'){
  const c=b.challenge,w=b.allies.find(a=>a.characterId===4),back=b.allies.filter(a=>a.slot>=2);
  if(c.blockedRound===b.round&&w.hp>0&&back.length===2&&back.every(living))c.protectedRounds++;
  if(c.protectedRounds>=3){c.achieved=true;b.done=true;b.outcome='win';}
 }

 if(b.kind==='tandaraga'){b.patience=b.attackedRound?0:b.patience+1;if(b.patience>=5){b.done=true;b.outcome='win';}}
 if(b.kind==='sunyi'){if(!b.attackedRound)b.patience++;if(b.patience>=5){b.done=true;b.outcome='win';}}
 if(b.kind==='poem'&&b.round>=4){b.done=true;b.outcome='win';}
 for(const u of b.allies)if(living(u)&&u.passive&&u.characterId===84){u.ultimateQuiet=u.ultimateRound?0:(u.ultimateQuiet||0)+1;u.ultimateRound=false;if(u.ultimateQuiet>0&&u.ultimateQuiet%3===0&&(u.passivePrana||0)<2){u.prana=Math.min(5,u.prana+1);u.passivePrana=(u.passivePrana||0)+1;}}
 for(const u of [...b.allies,...b.foes]){u.quietRounds=u.attackedRound?0:Math.min(5,u.quietRounds+1);u.attackedRound=false;if(u.effects.some(e=>e.id==='watuRest'&&e.expires===b.round))u.effects.push({id:'skip',magnitude:1,expires:b.round+1});u.effects=u.effects.filter(e=>e.expires>b.round);}
 b.attackedRound=false;b.round++;beginRound(b);
 if(b.idleEnabled&&!b.done&&(b.kind==='lampah'||b.kind==='tutorial'&&!b.idleSpawned)){b.idleInterval=true;b.idleSeconds=0;}
}
function checkEnd(b){if(b.allies.every(u=>!living(u))){b.done=true;b.outcome='lose';}else if(b.foes.every(u=>!living(u))&&b.seals===0&&!['sunyi','poem'].includes(b.kind)){b.done=true;b.outcome='win';}}
function permanentDef(b){for(const a of b.allies)a.def=a.baseDef*(1+(b.watuLegacy?.25:0)+.2*(a.deathStacks||0)+(a.watuItemBonus?.08:0));}
function strike(b,a,t,mult){
 if(!living(t))return false;t.wasHit=true;updatePassiveStats(b);
 if(t.passive&&t.characterId===7){const cycle=['Bayu','Pertiwi','Apah','Teja'];t.resistElement=cycle[t.resistIndex||0];t.resistIndex=((t.resistIndex||0)+1)%4;}
 mult*=a.actionPower||1;
 if(a.gear?.includes('Tongkat Perantau'))mult*=1+.1*a.quietRounds;
 if(random(b)>=battleHitChance(b,a,t)){b.log+=' Meleset.';return false;}
 let mitigation=t.guard?.5:1;if(t.passive&&t.characterId===7&&a.element===t.resistElement)mitigation*=.75;mitigation*=1-(effect(t,'reduction')?.magnitude||0);
 if(t.side==='ally'&&b.allies.some(u=>living(u)&&effect(u,'shelter')))mitigation*=.6;
 if(t.side==='enemy'&&b.kind==='tower')mitigation*=1-b.seals*.33;
 let d=combatDamage(a,{...t,def:t.def*(1+(effect(t,'defUp')?.magnitude||0))},mult,random(b)<a.crit/100,mitigation);if(effect(t,'invulnerable')){if(b.challenge?.key==='item4'&&a.side==='enemy'&&t.side==='ally'&&t.characterId!==4)b.challenge.achieved=true;d=0;}
 if(t.side==='enemy'&&['tandaraga','sunyi'].includes(b.kind))d=0;
 const shield=effect(t,'shield');if(shield){const absorbed=Math.min(d,shield.magnitude);shield.magnitude-=absorbed;d-=absorbed;}
 const floor=t.side==='enemy'?(b.kind==='manifest'&&b.phase<3?Math.floor(b.max*(b.phase===1?.66:.33)):b.kind==='nirsmara'?1815:b.kind==='tower'&&b.seals>0||b.kind==='poem'?1:0):0;
 const before=t.hp;t.hp=Math.max(floor,t.hp-d);
 if(before>0&&t.hp===0&&t.side==='ally'){if(t.passive&&t.characterId===4&&!t.titisUsed){t.titisUsed=true;b.watuLegacy=true;b.log+=' Titis Ulang: Watu tetap tumbang, DEF tim +25% sampai battle berakhir.';}for(const n of b.allies.filter(n=>living(n)&&n.passive&&n.characterId===8)){n.deathStacks=Math.min(3,(n.deathStacks||0)+1);for(const ally of b.allies)ally.atk=ally.baseAtk*1.1;}permanentDef(b);}b.log+=` ${t.name}: −${before-t.hp} HP.`;
 if(b.kind==='manifest'){const phase=b.foes[0].hp<=b.max*.33?3:b.foes[0].hp<=b.max*.66?2:1;while(b.phase<phase){b.phase++;absorbSkill(b);}}
 if(b.kind==='nirsmara')b.phase=b.foes[0].hp<=1815?3:b.foes[0].hp<=3630?2:1;
 return true;
}
function absorbSkill(b){
 const used=b.absorbedOwners||[],remainingAttacks=b.allies.filter(living).flatMap(u=>['strike','skill','ultimate'].filter(a=>!u.locked.includes(a)&&damageAction(u.characterId,a))).length;
 let pool=b.allies.flatMap(u=>['strike','skill','ultimate'].filter(a=>!u.locked.includes(a)&&(!living(u)||!damageAction(u.characterId,a)||remainingAttacks>1)).map(action=>({u,action})));
 const others=pool.filter(({u})=>!used.includes(u.id));if(others.length)pool=others;if(!pool.length)return;
 const {u,action}=pool[Math.floor(random(b)*pool.length)];u.locked.push(action);b.absorbedOwners=[...used,u.id];b.log+=' Kabut menyerap '+u.name+': '+KITS[u.characterId][action][0]+'.';
}
function enemyTurn(b,u){
 if(b.kind==='lampah'&&!u.cooldowns.skill){for(const a of b.allies.filter(living))if(random(b)<battleHitChance(b,u,a))addEffect(b,a,'slow',.2,2);u.cooldowns.skill=2;b.log+=' Lampah menutup jalan: SPD party turun.';finishTurn(u,'skill');return;}
 if(b.kind==='sunyi'){finishTurn(u);return;}
 let targets=b.allies.filter(t=>living(t)&&!effect(t,'untargetable')&&!effect(u,'avoid:'+t.id));
 if(effect(u,'confused')&&random(b)<effect(u,'confused').magnitude)targets=b.foes.filter(t=>living(t)&&t.id!==u.id);
 // Front slots protect the back until unavailable; explicit skill targeting overrides this.
 if(b.challenge?.key==='recruit4'){const w=b.allies.find(a=>a.characterId===4&&living(a)),back=targets.filter(a=>a.slot>=2);if(w&&effect(w,'blockBack')&&back.length===2){targets=[w];b.challenge.blockedRound=b.round;}else if(back.length)targets=back;}
 const taunt=targets.filter(t=>effect(t,'taunt'));const front=targets.filter(t=>t.formation==='front');if(taunt.length)targets=taunt;else if(front.length)targets=front;else if(b.allies.some(t=>living(t)&&effect(t,'blockBack')))targets=[];
 if(targets.length){const t=targets[Math.floor(random(b)*targets.length)];strike(b,u,t,1);}
 else b.log+=' Musuh kehilangan sasaran.';
 finishTurn(u);
}
function advance(b){
 b.activeId=null;checkEnd(b);
 while(!b.done&&!(b.kind==='nirsmara'&&b.phase===3)){
  if(b.cursor>=b.queue.length){finishRound(b);if(b.done)break;}
  const id=b.queue[b.cursor],u=[...b.allies,...b.foes].find(x=>x.id===id);
  if(!living(u)){b.cursor++;continue;}
  u.guard=false;
  if(effect(u,'skip')){u.effects=u.effects.filter(e=>e.id!=='skip');finishTurn(u);b.cursor++;continue;}
  if(u.side==='ally'){b.activeId=u.id;break;}
  enemyTurn(b,u);b.cursor++;checkEnd(b);
 }
 sync(b);
}
export function targetsFor(b,action){
 const u=activeUnit(b);if(!u)return [];
 const type=action==='guard'?'self':KITS[u.characterId][action]?.[1];
 if(type==='enemy')return b.foes.filter(t=>living(t)&&!effect(t,'untargetable'));
 if(type==='ally')return b.allies.filter(living);
 return [];
}
export function actionInfo(b,action,u=activeUnit(b)){
 const cd=Math.max(0,(cooldown[action]||0)-(action==='ultimate'&&((u?.characterId===5&&u.gear.includes('Jimat Gudang Barang Tertinggal'))||(u?.characterId===6&&u.gear.includes('Jimat Empat Ratus Bait')))?1:0));
 const reason=!u||b.done?'Pertemuan selesai':!Object.hasOwn(cost,action)?'Aksi tidak tersedia':b.idleInterval?'Sela kabut':u.id!==b.activeId?'Menunggu giliran':u.locked?.includes(action)?'Skill diserap':action==='skill'&&effect(u,'specialLock')?'Terkunci oleh Bingung':u.cooldowns[action]>0?'Cooldown belum selesai':u.prana<cost[action]?'Prana belum cukup':null;
 return {cost:cost[action]??0,cooldown:cd,remaining:u?.cooldowns[action]||0,reason};
}
export function canAct(b,action){return !actionInfo(b,action).reason;}
function heal(u,fraction){u.hp=Math.min(u.max,u.hp+Math.floor(u.max*fraction));}
export function act(b,action,targetId){
 if(!canAct(b,action))return 'invalid';
 const u=activeUnit(b),id=u.characterId,type=action==='guard'?'self':KITS[id][action][1],targets=targetsFor(b,action);
 const t=targets.find(t=>t.id===targetId);
 if(['enemy','ally'].includes(type)&&!t)return 'invalid';
 const rank=u.skillLevels?.[action]||1,power=skillPower(u.skillLevels,action);u.actionPower=power;
 u.prana-=cost[action];u.cooldowns[action]=actionInfo(b,action,u).cooldown;
 b.log=u.name+' · '+(action==='guard'?'Bertahan':KITS[id][action][0])+'.';
 b.history.push({round:b.round,actor:u.id,action,target:targetId||null,rng:b.rng});
 const attacking=damageAction(id,action);
 if(attacking){u.attackedRound=true;b.attackedRound=true;if(b.kind==='tandaraga')b.patience=0;}
 if(action==='guard'){u.guard=true;u.prana=Math.min(5,u.prana+1);}
 else if(action==='strike'){
  let success=false;
  if(id===85){heal(t,.1*power);success=true;}
  else {const ts=id===8?[t,...b.foes.filter(f=>living(f)&&f!==t)].slice(0,2):[t];for(const target of ts)for(let hit=0;hit<(id===7?2:1);hit++){if(!living(target))break;const landed=strike(b,u,target,[1,3,4,5,6,7,8,9].includes(id)?.75:1);success=success||landed;}
   if(success&&id===9&&random(b)<battleHitChance(b,u,t))addEffect(b,t,'accuracyDown',10,2);
   if(success&&id===4)addEffect(b,u,'taunt',1,1);
   if(success&&id===5&&random(b)<.2){const buff=buffs(t)[0];if(buff){t.effects=t.effects.filter(e=>e!==buff);addEffect(b,u,buff.id,buff.magnitude,Math.max(1,buff.expires-b.round));}}
   if(id===7&&!u.struckTargets.includes(t.id))u.struckTargets.push(t.id);
  }
  if(success)u.prana=Math.min(5,u.prana+1);
 }else if(id===0){if(action==='skill')heal(t,.3);else strike(b,u,t,2.6);}
 else if(id===1){
  const foes=b.foes.filter(living);
  if(action==='skill'){
   for(const f of foes)if(random(b)<battleHitChance(b,u,f))addEffect(b,f,'slow',.2*power,2);
   const low=[...foes].sort((a,c)=>a.spd*(1-(effect(a,'slow')?.magnitude||0))-c.spd*(1-(effect(c,'slow')?.magnitude||0))||a.id.localeCompare(c.id))[0];
   if(low&&random(b)<battleHitChance(b,u,low))addEffect(b,low,'skip',1,2);
  }else for(const f of foes)if(random(b)<battleHitChance(b,u,f)){addEffect(b,f,'confused',u.gear.includes('Jimat Rombongan yang Tak Sampai')?.30:.25,2);if(b.challenge?.key==='item1')b.challenge.achieved=true;}
 }else if(id===2){if(b.challenge?.key==='item2'&&action==='ultimate'&&!u.hasAttacked)b.challenge.achieved=true;strike(b,u,t,action==='skill'?1.5*(1+.15*u.quietRounds):(u.gear.includes('Senjata Perang yang Tak Datang')?2.75:2.6)*(u.hasAttacked?1:1.5));}
 else if(id===3){
  if(action==='skill'){const before=t.hp;heal(t,.3*power);if(b.challenge?.key==='recruit3'&&t!==u&&t.hp>before)b.challenge.achieved=true;const debuff=t.effects.find(isDebuff);if(debuff)t.effects=t.effects.filter(e=>e!==debuff);}
  else {let revived=false;for(const a of b.allies){if(living(a)){const before=a.hp;heal(a,u.gear.includes('Jimat Yang Masih Hafal')?.5:.45);if(b.challenge?.key==='item3'&&a!==u&&a.hp>before)b.challenge.achieved=true;}else if(!u.revivalUsed){a.hp=Math.floor(a.max*.25);revived=true;}}if(revived)u.revivalUsed=true;}
 }else if(id===4){
  if(action==='skill'){addEffect(b,u,'defUp',.5*power,3);addEffect(b,u,'blockBack',1,3);}
  else {for(const a of b.allies.filter(living)){addEffect(b,a,'invulnerable',1,1);if(rank>1)addEffect(b,a,'shield',Math.floor(u.max*.05*(rank-1)),9999);if(u.gear.includes('Pusaka Sampai Sini Saja')&&!u.itemUltimateUsed)a.watuItemBonus=true;}u.itemUltimateUsed=true;permanentDef(b);addEffect(b,u,'watuRest',1,1);}
 }else if(id===5){
  if(action==='skill'){if(random(b)<Math.min(1,battleHitChance(b,u,t)+.05*(rank-1))&&addEffect(b,t,'specialLock',1,2))t.cooldowns.skill=2;}
  else {const stolen=[];for(const f of b.foes.filter(living)){stolen.push(...buffs(f));f.effects=f.effects.filter(e=>!buffs(f).includes(e));}const allies=b.allies.filter(living);stolen.slice(0,Math.floor(stolen.length/2)+rank-1).forEach((e,i)=>addEffect(b,allies[i%allies.length],e.id,e.magnitude,Math.max(1,e.expires-b.round)));}
 }else if(id===6){
  for(const a of b.allies.filter(living)){if(action==='skill'){addEffect(b,a,'haste',.2*power,3);addEffect(b,a,'fearImmune',1,3);}else{a.cooldowns.skill=0;a.prana=Math.min(5,a.prana+rank+1);}}
 }else if(id===7){
  if(action==='skill'){const first=!u.struckTargets.includes(t.id),base=u.crit;if(first){u.crit+=50;if(b.challenge?.key==='recruit7')b.challenge.achieved=true;}strike(b,u,t,1.7);u.crit=base;if(first)u.struckTargets.push(t.id);}
  else {if(b.challenge?.key==='item7')b.challenge.achieved=true;for(let i=0;i<4;i++){const pool=b.foes.filter(living);if(!pool.length)break;const f=pool[Math.floor(random(b)*pool.length)];if(strike(b,u,f,u.gear.includes('Senjata Yang Tak Bisa Digambarkan')?.97:.9))addEffect(b,f,'avoid:'+u.id,1,1);}}
 }else if(id===8){
  if(action==='skill'){for(const a of b.allies.filter(living)){addEffect(b,a,'shield',Math.floor(u.max*.22*power),9999);effect(a,'shield').mist=true;}}
  else{for(const a of b.allies.filter(living)){addEffect(b,a,'debuffImmune',1,3);addEffect(b,a,'reduction',(u.gear.includes('Pusaka Harga Perlindungan')?.45:.4)*power,3);}u.max=Math.max(1,Math.floor(u.max*.7));u.hp=Math.min(u.hp,u.max);}
 }else if(id===84){strike(b,u,t,action==='skill'?1.9*(u.wasHit?1:1.4):(u.gear.includes('Senjata Musuh yang Sebenarnya')?2.85:2.7)*(/Ghost|Spirit/.test(t.type)?1.4:1));}
 else if(id===9){
  if(action==='skill'){if(rank>1)heal(u,.03*(rank-1));addEffect(b,u,'untargetable',1,2);addEffect(b,u,'shelter',.4,2);}
  else {for(const a of b.allies.filter(living)){a.effects=a.effects.filter(e=>!isDebuff(e));addEffect(b,a,'untargetable',1,1);if(u.gear.includes('Pusaka Dilupakan Demi Selamat')&&!u.nirsmaraItemUsed)heal(a,.08);}u.nirsmaraItemUsed=true;}
 }else if(id===85){
  if(action==='skill'){heal(t,.35*power);addEffect(b,t,'shield',Math.floor(t.max*.15*power),2);}
  else for(const a of b.allies.filter(living)){if(a.hp/a.max<.3)addEffect(b,a,'debuffImmune',1,2);heal(a,(u.gear.includes('Jimat Yang Tertanam Selamat')?.45:.4)*power);}
 }
 if(action==='ultimate'){u.ultimateRound=true;for(const k of b.allies.filter(a=>living(a)&&a.passive&&a.characterId===6))for(const a of b.allies.filter(living))heal(a,.08);}
 if(attacking)u.hasAttacked=true;
 finishTurn(u,action);b.cursor++;advance(b);return b.outcome||'continue';
}
export function memoryAvailable(b){return !b.done&&(b.kind==='nirsmara'&&b.phase===3||b.kind==='tower'&&b.seals>0&&b.round%2===0&&b.lastSealRound!==b.round);}
export function resolveMemory(b){
 if(!memoryAvailable(b))return false;
 if(b.kind==='nirsmara'){b.memoryProgress=(b.memoryProgress||0)+1;if(b.memoryProgress>=(b.requiredMemories||1)){b.done=true;b.outcome='win';b.log='Nirsmara mengingat jalan pulang.';}else b.log='Lagu belum lengkap. Ulangi ingatan sekali lagi.';}
 else{b.seals--;b.lastSealRound=b.round;b.log='Satu segel terbuka. '+b.seals+' segel tersisa.';}
 sync(b);return true;
}
export function wrongMemory(b){if(b.kind==='tower'){b.foes[0].hp=Math.min(b.max,b.foes[0].hp+330);sync(b);}}
