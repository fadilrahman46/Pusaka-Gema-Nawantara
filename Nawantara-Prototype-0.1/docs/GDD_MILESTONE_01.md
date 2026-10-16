# Game Design Document — Pusaka: Gema Nawantara
Living document • Milestone 0.1 • 15 September 2026

> Addendum18 September2026: [Production0.2](PRODUCTION_02.md) dan [keputusan desain](../../planning/DESIGN_DECISIONS.md) menggantikan bagian baseline terkait. Engine produksi telah dipilih: Three.js. Save runtime kini schema2 pada state.js; enum/ending memakai field eksplisit, bukan OR terhadap beberapa enum legacy. Growth helper floor2%+anchor; kompas bergerak kembali presisi; Q/T kamera dan R checkpoint. Battle party abstrak dan scope quest di bawah tetap keterbatasan yang belum ditutup, bukan implementasi final C08.

## 1. Overview
RPG naratif 3D tentang ingatan, pilihan, dan kesabaran. ASSUMPTION: target pertama pemain desktop keyboard/mouse yang menikmati eksplorasi dan puzzle. Three.js lokal; seluruh aset milestone prosedural. Durasi milestone belum diukur lewat playtest pengguna.

## 2. Core Gameplay Loop
Ikuti jalur dan landmark → temukan NPC → pahami petunjuk → pilih tindakan/puzzle/battle → terima rekrutmen dan pusaka → simpan di Sesajen → buka quest dan zona berikutnya.

## 3. Mechanics
- Kompas idle: 5 detik diam lalu distorsi tiap 3 detik; gerakan menghentikan penambahan distorsi. Kalung Jalan Pulang menetralkan; dua jimat awal meredam. Mode aksesibilitas menjaga kompas stabil.
- Battle: pilihan dasar, guard, resonansi, heal. Setiap tindakan dihitung satu ronde party. Prana 0–5; dasar/guard +1, resonansi -2, heal -1. Ini parameter prototipe.
- Tandaraga: lima ronde guard/heal; serangan mereset hitungan.
- Penjaga Menara: tiga segel, puzzle terbuka pada ronde genap. HP minimal 1 selama segel masih ada; tiga segel mengurangi damage 84% secara total pada awal battle.
- Nirsmara: 5500 HP; fase 2 dimulai di 66%, peluang meleset 50%; fase 3 di 33%, damage terkunci; empat simbol membuka penyelesaian damai.
- Saras: tiga lokasi; memilih menggali membutuhkan konfirmasi dan mengunci misi pada save itu.

## 4. Story & World
TL 117. Pengelana tiba di Nirwasita mengikuti warisan keluarga. Kota menutup diri demi keselamatan. Nenek Ranaya, Lampah Sinaru, Tandaraga, dan Adi mengajarkan bahwa memahami tidak selalu berarti menyerang. Menara Pandu menutup milestone dengan mengingatkan Nirsmara.
Nama tujuh zona mengikuti World Bible. Rute, jarak, komposisi pulau, dan simbol musik adalah adaptasi level design untuk prototipe.

## 5. Characters
Pengelana silent protagonist memakai stat uji. Lampah Sinaru (#01), Tandaraga (#02), Nirsmara (#09), dan Saras Pertiwi (#85) memiliki jalur rekrutmen milestone. Roster 100 karakter tersedia sebagai katalog stat dasar. Adi adalah NPC pendukung, tidak menambah jumlah roster playable.

## 6. Systems
State JSON version 1: chapter, flags typed, items, roster, Kepeng, posisi, visited, fragments, burials, collections, options. Rekrutmen dan item idempotent. Save otomatis setiap 12 detik eksplorasi serta setelah reward/pilihan; save pertarungan menggunakan checkpoint sebelum encounter. Import invalid ditolak sebelum mengganti state.
Formula dasar: ATK²/(ATK + DEF×1.5), siklus elemen 1.3/0.7/1.0, crit (1+CRT_DMG/100). Level-stat helper mengikuti +2% per level dari Guide; nilai encounter eksplisit tidak dihitung ulang. Stat party dan resonansi bukan kit final roster.
Ending helper membedakan A/B/C menggunakan CS, rekrutmen dan Ensiklopedia; belum terhubung ke gameplay Anawil. Field tambahan `ext_sm_offer` dan `ext_hm_resolution` memecahkan referensi tanpa field eksplisit. Adapter Nirwasita mencegah enum ADI_JOINS dibaca sebagai nol.

## 7. UI/UX
Title → new/continue → exploration HUD → interaction dialog → battle atau puzzle → exploration. Menu jurnal, peta, katalog sukma, inventaris. Seluruh aksi utama bisa dioperasikan keyboard/mouse. Konfirmasi permanen tidak dilewati opsi aksesibilitas. Peta secara eksplisit menandai region belum tersedia.
UI degradation pada R1 terbatas kompas; sistem UI gestural Anawil penuh masih pekerjaan M6. Tidak boleh menganggap mode kompas ini telah memenuhi seluruh UI_UX_SYSTEM_REQUIREMENTS.

## 8. Technical Architecture
- `world.js`: renderer WebGL2, mesh, kamera follow/orbit, landmark, NPC, kolisi pohon/rumah.
- `game.js`: loop input, state orchestration, quest adaptasi, panel DOM, save/load.
- `core.js`: formula murni, transisi state dan battle; diuji tanpa renderer.
- `data/`: data referensi dan provenance dari 16 lampiran.
- `build.mjs`: esbuild mengemas renderer, data, dan logic ke satu HTML, tanpa CDN.
R2+ membutuhkan event-driven quest graph/editor sebelum jumlah quest ditambah. Jangan memperbesar tabel aksi inline hingga 138 misi tanpa refactor.

## 9. Art & Audio Direction
Batu hijau kusam, emas redup, perairan turquoise, geometri datar, kabut. Siluet karakter sederhana untuk memastikan terbaca dari kamera atas. Audio interaksi terdiri dari empat nada instrumental sintetis. Tidak memakai lirik atau musik rekaman.

## 10. MVP Scope
Tersedia: adaptasi NR-M01–M06, cabang Adi, Saras, tujuh zona, data katalog, battle/puzzle/save. Ditunda: sisa side/hidden quest, 100 kit lengkap, seluruh delapan region lainnya, loot drop table final, Mandala, Sloka, Awaken, model/animasi final, cutscene, gestur penuh, gamepad/mobile.

## 11. Open Questions / Risks
Platform produksi utama dan pilihan engine belum dikunci pengguna. Ukuran tim, budget, durasi jadwal, dan target minimum GPU belum diketahui. Data balancing dan beberapa enum sumber perlu review bersama. Jadwal produksi lengkap mengikuti roadmap PLAN_VERIFIED.md.
