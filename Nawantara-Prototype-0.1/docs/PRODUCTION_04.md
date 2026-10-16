# Produksi 0.4 — quest, kit, leveling dan equipment

Tanggal: 19 September 2026. Permintaan: melanjutkan quest/kit, leveling dan equipment dari produksi 0.3. Skill game-sdlc, threejs-platform-game dan game-uiux-character-design digunakan. Fase utama Production, dengan verifikasi Testing & QA. Stack Three.js/esbuild dan enam misi utama dipertahankan.

## Hasil implementasi

### Lima quest tambahan

| Quest | Cara menemukan | Implementasi dan pemulihan |
|---|---|---|
| NR-S01 — Gudang Barang Tertinggal | Lare Wengi, Danu Sanu, setelah M02 | Lima pasangan barang/pemilik. Jawaban salah memicu battle HP600. Seluruh percobaan harus selesai; tetap dapat merekrut meski semua salah. Progres dan battle tertunda tersimpan. Reward Lare + Jimat Gudang. |
| NR-S02 — Empat Ratus Bait | Kayuri, Lembah Diam, setelah M03 | Hafalkan sepuluh bait, pilih dua nada penutup, lalu survival empat ronde seluruh party. Retry battle tidak mengulang hafalan. Reward Kayuri + Jimat Empat Ratus Bait. |
| NR-S04 — Harga Perlindungan | Lima jejak di Kabut Kelambu–Menara Pandu, setelah M04 | Diam membuka jendela tiga detik setiap sekitar 15 detik; offset memakai seeded jitter. Fragmen hanya tampak pada jendela tersebut, dan dapat dikumpulkan hanya pada jendela itu. Aksesibilitas kompas meniadakan syarat waktu. Altar memerlukan lima fragmen dan satu entri koleksi yang direlakan. Tiga fase menyerap skill; HP ditahan pada batas fase agar tidak dilompati serangan besar. Min. dua anggota karena script menyerap dari karakter berbeda. Reward Nggarindu + Pusaka Harga Perlindungan. |
| NR-H01 — Rumah Ranaya Lama | Wana Sanu, setelah lagu Ranaya lengkap | Lima mural visual, tiga entri Ensiklopedia, lalu sparring opsional HP1200. Menang memberi bonus permanen Sanra; kalah tidak membatalkan puzzle. |
| NR-H02 — Musuh yang Sebenarnya | Wira Senja, Kuta Wisata–Menara, setelah M06 | Tiga battle dengan Wira pinjaman: maksimal satu serangan Wira per battle. Pelanggaran tidak menambah counter dan dapat diulang. Finale lima ronde tanpa menyerang; musuh tidak menyerang balik dan upaya menyerang hanya menunda, tidak mereset counter. Reward Wira + Senjata Musuh yang Sebenarnya. |

Saras/NR-H03 juga sekarang memberi Jimat Yang Tertanam Selamat. Save lama yang sudah menyelesaikannya memperoleh item ini sekali melalui migrasi; tidak perlu mengulang keputusan permanen. Enam main quest, Adi dan Saras dari 0.3 tetap tersedia. Ini belum mengklaim seluruh beat naratif 13 quest telah diproduksi secara final: beberapa beat main/Adi masih adaptasi 0.3.

Pengorbanan Nggarindu menyimpan `{entry, source: NR-S04, status: LOST}` terpisah dari koleksi aktif. Wipe tidak mengembalikan entri atau fragmen. Metadata dipersiapkan untuk penebusan SM-M07; **penebusan Smarana belum playable**. Tidak ada item pemulih ingatan dalam build ini.

### Kit dan progression

Semua 11 karakter Nirwasita mempunyai **kit aktif dasar/spesial/pamungkas**: Lampah, Tandaraga, Sanra, Watu, Lare, Kayuri, Tobelang, Nggarindu, Nirsmara, Wira dan Saras. Common tidak memiliki passive. Awaken serta seluruh passive non-Common belum diaktifkan.

Tambahan penting: revive Sanra sekali setelah benar-benar membangkitkan sekutu; aggro/DEF dan immunity+rest Watu; buff steal/dispel Lare; SPD dan reset cooldown/prana Kayuri; multi-hit dan pembatas target Tobelang; shield serta pengurangan maxHP selama battle untuk Nggarindu; bonus kondisional Wira. Penyerapan Manifestasi tidak mengambil kemampuan damage terakhir agar encounter tidak terkunci.

Sanra, Watu dan Tobelang belum memiliki jalur rekrutmen permanen yang terikat pada lima script baru. Agar kit dapat dimainkan tanpa mengarang reward sumber, **Ensiklopedia Sukma → Uji semua kit Nirwasita** meminjam karakter bersama Pengelana tanpa XP, rekrutmen atau item. Karakter yang sudah dimiliki dalam save tetap dapat diatur seperti anggota lain. Delapan karakter Nirwasita lainnya mempunyai jalur rekrutmen pada build ini.

Level karakter **1–60** dengan XP per karakter, carry ke beberapa level, cap tanpa overflow, persist/reload, dan stat yang benar-benar masuk ke battle. Data 33 baris normal L1/L40/L60 dari Guide disimpan dalam `data/nirwasita-stats.js` dan dibandingkan langsung terhadap Markdown oleh tes. Intermediate HP/ATK/DEF memakai floor pertumbuhan 2%; SPD memakai kelipatan lima sesuai C01. CRT/CRT DMG/RES/ACC tetap tanpa Awaken.

### Equipment dan UI

**Pusaka & bekal → Perkembangan & equipment** menampilkan level, XP, stat dasar dan empat kategori: Senjata, Jimat, Pusaka, Kitab. Setiap kategori memuat satu item; satu nama item unik pada inventory adalah satu instance yang tidak bisa dikenakan dua karakter. UI dan validator memeriksa kepemilikan, karakter khusus, level minimum dan quest. Perubahan tidak tersedia selama battle.

Sebelas binding item tersedia: enam item perjalanan Nirwasita dan lima reward unik quest. Kitab menyediakan slot tetapi tidak mempunyai drop Nirwasita dalam katalog sumber; tidak ditambahkan item Kitab rekaan. Item unik bisa tersimpan sebagai reward sebelum level cukup, tetapi bonusnya hanya aktif setelah syarat equip terpenuhi.

- Penunjuk Basah/Kompas Karat/Kalung bekerja jika dikenakan anggota aktif. Pengaturan lama yang memakai efek inventory dimigrasikan dengan memasang kompas terbaik pada anggota aktif pertama.
- Tongkat Perantau mengubah damage berdasarkan ronde pemakainya tanpa serangan.
- Lentera menyimpan penanda jalur **zona perolehan**, ditampilkan pada peta; bentuknya penanda teks, belum minimap geometris. Save lama memakai zona pertemuan M05 sebagai fallback.
- Peta menampilkan petunjuk jalan sejenak pada awal jeda kompas sebelum distorsi.
- Item unik Lare/Kayuri mengurangi cooldown pamungkas; Nggarindu meningkatkan reduksi damage; Wira meningkatkan multiplier; Saras meningkatkan heal.

Stat setelah leveling dihitung ulang ketika battle dimulai. Tidak ada upgrade atau perubahan equipment di tengah turn. Layout equipment telah diperiksa pada desktop dan 640×640; fokus modal tetap terkurung dan kembali ke kontrol asal.

## Baseline tuning, bukan angka kanon

| Bagian | Nilai/keputusan |
|---|---|
| XP menuju level berikutnya | `100 + 25 × (level−1)`; sumber tidak menentukan kurva XP |
| XP main quest | 350 per anggota aktif, sekali per completion |
| XP side quest baru | 300 per anggota aktif; sparring Ranaya 150 sekali |
| Latihan party biasa | `max(100, 50 × level tertinggi party)` per kemenangan; tanpa Kepeng/item/completion quest. Berbeda dari uji kit tamu yang tidak memberi XP. |
| Pengelana | Stat/kit tetap baseline preview 0.3, sekarang ikut growth |
| Tongkat | +10% damage per ronde tanpa menyerang, cap +50% |
| Buff Sanra dari sparring | +5% HP/ATK/DEF; sumber menyebut +X% |
| Manifestasi Kabut | HP1995, hasil baseline generik elite level12 C07; ATK/DEF/SPD masih tuning |
| Battle tambahan | HP600 gudang, HP1200 Ranaya adalah placeholder eksplisit sumber; Syair2200, restricted1500, Sunyi2200 serta stat non-HP dan tipe musuh generik adalah baseline preview (Tandaraga tetap Human, Nirsmara/Lampah Ghost dari Guide) |
| Fragmen | Seeded jitter, tiga detik per siklus 15 detik; timer terpisah dari kompas agar Kalung tidak menonaktifkan quest |
| Puzzle | Nama pemilik/barang, bait pendek dan ikon mural adalah konten implementasi orisinal sesuai struktur script, bukan kutipan tradisi nyata |

Leveling bukan skill-leveling. Sloka/Mandala, Awaken, scaling skill, passive lanjutan, equipment region lain, final asset dan balancing masih terbuka.

## Save dan kompatibilitas

Schema tetap 2 dengan tambahan opsional `progression`, `equipment`, `lostEntries` serta state quest bertipe. Migrasi clone mempertahankan progres dan pilihan lama, membuat L1 tanpa XP retrospektif, menambahkan entri main quest yang sudah diselesaikan untuk koleksi baru, serta memulihkan reward Saras yang sebelumnya belum diimplementasikan. Nilai level/XP/equipment rusak ditolak sebelum penimpaan save aktif.

Salinan asli sebelum migrasi progression disimpan sekali dengan suffix `-pre-progression-backup`; backup rolling dan backup legacy lama tetap ada. Backup awal ini tidak tertimpa autosave 0.4 berikutnya. HTML tetap memakai lokasi dan storage key lama; ekspor save dianjurkan bila pindah browser/lokasi file.

## Verifikasi terhadap rencana

43/43 tes domain PASS, termasuk 33 baris anchor dibandingkan langsung dengan Guide Markdown, seluruh kit aktif, progression/equipment dan cabang quest. Browser save/party/permanent-choice serta route utama dan lima quest tambahan PASS selama integrasi. Penerimaan final dan hash HTML dicatat dalam `qa/production-summary-04.json`.

| Fase | Status cakupan increment |
|---|---|
| Planning | Scope 0.4 diikat pada lima script R1, 11 kit, progression dan equipment Nirwasita; sumber asli tidak diubah |
| Pre-production | Gap XP/buff/encounter/puzzle di atas dinyatakan baseline; aturan level/slot dan keputusan C01/C08 dipertahankan |
| Production | Terintegrasi pada UI, world, quest graph, battle dan save; bukan sekadar modul lepas |
| Testing & QA | Tes domain, route utama, route lima quest, save lama, equipment, responsif dan keputusan permanen dijalankan; bukti akhir pada summary |
| Deployment/Launch | Preview HTML lokal saja; belum gate launch |
| Maintenance/LiveOps | Belum dijalankan |

Pengujian browser memakai Chrome headless/SwiftShader Windows, sehingga bukan sertifikasi target GPU atau hasil playtest balance. Bukti route tambahan menggunakan **save 0.3 tamat yang diimpor melalui UI**, lalu seluruh aksi quest memakai keyboard/mouse. Route utama terpisah dimulai dari permainan baru; tidak ada mutasi melalui diagnostic hook.

Bukti: `qa/expansion-04.json`, `qa/playthrough-04-release.json`, `qa/production-browser.json`, `qa/party-browser-03.json` (nama skrip lama, dijalankan kembali), `qa/permanent-choice.json`, `qa/equipment-04.png`, `qa/equipment-responsive-04.png`.

## Kelanjutan

Utamakan binding jalur rekrutmen tiga karakter yang masih uji tamu, penyempurnaan beat main/Adi dan feedback kit, lalu Awaken/passive, Sloka/Mandala dan validasi balance. Semua 138 quest/100 karakter, R2–R9 dan UI gesture finale tetap roadmap. Gate M1 penuh dan launch tidak ditutup oleh increment 0.4 ini.


## Penerimaan final

**PASS**: `npm test` 43/43, build, route permainan baru NR-M01–M06 serta route lima quest tambahan dari save 0.3. Kedua laporan route memakai hash yang sama dengan HTML yang dibagikan. Tidak ada page error pada kedua route. Regresi party/save/permanent-choice juga PASS. File distribusi `index.html` dan `Nawantara-3D.html` identik. Tidak ada blocker Critical/High teramati pada cakupan tes tersebut; balancing/hardware dan fitur di luar cakupan tetap belum disertifikasi.

SHA-256: `8564a0420f6dd70ff473d6f210989f908e61069af1642cbb86eec2d5e6a937ea`. Ringkasan mesin: `qa/production-summary-04.json`.
