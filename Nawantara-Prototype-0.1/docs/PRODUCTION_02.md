# Production preview 0.2 — fondasi Nirwasita

Tanggal: 18 September 2026. Design revision: `naw-2026-09-18.1`. Ini increment produksi pertama setelah rekonsiliasi, bukan penutupan seluruh M1/M2 atau game sembilan region.

## Keputusan gerbang

**Dapat melanjutkan produksi bertahap untuk fondasi M1.** Sebelum perubahan, baseline lulus10 tes domain, build normal, dan smoke browser Chrome/WebGL tanpa error. Greybox Nirwasita sudah tersedia, GDD milestone tersedia, dan keputusan C01–C14 telah diterima. Fondasi save/recovery/traversal dapat diproduksi tanpa menunggu seluruh aset, region, atau balancing final.

Gate seluruh pra-produksi game **belum** dinyatakan selesai. Prototipe gesture Anawil penuh, battle kernel per-unit, quest graph lintas-region, data skill lengkap dan minimum hardware tetap harus dituntaskan sebelum workstream tersebut dibekukan. Tidak memakai kelulusan smoke sebagai bukti seluruh138 quest siap produksi.

## Yang berubah

- `src/state.js`: save schema2 dan design revision; migrasi nonmutating dari schema1; enum Adi terpisah; branch input Smarana/Himagiri eksplisit; konflik/unknown dibawa sebagai migrationIssues dan tidak diam-diam diberi hasil ending.
- Save lama dicadangkan sebelum penulisan baru. Save corrupt menampilkan recovery; Continue tidak otomatis memulai game baru dan menimpa data. Import invalid mempertahankan progres; pilihan Adi dan penggalian Saras disimpan sebagai satu commit sebelum UI menganggap berhasil.
- `src/core.js`: floor damage, growth2% dengan optional anchor individual dan validasi level1–60; kompas kembali tepat saat bergerak dan drift tetap dalam rentang15–45°. Formula ini belum merupakan integrasi leveling seluruh roster.
- UI: fokus modal dikunci dan dikembalikan, input dunia terhenti saat dialog, focus ring jelas, kontrol min44px, menu responsif; R kembali ke checkpoint tanpa menghapus pilihan; kamera kini Q/T. Kontrak presentationMode tersimpan dan tersedia sebagai hook, bukan implementasi finale Anawil.
- Karakter greybox: Tandaraga memakai siluet tombak; Lampah bergerak terus; Nirsmara memakai kontur ruang kosong tanpa wajah. Ini aset prosedural untuk pengujian, bukan final art yang sudah melalui review regional.
- Harness perjalanan memakai target interaksi yang dapat dilalui. Masalah baseline vendor berasal dari tujuan uji di dalam collider; collider dunia tetap aktif dan quest tidak dimajukan melalui debug hook.

## Verifikasi

| Area | Hasil | Bukti |
|---|---|---|
| Baseline | PASS10/10 + build + browser smoke | Dijalankan sebelum perubahan produksi |
| Domain0.2 | PASS18/18 | `npm test`: core dan state tests |
| Build | PASS | `npm run build`, HTML mandiri dan index |
| UI/save browser | PASS | `qa/production-browser.json`: movement, R, fokus, viewport640, import invalid, migrasi dan backup, recovery corrupt |
| Pilihan Saras | PASS | `qa/permanent-choice.json`: cancel/confirm/reload/import invalid |
| Jalur enam main quest | PASS3/3 berturut-turut | `qa/playthrough-1.json`, `qa/playthrough-2.json`, `qa/playthrough-3.json`; chapter6, Nirsmara recruited, save/reload dan cancel penggalian |
| Visual | Ditinjau | `qa/production-responsive.png`, `qa/nirsmara.png` |
| Hardware/fun | BELUM DIUJI | Headless/software renderer bukan benchmark perangkat pemain |

Playthrough menggunakan input keyboard/mouse dan diagnostik read-only: tutorial kompas, battle, lagu Ranaya, Tandaraga5 ronde, puzzle Adi,3 fragmen, segel, pilihan Adi, Nirsmara33%→lagu, rekrut dan save/reload, cancel penggalian. Fixture save hanya dipakai pada tes recovery/pilihan terisolasi, bukan menggantikan jalur legal main quest.

## Batas penting dan pekerjaan berikutnya

1. Battle masih adapter party abstrak prototipe (termasuk guard80%, heal1Prana), belum battle per-unit C08. Keputusan C08 tetap kontrak target; parameter lama tidak diklaim compliant. Berikutnya refactor kernel battle dan binding kit M1 sebelum M1 dinyatakan lengkap.
2. Enam main quest masih adaptasi; seluruh beat/dialog/script13 quest Nirwasita dan11 karakter belum lengkap. Metadata138 quest/100 roster bukan gameplay penuh.
3. Hook presentation policy belum mengganti dialog menjadi gesture atau melengkapi ikon battle. Jangan menganggap mode CSS sebagai kelulusan UI Anawil. Tidak ada kontrol produk yang membuka mode regional yang belum tersedia.
4. Growth anchor API diuji dengan Lampah; import seluruh tabel stat dan bonus Awaken masih task registry. Save schema2 saat ini memvalidasi playable Nirwasita chapter0–6, bukan kontrak runtime siap untuk9 region.
5. MigrationIssue mencegah finalisasi helper ending tetapi tool recovery keputusan ambigu belum ada karena finale belum playable. Progres Nirwasita tetap dapat dimainkan.
6. Jump/elevated-platform/fall test tidak berlaku pada build traversal RPG datar ini; jump belum diimplementasi. Keputusan menambah traversal vertikal memerlukan greybox dan uji sesuai skill sebelum diterapkan pada quest.

Urutan selanjutnya: quest graph M1, battle kernel C08, registry stat/skill per karakter, golden tests encounter; lalu sisa quest Nirwasita. Full gate M1 tetap terbuka sampai semua acceptance rencana terpenuhi.

## Menjalankan ulang

`npm test` dan `npm run build` dari root aplikasi. Browser: `node tests/production-browser.mjs`, `node tests/playthrough.mjs`, `node tests/permanent-choice.mjs`, `node tests/browser-smoke.mjs`. Set `PLAYWRIGHT_MODULE` dan `CHROMIUM_PATH` bila memakai runtime lokal di luar project. Untuk tiga laporan berurutan, set `QA_RUN` ke1,2,3 pada tiap playthrough.

Sumber desain: [keputusan diterima](../../planning/DESIGN_DECISIONS.md), [rencana](../../planning/DEVELOPMENT_PLAN.md), [gerbang](../../planning/PHASE_VERIFICATION.md). Build: [Nawantara-3D.html](../dist/Nawantara-3D.html).
