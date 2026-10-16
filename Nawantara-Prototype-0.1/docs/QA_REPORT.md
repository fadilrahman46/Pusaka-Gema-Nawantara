# QA Report — Nawantara prototype 0.1

> Riwayat QA0.1. Hasil terbaru dan batas kelulusan produksi ada di [PRODUCTION_02.md](PRODUCTION_02.md). Jangan memakai laporan historis ini sebagai status build0.2.
Tanggal: 15 September 2026

**Kesimpulan:** dapat diserahkan sebagai prototipe playable Nirwasita untuk review. Bukan release-ready, bukan game penuh sembilan region. Tes inti lulus; smoke test browser lulus; regresi perjalanan otomatis belum konsisten pada navigasi di sekitar collider.

## Cakupan dan bukti
| Area | Hasil | Bukti / batas |
|---|---|---|
| Data sumber | PASS struktur | 16 file, 100 karakter unik dengan 8 stat dasar, 138 quest headings, 63 zona; audit bukan sertifikasi manual seluruh dialog |
| Unit/domain tests | PASS 10/10 | `npm test`: damage/elemen/crit, cap, save validation, quest order, reward idempotency, pilihan permanen, timer, Tandaraga, Nirsmara, segel, ending |
| Build mandiri | PASS | esbuild menghasilkan HTML tanpa dependency CDN runtime |
| Browser/WebGL | PASS smoke | Chromium headless/SwiftShader; 0 error JS/console pada smoke; gambar title/exploration/map diperiksa |
| Katalog/peta | PASS | pencarian Nirsmara = 1 kartu, peta = 9 region dengan status konten |
| Alur NR-M01–M06 | Pernah selesai di browser | Run awal mencapai M06, merekrut Nirsmara, mendapat Kalung, keputusan Adi ADI_JOINS, save/reload chapter 6; bukti screenshot completed/nirsmara |
| Regresi perjalanan penuh | BELUM STABIL | Run awal berhenti pada navigasi opsional setelah M06; run ulang berhenti menuju vendor karena helper mengarahkan karakter lurus ke collider. Tidak diklaim hijau konsisten |
| Konfirmasi permanen | PASS browser | Fixture save chapter 6 diimpor melalui UI; batal tetap utuh, konfirmasi mengunci, reload mempertahankan flag |
| Impor save | PASS browser | Save valid diterima; JSON dengan struktur invalid ditolak tanpa mengganti state |
| Perangkat nyata | BELUM DIUJI | Belum menguji Windows GPU pengguna, Firefox/Safari, mobile, gamepad, atau minimum spec |

## Perbaikan pada sesi ini
- Guard Tandaraga terpisah dari kemenangan damage dan benar-benar reset ketika menyerang.
- HP Penjaga Menara minimum 1 selama segel masih ada, mencegah dead-end ketika HP habis lebih awal.
- HP Nirsmara terkunci 1815 pada fase akhir sampai puzzle selesai.
- Gerakan meluncur pada sisi collider, dengan substep kecil.
- Timer tidak lagi memakai batas delta 0.05 yang membuat waktu berjalan terlalu lambat pada software renderer.
- Kompas berupa segitiga CSS, menggantikan glyph yang tidak tersedia pada font browser uji.
- Mode aksesibilitas kompas tidak mengunci tutorial.
- Menu saat battle membatasi aksi agar import save tidak mengganti state di tengah encounter.

## Temuan terbuka
| Prioritas | Jenis | Temuan | Tindakan berikutnya |
|---|---|---|---|
| Medium | QA automation | Navigasi helper menuju NPC belum tahan terhadap jalur terhalang; tes perjalanan tidak selalu selesai | Tambah waypoint/path-aware navigator pada harness, tanpa bypass flag game |
| Medium | Performance | Software renderer berjalan lebih lambat dari GPU; belum ada target FPS perangkat nyata | Profiling di hardware target; batching/instancing dan culling lanjut |
| Low | UI | Toast dapat menutupi sebagian judul musuh selama beberapa detik | Pindahkan toast saat battle pada iterasi UI berikutnya |
| Scope | Content | R2–R9, sisa R1, 100 kit lengkap, equip, Sloka/Mandala/Awaken belum implemented | Ikuti roadmap; bukan dianggap bug selesai |

Tidak ada Critical crash atau save corruption yang teramati pada cakupan uji ini. Pernyataan ini tidak membuktikan ketiadaan bug di semua kondisi. Balancing/fun memerlukan playtest manusia.

## Artefak
- `qa/browser-smoke.json`, `qa/permanent-choice.json`: hasil terstruktur.
- `qa/playthrough.json`: hasil run regresi terakhir, termasuk kegagalan harness yang belum ditutupi.
- `qa/title.png`, `qa/exploration.png`, `qa/map.png`, `qa/nirsmara.png`, `qa/completed.png`: screenshot browser.
- `tests/`: unit dan browser harness; lihat README untuk runtime.
