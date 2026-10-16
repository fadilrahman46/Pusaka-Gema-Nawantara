# Gerbang verifikasi per fase

> Status konsolidasi 24 September 2026: [Review backlog 0.11](REVIEW_BACKLOG_011.md). Tabel baseline dan delta di bawah dipertahankan sebagai riwayat.

18 September 2026. Pisahkan **kebenaran/kelengkapan rencana** dari **hasil implementasi**. PASS dokumen tidak berarti game lulus QA.

## Status peninjauan saat ini

| Gate | Review rencana | Status eksekusi gate | Bukti / hal tersisa |
|---|---|---|---|
| G1 Planning | PASS cakupan dan keputusan | PASS desain | Inventaris 16 sumber; 100 karakter/138 quest/341 token state; C01–C14 ACCEPTED; lihat DECISION_VERIFICATION |
| G2 Pre-production | PASS kontrak; playable greybox tersedia | PASS terbatas fondasiM1; full gate masih terbuka | Baseline10 tes/build/browser; traversal/save teruji; battle per-unit, quest graph dan gesture lengkap belum selesai |
| G3 Production | PASS urutan dependensi | AKTIF; increment0.2 selesai | Save schema2 dan UI/checkpoint/karakter diterapkan; bukan M1/M2 selesai penuh |
| G4 QA | PASS cakupan increment | PASS18 tes + browser +3 perjalanan | Bukti di PRODUCTION_02; hardware nyata/fun dan full scope belum diuji |
| G5 Launch | PASS checklist rilis | NOT RUN | Perlu RC, host, paket rollback, hardware terverifikasi |
| G6 LiveOps | PASS siklus patch | NOT RUN | Belum ada data rilis/feedback baru |

Makna PASS review: tugas, keluaran, risiko, acceptance, dan next step tersedia; bukan jaminan desain bebas masalah. CONDITIONAL: pekerjaan independen boleh berjalan, tetapi fitur yang bergantung keputusan belum boleh dibekukan. FAIL: bukti bertentangan dengan acceptance; buka issue dan ulangi setelah perbaikan. NOT RUN tidak pernah disamakan dengan PASS.

## Matriks requirement → sumber → milestone → tes

Status terbaru runtime build0.2: NR-01/NR-02/NR-03 dan jalur adaptasi enam main quest PASS3/3; NR-04 cancel/confirm/reload PASS; SAVE-01/02 lulus cakupan schema2 Nirwasita dan migrasi fixture; UI-01 lulus keyboard/modal/640px; COM-01 dan END-01 lulus unit boundary yang tersedia; COM-02 hanya helper growth+anchor. TRAV-01 hanya gerak/checkpoint, tanpa jump. UI-02 baru policy helper, belum gesture penuh. Tes regionR2–R9/semua kit/hardware/release tetap NOT RUN. Lihat [laporan produksi](../Nawantara-Prototype-0.1/docs/PRODUCTION_02.md) untuk batas klaim; matriks di bawah tetap acceptance target penuh, bukan seluruhnya hijau.

| Test ID | Sumber / requirement | Milestone | Prosedur dan expected result |
|---|---|---|---|
| INV-01 | 16 Markdown; Guide headings; Quest R1–R9 | M0 | Jalankan audit-markdown.ps1; 100 ID karakter, 138 ID quest, 341 token state; source hashes tersimpan. PASS aktual |
| DATA-01 | Guide+Item+Kerangka+Quest | M0/M2–M7 | Setiap FK karakter/item/zone/quest valid; 100 kit punya mapping sumber; addendum KD-S06 ikut. Orphan/double ID gagal validasi |
| DATA-02 | Flag schema §4 + operasi quest | M0 | Enum/integer/boolean/array berbeda; default/range/owner writer terspesifikasi; 341 token bukan otomatis 341 boolean |
| TRAV-01 | threejs-platform-game + WB zona | M1 | Start→move→elevated platform/jump jika dipakai→fall recovery→objective→restart; collider tidak ditembus saat frame spike |
| TRAV-02 | R1 tutorial/UI §1 | M1 | Diam world 5 detik memutar kompas; menekan arah ke tembok masih idle; berjalan memulihkan; ≥3 landmark terlihat |
| UI-01 | UI UX + spec UI | M1 | Keyboard seluruh flow, focus restore, resize, zoom, pause, canvas; tidak menutupi kontrol/status |
| UI-02 | UI §9/R9 | M1 spike/M7 | Empat mode berurutan; angka internal identik sebelum/sesudah perubahan UI; HUD tersembunyi tidak muncul lewat tooltip/toast |
| COM-01 | Combat §5.1/5.4 | M1 | 535 vs 535 menghasilkan 214; elemen 1.3/0.7/1; crit memakai 1+rate damage; seed reproduktif; hasil rounding mengikuti decision |
| COM-02 | Guide growth/Awaken + C01/C03 | M2 | L1/39/40/59/60; tolak >60; Awaken <40 ditolak; anchor per karakter, level skill individual, Common passive sesuai keputusan |
| COM-03 | Guide kit + Item §3 | Tiap region | Efek tiap skill/status/item diuji termasuk stacking, duration, immunity, target, cooldown; tidak mengganti semua kit dengan empat aksi generik |
| NR-01 | NR-M03 | M1 | Lima ronde tanpa menyerang memicu hasil sabar; menyerang melanggar kondisi sesuai script; reward tidak duplikat |
| NR-02 | NR-M06 | M1 | HP5500, transisi66%/33%; fase3 bukan damage kill; lagu benar memulihkan/rekrut; salah/retry sesuai script |
| NR-03 | NR-S03 dan R9 CS | M1/M7 | WAITED→ADI_JOINS→+2 via adapter; FORCED→NEUTRAL→0; skip/default tidak undefined; save/reload identik |
| NR-04 | NR-H03 | M2 | Cancel tidak mengubah state; konfirmasi tindakan permanen memengaruhi rekrut; retry/reload tidak membatalkan |
| KD-01 | KD-M02/M04/H02/S06 | M3 | Jalur memengaruhi availability, buff dan item; no-skip tercatat; S06 reachable; ritual 3/2 ronde dan hasil tersembunyi |
| SM-01 | SM-M06/M07, NR-S04 | M4 | Jual/tebus memutasi entri+Kepeng atomik; restore NR-S04; jalur Larung langsung/terlambat tidak merusak ending input |
| WN-01 | WN-M05/M06/S01/UI §4 | M4 | Dependency Niniak sebelum Sang Lengang; spectator sesuai script; vendor sebelum/sesudah rekrut; marker6 punya pilihan penggantian |
| KL-01 | KL-M03/S03/H04/S05 | M5 | Tiga prasasti unlock S03; Rahib Kalpa mendahului Rahib Abu; puzzle tiga tingkat; kutukan dua arah |
| HM-01 | HM-M03/M04/H01 | M5 | Sebelum/tepat/sesudah checkpoint, ritual dan siklus diuji sesuai decision C06; histori tidak tertukar; recruitment dua jalur; saksi dicatat |
| RJ-01 | RJ-M05 dan R9 CS | M6 | Warisan19/20/29/30: CS0/1/1/2; item/phase threshold benar; tidak tradeable; tidak butuh roster counter spesifik untuk menang |
| JL-01 | JL-M04/M05/M06/UI §8 | M6 | Peta J6 reset keluar-masuk; koleksi tetap; cancel choice aman; commit survive wipe/retry; 40 fragmen tidak double count |
| AW-01 | AW-H02/M05 | M7 | Gema Purwa hanya H02, termasuk sebelum main; M05 tidak merekrut; callback delapan region berfungsi tanpa teks |
| END-01 | R9 AW-M05 | M7 | CS9/10/13/14; roster74/75/94/95; encyclopedia79/80/99/100%; B butuh AND; A fallback; C butuh diam final; tombol→B |
| END-02 | R9 + semua pilihan | M7 | Jalur legal mencapai ending A/B/C; hitung maksimum roster/koleksi yang reachable akibat eksklusivitas, jangan hanya menguji fixture mustahil |
| SAVE-01 | Flag global + Quest | Semua | Save→reload setelah beat/reward/choice; tak ada reward ganda; permanent choices tetap; invalid import tidak menimpa save valid |
| SAVE-02 | Migrasi prototype→produksi | M1/tiap patch | Backup sebelum migrate; enum lama dipetakan; unknown/invalid data ditolak atau dipulihkan jelas; schema rollback tidak diam-diam merusak save |
| ROUTE-01 | WB season + graph quest | M4–M7 | S2/S3/S4 masing-masing kedua urutan region; gate finale delapan region selesai; side/hidden tidak softlock main |
| ART-01 | Guide #01/#02/#09, Lampiran B | M1–M7 | Siluet kamera actual, portrait64px, animasi signature, lore/role/element; review source-required tercatat |
| PERF-01 | Usulan target teknis | Beta | Profil perangkat terpilih: usulan desktop1080p target60fps, fallback30fps; catat GPU/CPU/browser/p95 frame/loading/memory; bukan klaim performa sekarang |
| RELEASE-01 | Phase5 | RC | Build clean lockfile, HTTP(S) asset load, browser target, fresh/old saves, rollback dan cache; 0 Critical/High |

## Protokol pelaksanaan setiap gate

1. Bekukan milestone ID, build identifier, hash sumber, dan requirement yang berlaku.
2. Jalankan validator/tes domain; kemudian jalur browser representatif; manual QA untuk visual, audio, gestur, dan balance.
3. Simpan actual result, expected result, screenshot/log/save, perangkat/browser, reviewer, tanggal, serta severity.
4. Tandai PASS/FAIL/BLOCKED/NOT RUN per requirement. Kondisi belum diketahui tidak boleh hijau.
5. Perbaiki kegagalan, ulangi tes yang terdampak dan regresi lintas-region terkait; jangan menambah konten di atas save/quest blocker.
6. Perbarui gate summary dan PROJECT_STATE. Gate produksi/launch hanya lulus jika seluruh acceptance wajib memiliki bukti.

Template catatan: `build | sourceHash | gate | testId | expected | actual | status | evidencePath | owner | issueId`.

## Build dan tes pada fase implementasi

Jalankan `npm test` dan `npm run build` dari folder Nawantara-Prototype-0.1 sesuai package.json existing. Tes existing hanya baseline; tambahkan kasus domain bermakna untuk perubahan quest/save/combat. Browser route harus menggunakan kontrol permainan; fixture boleh menyiapkan kasus batas tetapi tidak menggantikan walkthrough legal. Build/test belum dijalankan pada sesi ini karena deliverable yang diminta adalah rencana.


## Increment produksi 0.3 — 18 September 2026

Pengguna menyatakan telah menguji 0.2 dan meminta lanjut. Per-unit party/kit subset serta graph NR-M01–M06 sekarang integrated. 29 tes domain PASS; browser party/target/shield/responsif/save, regresi recovery dan keputusan Saras PASS; walkthrough legal enam misi PASS selama integrasi. Bukti terinci dan hash penerimaan akhir: [PRODUCTION_03.md](../Nawantara-Prototype-0.1/docs/PRODUCTION_03.md).

G1 tetap PASS. G2 penuh belum ditutup. G3/G4 lulus pada cakupan increment 0.3; M1 penuh, kit/quest Nirwasita lengkap, equipment, leveling dan gesture tetap terbuka. G5/G6 belum dijalankan; tidak ada publikasi/deployment.


## Increment 0.4 — 19 September 2026

Permintaan quest/kit/leveling/equipment dilaksanakan pada lima quest tambahan, 11 kit aktif Nirwasita, progression 1–60 serta equipment. G1 tetap sesuai scope; G2 baseline economy dicatat; G3 implementasi terintegrasi. G4 diuji pada domain serta browser main/side/save/equipment/responsive; hasil penerimaan dan hash final dicatat di qa/production-summary-04.json. G5/G6 belum dijalankan. M1 penuh belum ditutup karena beat naratif, rekrutmen tiga karakter dan progression Awaken/skill belum lengkap. Lihat [PRODUCTION_04.md](../Nawantara-Prototype-0.1/docs/PRODUCTION_04.md).


## Increment 0.4.2 — 21 September 2026

Review regresi 0.4.1 dan kelanjutan NR-S03 terintegrasi. G1 scope tetap; G2 asumsi seri dua jawaban serta adapter satu hit didokumentasikan; G3 build PASS; G4 49 tes domain dan kedua jalur browser termasuk reload/traversal PASS. Bukti rinci: [PRODUCTION_042.md](../Nawantara-Prototype-0.1/docs/PRODUCTION_042.md). G5/G6 belum dijalankan; M1 penuh masih terbuka.


## Increment 0.5 — 21 September 2026

G3/G4: deskripsi skill, 22 anchor Awaken dan tujuh passive terintegrasi; 57 tes domain dan browser Awaken/party PASS. G2 penuh tetap terbuka untuk biaya Awaken dan Titis Ulang Watu. G5/G6 belum dijalankan. Animasi/desain 3D menunggu Unity/Blender. [Laporan](../Nawantara-Prototype-0.1/docs/PRODUCTION_05.md).


## Increment 0.5.1 — 21 September 2026

Empat temuan P1 Nirwasita ditutup: gate Adi parsial, bantuan tetua, identitas encounter dan reduksi segel33%. G3/G4 increment PASS:60 tes domain, browser P1 dan walkthrough M01–M06/save/reload pada satu hash final. G2 penuh dan G5/G6 tetap terbuka. [Laporan](../Nawantara-Prototype-0.1/docs/PRODUCTION_051.md).


## Increment0.6 — 21 September2026

G3/G4 subset PASS:62 tes domain, browser timer/navigation/reload/wrong-target, dan main route M01–M06 pada hash yang sama. Adapter sela antarronde dicatat sebagai asumsi; full level design M04 belum selesai. [Laporan](../Nawantara-Prototype-0.1/docs/PRODUCTION_06.md). G5/G6 belum dijalankan.


## Increment0.7 —21 September2026

M05 vendor/stage lagu/reuni Ranaya dan M04 cabang/audio:64 tes domain serta browser target PASS. G2 belum ditutup untuk baseline rekrutmen/Titis Ulang/ekonomi; usulan terpisah tersedia. G5/G6 tidak dijalankan. [Laporan](../Nawantara-Prototype-0.1/docs/PRODUCTION_07.md).


## Increment 0.8 — 22 September 2026

Prioritas ekonomi Awaken dan Titis Ulang diterapkan; 70 tes domain dan browser transaksi PASS. G3/G4 terbatas increment; lihat laporan dan ringkasan QA untuk hash penerimaan. G2 penuh/M1 dan G5/G6 belum ditutup.

[Laporan 0.8](../Nawantara-Prototype-0.1/docs/PRODUCTION_08.md).


## Increment 0.9 — 22 September 2026

G3/G4 subset: tiga rekrutmen, lima Titah dan efek equipment terintegrasi; 77 tes domain serta browser delapan challenge PASS. Reward once, failed objective, flee/retry, full party, equip dan reload terverifikasi. Lihat ringkasan QA final untuk jumlah tes dan hash. G2 penuh/M1, QA seluruh 13 quest pada satu hash, G5/G6 tetap terbuka.

[Laporan 0.9](../Nawantara-Prototype-0.1/docs/PRODUCTION_09.md).


## Increment 0.10 — 23 September 2026

Problem 5–6 dikonfirmasi sebagai Titah item Nirsmara dan Sloka/Mandala. Syarat sumber dan cap skill terverifikasi; 87 tes domain, browser lore/transaksi/permanen/upgrade serta regresi delapan challenge PASS. Baseline biaya dan efek terdokumentasi. G3/G4 terbatas increment; bukan penutupan M1, balance pengguna, G5 atau G6.

[Laporan 0.10](../Nawantara-Prototype-0.1/docs/PRODUCTION_010.md).

## Increment 0.11 — 23 September 2026

Ekonomi Kepeng terbarukan menutup buntu vendor; XP latihan memakai level per karakter. Jurnal 13 quest memuat lokasi/langkah/counter. Audit material Sloka dan regresi region dijalankan pada satu hash (main baru dan fixture cabang terpisah). 91 tes domain PASS. G3/G4 increment diverifikasi; balance pengguna, presentasi naratif, hardware, M1 penuh dan launch tetap terbuka. [Laporan](../Nawantara-Prototype-0.1/docs/PRODUCTION_011.md).

## Increment 0.12 — 24 September 2026

Clue Lare, reaksi tone Kayuri, puzzle bait/mural, ekstraksi fisik, penemuan sungai, isyarat M04 prototipe dan penutup cerita terintegrasi. Verifikasi per prioritas, batas adaptasi dan QA akhir dicatat dalam [laporan0.12](../Nawantara-Prototype-0.1/docs/PRODUCTION_012.md). G3/G4 per increment; gate penuh M1/M2 dan launch tetap terbuka.
