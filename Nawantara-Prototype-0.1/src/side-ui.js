import {LORE} from './lore.js';
import {OWNER_CLUES,ITEM_CLUES,BAIT_LINES,kayuriResponse} from './story.js';
import {MURAL_LABELS,muralBoard} from './murals.js';
import {SIDE_QUESTS,WAREHOUSE,BAITS,sideAvailable,warehouseChoice,rememberBaits,collectMemory,sacrificeEntry,solveMurals} from './side-quests.js';
import {questDone} from './progression.js';
export const SIDE_NPCS=[
 ['lare','Lare Wengi · gudang',-3,-70],['kayuri','Kayuri Sindu · bait',3,-100],
 ['oldHouse','Rumah Ranaya Lama',3,-39],['altar','Altar Kabut',-4,-183],['wira','Wira Senja',3,-163],
 ...Array.from({length:5},(_,i)=>['memory'+i,'Kenangan terlupakan '+(i+1),i%2?-4:4,[-113,-136,-143,-167,-181][i]])
];
export function memoryWindow(s,id,idle){
 if(s.options.accessible)return true;
 // Seeded window jitter: a 3-second opening in each 15-second idle cycle.
 const cycle=Math.floor(idle/15),phase=idle%15,start=10+((Math.imul(cycle+1,1103515245)+12345+id*7919)>>>0)%3;
 return phase>=start&&phase<start+3;
}
export function sideVisible(s,id){
 if(id==='lare')return sideAvailable(s,'NR-S01');if(id==='kayuri')return sideAvailable(s,'NR-S02')||questDone(s,'NR-S02');
 if(id==='oldHouse')return s.flags.flag_ranaya_song_stage===4&&(!questDone(s,'NR-H01')||!s.flags.flag_sanra_ranu_buff_permanent);
 if(id==='wira')return sideAvailable(s,'NR-H02');if(id==='altar')return sideAvailable(s,'NR-S04')&&s.flags.counter_nggarindu_fragments===5;
 if(id.startsWith('memory'))return sideAvailable(s,'NR-S04')&&!s.flags.array_nggarindu_fragments?.includes(+id.slice(6));return false;
}
export function createSideUI({getState,commit,open,close,puzzle,startBattle,toast,paragraph,getIdle}){
 const s=()=>getState();
 function warehouse(){const state=s(),n=state.flags.array_warehouse_attempts?.length||0;if(state.flags.ext_warehouse_pending){open('Barang yang terusik',paragraph('Selesaikan pertemuan ini dahulu. Percobaan sebelumnya tetap tersimpan.'),[['Hadapi barang terusik',()=>startBattle('warehouse')],['Kembali',close]]);return;}
  const row=WAREHOUSE[n];if(!row)return;open('Gudang Barang Tertinggal · '+(n+1)+'/5',paragraph(row[0]+' · '+ITEM_CLUES[n])+paragraph('Lare membuka catatan para pencari barang:')+OWNER_CLUES.map(([name,clue])=>paragraph(name+' — '+clue)).join(''),[...WAREHOUSE.map(([,owner])=>[owner,()=>{if(!commit(state=>warehouseChoice(state,owner)))return;if(s().flags.ext_warehouse_pending){close();startBattle('warehouse');}else if(questDone(s(),'NR-S01')){close();toast('Lare Wengi bergabung. Jimat tersimpan.');}else warehouse();}]),['Kembali',close]]);
 }
 function kayuri(){if(questDone(s(),'NR-S02')){open('Kayuri · bait yang kau pilih',kayuriResponse(s().flags.array_kayuri_tones).map(paragraph).join('')+paragraph('Empat ratus bait telah berlalu. Pilihan penutupmu tetap hidup di dalam lagu.'),[['Kembali',close]]);return;}if(s().flags.array_memorized_baits?.length===10){open('Syair yang Menyerang',kayuriResponse(s().flags.array_kayuri_tones).map(paragraph).join('')+paragraph('Urutan baitmu tersimpan. Bertahan empat ronde untuk menyelesaikan perjalanan Kayuri.'),[['Bertahan empat ronde',()=>startBattle('poem')],['Kembali',close]]);return;}
  open('Sepuluh bait Kayuri',BAIT_LINES.map((line,i)=>paragraph((i+1)+'. '+line)).join('')+paragraph('Ingat urutan ini. Setelah itu, pilih dua nada penutup sesuai hatimu.'),[['Aku sudah mengingat',()=>puzzle('Empat Ratus Bait','Ulangi sepuluh bait perjalanan.',BAITS,BAITS.map((_,i)=>i),()=>tones([]))],['Kembali',close]]);
 }
 function tones(chosen){open('Nada penutup '+(chosen.length+1)+'/2',paragraph('Tidak ada jawaban salah. Kayuri akan mengingat pilihanmu.'),['Perlindungan','Pengampunan','Keberanian','Kepasrahan'].map(t=>[t,()=>{const next=[...chosen,t];if(next.length<2)tones(next);else if(commit(state=>rememberBaits(state,BAITS,next)))kayuri();}]));}
 function altar(page=0){if(s().flags.flag_ensiklopedia_sacrificed_nggarindu){open('Manifestasi Kabut',paragraph('Entri yang direlakan tetap tercatat untuk penebusan di Smarana. Fragmen dan keputusan tidak hilang bila kalah. Bawa minimal dua karakter aktif: kabut mengambil skill dari karakter berbeda. Kabut menyerap tiga skill selama tiga fase; Bertahan selalu tersedia.'),[['Hadapi manifestasi',()=>startBattle('manifest')],['Kembali',close]]);return;}
  open('Harga Perlindungan',paragraph('Pilih satu entri Ensiklopedia untuk direlakan. Entri dapat dipulihkan melalui SM-M07; wilayah itu belum tersedia dalam preview ini.'),[...s().collections.encyclopedia.slice(page*5,page*5+5).map(entry=>[LORE[entry]?.title||entry,()=>open('Relakan entri ini?',paragraph(LORE[entry]?.text||'Entri lama dari perjalananmu.')+paragraph((LORE[entry]?.title||entry)+' akan dikeluarkan dari koleksi aktif. Pilihan tersimpan meskipun battle gagal.'),[['Batal',altar],['Relakan '+(LORE[entry]?.title||entry),()=>{if(commit(state=>sacrificeEntry(state,entry)))altar();}]])]),...(page>0?[['Sebelumnya',()=>altar(page-1)]]:[]),...((page+1)*5<s().collections.encyclopedia.length?[['Berikutnya',()=>altar(page+1)]]:[]),['Kembali',close]]);
 }
 function house(){if(questDone(s(),'NR-H01')){open('Kenangan Ranaya Muda',paragraph('Tiga ingatan rumah telah menjadi bagian Ensiklopedia. Sparring opsional memberi Sanra bonus stat permanen 5% (baseline tuning).'),[['Sparring opsional',()=>startBattle('youngRanaya')],['Kembali',close]]);return;}
  puzzle('Rumah Ranaya Lama',s().options.accessible?'Sambungkan motif tepi yang sama dari lingkar kosong hingga lingkar penuh.':'',MURAL_LABELS,[0,1,2,3,4],()=>{if(!commit(state=>solveMurals(state,[0,1,2,3,4])))return;open('Ingatan sebuah rumah',paragraph('Ranaya mengenang warga yang memilih berlindung bersama. Kabut menjaga rumah mereka, tetapi juga menjauhkan mereka dari jalan pulang. Kesepakatan, kabut, dan rumah kini tercatat sebagai tiga ingatan yang dapat kau baca di Ensiklopedia.'),[['Lihat kenangan Ranaya',house],['Kembali',close]]);},undefined,{html:muralBoard(s().options.accessible)});
 }
 function wira(){const n=s().flags.counter_restricted_battles||0;open('Musuh yang Sebenarnya',paragraph(n<3?'Latihan '+(n+1)+'/3. Wira hadir sebagai anggota pinjaman. Ia boleh menyerang paling banyak satu kali; lebih dari itu tidak menambah progres latihan.':'Sang Sunyi tidak menyerang. Lewati lima ronde tanpa serangan. Menyerang hanya menunda kemajuan, tidak mereset ronde sabar.'),[[n<3?'Mulai latihan terbatas':'Hadapi Sang Sunyi',()=>startBattle(n<3?'restricted':'sunyi')],['Kembali',close]]);}
 return {interact(id){
  if(!sideVisible(s(),id))return false;
  if(id==='lare')warehouse();else if(id==='kayuri')kayuri();else if(id==='altar')altar();else if(id==='oldHouse')house();else if(id==='wira')wira();
  else if(id.startsWith('memory')){const n=+id.slice(6);if(!memoryWindow(s(),n,getIdle())){toast('Diam dekat jejak ini. Kenangan muncul sejenak ketika kompas berhenti.');return true;}
   if(commit(state=>collectMemory(state,n)))toast('Kenangan terlupakan · '+s().flags.counter_nggarindu_fragments+'/5');}
  return true;
 }};
}
