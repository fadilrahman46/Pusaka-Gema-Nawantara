import {adiTone,answerAdi,concludeAdi,beginAdiPath} from './adi.js';
import {chooseAdi} from './state.js';
export function createAdiUI({getState,commit,open,close,paragraph,toast}){
 const conclusions={HONEST:'Aku mengerti. Di luar ada bahaya. Aku perlu belajar sebelum melangkah.',HOPEFUL:'Mungkin ada orang yang mau membantu di luar sana. Aku ingin mengenal mereka.',MIXED:'Ada bahaya, tetapi juga harapan. Aku belum tahu semuanya, dan itu tidak apa-apa.'};
 function finish(path){if(!commit(s=>{if(s.adi?.pending!==path||s.chapter!==5)return false;if(!chooseAdi(s,path))return false;s.adi.pending=null;return true;}))return;open('Adi · keputusan tersimpan',paragraph(path==='WAITED'?'Kamu menemukan jalan tanpa mendesaknya. Adi siap menyusul sebagai NPC pendukung di Padepokan.':'Satu benturan singkat. Adi mundur dan tetap selamat; ia memilih tinggal di Nirwasita.'),[['Lanjut menjelajah',close]]);}
 function gate(){const s=getState();
  if(!s.adi?.concluded){dialogue(true);return;}
  if(s.adi.pending==='WAITED'){open('Persimpangan tanpa Adi',paragraph('Cari batu bertanda V di sisi barat jalur menuju menara. Bergeraklah ke sana, lalu pilih jejak yang mengarah ke cahaya menara. Adi menunggu di gerbang.'),[['Cari persimpangan',close]]);return;}
  if(s.adi.pending==='FORCED_PAST'){open('Adi · pertemuan simbolis',paragraph('Adi menghalangi jalan. Satu hit akan membuatnya mundur; ia tidak akan mati. Menutup layar akan menunda pertemuan ini.'),[['Lakukan satu hit',()=>finish('FORCED_PAST')],['Tunda',close,'quiet']]);return;}
  open('Adi · sebelum gerbang terbuka',paragraph('Adi takut pada hasil pertemuanmu dengan Nirsmara. Pilihan ini akan menetapkan resolusi Nirwasita setelah jalurnya diselesaikan.'),[['Tunggu sampai ia siap',()=>{if(commit(s=>beginAdiPath(s,'WAITED')))gate();}],['Lewati jalan sekarang',()=>{if(commit(s=>beginAdiPath(s,'FORCED_PAST')))gate();},'quiet'],['Belum memilih',close,'quiet']]);
 }
 function dialogue(atGate=false){const s=getState(),a=s.adi?.answers||[];
  if(s.adi?.concluded){if(atGate)gate();else open('Adi · dunia luar',paragraph(conclusions[s.flags.flag_adi_dialogue_choice]),[['Sampai bertemu di gerbang',close]]);return;}
  if(a.length===2){open('Adi · kesimpulan',paragraph(conclusions[adiTone(a)]),[['Dengarkan Adi',()=>{if(!commit(concludeAdi))return;if(atGate)gate();else close();}],['Lanjutkan nanti',close,'quiet']]);return;}
  const follow={HONEST:'Kalau ada bahaya, bagaimana aku bisa menjaga diri?',HOPEFUL:'Apakah orang-orang di luar akan menerima seseorang sepertiku?',MIXED:'Bagaimana aku mengenali kapan harus maju dan kapan harus berhati-hati?'};
  open('Adi · dunia luar · '+(a.length+1)+'/3',paragraph(a.length?follow[a[0]]:'Bagaimana dunia luar?'),[['Jujur — berbahaya','HONEST'],['Beri harapan','HOPEFUL'],['Campuran','MIXED']].map(([label,tone])=>[label,()=>{if(commit(s=>answerAdi(s,tone)))dialogue(atGate);}]).concat([['Lanjutkan nanti',close,'quiet']]));
 }
 function trail(){open('Persimpangan · batu bertanda V',paragraph('Jejak pertama kembali ke gerbang. Jejak kedua menuju cahaya menara. Pilih jalan tanpa bantuan Adi.'),[['Kembali ke gerbang',()=>{toast('Jalan ini kembali ke tempat Adi menunggu. Coba arah lainnya.');close();}],['Menuju cahaya menara',()=>finish('WAITED')],['Amati lagi',close,'quiet']]);}
 return {dialogue,gate,trail};
}
