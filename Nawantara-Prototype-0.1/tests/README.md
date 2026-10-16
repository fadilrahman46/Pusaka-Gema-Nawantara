# QA automation

`npm test` sekarang menjalankan 43 tes domain (produksi 0.4). Catatan versi sebelumnya di bawah dipertahankan sebagai riwayat.

`node tests/production-browser.mjs` memeriksa input, checkpoint, fokus modal, resize, migrasi save lama, backup, dan recovery save corrupt. `node tests/permanent-choice.mjs` memeriksa keputusan Saras lewat UI. Laporan produksi terbaru ada di `docs/PRODUCTION_02.md`.

Tes browser bersifat opsional dan membutuhkan paket `playwright` serta Chromium. Jalankan dari root proyek: `node tests/browser-smoke.mjs` dan `node tests/playthrough.mjs`.

Untuk runtime khusus, `PLAYWRIGHT_MODULE` dapat menunjuk modul Playwright lokal dan `CHROMIUM_PATH` menunjuk binary Chromium. Keduanya tidak diperlukan pada instalasi Playwright normal.

Playthrough memakai input keyboard/mouse sungguhan dan pembacaan diagnostik read-only; tidak menaikkan quest via debug hook. Target vendor berada di jalur terbuka x4.2; target batu terakhir x-5.7 berada dalam radius interaksi3.8. `QA_RUN=1`,2,3 menghasilkan laporan pengulangan terpisah.


## Produksi 0.3

`npm test`: 29 tes core/state/combat/quest graph. `node tests/party-browser.mjs`: migrasi save 0.2 melalui UI, pengaturan party, target heal/shield Saras, responsive 640px dan latihan tanpa reward. `node tests/playthrough.mjs`: kontrol legal NR-M01–M06, guard seluruh party dan seal per ronde; output menyertakan SHA-256 HTML. Tetapkan `QA_RUN=03-release` untuk bukti acceptance final. Playwright memakai `PLAYWRIGHT_MODULE` dan Chrome `CHROMIUM_PATH` sesuai lingkungan lokal.


## Produksi 0.4

`npm test` mencakup progression, equipment, lima side quest dan pembandingan langsung 33 baris stat normal ke Guide Markdown. `node tests/expansion-browser.mjs` mengimpor save 0.3 tamat melalui UI lalu menjalankan lima quest secara fisik, jendela fragmen, leveling, equip dan reload. `QA_RUN=04-release node tests/playthrough.mjs` (sesuaikan sintaks env shell) memeriksa permainan baru sampai NR-M06. Kedua laporan mencatat hash HTML. Latihan party kini memberikan XP; uji kit tamu tetap tanpa reward.


## Produksi 0.9

`npm test` mencakup `challenges.test.mjs`: tiga rekrutmen, lima Titah, transaksi/retry/validasi save dan efek lima item. `node tests/challenges-browser.mjs` menjalankan delapan challenge, equip dan reload melalui UI. Fixture chapter5 dan minimum level dipakai untuk membatasi durasi tes. `QA_RUN=09 node tests/playthrough.mjs` menguji alur utama dari permainan baru. Hasil final: `qa/production-summary-09.json`.


## Produksi 0.10

`npm test`: 87 tes domain, termasuk `lore-skills.test.mjs`. `node tests/lore-skills-browser.mjs` memeriksa pengumpulan 15 kartu, konfirmasi permanen, equip, Mandala, upgrade, active time, boss dan reload. `QA_RUN=010 node tests/playthrough.mjs` memeriksa alur utama. Laporan akhir: `qa/production-summary-010.json`. Fixture UI chapter6/level55 tidak menguji lama grind.

## Produksi 0.11

`node --test --test-isolation=none tests/*.test.mjs` (PowerShell: gunakan daftar dari `rg --files tests -g "*.test.mjs"`) menjalankan 91 tes. `node tests/balance-audit.mjs` menghitung biaya dan keterjangkauan. `node tests/journal-economy-browser.mjs` memeriksa 0 Kepeng → latihan → pembelian M05 serta jurnal 640px. Set `QA_RUN=011` untuk suite browser regresi agar laporan lama tidak tertimpa. Hasil: `qa/production-summary-011.json`.

## Produksi 0.12

98 tes domain mencakup story.test.mjs. story-browser.mjs menguji prioritas 1–4 dengan input UI dan fixture terpisah. Set QA_RUN=012 untuk playthrough, expansion, navigation, song, production dan lore-skills browser; story-browser menyimpan laporan 012. Jalankan node tests/summarize-012.mjs setelah seluruh suite untuk memeriksa hash yang sama. Main route dimulai dari save baru; fixture bukan pengukuran durasi leveling.
