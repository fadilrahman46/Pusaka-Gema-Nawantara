# PROJECT_STATE — kelanjutan Three.js

**Project:** Pusaka: Gema Nawantara
**Updated:** 2026-09-29
**Current phase:** Phase3 Production / Phase4 QA — increment quest/kit/leveling/equipment M1, build0.12. Pra-produksi workstream battle per-unit/quest graph/Anawil belum seluruhnya ditutup.

## Concept snapshot

- RPG naratif 3D browser; explore→dialog/puzzle/battle→rekrut/item→save→progress.
- Three.js ditetapkan pengguna; stack lokal JavaScript modules, Three0.186.0/esbuild0.25.12/DOM UI.
- Full scope: 9 region, 100 karakter, 138 quest; World Bible menyebut 63 zona dan ~86 jam desain.
- ASSUMPTION: tim kecil, desktop keyboard/mouse dahulu; kapasitas, budget dan tenggat belum ditetapkan. Target pengguna: Chrome/Firefox/Edge, CPU 1 GHz, RAM 512 MB–2 GB (anjuran 4 GB), penyimpanan sekitar 500 MB; belum tersertifikasi pada hardware nyata.

## Decisions locked in

- Hanya 16 sumber Markdown dalam kategori yang diminta dipakai untuk konten.
- Skill game-sdlc, threejs-platform-game, game-uiux-character-design diterapkan dalam rencana.
- Genre sumber dipertahankan; skill platformer digunakan untuk kualitas traversal.
- MVP bertahap: M1 core Nirwasita; M2 Nirwasita lengkap; M3–M7 perluasan season/finale, tanpa menghapus full scope.
- 100 karakter deterministik, cap60, Awaken mulai40.
- C01–C14 ACCEPTED atas instruksi pengguna; DESIGN_DECISIONS revision naw-2026-09-18.1 menjadi override terbatas sumber lama. Growth2%+anchor, Common ally tanpa passive, Nirsmara via lagu, ending adapter, checkpoint dan kontrak combat sudah dikunci.
- Sumber16 Markdown asli tetap utuh. Aplikasi existing kini diperbarui ke build0.12 sesuai keputusan produksi bertahap.

## Current milestone

M0: inventaris dan paket rencana selesai. Audit mekanis PASS:16 dokumen/100 heading karakter/138 quest unik/341 token state. Ditemukan64 baris literal PLACEHOLDER/TBD, termasuk catatan historis; bukan64 bug terkonfirmasi.

B02 rekonsiliasi selesai pada tingkat desain:14/14 keputusan diterima. Verifikasi rarity100 entri dan matematika contoh ada di DECISION_VERIFICATION. Registry evidence HP tersedia untuk binding encounter pada produksi.

Produksi fondasi0.2 selesai: schema2/migrasi/backup/recovery, enum Adi/ending eksplisit, commit pilihan permanen, floor damage+growth anchor helper, kompas presisi saat bergerak, fokus keyboard/checkpoint R, tiga siluet karakter. Bukti:18/18 tes domain, build, smoke browser tanpa error, browser save/UI, Saras permanen, dan3/3 perjalanan legal NR-M01–M06 berturut-turut. Laporan lengkap: [PRODUCTION_02.md](../Nawantara-Prototype-0.1/docs/PRODUCTION_02.md).

Produksi 0.3: pengguna telah menguji 0.2 dan meminta lanjut. Party per unit, empat kit level 1, target/cooldown/status, pengaturan dan latihan party, quest graph enam main quest serta migrasi party opsional telah terintegrasi. 29 tes domain dan browser party/save/permanent-choice lulus; tiga walkthrough enam misi lulus selama increment, termasuk penerimaan HTML final dengan hash yang cocok. Laporan: [PRODUCTION_03.md](../Nawantara-Prototype-0.1/docs/PRODUCTION_03.md).

Produksi 0.4: lima quest tambahan (Lare, Kayuri, Nggarindu, Rumah Ranaya, Wira), tujuh kit aktif tambahan (11 total Nirwasita), progression 1–60 dan equipment empat slot terintegrasi. Save lama dipertahankan, backup pra-progression sekali, reward Saras lama dipulihkan idempoten. 43/43 tes domain PASS. Browser route utama dan lima quest tambahan PASS pada hash HTML final yang sama; migrasi, responsif dan equipment juga PASS. Bukti penerimaan final di qa/production-summary-04.json. [Laporan 0.4](../Nawantara-Prototype-0.1/docs/PRODUCTION_04.md).

Review 0.4.1: perbaikan penolakan status/cooldown Lare, pencatatan anti-pengulangan Nirsmara, dan kekebalan Takut Kayuri terintegrasi. 46/46 tes domain, build dan browser party/responsif/save PASS. [Review 0.4.1](../Nawantara-Prototype-0.1/docs/REVIEW_041.md). Gate M1 penuh tetap terbuka.

Produksi 0.4.2: NR-S03 kini memiliki dialog tiga lapis, tone dari dua jawaban, persimpangan WAITED dengan traversal, dan adegan simbolis satu hit FORCED_PAST. Progres dialog/pending tersimpan; save lama tetap berlaku. 49 tes domain dan kedua jalur browser PASS. [Laporan 0.4.2](../Nawantara-Prototype-0.1/docs/PRODUCTION_042.md).

Produksi 0.5: detail skill, stat Awaken 11 karakter, dan tujuh passive non-Common terintegrasi. 57 tes domain dan browser Awaken/party PASS. Common tanpa passive; Watu menunggu Titis Ulang. Aktivasi Awaken gratis hanya untuk preview, biaya material belum ditetapkan. [Laporan](../Nawantara-Prototype-0.1/docs/PRODUCTION_05.md).

Instruksi terbaru: animasi dan desain 3D dikerjakan kemudian menggunakan Unity dan Blender. Three.js tetap menjadi prototipe mekanik/UI saat ini. [Catatan tahap visual](UNITY_BLENDER_HANDOFF.md).

Produksi 0.5.1: empat P1 review Nirwasita diperbaiki (gate Adi parsial, bantuan tetua, identitas musuh, segel33%). 60 tes domain dan browser target PASS. [Laporan](../Nawantara-Prototype-0.1/docs/PRODUCTION_051.md).

Produksi 0.6: sela kabut M01/M02, AI slow Lampah, dan navigasi tiga landmark M04 dengan dua sosok Adi terintegrasi. 62 tes domain, browser target serta main route M01–M06 PASS pada satu hash. Jalur bercabang/gesture/audio M04 masih adaptasi. [Laporan](../Nawantara-Prototype-0.1/docs/PRODUCTION_06.md).

Produksi0.7: vendor mengingat penolakan, harga20→30 baseline, transaksi atomik, stage lagu konsisten dan reuni Ranaya sebelum Menara. M04 mendapat jalur salah/retry dan petunjuk aliran stereo sintetis. 64 tes domain dan browser target PASS. [Laporan](../Nawantara-Prototype-0.1/docs/PRODUCTION_07.md).

Produksi 0.8: ekonomi Awaken dan Titis Ulang Watu diterapkan atas prioritas pengguna. 70 tes domain dan browser transaksi PASS. Save lama dipertahankan tanpa tagihan retrospektif. [Laporan 0.8](../Nawantara-Prototype-0.1/docs/PRODUCTION_08.md). Binding rekrutmen/item saat itu masih usulan; dilanjutkan pada 0.9.

Produksi 0.9: tiga challenge rekrutmen dan lima Titah item terintegrasi melalui Kuta Wisata/jurnal setelah M05. 77 tes domain dan browser delapan challenge PASS; reward atomik, gate level/ownership, retry, full party dan efek equipment terverifikasi. [Laporan 0.9](../Nawantara-Prototype-0.1/docs/PRODUCTION_09.md).

Produksi 0.10: 27 catatan bersumber Markdown, Titah item Nirsmara dengan 15 entri/pengorbanan permanen, Sloka/Mandala dan upgrade 33 skill sesuai cap sumber terintegrasi. 87 tes domain dan browser fitur baru/regresi challenge PASS. [Laporan 0.10](../Nawantara-Prototype-0.1/docs/PRODUCTION_010.md).

Produksi 0.11: paket reward latihan terbarukan, XP per karakter, jurnal langkah/lokasi/counter, audit biaya Sloka dan regresi region. 91 tes domain, 11 suite browser dan satu audit balance PASS pada satu hash; bukti di [ringkasan QA](../Nawantara-Prototype-0.1/qa/production-summary-011.json). [Laporan 0.11](../Nawantara-Prototype-0.1/docs/PRODUCTION_011.md). Nomor 7–8 diasumsikan mengikuti backlog karena belum tercatat eksplisit.

Produksi 0.12: prioritas 1–4 review dikerjakan: clue Lare, respons dua tone Kayuri, bait Menara/Nirsmara, mural visual, ekstraksi fisik M01, sungai/dua NPC M02, pose/jejak prototipe M04, dialog penutup dan konsekuensi Adi. Laporan dan acceptance: [PRODUCTION_012.md](../Nawantara-Prototype-0.1/docs/PRODUCTION_012.md). 98 tes domain dan tujuh suite browser PASS pada hash final yang sama; [ringkasan QA](../Nawantara-Prototype-0.1/qa/production-summary-012.json). Bukan sertifikasi seluruh beat sumber.

## Open questions / risks

- Tidak ada keputusan C01–C14 yang masih PROPOSED. Angka baseline baru perlu tuning, bukan dianggap hasil playtest.
- Binding seluruh encounter dan kelengkapan stat/skill tetap pekerjaan produksi. Kernel per-unit dan graph enam main ditambah seluruh entri side/hidden R1 tersedia; beberapa beat tetap adaptasi, bukan seluruh C08/138 quest. Schema2 sudah integrated untuk Nirwasita; recovery pilihan ending ambigu belum menjadi fitur UI. Unknown input ditolak oleh helper finalisasi.
- Navigator M1 kini lulus3/3; target vendor diperbaiki ke jalur bebas collider. R2–R9 belum implemented.
- M1 penuh belum ditutup: 11 kit aktif Nirwasita + Pengelana baseline, leveling dan equipment sudah tersedia. Beat main M04 lengkap dan kualitas presentasi/narasi quest masih terbuka; NR-S03 kini terintegrasi dengan adapter naratif satu hit. Uji kit tamu tidak memberi ownership. Hooks Anawil belum gesture UI lengkap.
- Final character art, hardware profile, balance, semua kit dan branch belum disertifikasi.
- Persyaratan lore card/review budaya dari sumber perlu dilacak per asset; tidak ada riset eksternal sesi ini.

Review kelengkapan Region 1: [NIRWASITA_GAP_REVIEW.md](NIRWASITA_GAP_REVIEW.md). Ditemukan prioritas koreksi registry tipe/elemen encounter, angka segel Menara, gate dialog Adi parsial, dan fallback tetua setelah tiga kegagalan. Temuan awal berasal dari review statis; keempat P1 sudah diperbaiki dalam 0.5.1. Nama #04 yang benar: Watu Palindra.

## Review terbaru — 24 September 2026

[Daftar pekerjaan tersisa RV-01–RV-23](REVIEW_BACKLOG_011.md) mengonsolidasikan seluruh backlog setelah 0.11. Review statis dan pencocokan ulang 12 laporan dengan hash build lulus; tes gameplay tidak dijalankan ulang. Tidak ada perubahan runtime. Prioritas tersebut telah ditindaklanjuti pada 0.12; lihat laporan terbaru untuk scope yang selesai dan batasnya. Berikutnya: sisa beat sumber, UI lanjutan (RV-06), playtest balance dan QA penerimaan. Balance dan QA seluruh region tidak dianggap tuntas hanya karena increment 7–8 selesai.

## Next step

**Review terbaru 29 September:** prioritas 5–9 baru sebagian ditulis pada source; HTML distribusi masih 0.12 dengan hash penerimaan lama. Seluruh 98 tes domain dijalankan ulang dan lulus, tetapi fitur dunia/bekal/grafis baru belum memiliki tes khusus dan QA browser. Belum ada build/penerimaan 0.13. Lihat [review source berjalan](../Nawantara-Prototype-0.1/docs/REVIEW_013_WIP.md). Langkah terdekat: audit/test source baru, build kandidat, regresi browser, perjalanan penuh tanpa impor progres, lalu profil balance/hardware. Catatan berikut merupakan riwayat sebelum pekerjaan 5–9.

Prioritas 1–2 selesai pada 0.8; problem 3 (tiga rekrutmen) dan 4 (lima Titah item sederhana) selesai pada 0.9. Problem 5–6 (pasangan dikonfirmasi pengguna) selesai pada 0.10: Titah item Nirsmara dan Sloka/Mandala. Increment 0.11 memperbaiki Kepeng buntu M05 dan XP lintas level, menambah panduan jurnal 13 quest, serta menguji regresi region pada satu hash. Pada 0.12, empat prioritas review telah diimplementasikan sesuai laporan. Berikutnya: audit sisa beat (termasuk revive tutorial dan salinan Kabut), UI lanjutan, playtest balance pengguna, dan profil hardware. M04 masih memerlukan animasi/aset final. G2 penuh serta M1 tetap terbuka; G3/G4 diverifikasi per increment, G5/G6 belum dijalankan. Animasi/aset final menunggu Unity/Blender.

## Deliverable log

- [PRODUCTION_05.md](../Nawantara-Prototype-0.1/docs/PRODUCTION_05.md) — detail skill, Awaken dan tujuh passive; batas dan QA.

- [PRODUCTION_042.md](../Nawantara-Prototype-0.1/docs/PRODUCTION_042.md) — kelanjutan quest Adi dan verifikasi kedua jalur.

- [PRODUCTION_04.md](../Nawantara-Prototype-0.1/docs/PRODUCTION_04.md) — quest, kit, leveling, equipment dan QA increment terbaru.

- [PRODUCTION_03.md](../Nawantara-Prototype-0.1/docs/PRODUCTION_03.md) — increment party/quest, bukti QA dan baseline tuning.

- [Build0.12](../Nawantara-Prototype-0.1/dist/Nawantara-3D.html) — aplikasi playable terbaru.
- [PRODUCTION_02.md](../Nawantara-Prototype-0.1/docs/PRODUCTION_02.md) — keputusan gate, implementasi, hasil QA, batas scope.

- [DEVELOPMENT_PLAN.md](DEVELOPMENT_PLAN.md) — enam fase, milestone, arsitektur, backlog, dependensi.
- [UIUX_CHARACTER_DESIGN.md](UIUX_CHARACTER_DESIGN.md) — flows, components, visual tokens, karakter.
- [SOURCE_RECONCILIATION.md](SOURCE_RECONCILIATION.md) —14 konflik ditutup pada tingkat desain dan bukti audit awal.
- [DESIGN_DECISIONS.md](DESIGN_DECISIONS.md) — kontrak final C01–C14, migration dan acceptance.
- [DECISION_VERIFICATION.md](DECISION_VERIFICATION.md) — hasil pemeriksaan aktual sumber/desain.
- [ENCOUNTER_REGISTER.json](ENCOUNTER_REGISTER.json) — evidence HP per script/quest/baris, belum runtime content.
- [verify-decisions.mjs](verify-decisions.mjs) — pemeriksaan yang dapat diulang.
- [SOURCE_INVENTORY.md](SOURCE_INVENTORY.md) — hash sumber, quest inventory, kandidat placeholder.
- [PHASE_VERIFICATION.md](PHASE_VERIFICATION.md) — status gate dan test matrix.
- [audit-markdown.ps1](audit-markdown.ps1) — audit yang dapat diulang.

Gunakan state ini untuk sesi pengembangan berikutnya, bersama state prototipe lama sebagai riwayat. Simpan/lampirkan paket planning agar keputusan dan status tidak hilang.
