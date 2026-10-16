# Review pekerjaan tersisa — baseline 0.11

> Pembaruan 0.12: prioritas 1–4 telah ditindaklanjuti. Clue Lare, respons Kayuri, puzzle lagu/mural, serta perubahan cerita/traversal yang disebut dalam review sudah terintegrasi. Pose/jejak M04 masih visual prototipe. [Laporan dan batas acceptance](../Nawantara-Prototype-0.1/docs/PRODUCTION_012.md). Daftar di bawah adalah baseline sebelum increment; audit seluruh beat belum ditutup.

Tanggal: 24 September 2026. ID backlog RV-01 dst. menggantikan penomoran percakapan yang ambigu; tidak mengubah ID quest.

Review ini membaca state proyek, rencana fase/milestone, laporan produksi, sumber Quest R1/World Bible, serta implementasi quest, UI, world, progression dan save terkait. Ringkasan QA 0.11 diperiksa ulang dengan `node tests/summarize-011.mjs`: 12 laporan tetap cocok dengan hash HTML `f5724ab130d41697840975dea53829f22ad06e31c32b8906bb83c767c1abfa9c`. Tidak menjalankan ulang 91 tes domain atau 11 suite browser dan tidak mengubah gameplay dalam review ini. Ini audit cakupan dan bukti, bukan jaminan bebas semua bug.

## Yang sudah dikerjakan — jangan dimasukkan kembali sebagai fitur kosong

- Jalur/adaptasi 13 quest Nirwasita: 6 main, 4 side, 3 hidden; tujuh zona prototipe.
- 11 karakter R1 dapat direkrut; 11 item unik mempunyai jalur perolehan dan efek. Pengelana juga playable. Katalog 100 karakter belum berarti 100 karakter playable.
- Party per unit, leveling 1–60, equipment, Awaken berbiaya dan Titis Ulang Watu.
- Vendor mengingat penolakan, reuni Ranaya, stage lagu, cabang/retry/audio sintetis M04.
- Titah Nirsmara, 27 kartu lore, pengorbanan permanen, Sloka/Mandala dan upgrade skill.
- Perbaikan Kepeng buntu M05, XP per karakter, jurnal lokasi/langkah/counter.
- Save/migrasi/backup/recovery dasar; bukti 91 tes domain, 11 suite browser dan satu audit balance pada 0.11. Cakupan browser region memakai permainan baru untuk main route dan fixture terpisah untuk cabang.

## Prioritas A — sebelum menyatakan Nirwasita lengkap

| ID | Status | Pekerjaan tersisa dan bukti | Kriteria selesai |
|---|---|---|---|
| RV-01 | Sebagian | **Puzzle Lare S01:** `src/side-ui.js` menampilkan nama pemilik sebagai jawaban langsung. Ganti dengan petunjuk barang/pemilik yang dapat disimpulkan, mengikuti sumber. | Lima pasangan dapat ditalar; salah/retry/reward tetap teruji; pemain memahami clue tanpa jawaban dibocorkan. |
| RV-02 | Sebagian | **Kayuri S02:** dua tone disimpan tetapi tidak menghasilkan dialog reaktif. Sepuluh kata masih adaptasi bait; puzzle memakai rotasi tetap. | Pilihan tone memiliki respons nyata dan tersimpan; materi bait serta susunan pilihan ditinjau terhadap script dan aksesibilitas. |
| RV-03 | Sebagian | **Puzzle lagu/mural:** M05 dan M06 berbagi sequence generik Air→Jalan→Cahaya→Pulang; H01 menampilkan urutan ikon jawabannya. | Beat lagu/distraktor dan mural sesuai script; recall masih dapat dimainkan tanpa audio; fail/retry teruji. Tiga lore H01 sudah ada, bukan perlu dibuat dari nol. |
| RV-04 | Sebagian | **Beat main quest:** M01 intro/ekstraksi dan M02 puzzle sungai dua tikungan + kemunculan Lampah bersama dua NPC belum setara script. M03 penutup naratif dan M06 ringkasan konsekuensi perlu diperdalam. | Matriks beat sumber→implementasi→tes untuk enam main, dengan setiap pemadatan disengaja dicatat; tidak hanya mengandalkan status quest selesai. |
| RV-05 | Sebagian | **M04:** landmark, cabang salah, dua sosok dan cue stereo telah dibuat. Isyarat arah pandang/jejak Adi, keterbacaan lingkungan dan kualitas suara masih adaptasi. | Navigasi dapat dipahami pemain tanpa hafal walkthrough; uji suara aktif/mati dan aksesibilitas. Animasi final masuk tahap visual terpisah. |
| RV-06 | Sebagian | **UI quest/equipment:** jurnal belum menampilkan ringkasan reward dan syarat buka yang rinci; Nggarindu masih memilih entri dari ID mentah tanpa pagination. Detail skill belum menghitung seluruh angka efektif setelah equipment/passive/status. | Nama/konteks entri terbaca, pilihan panjang dapat dioperasikan; reward/syarat jelas; angka efektif tidak bertentangan dengan combat. |
| RV-07 | Belum tervalidasi pengguna | **Balance/pacing:** biaya Awaken, Sloka, XP, latihan berulang, bonus H01, boss dan penyerapan Nggarindu masih baseline. Musuh latihan tetap stat tetap; level tinggi dapat memanen cepat. | Playtest mencatat waktu menuju Lv40/60, Sloka, Awaken dan item; data durasi/kesulitan mendasari tuning. Audit 0.11 hanya membuktikan keterjangkauan, bukan keseimbangan. |
| RV-08 | Sebagian | **QA penerimaan region:** belum ada bukti 0.11 berupa satu perjalanan baru yang menjalani semua konten kompatibel tanpa impor level/quest/material. Belum seluruh kombinasi kit/item/party/cabang disertifikasi. | Jalur legal dari awal untuk progres/rekrut/item, cabang eksklusif pada save terpisah, reload/retry/kalah; ulangi jalur utama sesuai target gate dan dokumentasikan batas cakupan. |
| RV-09 | Belum diimplementasi | **Sistem dunia R1:** siklus siang–malam beserta pengaruh kompas/encounter, variasi encounter dan vendor/item umum penuh. Tujuh zona masih koridor greybox. | Sistem dan katalog yang diwajibkan sumber terikat runtime, memiliki save dan QA; bedakan dari vendor fragmen yang sudah selesai. |
| RV-10 | Belum tersertifikasi | **Kualitas teknis:** minimum hardware/browser belum ditetapkan; belum ada profiling GPU nyata, loading/memori/frame time, context-loss, serta QA aksesibilitas lebih luas dari modal/640px. | Profil perangkat dan browser target, hasil pengukuran, uji zoom/keyboard/audio off/reduced motion, serta perbaikan berdasar temuan. Mobile/gamepad bukan syarat sampai target diperluas. |

Urutan kerja yang disarankan: RV-01 → RV-02 → RV-03 → RV-04/RV-05 → RV-06; siapkan playtest RV-07 dan QA RV-08 sambil mengerjakan fitur. RV-09 perlu scope regional yang eksplisit, RV-10 diperlukan sebelum penerimaan rilis. Ini prioritas kualitas/konten; review ini tidak menetapkan bug Critical baru.

## Prioritas B — fondasi dan scope penuh berikutnya

| ID | Status | Pekerjaan tersisa | Kriteria selesai / dependensi |
|---|---|---|---|
| RV-11 | Fondasi saja | **Anawil empat mode UI:** enum/policy/hide HUD sudah ada; interaksi gestur, battle ikon, tanpa teks/HUD secara utuh belum tersedia. | Spike end-to-end tanpa mengubah angka/state internal; uji tidak ada bocoran teks lewat dialog/tooltip/toast. Sebelum produksi finale. |
| RV-12 | Fondasi saja | **State lintas-region dan ending:** helper score/ending sudah ada, tetapi UI pemulihan input ending ambigu, alur pilihan R2–R9, provenance dan tiga ending melalui gameplay legal belum selesai. | Semua input berasal dari jalur quest nyata; migrasi ambigu dapat diselesaikan pengguna; uji batas dan tiga ending reachable. |
| RV-13 | Belum diimplementasi | **Kadewan R2:** 15 quest, ritual, cabang permanen, karakter/item, transisi dari Nirwasita. | Milestone M3; peta “tujuan terbuka” saat ini belum konten playable. |
| RV-14 | Belum diimplementasi | **Smarana/Wanasunya R3–R4:** 17+17 quest, jual/tebus Ensiklopedia, penebusan Nggarindu SM-M07, spectator dan urutan region. | M4, termasuk kedua urutan region dan transaksi idempoten. Kehilangan permanen Titah Nirsmara tetap tidak dapat ditebus. |
| RV-15 | Belum diimplementasi | **Kalamrtu/Himagiri R5–R6:** 18+14 quest, aksara/kutukan, Kelancangan, ritual dan saksi. | M5, histori/konsekuensi permanen dan kedua urutan region teruji. |
| RV-16 | Belum diimplementasi | **Rajawani/Jaladri R7–R8:** 16+16 quest, Warisan, fragmen, reset peta dan pilihan permanen. | M6, koleksi/reward tidak terduplikasi dan pilihan bertahan setelah reset. |
| RV-17 | Belum diimplementasi | **Anawil R9:** 12 quest, callback delapan region dan finale tiga ending. | M7, bergantung RV-11/RV-12 serta konten regional sebelumnya. |
| RV-18 | Sebagian data saja | **Roster/item penuh dan validasi konten:** 89 karakter di luar 11 R1 belum memiliki kit/rekrut runtime lengkap; item umum/spesial/unik luar R1, registry encounter dan graph seluruh 138 quest belum terikat penuh. | Implementasi per region, sumber→data→efek→tes; katalog referensi dan registry 248 evidence HP bukan bukti combat terintegrasi. |
| RV-19 | Sebagian | **Padepokan dan sistem lintas-region:** keberadaan Adi sebagai pendukung masih hasil dialog/flag; fungsi hub dan sistem koleksi di region lain belum menjadi alur gameplay. | Hub dan dampak pilihan tersedia sesuai sumber saat milestone terkait; jangan membuka konten kosong sebagai selesai. |

R2–R9 mencakup **125 quest di luar 13 quest R1**, sesuai angka roadmap. Jumlah ini tidak memperhitungkan ulang beat R1 yang masih perlu disempurnakan.

## Tahap visual yang sengaja ditunda

**RV-20 — Blender/Unity:** model karakter/lingkungan final, rig, animasi signature, ekspresi, portrait/icon, VFX, audio final dan integrasi visual. Proyek Unity belum dibuat; editor/pipeline/format ekspor dan kontrak event animasi belum ditetapkan. Review lore/budaya serta asal/lisensi aset perlu bukti per aset. Ini mengikuti instruksi pengguna untuk mengerjakan animasi dan 3D kemudian; bukan blocker untuk memperbaiki mekanik sekarang. Migrasi seluruh game dari Three.js ke Unity belum diputuskan.

## Sebelum launch dan setelah launch

- **RV-21 — Rilis:** paket RC, host, HTTPS/cache, uji save lintas origin lewat ekspor/impor, build reproduktif, asset/license manifest, changelog/known issues, rollback yang diuji. G5 belum dijalankan; belum ada publikasi.
- **RV-22 — Operasional:** saluran feedback/bug, rencana hotfix, pengukuran opt-in bila dibutuhkan, laporan migrasi dan roadmap pascarilis. G6 belum dijalankan; backend bukan kewajiban MVP.
- **RV-23 — Perencanaan/penerimaan:** tetapkan perangkat minimum, kapasitas tim, tenggat/budget dan acceptance milestone yang dibekukan. Konsolidasikan tabel gate/GDD historis agar angka 0.2/0.5 tidak terbaca sebagai status terbaru. Keputusan C01–C14 sudah diterima; tidak perlu dibuka ulang tanpa alasan baru.

## Keputusan review

G1/desain dasar selesai; G2 penuh dan M1/M2 belum ditutup. G3/G4 lulus per increment 0.11, bukan sertifikasi seluruh game. G5/G6 belum dijalankan. Problem “7–8 selesai” pada laporan sebelumnya berarti increment ekonomi+jurnal/QA yang cakupannya diasumsikan dari backlog, bukan seluruh balance/polish dan penerimaan region selesai.

Tidak ada persentase selesai baru karena bobot pekerjaan belum disepakati. Tindak lanjut paling konkret adalah **RV-01: ubah puzzle Lare menjadi penalaran berbasis clue**, kemudian dialog reaktif Kayuri.

Referensi: [state aktif](PROJECT_STATE.md), [rencana penuh](DEVELOPMENT_PLAN.md), [laporan0.11](../Nawantara-Prototype-0.1/docs/PRODUCTION_011.md), [bukti QA](../Nawantara-Prototype-0.1/qa/production-summary-011.json), [handoff visual](UNITY_BLENDER_HANDOFF.md).
