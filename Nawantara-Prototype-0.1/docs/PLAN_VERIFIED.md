# Rencana & verifikasi — Pusaka: Gema Nawantara
Tanggal: 15 September 2026 • Milestone 0.1 • Skill game-sdlc

## CURRENT PHASE
Planning → Pre-Production → Production (vertical slice) → QA. Belum rilis produksi.

## OBJECTIVE
Membuktikan loop jelajah 3D → observasi → dialog/puzzle → pertarungan berbasis giliran → rekrutmen deterministik → progres tersimpan, berakar pada Nirwasita.

## TASKS
1. Audit struktur seluruh 16 lampiran; ekstrak roster, misi, variabel, dan indeks rujukan.
2. Tetapkan keputusan konflik sumber, asumsi prototipe, dan batas milestone sebelum coding gameplay.
3. Bangun 7 zona Nirwasita dalam satu lanskap 3D; landmark nyata, karakter bergerak, kamera, kolisi, interaksi.
4. Adaptasi NR-M01–M06 yang dapat diselesaikan; NR-S03 keputusan Adi dan NR-H03 konfirmasi konsekuensi permanen sebagai tambahan.
5. Integrasikan kompas idle, battle, Prana, puzzle urutan simbol, inventaris, katalog roster 100 karakter, jurnal, save/load dan Sesajen.
6. Uji alur sampai Nirsmara, kegagalan/retry, persistence, serta screenshot visual.

## DELIVERABLES
Game HTML mandiri (Three.js dibundel lokal), source ZIP, rencana ini, audit sumber, QA_REPORT.md dan PROJECT_STATE.md.

## RISKS / DEPENDENCIES
- Dokumen menggambarkan ~86 jam, 9 region, 100 karakter. Milestone ini merupakan vertical slice, bukan seluruh kampanye.
- ASSUMPTION: target awal desktop browser dengan WebGL2, keyboard/mouse; tim kecil; tanpa anggaran aset eksternal. Platform engine produksi belum diputuskan pengguna.
- ASSUMPTION: seni 3D low-poly prosedural, tanpa VO. Geometri, nada pendek instrumental, serta dialog adaptasi dibuat untuk prototipe.
- ASSUMPTION: jumlah anggota tempur aktif, biaya Prana, nilai heal, ekonomi awal, dan waktu encounter yang tidak final ditetapkan sebagai parameter prototipe, bukan kanon.
- Versi sumber memuat paragraf historis yang bertentangan. Dokumen asli tidak diubah.
- Pembacaan semantik mendalam difokuskan pada sistem global, alur R1, dan dependensi R2–R9. Audit otomatis menyapu keseluruhan isi; tidak sama dengan sertifikasi manual semua dialog dan skill.

## ACCEPTANCE CRITERIA
- 100 ID karakter unik dan statistik Level 1 terurai; 138 kode misi sumber tersedia di katalog pengembangan.
- Pemain dapat bergerak di ruang 3D, menemukan NPC dekat lokasi, dan membuka zona lewat progres.
- Idle kompas >5 detik, perubahan berikut setiap 3 detik, berhenti saat bergerak; landmark tetap stabil.
- Tandaraga menuntut 5 ronde tanpa serangan; serangan mereset counter.
- Nirsmara mulai HP 5500, fase 66%/33%, damage terkunci pada fase akhir; puzzle menyelesaikan encounter.
- Rekrutmen/reward hanya sekali; restart browser memulihkan state; save invalid ditolak.
- Interaksi permanen meminta konfirmasi; cancel tidak mengubah status.
- Tidak menyebut R2–R9 sudah playable. Katalog seluruh roster bukan implementasi semua kit karakter.

## NEXT STEP / ROADMAP
M0 (sesi ini): vertical slice Nirwasita dengan adaptasi durasi dan kit dasar.
M1: seluruh 13 misi Nirwasita, 11 karakter dengan kit lengkap, Mandala/Sloka, balancing dan character art.
M2: Kadewan, validasi S1; editor dialog/quest sebelum ekspansi Smarana.
M3: Smarana + Wanasunya; pemulihan Ensiklopedia, 5 marker dan escape route.
M4: Kalamrtu + Himagiri; puzzle aksara dan dua meter Kelancangan.
M5: Rajawani + Jaladri; Warisan dan serpihan, pilihan permanen serta reset map.
M6: Anawil; HUD gestural, aksesibilitas, 3 ending, review naratif.
M7: playtest kampanye, optimasi target hardware, aset final, QA rilis.
Estimasi kalender/budget belum dapat dikunci tanpa jumlah anggota dan velocity tim.

## Hasil gate pra-implementasi
PASS untuk ruang lingkup vertical slice di atas. Bukan persetujuan produksi 86 jam.
- Dependensi NR-M01 → M06 linear dan dapat dipetakan ke 7 zona.
- Akhir NR-S03 ditempatkan setelah M05 sebelum M06.
- Keputusan konflik dan angka yang diasumsikan dicatat di SOURCE_AUDIT.md.
- Build inti dan data sumber dipisah agar ekspansi tidak membutuhkan penggantian save schema.
