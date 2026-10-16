# Pusaka: Gema Nawantara — production preview 0.12

Versi0.12: petunjuk Lare, dialog tone Kayuri, puzzle lagu/mural, ekstraksi fisik M01, penemuan sungai M02, petunjuk prototipe M04 dan epilog cerita. Jurnal memuat Lagu perjalanan. [Laporan](docs/PRODUCTION_012.md).

Versi0.11: latihan party memulihkan Kepeng (+10 per kemenangan), XP mengikuti level masing-masing karakter, dan jurnal 13 quest menampilkan lokasi/langkah/counter. [Laporan](docs/PRODUCTION_011.md).

Versi0.10: **Catatan Nirwasita** menyediakan lore dari sumber Markdown. Setelah M06, Nirsmara Lv55 dapat menuntaskan **Titah Nirsmara** dengan 15 entri dan satu pengorbanan permanen. **Pusaka & bekal → Mandala & Sloka** menyediakan latihan Kepeng, material, dan upgrade skill sesuai cap karakter. [Laporan](docs/PRODUCTION_010.md).

Versi0.9: setelah M05, buka **Jurnal → Rekrutmen & Titah** atau penanda di Kuta Wisata. Rekrut Sanra, Watu dan Tobelang lewat tantangan kit; selesaikan lima Titah item untuk Lampah/Tandaraga/Sanra (Lv20), Watu (Lv25), Tobelang (Lv35). Reward sekali, lalu pasang item melalui Perkembangan & equipment. [Laporan](docs/PRODUCTION_09.md).

Versi0.8: Awaken kini memakai Serpihan Sukma, dengan reward quest/latihan, biaya per rarity, transaksi dan migrasi save. Titis Ulang Watu Awaken memberi DEF tim +25% sekali per battle saat pertama tumbang. [Laporan](docs/PRODUCTION_08.md).

Versi0.7: setelah mengumpulkan tiga fragmen M05, kembali ke Ranaya di Danu Sanu untuk menyelesaikan lagu. Vendor mengingat **Tolak tawaran** (harga20→30 Kepeng). M04 kini menyediakan jalur salah dengan retry dan petunjuk suara air stereo. [Laporan](docs/PRODUCTION_07.md).

Versi0.6 menambahkan sela kabut M01/M02: bergerak dengan WASD/panah atau **Langkah ke samping** sebelum lima detik. Detail skill/menu menjeda timer; mode aksesibilitas meniadakannya. M04 kini memakai tiga landmark dunia dan pengamatan dua sosok Adi. [Laporan](docs/PRODUCTION_06.md).

Patch0.5.1 memperbaiki gate dialog Adi, bantuan tetua setelah tiga kesalahan, tipe/elemen musuh, dan reduksi segel Menara. [Laporan](docs/PRODUCTION_051.md).

Versi 0.5: buka **Perkembangan & equipment → Detail skill** atau **Detail skill** saat battle. Pada versi tersebut Awaken masih gratis dan Titis Ulang belum tersedia; keduanya telah digantikan implementasi 0.8. [Laporan 0.5](docs/PRODUCTION_05.md). Animasi dan desain 3D menyusul menggunakan Unity/Blender.

Versi 0.4.2 melanjutkan quest Adi: temui Adi di Kuta Wisata setelah M04, lalu selesaikan pilihan di gerbang setelah M05. Dialog dan jalur tertunda dapat dilanjutkan setelah reload. [Laporan 0.4.2](docs/PRODUCTION_042.md).

Patch 0.4.1 memperbaiki interaksi status combat; 46 tes domain dan uji browser party lulus. Lihat [review 0.4.1](docs/REVIEW_041.md).

Produksi 0.4 menambahkan lima quest sampingan/tersembunyi, 11 kit aktif Nirwasita, leveling 1–60 dan equipment empat kategori. Save 0.3 tetap dapat dilanjutkan. Lihat [laporan produksi 0.4](docs/PRODUCTION_04.md) untuk hasil QA dan batas cakupan.

Build playable pertama: adaptasi enam misi utama Nirwasita, ditambah keputusan Adi dan tiga ingatan Saras Pertiwi. Tujuh zona 3D prosedural, pertarungan berbasis giliran, puzzle, rekrutmen, inventaris, save/load. Lima quest tambahan dapat ditemukan saat kembali menjelajah Nirwasita. **Belum merupakan kampanye penuh 9 region / 86 jam.**

## Jalankan
Buka `dist/Nawantara-3D.html` menggunakan browser desktop yang mendukung WebGL2. File ini mandiri, tidak memerlukan unduhan aset atau server. Jika preview dokumen tidak menjalankan game, unduh HTML lalu buka di browser.

WASD / tombol panah: bergerak. E: interaksi dekat NPC. Q/T: kamera. R: kembali ke checkpoint (konfirmasi; progres tetap). Scroll: zoom. J: jurnal. M: peta. I: inventaris. Esc: menu. Pertarungan: 1 serang, 2 bertahan, 3 spesial, 4 pamungkas. Pilih target lawan/pemulihan pada panel battle. Pengelana memulihkan dengan spesial (2 Prana).

Game menyimpan progres otomatis dan di Sesajen. Gunakan Ekspor/Impor save pada menu untuk berpindah browser atau menyimpan cadangan; localStorage bergantung browser dan lokasi file. Memindah/merename HTML bisa memisahkan save lokal.

Save 0.2 tetap dapat dilanjutkan. Untuk mencoba kit dengan save yang sudah tamat, buka **Ensiklopedia Sukma → Atur party → Latihan party**. Latihan tidak memajukan misi atau memberi item/Kepeng, tetapi kini memberi XP. Untuk mencoba karakter yang belum direkrut, pilih **Uji semua kit Nirwasita**; mode tamu tidak memberi XP/rekrutmen.

## Mulai bermain
1. Bergerak ke arah hutan (jalur batu). Nama zona berubah menjadi Wana Sanu.
2. Diam selama >5 detik untuk mengamati kompas, lalu dekati Penanda V dan tekan E.
3. Hadapi dua Bayang Penjaga atau gunakan ekstraksi. Lanjutkan mengikuti jurnal.
4. Di pertemuan Tandaraga, bertahan lima ronde. Di Menara, buka segel memakai ingatan pada ronde genap.
5. Urutan simbol prototipe: Air → Jalan → Cahaya → Pulang. Fase terakhir Nirsmara diselesaikan lewat ingatan.

## Quest dan perkembangan baru
- Lare Wengi di Danu Sanu: gudang barang, setelah M02.
- Kayuri Sindu di Lembah Diam: hafalan bait dan survival, setelah M03.
- Rumah Ranaya di Wana Sanu: mural dan sparring, setelah lagu lengkap.
- Lima jejak kenangan di Kabut Kelambu sampai Menara: diam untuk membuka jendela fragmen; setelah M04.
- Wira Senja di dekat Kuta Wisata/Menara: latihan terbatas dan finale, setelah M06.

Buka **Pusaka & bekal → Perkembangan & equipment** untuk level, XP, pemasangan/pelepasan item dan syarat item unik. Bonus equipment memerlukan item dikenakan; menyimpannya di inventory saja tidak cukup. Slot Kitab disediakan, tetapi katalog Nirwasita tidak mempunyai drop Kitab.

Sanra, Watu dan Tobelang saat ini dapat dicoba melalui uji kit tamu; jalur rekrutmen permanennya belum ditambahkan.

## Source dan rebuild
Node.js dengan npm diperlukan hanya untuk mengembangkan ulang:

```bash
npm ci
npm run build
npm test
```

Three.js dan esbuild dipin di package-lock.json. Distribusi HTML sudah menyertakan renderer. Source engine: `src/world.js`; game/dialog/UI: `src/game.js`; combat: `src/combat.js`; quest graph: `src/quest-graph.js`; schema/save/migrasi/ending: `src/state.js`.

`data/roster.json`: 100 karakter; `data/quests.json`: 138 misi; `data/regions.json`: 63 zona. Data adalah referensi produksi, bukan klaim seluruh konten telah diimplementasikan. SHA-256 dan lokasi heading sumber di `data/source-manifest.json`.

Baca `docs/PLAN_VERIFIED.md`, `docs/SOURCE_AUDIT.md`, dan `docs/QA_REPORT.md` untuk cakupan, asumsi, dan hasil uji. Gunakan `PROJECT_STATE.md` ketika melanjutkan pengembangan.

## Batas build
- PC keyboard/mouse; kontrol sentuh belum tersedia.
- Karakter dan lingkungan memakai model prosedural placeholder.
- Party per unit aktif; 11 kit aktif Nirwasita dan baseline Pengelana tersedia. Leveling dan equipment aktif; Awaken, passive non-Common serta Sloka/Mandala belum tersedia.
- Delapan region sesudah Nirwasita hanya ditampilkan sebagai tujuan desain.
- Tidak ada gacha atau pembelian uang nyata. Rekrutmen milestone deterministik.
- Audio berupa nada instrumental sintetis; belum ada voice-over atau soundtrack final.
