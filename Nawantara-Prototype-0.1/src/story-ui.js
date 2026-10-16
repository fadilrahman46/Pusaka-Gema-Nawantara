import {SONG,learnedSong,shuffled,towerQuestion,SONG_ORDERS,songOrderLabel} from './story.js';
export function createStoryUI({getState,open,close,paragraph,getBattle,resolve,wrong}){
 function song(back=close){const lines=learnedSong(getState());open('Lagu perjalanan',lines.length?lines.map(paragraph).join(''):paragraph('Dengarkan Ranaya untuk mempelajari bait pertama.'),[['Kembali',back]]);}
 function memory(){const b=getBattle();if(!b)return;
  if(b.kind==='tower'){const q=towerQuestion(b.seals);open('Segel '+(4-b.seals)+' · ingatan lagu',paragraph(q.prompt),[...shuffled(q.choices).map(line=>[line,()=>line===q.correct?resolve():wrong()]),['Ingat lagu',()=>song(memory)],['Kembali',close]]);}
  else open('Nirsmara · urutan lagu',paragraph('Pilih urutan bait lagu perjalanan Ranaya.'),[...shuffled(SONG_ORDERS).map(order=>[songOrderLabel(order),()=>order===SONG_ORDERS[0]?resolve():wrong()]),['Ingat lagu',()=>song(memory)],['Kembali',close]]);
 }
 return {song,memory};
}
