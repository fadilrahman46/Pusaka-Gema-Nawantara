import {questStatus} from './quest-graph.js';
import {vendorPrice} from './song.js';
// Guidance describes implemented routes; it does not grant progress or expose later story outcomes.
const locations={
 'NR-M01':'Gerbang awal', 'NR-M02':'Teluk Ranaya', 'NR-M03':'Jalur Tandaraga',
 'NR-M04':'Jalur kabut Adi', 'NR-M05':'Kuta Wisata → Teluk Ranaya → Menara', 'NR-M06':'Pelataran Menara',
 'NR-S01':'Gudang Lare, dekat Teluk Ranaya', 'NR-S02':'Kayuri, sesudah Tandaraga',
 'NR-S03':'Adi di Kuta Wisata / persimpangan Menara', 'NR-S04':'Fragmen sepanjang jalur → altar Nggarindu',
 'NR-H01':'Rumah lama Ranaya', 'NR-H02':'Wira di Kuta Wisata', 'NR-H03':'Tiga pusara di sisi barat jalur'
};
export function questGuide(s,id){
 const status=questStatus(s,id),f=s.flags;
 let step='Perjalanan ini sudah tercatat.';
 if(status==='Terkunci')step='Lanjutkan misi utama; persyaratan pembukaan belum terpenuhi.';
 else if(status==='Gagal permanen')step='Pilihan menggali menutup jalur Saras pada playthrough ini. Mengulang interaksi tidak membatalkannya.';
 else if(status==='Terlewat')step='Pertemuan Adi telah terlewat setelah penutupan misi utama region.';
 else if(status==='Aktif')switch(id){
  case 'NR-M01':if(s.flags.ext_tutorial_extract_pending){step='Capai penanda ekstraksi di tenggara gerbang; memilih keluar belum menyelesaikan misi.';break;}step='Amati putaran kompas saat diam, lalu ikuti tanda V ke gerbang.';break;
  case 'NR-M02':step=f.flag_ranaya_song_stage?(f.ext_lampah_trail_found?'Cari Lampah dan selesaikan pertemuannya.':'Temukan sungai dengan dua tikungan tajam di timur jalur dan periksa jejaknya.'):'Dengarkan Ranaya hingga bait pertama selesai.';break;
  case 'NR-M03':step='Bertahan bersama Tandaraga selama lima ronde; menyerang mengulang hitungan kesabaran.';break;
  case 'NR-M04':step=f.ext_adi_puzzle?'Hadapi Kabut Bersuara.':`Penanda ${f.counter_adi_landmarks||0}/3. Ikuti petunjuk Adi dan aliran suara; arah salah dapat dicoba lagi.`;break;
  case 'NR-M05':step=s.fragments.length<3?`Fragmen ${s.fragments.length}/3. Belum: ${['sanra','vendor','elder'].filter(x=>!s.fragments.includes(x)).map(x=>({sanra:'Sanra',vendor:`vendor (${vendorPrice(s)} Kepeng)`,elder:'tetua'}[x])).join(', ')}. Jika Kepeng habis, menangkan latihan party (+10).`:f.flag_ranaya_song_stage<4?'Kembali ke Ranaya dan dengarkan bait terakhir sebelum masuk Menara.':'Lagu lengkap 4/4. Masuki Menara dan buka tiga segel.';break;
  case 'NR-M06':step=s.adi?.pending?'Selesaikan jalur Adi yang telah dipilih sebelum menghadapi Nirsmara.':'Selesaikan dialog Adi yang sudah dimulai, lalu hadapi Nirsmara dengan lagu lengkap.';break;
  case 'NR-S01':step=f.ext_warehouse_pending?'Selesaikan pertemuan akibat jawaban salah, kemudian kembali ke Lare.':`Barang ${(f.array_warehouse_attempts||[]).length}/5; cocokkan dengan pemiliknya di gudang.`;break;
  case 'NR-S02':step=(f.array_memorized_baits||[]).length===10?'Kembali ke Kayuri dan bertahan selama empat ronde.':`Hafalan ${(f.array_memorized_baits||[]).length}/10; dengarkan bait dan pilih dua nada.`;break;
  case 'NR-S03':step=s.adi?.pending?'Lanjutkan pilihan di persimpangan Menara.':`Jawaban ${s.adi?.answers.length||0}/2. Dengarkan kesimpulan Adi; tuntaskan sebelum M06.`;break;
  case 'NR-S04':step=f.flag_ensiklopedia_sacrificed_nggarindu?'Bawa minimal dua anggota party ke altar dan hadapi manifestasi.':`Fragmen ingatan ${f.counter_nggarindu_fragments||0}/5. Setelah lengkap, altar meminta satu entri ensiklopedia; tinjau pengorbanannya.`;break;
  case 'NR-H01':step='Periksa mural rumah lama setelah lagu lengkap. Pertemuan Ranaya muda tersedia setelah teka-teki.';break;
  case 'NR-H02':step=`Latihan terbatas ${f.counter_restricted_battles||0}/3. Wira boleh menyerang maksimal sekali per latihan; sesudahnya bertahan lima ronde dalam Sunyi.`;break;
  case 'NR-H03':step=`Pusara yang dihormati ${s.burials.length}/3. Biarkan ketiganya; menggali menggagalkan jalur ini secara permanen.`;break;
 }
 return {status,location:locations[id]||'Nirwasita',step};
}
