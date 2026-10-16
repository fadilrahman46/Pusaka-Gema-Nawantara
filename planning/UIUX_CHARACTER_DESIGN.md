# Spesifikasi awal UI/UX dan karakter

18 September 2026. Menggunakan game-uiux-character-design dan kebutuhan sembilan region. Ini arah implementasi/wireframe tekstual; belum mockup final, model 3D, atau hasil usability test. Aturan konten berasal hanya dari 16 Markdown; token visual di bawah adalah USULAN desain.

**Keputusan diterima:** [DESIGN_DECISIONS C10/C12](DESIGN_DECISIONS.md) mengunci empat mode UI, pause/recovery di luar HUD, aturan input-idle8 detik, dan reward pending. C13 mengunci cakupan review budaya. Usulan visual lain tetap perlu diuji dalam greybox; keputusan tersebut tidak menunggu persetujuan tambahan.

## Bahasa visual bersama

Tema: ingatan yang tersisa dalam kabut, batu, air, dan gerak. Panel berbidang sederhana; ornamen hanya pada tepi yang tidak mengganggu informasi. Identitas karakter hadir konsisten pada portrait, dialog, party card, reward, dan world silhouette. Elemen ditandai ikon+bentuk+label selama mode teks aktif, bukan warna saja.

| Token usulan | Nilai / penggunaan |
|---|---|
| Background | #101B20, gelap tenang |
| Surface | #1D3037, panel utama |
| Text | #F4EEDC; secondary #B8CBCB |
| Accent | #D8B46A untuk fokus/seleksi, bukan moral “baik” |
| Success / warning / error | #94C9AB / #E6C56E / #F09B96 + ikon dan kata |
| Type | Body sistem sans-serif 16 px; caption 14; section 20–24; title 32–40; ukur ulang saat zoom |
| Spacing | 4/8/12/16/24/32 px |
| Target interaksi | Usulan minimal 44×44 px; fokus keyboard jelas; jarak antartombol 8 px |
| Motion | Transisi singkat 120–240 ms; reduced-motion meniadakan shake dan blink non-esensial |

Nilai warna wajib diuji kontras di panel final; belum diklaim lolos rasio tertentu. Jangan memberi pilihan cerita “baik/buruk” warna hijau/merah. Kamera usulan third-person agak tinggi dengan arah tujuan terbaca; jarak aktual ditentukan greybox.

## Screen inventory dan flow

| Screen / mode | Tujuan langsung | Isi dan state |
|---|---|---|
| Title | Mulai/lanjut aman | New, Continue jika save valid, Import, Settings; save invalid menampilkan recovery |
| Loading | Tahu progres dan kegagalan | Progres aset aktual jika tersedia, Retry saat gagal; tidak membuat persen palsu |
| Explore HUD | Membaca tempat/tujuan | Party status kiri atas, objective singkat kanan atas, kompas atas, prompt E dekat interaksi |
| Dialog | Memahami tokoh dan memilih | Portrait, nama, teks, pilihan, focus order; skip event hanya dicatat untuk quest relevan |
| Battle | Memilih aksi dan target | Urutan giliran, HP/status, Prana, Dasar/Spesial/Pamungkas/Bertahan sesuai keputusan sistem, target preview |
| Quest journal | Memahami progres | Available/active/completed/unavailable-permanent; hidden quest tidak dibocorkan sebelum ditemukan |
| Party / karakter | Memilih strategi | Owned vs belum didapat, role/elemen, stat, skill, lore card, equipment, Awaken gate |
| Inventory / vendor | Mengelola item | Kategori, effect, lokasi slot setelah diputuskan, biaya, insufficient funds; nontradeable tidak punya aksi jual |
| Collections | Melihat konsekuensi | Ensiklopedia collected/sold/restored; Warisan nontradeable; fragmen per avatar |
| Map / fast travel | Navigasi regional | Zona discovered/locked; peta transient J6; fast travel sesuai unlock sumber |
| Pause / settings | Jeda dan akses | Resume, audio, sensitivity, text size, reduced motion, export save, controls |
| Recovery | Melanjutkan dari gagal | Retry sesuai quest, checkpoint, load backup; pilihan permanen tidak diputar balik |
| Reward / ending | Memahami hasil | Reward satu kali, recruitment, final closure; tidak menampilkan internal Connection Score |

Flow utama: Title→Continue/New→Explore→Interact→Dialog/Puzzle/Battle→Reward→Explore→Autosave. Flow gagal: Encounter fail→Retry checkpoint encounter→kembali bermain dengan permanent-choice ledger tetap. Flow save rusak: Continue gagal validasi→pesan jelas→backup/import; jangan menimpa save baik dengan data invalid.

Wireframe Explore: `[Party] [Kompas] [Tujuan aktif]` di baris atas; dunia/landmark mengisi tengah; prompt kontekstual di area dekat karakter; shortcut `[Jurnal] [Party] [Tas] [Pause]` di bawah. Toast ditempatkan jauh dari judul musuh, pilihan dialog, dan target.

Wireframe Battle: enemy telegraph/target di atas dunia; urutan turn di tepi; party status di bawah kiri; action/target panel bawah kanan. Jangan jadikan world canvas satu-satunya tempat teks penting. Narasi spectator tidak memunculkan command battle palsu.

## Kontrak komponen

- Button: default, hover, focus, pressed, disabled dengan alasan, loading tanpa double submit.
- Dialog: buka memindahkan fokus, Tab tetap di dialog, Escape batal jika diperbolehkan, tutup mengembalikan fokus. Input bergerak/jump tidak berjalan di belakang modal.
- Reward: pending→committed; reload/click ganda tidak menggandakan item atau rekrutmen.
- HP/status: ikon dan pola tetap terbaca; mode tanpa angka mempertahankan bar; nama/tooltip ikut tunduk pada presentation policy.
- Inventory: empty/loading/error/filled; efek buff sementara berbeda dari stat permanen; biaya dan syarat ditampilkan sebelum transaksi.
- Dangerous choice: NR-H03 dan JL-M05 memakai konsekuensi permanen eksplisit sesuai script, pilihan batal aman, commit atomik sebelum lanjut. KD-M04 mengikuti aturan khusus script tanpa menambahkan warning moral generik.
- Responsive: uji 1280×720, 1920×1080, resize sempit dan zoom 200%; panel menjadi scrollable tanpa menutup tombol. ASSUMPTION: mobile bukan acceptance rilis pertama; struktur tetap memungkinkan touch kelak.

## Sembilan antarmuka regional

| Region | Kontrak presentasi | Acceptance |
|---|---|---|
| Nirwasita | Kompas drift ±15–45° setelah posisi diam 5 detik, kembali presisi saat bergerak; landmark ≥3 | Menekan jalan ke tembok tetap dihitung diam; menu pause tidak mempercepat idle |
| Kadewan | Countdown ritual terlihat, efek baru dibuka saat terjadi; malam 2 ronde vs siang 3 | RNG result tidak bocor lewat tooltip/icon sebelum reveal |
| Smarana | Konfirmasi jual menjelaskan entri hilang; status restored berbeda dari asli; harga 5 barang/tren | Cancel tidak memutasi Kepeng/Ensiklopedia; penebusan bisa menarget entri NR-S04 |
| Wanasunya | Maks 5 marker, pilih mana diganti; trail fade/close dan Beast cue | Marker ke-6 tidak menghapus sembarang marker tanpa interaksi; closure tidak disamakan dengan kompas |
| Kalamrtu | Assembly 3 potongan tutorial menuju bentuk rusak/tersirat; drag DAN pilih keyboard | Solusi tidak bergantung drag presisi saja; kutukan balik terbaca |
| Himagiri | Meter historis dan checkpoint dibedakan melalui label/konteks; risiko dialog secara naratif | Reset ritual/checkpoint hanya memutasi field yang ditentukan; tidak membocorkan skor pilihan |
| Rajawani | Galeri Warisan nontradeable, progress threshold, transisi phase skip | 20/30 memberi hasil tepat; tidak ada jual/buang Warisan |
| Jaladri | Fragmen X/40 dengan kategori avatar dan bentuk; map J6 transient; konfirmasi unity | Salah matching memicu encounter; reset peta disengaja, progres fragmen tetap |
| Anawil | Normal/foreshadow→dialog gestur→battle tanpa teks→tanpa HUD | Tidak ada quest marker/angka/nama skill bocor pada mode terlarang; state internal tetap lengkap |

Anawil: pause/settings adalah lapisan sistem terpisah dari HUD dunia. Akses keyboard ke pengaturan tetap tersedia meski HUD hilang, sesuai keputusan C10. Jangan mengembalikan teks/quest hint secara diam-diam. Ikon, gerak, ruang, dan audio memiliki makna yang konsisten sejak region awal. Visual cue pengganti audio harus diuji untuk pemain dengan audio dimatikan tanpa memberikan solusi puzzle.

IdleService berbagi infrastruktur, tetapi kondisi berbeda: kompas memakai posisi diam; pilihan akhir memakai input-idle8 detik. Kebijakan C12 berlaku: pause/blur menghentikan timer; pointer movement/analog drift kecil diabaikan, input gameplay aktif membatalkan diam, resume dikonsumsi oleh layar sistem. Uji keyboard dan assistive input agar hasil ending tidak terpicu karena tab ditinggal.

## Character art pipeline

Setiap ID mendapat sheet: nama/region/role/elemen; lore anchor; siluet pada kamera game; prop utama; proporsi; material; palette; ekspresi/postur; tiga view depan/samping/belakang; portrait; animation list; aturan deformasi/VFX; LOD/budget; sumber dan status review. Data skill diambil dari Guide, bukan diganti skill generik karena model belum tersedia.

Urutan: tiga karakter representatif (Lampah Sinaru, Tandaraga, Nirsmara) → seluruh 11 Nirwasita → roster per milestone. Semua 100 ID tetap scope penuh. Gunakan rig bersama jika anatomi cocok; Ghost/Beast/Spirit tidak dipaksa memakai rig humanoid. Art prosedural hanya untuk validasi ukuran, collider, dan keterbacaan.

| Karakter / anchor sumber | Desain visual usulan yang dapat dikerjakan | Animasi / acceptance |
|---|---|---|
| #01 Lampah Sinaru: Ghost/Bayu/CC, selalu berjalan bahkan di menu | Sosok ramping condong ke depan, lapisan kain/kabut memanjang; focal point aliran kabut; slate+teal pucat. Proporsi kepala kecil dan tungkai panjang sebagai usulan | Walk loop terus aktif; menu tetap bergerak pelan; gerak tangan meminta maaf; siluet tidak tertukar dengan boss |
| #02 Tandaraga: Human/Teja/Attacker, tombak, formal, menghadap pintu | Siluet vertikal kaku, tombak garis panjang, lapisan kostum orisinal; besi kusam+arang+aksen tembaga. Jangan menyalin regalia nyata | Idle siaga, mengasah, guard sabar, tikaman; visual menunggu tidak dianggap freeze bug; pose pintu terbaca |
| #04 Watu Palindra: batu berongga tanpa wajah/tubuh manusia | Massa batu vertikal dengan rongga sebagai focal point, mineral kasar, tanpa lengan/kepala antropomorfik | Bergeser beberapa sentimeter sebagai komunikasi; collider stabil walau mesh bergeser; arah gestur terbaca |
| #08 Nggarindu: kabut buatan dari kenangan warga, bentuk berubah | Massa kabut berlapis seperti tenunan longgar, siluet luas tank, fragmen cahaya singkat; hindari detail mahal sebelum profiling | Shield melebar; kehilangan HP maksimum terlihat sebagai penyusutan lapisan; berbeda dari ruang kosong Nirsmara |
| #09 Nirsmara: tanpa wajah, ruang kosong berbentuk sosok | Siluet negative-space dengan rim tipis dan distorsi latar terbatas; charcoal/akasa pucat. Fallback mesh gelap bertepi saat efek mahal | Idle perubahan kontur lambat, phase transitions terbaca, pemulihan lewat lagu; tidak dibuat humanoid berwajah generik |
| #84 Wira Senja: presisi tetapi ragu di akhir serangan | Garis kostum menggemakan Tandaraga tanpa duplikasi; focal point senjata warisan orisinal, copper redup | Anticipation presisi lalu hesitation pendek; tetap responsif, bukan input lag |
| #85 Saras Pertiwi: tanah menyimpan berat, idle mengendap | Siluet rendah/lebar, lapisan tanah/batu halus; earth+lichen; kostum abstrak tanpa simbol ritual nyata | Idle tenggelam ringan; root/collider tidak ikut turun; heal dan shield dikenali dari bentuk cue |

Ukuran polygon, atlas, dan draw-call belum ditentukan sebagai angka final. Ukur tiga aset representatif di kamera yang dipilih, kemudian tetapkan budget per karakter, VFX transparan, dan jumlah unit terlihat. Test preview 64px portrait dan siluet grayscale sebelum detail kostum.

## Gate desain karakter dan budaya dari sumber

Guide Lampiran B menjadi checklist produksi: terminologi dipulihkan/ditenangkan/memudar; lagu/aksara/ritual orisinal; tidak merusak situs nyata; lore card bersumber; review karakter berisiko sebelum final art. Catatan reviewer Anawil pada Dokumen Item dicatat apa adanya, tanpa menganggap semua konsep visual mendatang sudah ditinjau. Kebutuhan bibliografi yang belum ada menjadi dependency riset berikutnya; sesi ini tidak menambah sumber di luar Markdown yang diminta.

Lulus desain jika silhouette, role/element cue, identitas sumber, motion, dan readability pada camera aktual terbukti; lulus produksi jika sheet→mesh→animasi→portrait konsisten dan review yang diminta sumber sudah tercatat. Belum ada aset final yang disahkan lewat dokumen ini.
