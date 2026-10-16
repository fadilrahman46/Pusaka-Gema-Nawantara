# Rencana pengembangan Pusaka: Gema Nawantara — Three.js

Tanggal: 18 September 2026. Deliverable sesi: rencana implementasi, desain UI/karakter, audit sumber, dan gerbang verifikasi. Ini bukan klaim game penuh telah dibangun.

**Pembaruan keputusan:** C01–C14 telah ACCEPTED atas instruksi pengguna. [DESIGN_DECISIONS.md](DESIGN_DECISIONS.md) mengikat implementasi dan mengalahkan rekomendasi awal yang bertentangan. B02 selesai pada tingkat desain; G2 tetap membutuhkan spike dan hasil runtime.

## Current phase → Objective

Replanning pada Phase 1–2 untuk kelanjutan prototipe 0.1 yang sudah berada di Production/QA. Tujuannya membawa prototipe Nirwasita menjadi RPG naratif browser Three.js yang setia pada sumber, melalui vertical slice, regional alpha, beta, RC, dan launch.

**Keputusan pengguna:** Three.js menjadi engine rendering aplikasi. Gunakan game-sdlc untuk proses, threejs-platform-game untuk traversal/rendering/verifikasi playable, dan game-uiux-character-design untuk UI serta karakter. Skill platformer tidak mengubah genre dokumen menjadi platformer murni: eksplorasi, puzzle, dialog, rekrutmen, dan combat bergiliran tetap inti. Jump hanya fitur traversal yang diuji dalam greybox, bukan syarat baru semua quest.

**Sumber konten terbatas:** 16 Markdown akar repository dalam delapan kategori yang diminta. DOCX, gambar, ZIP, Region.txt, GDD eksternal, dan rujukan web tidak dipakai sebagai sumber desain. PROJECT_STATE dan QA lama dibaca hanya untuk kontinuitas; package.json hanya untuk memastikan stack. Lihat [inventaris](SOURCE_INVENTORY.md) untuk nama, hash, dan cakupan.

## Concept brief

- Judul: Pusaka: Gema Nawantara; RPG naratif 3D tentang sembilan wajah kelupaan.
- Loop: jelajah dan observasi → dialog/puzzle/battle bermakna → rekrut Sukma/peroleh item → baca konsekuensi → simpan progres → buka jalur berikutnya.
- Target pemain: penyuka eksplorasi, cerita, dan strategi. ASSUMPTION: desktop browser keyboard/mouse menjadi target pertama; rating usia dan perangkat minimum ditentukan lewat review konten serta profiling.
- Stack existing: JavaScript ES modules, Three.js 0.186.0, esbuild 0.25.12, semantic HTML/CSS UI. Pertahankan versi lokal dan build process; upgrade hanya lewat perubahan terpisah dengan regresi.
- ASSUMPTION: tim kecil dengan peran producer/designer, programmer, artist/animator, narrative reviewer, dan QA; satu orang boleh merangkap. Jumlah orang, anggaran, dan tenggat belum diketahui. Tidak menetapkan janji tanggal rilis.
- Arah visual usulan: 3D stylized dengan bentuk mudah dibaca, kabut berlapis, cahaya landmark, UI gelap dengan aksen mineral. Geometri prosedural untuk greybox; bukan aset final.
- Scope penuh: 9 region, 63 zona menurut World Bible, 100 heading karakter dan 138 quest unik terverifikasi pemindaian. World Bible memperkirakan ~86 jam bermain; itu estimasi desain, bukan hasil playtest atau waktu pembangunan.
- Tidak ada gacha karakter. RNG item umum berbeda dari akuisisi karakter/item khusus yang deterministik. Level maksimal 60, Awaken mulai 40; Tingkat Gema tidak menambah cap level.

## Batas milestone

| Milestone | Cakupan | Bukti keluar |
|---|---|---|
| M0 — baseline & rekonsiliasi | Inventaris, konflik P0, gap prototipe, kontrak state | Keputusan bertaut sumber, build/test baseline, laporan gap |
| M1 — vertical slice | Satu jalur Nirwasita NR-M01–M06, keputusan Adi NR-S03, traversal, save/load, combat/puzzle, desain 3 karakter representatif | Perjalanan end-to-end dapat diulang tanpa bypass flag |
| M2 — Nirwasita lengkap | 13 quest, 7 zona, jalur 11 karakter, item dan fail state regional | Matriks setiap quest/kit/item lulus atau variasi eksklusif tercatat |
| M3 — Season 1 | Tambah 15 quest Kadewan, ritual dan cabang permanen | Regresi Nirwasita→Kadewan, efek pilihan tersimpan |
| M4 — Season 2 | Smarana 17 + Wanasunya 17 quest | Kedua urutan region valid; jual/tebus Ensiklopedia dan spectator |
| M5 — Season 3 | Kalamrtu 18 + Himagiri 14 quest | Aksara, dua tracking Kelancangan, cabang saksi |
| M6 — Season 4 | Rajawani 16 + Jaladri 16 quest | Warisan, fragmen, reset peta, pilihan permanen |
| M7 — Finale alpha | Anawil 12 quest; seluruh scope terintegrasi | 3 ending reachable lewat jalur legal; audit 100 roster/138 quest |
| M8 — beta/RC/launch | QA menyeluruh, optimasi, paket rilis | Gate Phase 4 dan 5 lulus |

M1 merupakan target uji produksi bertahap, bukan penghapusan konten dari scope penuh. M2 tidak menjanjikan semua karakter bisa direkrut dalam satu playthrough jika sumber menetapkan pilihan eksklusif. Uji kelengkapan memakai beberapa save/jalur.

## Aturan otoritas sumber

| Domain | Rujukan utama | Cara memakai |
|---|---|---|
| Identitas, role, skill, visual karakter | Guide Karakter, tiap ID dan Lampiran B | Preserve nama/role/elemen; beda rarity/tabel ditandai sebelum import |
| Item/drop/reward/equipment | Dokumen Item §0–§3 | Bedakan 45 umum, 9 spesial, dan item unik karakter; jangan tebak slot/stacking |
| World, zona, season, kalender | World Bible v5.3 | Zona dan urutan unlock bukan 9 map datar yang bebas sejak awal |
| Cakupan dan alasan misi | Kerangka Misi | Cocokkan ID/jumlah dengan Quest Script, termasuk addendum |
| Trigger, beat, fail state, cabang | Quest Script R1–R9 | Sumber implementasi alur paling rinci; konflik tetap dicatat |
| Save/state lintas region | Skema Flag + pemakaian aktual Quest Script | 341 token state hasil audit; tipe diturunkan dari operasi, bukan prefix saja |
| Mekanik antarmuka | UI UX System + Quest Script | Hooks degradasi sejak awal; panel regional tetap berbeda |
| Damage, elemen, encounter HP | Combat Math + kit karakter + angka encounter eksplisit | Rumus awal perlu tuning; catatan “FINAL” bukan bukti semua konflik selesai |

Tidak ada aturan “dokumen terbaru selalu menang” untuk seluruh domain. Gunakan keputusan desain tertulis untuk konflik; jangan mengedit sumber asli diam-diam. Lihat [SOURCE_RECONCILIATION.md](SOURCE_RECONCILIATION.md).

## Phase 1 — Planning & Concept

**Objective:** mengunci cakupan yang dapat ditelusuri, bukan menganggap 100 karakter/86 jam sebagai MVP.

**Tasks:** jalankan inventaris 16 dokumen; susun requirement ID→sumber→milestone→test; bandingkan klaim prototipe dengan scope; selesaikan keputusan P0 tentang growth, Nirsmara, passive, party/Prana, dan ending adapter. Producer menetapkan target perangkat/kapasitas setelah baseline.

**Deliverables:** rencana ini, source inventory, conflict register, konsep singkat, PROJECT_STATE terbaru.

**Risks/dependencies:** sumber memiliki sisa draft dan aturan bertentangan; 341 flag bukan save schema lengkap; estimasi jam bermain bukan estimasi effort.

**Acceptance:** 16/16 sumber tercatat, semua 9 region masuk roadmap, cakupan M1/M2 jelas, konflik kritis punya owner dan keputusan sebelum fitur terkait dikunci. Tidak menyatakan produksi siap hanya karena dokumen berjudul FINAL.

**Verification sekarang:** PASS untuk inventaris, cakupan, dan keputusan konflik C01–C14. **Next:** baseline runtime B01, lalu prototype risiko Phase 2 dengan kontrak desain yang diterima.

## Phase 2 — Pre-Production

**Objective:** membuktikan core loop dan fondasi yang bisa mendukung sembilan region.

**Tasks:** buat GDD hidup untuk M1 dari rencana ini; rancang quest graph dan typed save; definisikan urutan turn/status/Prana; desain screen flow dan character sheet; greybox N1→N7 dengan landmark. Jalankan spike kompas berbasis posisi, navigasi collider, save transaksi permanen, dan HUD Anawil empat mode. Prototipe layout tanpa teks dan idle choice sebelum produksi delapan region lain.

**Deliverables:** GDD M1, kontrak data, greybox, wireframe title/explore/dialog/battle/recovery, tiga character sheet, rekaman jalur uji dan laporan keputusan.

**Risks/dependencies:** prototype lama memiliki navigasi otomatis yang belum stabil; tanpa-teks dapat menghilangkan keterbacaan; shader kabut transparan dapat mahal; biaya final art belum terukur.

**Acceptance:** pemain dapat mulai, bergerak, interaksi, menyelesaikan satu objective, save/load, recovery, dan restart checkpoint; collider tidak membuat dead-end. Uji elevasi/jump bila traversal dipertahankan. Kompas idle memakai perpindahan posisi, bukan input. UI dapat berubah empat mode tanpa mengubah damage/flag. Character silhouette terbaca di kamera permainan.

**Verification sekarang:** desain rencana sesuai kebutuhan sumber; runtime spike BELUM DIUJI pada sesi ini. **Next:** M1 setelah hasil prototype memenuhi gate; pekerjaan fondasi yang tidak bergantung konflik dapat berjalan lebih awal.

## Phase 3 — Production

**Objective:** mengimplementasikan milestone M1–M7 secara bertahap dan teruji.

**Tasks per fitur:** Design → Implement → Integrate → Test → Polish. Programmer memisahkan domain dari rendering; narrative designer mengonversi quest per beat; artist mengikuti visual anchor; QA menguji branch/retry sebelum item dianggap selesai. Jangan menandai katalog sebagai karakter playable atau metadata sebagai quest selesai.

**Deliverables:** build versi per milestone, data quest/karakter/item tervalidasi, manifest aset, trace matrix, daftar bug, screenshot/video dan save fixture legal.

**Risks/dependencies:** semua kit perlu implementasi efek nyata; beberapa parameter skill belum numerik; perubahan state memerlukan migrasi; region bebas urutan memerlukan dua arah regresi.

**Acceptance:** setiap fitur terintegrasi dan punya bukti uji; build normal lulus; tidak ada penghalang core loop; seluruh milestone memiliki jumlah konten dan branch terukur. Field schema baru memiliki migration/default. R2–R9 tidak dibuka sebagai placeholder seolah selesai.

**Verification sekarang:** urutan milestone dan dependensi telah diperiksa pada level rencana; completion implementasi BELUM DIVERIFIKASI ulang. **Next:** kirim tiap build ke Phase 4, bukan menunggu seluruh game selesai.

## Phase 4 — Testing & QA

**Objective:** menguji kesetiaan desain, stabilitas, keterbacaan, balance, dan save.

**Tasks:** jalankan unit domain, validator konten, browser end-to-end, manual playtest, profiling hardware, dan migrasi save; bedakan bug dari masalah balance. Prioritas Critical→High→Medium→Low. Jalur otomatis memakai waypoint yang benar, tidak teleport atau mengubah flag agar lulus.

**Deliverables:** [matriks verifikasi](PHASE_VERIFICATION.md), hasil aktual per build, bug list dengan reproduksi/severity/owner, catatan playtest dan performa.

**Risks/dependencies:** headless software rendering bukan bukti performa GPU nyata; satu happy path tidak mencakup branch; asumsi party dan economy memengaruhi hasil balance.

**Acceptance:** tidak ada Critical terbuka; milestone sesuai seluruh kriteria konten; untuk RC tidak ada High terbuka. Minimal tiga pengulangan end-to-end M1 berturut-turut sebagai target internal usulan; branch permanen, ending batas, dan save round-trip lulus. Pemain target mencoba puzzle dan combat; kesenangan tidak dinyatakan berdasarkan unit test.

**Verification sekarang:** protokol dan kasus uji tersedia; semua hasil baru runtime berstatus NOT RUN. Laporan QA 15 September hanyalah bukti historis. **Next:** perbaiki temuan, ulangi tes terdampak, kemudian gate rilis.

## Phase 5 — Deployment / Launch

**Objective:** merilis paket yang benar-benar memenuhi scope yang dinyatakan.

**Tasks:** Alpha → Beta → Release Candidate → Launch; reproduksi build dengan lockfile, verifikasi aset dan lisensi, uji serving HTTP(S), context-loss recovery, ekspor/impor save dan migrasi. Siapkan halaman deskripsi/screenshot yang merepresentasikan milestone aktual, hardware minimum dari QA, changelog, rollback build dan hotfix minggu pertama. Tentukan host saat pekerjaan publishing dimulai; rencana ini tidak menerbitkan game.

**Deliverables:** build versioned, release checklist, deployment notes, backup save/migration fixture, rollback package.

**Risks/dependencies:** save browser terkait origin; pindah file lokal ke host dapat membuat save lama tidak terlihat; jelaskan ekspor/impor. Cache aset tidak boleh mencampur schema/versi build.

**Acceptance:** RC tanpa Critical/High, smoke fresh browser dan pengguna lama lulus, rollback telah direhearsal, konten halaman rilis akurat. Demo Nirwasita diberi label demo, bukan game 9 region penuh.

**Verification sekarang:** rencana tersedia; build release/deployment NOT RUN. **Next:** launch hanya setelah gate QA dan release terpenuhi.

## Phase 6 — Maintenance & LiveOps

**Objective:** memperbaiki masalah nyata tanpa merusak pilihan dan progres lama.

**Tasks:** pisahkan hotfix reaktif dari konten proaktif; catat bug, waktu loading, stuck quest, abandon encounter, feedback puzzle. ASSUMPTION: feedback lokal/opt-in cukup pada awal; backend analytics bukan dependency MVP. Setiap patch menjalankan siklus desain→implementasi→integrasi→tes→polish.

**Deliverables:** patch notes, known issues, migration report, roadmap pascarilis yang direvisi berdasarkan data pemain.

**Risks/dependencies:** rebalance dapat merusak script non-kekerasan, stat permanen, atau ending. Jangan mengganti makna flag lama tanpa migration.

**Acceptance:** save versi lama tetap bisa dimuat; regresi konten terdampak lulus; perubahan balance memiliki alasan dan data; rollback tersedia. Target retensi belum ditetapkan karena belum ada data.

**Verification sekarang:** rencana tersedia; analisis pemain NOT RUN. **Next:** ukur masalah setelah rilis, prioritaskan perbaikan sebelum memperluas scope.

## Arsitektur implementasi Three.js

Struktur di bawah adalah target refactor, bukan klaim file sudah tersedia. Pertahankan build existing; jangan menulis ulang seluruh prototipe sekaligus.

| Modul | Tanggung jawab | Kontrak utama |
|---|---|---|
| ContentRegistry | Registry ID karakter, skill, item, zone, quest | schemaVersion, sourceFile/section, status keputusan; tidak ada eval dari teks sumber |
| GameState/SaveRepository | State global typed, party, level, inventaris, pilihan, quest | Validasi sebelum commit; save versioned, backup, migration; hanya domain menulis |
| QuestRuntime | Graph node trigger→condition→actions→next | Reward/rekrut idempotent; fail/retry per quest; log event deterministik |
| BattleEngine | Turn order, action, Prana, status, damage, non-damage victory | Pure functions, seed RNG untuk uji, encounter override terpisah dari stat ally |
| World/Traversal | Zona streamed, spawn, collider, landmark, kamera | Fixed step usulan 1/60 s, delta dibatasi/substep; posisi terakhir aman |
| Time/IdleService | Siklus siang/malam dan idle | Pisahkan world-clock, combat rounds, posisi idle, dan input-idle; pause/focus policy eksplisit |
| CollectionService | Ensiklopedia, Warisan, Serpihan | Kerangka sama, kebijakan jual/tebus/nontradeable/matching berbeda |
| RegionalMechanics | Kompas, ritual, trail, aksara, Kelancangan, fragmen | Hooks world/battle/UI; sembilan perilaku, bukan reskin satu minigame |
| PresentationPolicy | Normal, tanpa dialog teks, battle tanpa teks, tanpa HUD | Presentasi saja; tidak mematikan state/angka internal; state sesuai progress |
| UI DOM | Menu, dialog, HUD, inventory, settings, recovery | Fokus keyboard, semantics, responsive; event command ke domain |
| ThreeScene/Assets | Mesh, animasi, light, VFX, audio cue | Dispose resource saat unload; reuse mesh/material; budget diukur |

Input usulan: WASD/arrows bergerak; E interaksi; Space jump jika fitur traversal dipakai; Escape pause; R restart checkpoint di sandbox/encounter yang mengizinkan retry. R tidak menghapus save atau membatalkan pilihan permanen. Form/menu harus mencegah input bocor ke dunia. Mobile touch/gamepad dijadwalkan hanya jika target diperluas. Kontrak combat/party/equipment, migration, ending, dan UI mode mengikuti DESIGN_DECISIONS C01–C14; keputusan tersebut sudah tersedia sebelum B03/B06.

Save minimal mencakup version, playthroughId, state quest bertipe, owned roster/skill level, inventory/equipment, collections, world time/position/checkpoints, decision log, dan reward receipts. Persistent choices berbeda dari transient encounter state. Peta J6 sengaja transient. Simpan history yang dibutuhkan ending; jangan simpulkan pilihan dari rekrutmen yang bisa terjadi pada dua jalur.

## Urutan sistem dan konten regional

| Region / sumber quest | Mekanik dan dependensi wajib | Verifikasi khusus |
|---|---|---|
| R1 Nirwasita, 13 | Kompas drift setelah 5 detik posisi diam; ≥3 landmark per zona navigasi; battle sabar dan lagu; NR-S03 sebelum penutupan M06 | Tandaraga 5 ronde tanpa serangan; Nirsmara 5500→66%→33%→lagu; NR-H03 cancel/confirm/reload |
| R2 Kadewan, 15 | Ritual 3 ronde siang/2 malam; hasil tersembunyi sampai terjadi; pilihan KD-M04 | KD-M02 memengaruhi KD-S02; KD-S06 addendum ikut diimpor; no-skip tracking KD-H02 |
| R3 Smarana, 17 | Collection + Kepeng + vendor; harga 3-hari/+20% malam; entri hilang dan penebusan | SM-M07 memulihkan NR-S04; pilihan SM-M06 tercatat; SM-S06 tidak mengunci M02 |
| R4 Wanasunya, 17 | Trail closure dan maksimal 5 penanda, bonus Beast; spectator | WN-M05→M06 wajib; vendor Puti tetap dapat dipakai sesudah rekrut; jangan reuse compass logic |
| R5 Kalamrtu, 18 | Assembly aksara bertahap, prasasti, debuff dua arah | KL-M03→S03; KL-H04→S05; 5 tahap Rahib Abu; resolution mengubah dialog sesuai sumber |
| R6 Himagiri, 14 | Dua tracking Kelancangan, ritual sekali/siklus, choice berisiko tanpa skor eksplisit | Historis dan checkpoint terpisah; HM-M04 merekrut di kedua jalur; saksi direkam tersendiri |
| R7 Rajawani, 16 | Warisan nontradeable, threshold 20/30, phase skip | Threshold 19/20/29/30; RJ-S02 spectator; boss masih bisa selesai tanpa karakter counter tertentu |
| R8 Jaladri, 16 | 40 fragmen per avatar, matching/monster salah, map J6 reset | JL-M05 tidak berubah lewat wipe/retry; J6 keluar-masuk reset; reward JL-H01 bukan counter Warisan |
| R9 Anawil, 12 | Empat mode presentasi, gestur, pilihan pasif, callback delapan region | AW-H02 satu-satunya rekrut Gema Purwa; AW-M05 hanya finale; ending tanpa membocorkan CS ke HUD |

Urutan implementasi R3 sebelum R4, R5 sebelum R6, R7 sebelum R8 adalah urutan produksi, bukan batas urutan bermain. Setelah S1, pasangan region dalam season tetap dapat dimainkan dalam kedua urutan sesuai World Bible.

## Backlog awal, dependency, dan estimasi

| Urut | Paket kerja | Owner peran | Bergantung | Ukuran relatif |
|---|---|---|---|---|
| B01 | Baseline build/test dan audit gap runtime | Programmer + QA | M0 inventaris | S |
| B02 | SELESAI: Decision records C01–C14; kontrak combat/state diterima | Designer + programmer | Audit sumber | M |
| B03 | Registry/validator dan save migration | Programmer | B02 field terkait | L |
| B04 | Traversal/camera/collider + kompas | Programmer + level designer | B01 | M |
| B05 | DOM UI shell, flow, degradation hooks | UI designer + programmer | B02 presentation policy | L |
| B06 | Quest graph dan battle kernel | Programmer + narrative | B02/B03 | L |
| B07 | Tiga sheet karakter + greybox aset | Artist + designer | Design spec | M |
| B08 | Integrasi NR-M01–M06 + S03 | Semua peran | B03–B07 | L |
| B09 | Regresi M1 dan playtest | QA + pemain target | B08 | M |
| B10 | Sisa Nirwasita, 11 kit, item | Semua peran | B09 lulus | XL |

S/M/L/XL menunjukkan perbandingan risiko/volume, bukan hari kerja. Setelah B09, hitung throughput quest sederhana/bercabang/spectator, kit karakter, zona, dan aset final secara terpisah. Estimasi milestone = volume tersisa ÷ throughput terukur + integrasi + QA; laporkan rentang dan bottleneck. Jangan mengalikan kecepatan satu tutorial ke seluruh 138 quest.

## Next step

Mulai B01, lalu implementasikan B03–B06 menggunakan keputusan C01–C14 yang telah diterima (B02 selesai). Perbarui PROJECT_STATE dan matriks gate setiap milestone; fase berikutnya hanya dinyatakan lulus dengan bukti aktual.
