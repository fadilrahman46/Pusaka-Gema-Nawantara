> Status terbaru: build0.12. Gunakan [state produksi aktif](../planning/PROJECT_STATE.md) dan [laporan0.12](docs/PRODUCTION_012.md); isi lama di bawah adalah riwayat.

# PROJECT_STATE.md

> **Terbaru 0.10 — 23 September 2026:** Titah item Nirsmara dan Sloka/Mandala selesai; 27 kartu lore, 33 cap skill dari sumber, 87 tes domain serta browser fitur/regresi challenge PASS. [Laporan](docs/PRODUCTION_010.md). Balance, M1 penuh dan launch tetap terbuka.

> **Terbaru 0.9 — 22 September 2026:** tiga rekrutmen dan lima Titah item selesai sesuai problem 3–4. [Laporan](docs/PRODUCTION_09.md). Titah item Nirsmara, Sloka/Mandala serta gate M1/launch tetap terbuka.

> **Terbaru 0.8 — 22 September 2026:** ekonomi Awaken dan Titis Ulang Watu terintegrasi; 70 tes domain dan browser transaksi PASS. [Laporan](docs/PRODUCTION_08.md). M1 penuh dan launch tetap terbuka.

> **Terbaru0.7:** vendor/stage lagu/reuni Ranaya M05 serta cabang/audio M04. 64 tes domain dan browser target PASS. [Laporan](docs/PRODUCTION_07.md). Rekrutmen/item, Titis Ulang dan ekonomi masih usulan terpisah.

> **Terbaru 0.6:** sela kabut M01/M02 dan traversal M04. 62 tes domain, browser target dan main route PASS. [Laporan](docs/PRODUCTION_06.md).

> **Terbaru 0.5.1:** empat koreksi P1 Nirwasita, 60 tes domain dan browser target PASS. [Laporan](docs/PRODUCTION_051.md).

> **Terbaru 0.5 — 21 September 2026:** deskripsi skill, Awaken preview dan tujuh passive non-Common; 57 tes domain dan browser PASS. [Laporan](docs/PRODUCTION_05.md). Tahap animasi/desain 3D berikutnya memakai Unity/Blender.

> **Terbaru 0.4.2 — 21 September 2026:** quest Adi tiga lapis, dua jalur resolusi, penyimpanan progres dan kompatibilitas save. 49 tes domain dan kedua jalur browser PASS. [Laporan](docs/PRODUCTION_042.md).

> **Terbaru 0.4.1 — 21 September 2026:** review dan perbaikan status combat; 46 tes domain dan browser party/responsif/save PASS. [Laporan](docs/REVIEW_041.md).

> **Produksi terbaru 0.4 — 19 September 2026:** lima quest tambahan, 11 kit aktif, leveling 1–60, equipment, migrasi/backup save 0.3. Lihat [PRODUCTION_04.md](docs/PRODUCTION_04.md) dan state planning. Awaken/passive lanjutan, tiga jalur rekrutmen dan beberapa beat naratif masih terbuka. Catatan sebelumnya di bawah adalah riwayat.

> **Produksi terbaru 0.3:** party per unit, empat kit L1, quest graph enam main quest, pengaturan/latihan party, kompatibilitas save 0.2. Lihat [PRODUCTION_03.md](docs/PRODUCTION_03.md). Produksi/QA berlanjut; M1 penuh dan launch belum ditutup. Catatan versi sebelumnya di bawah adalah riwayat.

> Pembaruan desain 2026-09-18: lanjutkan menggunakan [state perencanaan terbaru](../planning/PROJECT_STATE.md) dan [keputusan C01–C14 yang telah diterima](../planning/DESIGN_DECISIONS.md). Status implementasi di bawah adalah baseline historis 0.1, bukan bukti bahwa keputusan baru sudah diterapkan.

> **Produksi terbaru0.2:** increment fondasiM1 sudah diimplementasi dan diuji:18 tes domain, build, browser save/UI, Saras permanen,3/3 walkthrough enam main quest. Lihat [PRODUCTION_02.md](docs/PRODUCTION_02.md). Runtime schema2 aktif; battle masih adapter abstrak, quest graph/kit lengkap/gesture finale belum selesai. Fase kini Production/QA; catatan0.1 berikut dipertahankan sebagai riwayat.

**Project title:** Pusaka: Gema Nawantara
**Last updated:** 2026-09-15
**Current phase:** 3 Production / 4 Testing & QA — milestone 0.1 Nirwasita

## Concept snapshot
- Genre: 3D narrative RPG, eksplorasi, puzzle dan turn-based encounter.
- Platform milestone: desktop browser WebGL2, keyboard/mouse, HTML mandiri.
- Audience: pemain yang menyukai eksplorasi dan cerita; spesifikasi hardware minimum belum diuji pengguna.
- Core loop: jelajah → observasi → interaksi → puzzle/battle → rekrutmen/pusaka → save → lanjut.
- Tech stack: JavaScript modules, Three.js 0.186.0, esbuild 0.25.12, DOM UI; tanpa CDN runtime.
- Scope: asumsi tim kecil. Tujuan produksi penuh 9 region / sekitar 86 jam dokumen tetap roadmap; belum selesai.

## Decisions locked in
- Sumber: 16 lampiran September 2026; file asli tidak diubah.
- Cap karakter 60, Awaken mulai 40; bukan level 100.
- Roster 100 karakter diperoleh lewat quest deterministik; tanpa gacha.
- Nirsmara fase 5500 HP → 66% → 33%, lalu puzzle dan rekrutmen.
- Tandaraga: 5 ronde tanpa serangan.
- Simpan enum Adi pada dua field sesuai R1; adaptasi ke formula ending R9.
- Data sumber terpisah dari implementasi.

## Open questions / unresolved
- Engine/platform produksi final, jumlah anggota, budget, dan tenggat belum ditentukan pengguna.
- Konflik historis serta placeholder sumber tercatat di docs/SOURCE_AUDIT.md.
- Semua dialog, 100 kit, ekonomi dan 138 misi belum tersertifikasi QA manual.
- Perlu pemetaan stat playable lengkap, aturan Prana, passive Common, dan level-skill.

## Assumptions made so far
- Milestone pertama fokus alur utama Nirwasita; merupakan adaptasi durasi/encounter, bukan seluruh beat sumber.
- Art low-poly prosedural dan nada sintetis; bukan aset final.
- HP party dan empat aksi tempur disederhanakan agar core loop bisa diuji.
- Biaya vendor 20 Kepeng, reward 40 Kepeng, tiga siklus Ranaya masing-masing 4 detik adalah parameter prototype.

## Current milestone
Build mandiri `dist/Nawantara-3D.html`; enam main quest adaptasi, Adi, Saras, 7 zona; katalog 100 karakter, 138 quest metadata dan 63 zona sumber. Tes core dan UI browser; status final ada di docs/QA_REPORT.md.

## Known risks / dependencies
- Regresi navigasi otomatis belum stabil ketika jalur lurus ke NPC bertemu collider; run awal pernah mencapai M06 dan reload, tetapi run ulang belum selalu hijau. Lihat QA_REPORT.
- Gameplay R2–R9 belum dibuat; hanya peta/katalog/fondasi data dan ending helper.
- Skill/equipment penuh, Sloka, Mandala, Awaken, input sentuh/gamepad, VO dan cutscene belum dibuat.
- Performa software-renderer headless tidak mewakili GPU pemain; compatibility perangkat nyata belum diuji.
- localStorage terikat browser/file; gunakan ekspor save untuk transfer.

## Next step
Selesaikan 13 quest Nirwasita dan kit 11 karakternya; ubah dispatcher prototipe menjadi quest graph/editor sebelum Kadewan. Setelah playtest pengguna, pilih engine/platform produksi dan estimasi tim.

## Deliverable log
- docs/PLAN_VERIFIED.md — rencana dan gate sebelum coding.
- docs/SOURCE_AUDIT.md — temuan sumber, resolusi sementara dan batas adaptasi.
- docs/GDD_MILESTONE_01.md — GDD milestone.
- docs/QA_REPORT.md — hasil uji dan keterbatasan.
- README.md — cara main/rebuild.
- dist/Nawantara-3D.html — build mandiri.
- src/, data/, tests/ — source dan data hasil ekstraksi.

Lampirkan file ini bersama paket source pada percakapan berikutnya agar pengembangan dilanjutkan dari milestone yang sama.
