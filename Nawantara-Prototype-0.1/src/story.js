// Quest R1 M01–M06/S01/S02/H01. First song line is quoted from M02;
// other prose is authored adaptation where the script specifies themes, not dialogue.
export const OWNER_CLUES=[
 ['Lila','Anak yang kehilangan alas kaki; ukuran kakinya paling kecil.'],
 ['Ranu','Menandai pengikat pakaiannya dengan huruf awal namanya.'],
 ['Banyu','Mengenakan jas besar yang kini tidak bisa dikancingkan.'],
 ['Sari','Membawa daun harum yang dibungkus kain.'],
 ['Jati','Menyimpan kenangan gigi pertamanya dalam kotak kecil.']
];
export const ITEM_CLUES=['Sandal ini terlalu kecil untuk orang dewasa.','Ada satu huruf R terukir pada peniti.','Kancing lebar ini masih membawa benang dari jas tebal.','Kain ini menyimpan aroma daun yang diremas.','Kotak kecil ini berisi satu gigi susu.'];
export const BAIT_LINES=['Air mengingat tepi yang ditinggalkan.','Batu menahan langkah yang tergesa.','Daun membawa bisik dari seberang.','Akar menjaga tanah agar tidak pergi.','Jalan terbuka bagi yang memperhatikan.','Jembatan menghubungkan dua keraguan.','Cahaya menunggu mata yang mencari.','Gerbang tidak selalu meminta perang.','Rumah menyimpan suara yang kita kenal.','Pulang memberi nama pada perjalanan.'];
const RESPONSES={Perlindungan:['Kau ingin ada tempat berteduh ketika suara dunia terlalu keras.','Bait terakhirku akan menjaga tempat bagi mereka yang lelah.'],Pengampunan:['Kau masih menyediakan ruang bagi yang pernah keliru.','Biarlah bait terakhir tidak menjadikan kesalahan sebagai akhir.'],Keberanian:['Kau memilih berjalan meski belum tahu apa yang menunggu.','Bait terakhirku akan menemani langkahmu melewati gentar.'],Kepasrahan:['Kau tahu ada hal yang tidak dapat ditahan oleh genggaman.','Bait terakhirku akan mengantar yang pergi tanpa memaksanya kembali.']};
export const kayuriResponse=tones=>(tones||[]).slice(0,2).map((t,i)=>RESPONSES[t]?.[i]).filter(Boolean);
export const SONG=['Sungai yang belok dua kali, di sanalah jejak tersembunyi.','Air membawa ingatan menuju jalan.','Jalan mencari cahaya yang tetap menyala.','Cahaya menuntun yang tersesat untuk pulang.'];
export const SONG_FRAGMENT={sanra:SONG[1],vendor:SONG[2],elder:SONG[3]};
export function learnedSong(s){if(s.flags.flag_ranaya_song_stage===4)return SONG;return [...(s.flags.flag_ranaya_song_stage>=1?[SONG[0]]:[]),...['sanra','vendor','elder'].filter(id=>s.fragments.includes(id)).map(id=>SONG_FRAGMENT[id])];}
export function shuffled(values,rng=Math.random){const out=[...values];for(let i=out.length-1;i>0;i--){const j=Math.floor(rng()*(i+1));[out[i],out[j]]=[out[j],out[i]];}if(out.length>1&&out.every((v,i)=>v===values[i]))out.push(out.shift());return out;}
export function towerQuestion(seals){const i=3-seals;return {prompt:['Apa yang dibawa air?','Apa yang dicari jalan?','Ke mana cahaya menuntun?'][i],correct:SONG[i+1],choices:[SONG[i+1],SONG[(i+1)%3+1],['Air menghapus semua jejak sampai tak tersisa.','Jalan berakhir ketika cahaya padam.','Cahaya meminta setiap orang melupakan rumah.'][i]]};}
export const SONG_ORDERS=[[0,1,2,3],[0,2,1,3],[3,2,1,0],[1,0,3,2]];
export const songOrderLabel=order=>order.map(i=>SONG[i]).join(' → ');
export function discoverRiver(s){if(s.chapter!==1||s.flags.flag_ranaya_song_stage<1||s.flags.ext_lampah_trail_found)return false;s.flags.ext_lampah_trail_found=true;return true;}
export function beginExtraction(s){if(s.chapter!==0)return false;s.flags.ext_tutorial_extract_pending=true;return true;}
export const extractionReady=(s,p)=>s.chapter===0&&s.flags.ext_tutorial_extract_pending===true&&Math.hypot(p.x-3,p.z+35)<3.8;
export function regionSummary(s){return s.flags.flag_adi_resolution_path==='WAITED'?'Adi memilih menyusulmu sebagai pendukung Padepokan. Kesediaanmu menunggu membuka hubungan baru.':s.flags.flag_adi_resolution_path==='FORCED_PAST'?'Adi tetap di Nirwasita. Jalan terbuka, tetapi ia belum percaya pada dunia luar.':'Adi belum memilih perjalanan bersamamu. Nirwasita menyimpan kemungkinan yang tidak kalian bicarakan.';}
export const CHAPTER_CLOSE={tutorial:'Penunjuk Basah terasa dingin di tanganmu. Penjaga lama tidak lagi menutup jalur. Di selatan, suara dari tepi danau memanggil.',lampah:'Lampah berhenti menuntun kedua pengembara ke jalan yang salah. “Kau tidak tersesat.” Ranaya berpesan: ikuti batu yang diam sambil bergerak.',tandaraga:'Tandaraga menurunkan senjatanya. Perang yang ia tunggu enam puluh tahun tidak datang lewat dirimu. Tongkat Perantau kini menemani langkah yang tidak perlu selalu menyerang.',mist:'Suara tiruan pecah di dalam kabut. Adi yang asli menunggu di jalan menuju Kuta Wisata; Kompas Karat mengingatkanmu untuk tetap memperhatikan dunia.',tower:'Tiga segel terbuka oleh lagu, bukan oleh kekuatan saja. Lentera Ranaya menerangi pintu dalam Menara Pandu. Adi menunggu sebelum langkah terakhir.'};
