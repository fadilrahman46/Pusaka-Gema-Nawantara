// NR-S03: two answers, then Adi's conclusion. A tie resolves to MIXED.
export const ADI_TONES=['HONEST','HOPEFUL','MIXED'];
export const adiUnresolved=s=>s.flags.flag_adi_resolution_path===null&&((s.adi?.answers.length||0)>0||s.adi?.concluded===true||!!s.adi?.pending);
export function adiTone(answers){return answers[0]===answers[1]?answers[0]:'MIXED';}
export function validAdi(s){
 const a=s.adi;if(a===undefined)return true;
 return a!==null&&typeof a==='object'&&Array.isArray(a.answers)&&a.answers.length<=2&&a.answers.every(x=>ADI_TONES.includes(x))&&typeof a.concluded==='boolean'&&(!a.concluded||a.answers.length===2)&&
 [null,'WAITED','FORCED_PAST'].includes(a.pending)&&(!a.pending||a.concluded&&s.chapter===5&&s.flags.flag_adi_resolution_path===null)&&
 (!a.concluded||s.flags.flag_adi_dialogue_choice===adiTone(a.answers));
}
export function adiAvailable(s){return s.chapter>=4&&s.chapter<6&&s.flags.flag_adi_met===true&&s.flags.flag_adi_resolution_path===null;}
export function answerAdi(s,tone){
 if(!adiAvailable(s)||!ADI_TONES.includes(tone)||(s.adi?.answers.length||0)>=2)return false;
 s.adi??={answers:[],concluded:false,pending:null};s.adi.answers.push(tone);return true;
}
export function concludeAdi(s){
 if(!adiAvailable(s)||s.adi?.answers.length!==2||s.adi.concluded)return false;
 s.adi.concluded=true;s.flags.flag_adi_dialogue_choice=adiTone(s.adi.answers);return true;
}
export function beginAdiPath(s,path){
 if(!adiAvailable(s)||s.chapter!==5||!s.adi?.concluded||s.adi.pending||!['WAITED','FORCED_PAST'].includes(path))return false;
 s.adi.pending=path;return true;
}
