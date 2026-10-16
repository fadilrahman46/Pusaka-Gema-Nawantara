# Keputusan desain mengikat — DD-2026-09-18 v1

Status: **ACCEPTED** untuk C01–C14. Dasar persetujuan: pengguna meminta “Selesaikan konflik sesuai dengan rekomendasi”. Berlaku untuk implementasi berikutnya; tidak menyatakan prototipe lama sudah menerapkannya. Pemilik: peran desain/programmer/QA pada conflict register. Versi kontrak: `designRevision = naw-2026-09-18.1`, target `saveSchemaVersion = 2`.

Dokumen ini adalah override terbatas atas bagian sumber yang disebut, bukan sumber lore baru. Sumber asli tetap disimpan sebagai bukti historis. Jika bertentangan pada C01–C14, keputusan ini berlaku; bagian sumber lainnya tetap berlaku. Angka default yang baru dilengkapi diberi label **BASELINE DESAIN**, dapat dituning melalui revisi dan regresi, bukan dianggap kutipan kanon atau hasil playtest.

## C01 — Growth dan Awaken

Sumber: Guide §Aturan Sistem Level & Stat dan tabel setiap karakter; Combat §1.3. **ACCEPTED:** pertumbuhan HP/ATK/DEF +2% majemuk per level; interpolasi linear Combat tidak digunakan untuk karakter playable.

- Validasi level integer 1–60. Untuk stat `b` pada L1, nilai default `floor(b * 1.02^(L-1))`. Jangan membulatkan setiap level karena itu menimbulkan drift kumulatif.
- L1/L40/L60 menggunakan angka tabel **karakter bersangkutan** persis. Tabel mengalahkan formula pada anchor tersebut. Perbedaan pembulatan maupun beda besar masuk audit data, bukan alasan mengganti dengan rerata tier.
- SPD default `floor(SPD_L1 * 1.02^floor(L/5))`; L1/L40/L60 tetap mengikuti tabel individual. CRT Rate/DMG, RES, ACC tetap sampai Awaken; persentase disimpan dalam unit eksplisit.
- Awaken hanya sekali mulai L40. Bonus HP/ATK/DEF/SPD untuk intermediate level menggunakan selisih `awakenedL40 - normalL40` per karakter ditambah nilai normal pada level itu. Pada L40/L60 gunakan tabel Awaken persis; jangan menambahkan bonus lagi ke tabel yang sudah Awaken.
- CRT/RES/ACC awakened mengikuti tabel awakened individual; bila anchor40/60 berbeda, interpolasi hanya bonus awakened antara dua anchor dengan pembulatan sesuai presisi kolom. Ini tidak menghidupkan kembali interpolasi growth dasar.
- Jika tabel individual hilang/ambigu, registry menolak status production-ready karakter itu. Fallback berbasis role/rarity hanya untuk fixture prototype berlabel, tidak menggantikan data resmi diam-diam.

Migration: level/skill/ownership tetap, derived stat dihitung ulang dari registry; current HP mempertahankan rasio HP lama terhadap max lama, dibulatkan turun dan dibatasi max baru. Unit tumbang tetap0; unit hidup minimal1. Encounter aktif dipulihkan ke checkpoint aman, bukan diubah stat di tengah turn.

Acceptance: contoh Common HP1070: L20=1558, L40=2316, L60=3442; semua anchor individual cocok dengan tabel, batas level/Awaken terjaga. Test COM-02.

## C02 — Jalur Nirsmara

Sumber: Guide #09 Cara Didapat, Quest R1 NR-M06 dan NR-S04. **ACCEPTED:** NR-M06 memulihkan dan merekrut Nirsmara melalui fase battle5500HP→66%→33%→puzzle lagu. Tidak ada syarat pengorbanan Ensiklopedia tambahan untuk Nirsmara. Pengorbanan entri merupakan mekanik NR-S04 Nggarindu dan dapat dipulihkan melalui SM-M07 sesuai Quest Script. Identitas, role, elemen, dan kit Nirsmara tetap Guide.

Migration: jangan menghapus rekrut/entri lama otomatis; simpan keputusan dan receipt lama. Save yang sudah mengorbankan entri untuk Nirsmara secara khusus diberi recovery record untuk pemulihan entri itu jika ID asal terbukti, tanpa menggandakan reward. Tanpa bukti, tandai review migrasi; jangan mengarang entri. Test NR-02/SM-01.

## C03 — Passive Common

Sumber: Guide tabel Level Skill dan teks passive Common. **ACCEPTED:** karakter Common sebagai ally tidak membuka passive, termasuk setelah Awaken. Teks passive Common disimpan sebagai referensi desain, tidak otomatis diaktifkan. Encounter boleh memakai passive hanya bila Quest Script secara eksplisit mensyaratkannya, sebagai `encounterOverride`, bukan membuka passive ally.

Non-Common membuka passive saat Awaken, kecuali sumber menetapkan pengecualian eksplisit. Efek item/aksi aktif Common tetap berlaku; jangan menganggap semuanya passive karakter. Migration: hapus derived passive activation yang tidak sah, tanpa mengurangi level atau mencabut kepemilikan. Test COM-02/03.

## C04 — Enum Adi dan adapter ending

Sumber: R1 NR-S03, R9 AW-M05. **ACCEPTED:** simpan `flag_adi_resolution_path = null | WAITED | FORCED_PAST` dan `flag_region_resolution_nirwasita = NEUTRAL | ADI_JOINS` terpisah. Baru/skip: null dan NEUTRAL. WAITED memberi ADI_JOINS dan CS+2; FORCED_PAST memberi NEUTRAL dan CS0; skip memberi0.

Migration precedence: event keputusan bertimestamp yang valid → path valid → legacy resolution ADI_JOINS→WAITED; legacy resolution WAITED/FORCED_PAST dipindah ke field path lalu normalize resolution. NEUTRAL saja tidak membuktikan FORCED_PAST: path tetap null. Bukti yang saling bertentangan menghasilkan migrationIssue dan tidak dapat memfinalisasi ending sampai diperbaiki lewat recovery, bukan dipilih yang menguntungkan.

Test NR-03: seluruh kombinasi legal dan legacy, termasuk skip serta bukti bertentangan. Save original dibackup.

## C05 — Input ending eksplisit

Sumber: R3 SM-M06; R6 HM-M04; R9 AW-M05. **ACCEPTED:** simpan keputusan saat branch dipilih, bukan diturunkan dari roster atau meter yang dapat berubah.

| Field baru | Domain | Saat commit | Kontribusi CS |
|---|---|---|---|
| endingInputs.smaranaOffer | null / ACCEPTED / DECLINED | SM-M06 penawaran | DECLINED2, ACCEPTED0 |
| endingInputs.himagiriResolution | null / WITNESSED / COMBAT | HM-M04 resolusi sukses | WITNESSED2, COMBAT0 |

Tiap field punya provenance `{questId, eventId, sourceRevision}`. Transaksi commit branch+reward+quest state atomik, eventId idempotent. Null sebelum misi selesai memberi skor proyeksi0; **null setelah misi selesai tanpa bukti adalah data tidak lengkap**, bukan keputusan0 yang boleh diam-diam menutup ending. Migration dapat memakai branch event/receipt khusus jalur; recruitment/completion/meter saja tidak cukup. Jika ambiguous, pertahankan save, blok hanya finalisasi ending dan sediakan recovery pilihan tersimpan, jangan memblok semua eksplorasi.

Field lama tetap kompatibel; 341 token sumber bukan batas maksimum field produksi. Test SAVE-02/END-01.

## C06 — Dua meter Kelancangan

Sumber: R6 Mekanik Reset; HM-M03 Beat reward; HM-M04/HM-H01. **ACCEPTED:** checkpoint dimulai saat **HM-M03 selesai**, satu kali. Ritual membersihkan meter global saja; pelanggaran sesudah checkpoint tidak bisa dihapus dengan ritual untuk opsi saksi. Ini sengaja menggantikan kalimat yang menyiratkan ritual menghapus checkpoint.

| Event | global meter0–100 | sinceHM_M03: null atau0–100 | ritualUsed |
|---|---|---|---|
| Save baru | 0 | null (belum aktif) | false |
| Pelanggaran siang sebelum checkpoint | +delta, clamp100 | tetap null | tetap |
| HM-M03 complete pertama kali | tidak berubah | 0 | tetap |
| Pelanggaran siang setelah checkpoint | +delta, clamp100 | +delta, clamp100 | tetap |
| Malam tanpa tata krama | tidak bertambah | tidak bertambah | tetap |
| Ritual valid transisi malam→pagi | 0 | tidak berubah | true; konsumsi1 kain |
| Awal siklus baru | tetap | tetap | false, sebelum ritual baru dievaluasi |
| Reload/retry/event complete duplikat | tetap | tetap | tetap |

HM-H01 memakai global meter==0 (dapat dipulihkan ritual). HM-M04 opsi saksi hanya jika checkpoint aktif==0; memilih damage tetap valid dan merekrut Wisesa. Skor ending berdasarkan pilihan sukses, bukan tersedianya opsi. **BASELINE DESAIN:** pelanggaran tanpa angka+10, buff ATK musuh+0.5% per poin global (maks50%); Kain Sembah20 Kepeng. Override quest bernilai eksplisit mengalahkan default. Migration checkpoint ambigu ditandai unknown; jangan otomatis0. Test HM-01.

## C07 — Status audit dan encounter registry

Sumber: Combat §3–4, semua Quest Script. **ACCEPTED:** klaim “0 placeholder/selesai100%” hanya riwayat tulisan, bukan bukti validasi. Registry evidence dibuat dalam ENCOUNTER_REGISTER.json dan ringkasannya; setiap kandidat HP memiliki quest/section/line/raw source, kebijakan resolusi, dan status implementasi.

Urutan parameter encounter yang mengikat:

1. Angka/kondisi khusus yang eksplisit dalam quest, termasuk scripted-low, fase, spectator, non-damage victory: pertahankan sebagai override.
2. Angka eksplisit bertanda placeholder menjadi **baseline tuning**, bukan diam-diam dianggap balance final; nilai dan provenance tetap dicatat.
3. Rekrutmen non-Legendary tanpa HP pasti: gunakan lookup Combat §4.2 region/tier; bukan growth ally C01. R9 Kalana Sauyan yang hanya menyebut basisL1 dan scaling memakai Anawil/SuperRare=8054HP.
4. Legendary recruitment boss memakai HP L1 individual yang eksplisit (Nirsmara5500), bukan dikalikan level region; hal ini tidak mengubah stat Legendary sebagai ally.
5. Monster generik tanpa angka: `floor(1070 * 1.02^(encounterLevel-1) * factor)` dengan factor0.75 tutorial,1 standar,1.5 elite. Level encounter menggunakan C14. Ini BASELINE DESAIN untuk mengisi gap, bukan mengganti angka eksplisit di quest.
6. Kalimat HP yang hanya menjelaskan threshold atau UI bukan encounter tambahan; classifier evidence tidak boleh mengubahnya menjadi musuh baru.

Sebelum memasukkan tiap encounter ke build, programmer menandai binding enemy/tier/conditions terverifikasi dan QA menguji attempt. Registry evidence bukan runtime content dan bukan audit semua battle selesai. Konflik status sudah ditutup; tuning serta binding per encounter merupakan pekerjaan produksi yang terukur, bukan keputusan sumber yang masih menggantung. Test COM-03/NR-02.

## C08 — Kontrak combat dan equipment baseline

Sumber: Guide skill individual; Combat §5; Dokumen Item §0/§3. **ACCEPTED — BASELINE DESAIN** untuk angka yang tidak tersedia. Explicit skill/quest override selalu didahulukan dan dicatat.

| Aturan | Baseline implementasi |
|---|---|
| Party | 4 slot aktif, boleh1–4; dua depan+dua belakang; syarat quest khusus dapat membatasi party |
| Urutan | Awal ronde snapshot SPD turun; tie ally dahulu lalu stable combatantId lexical; perubahan SPD berlaku ronde berikutnya |
| Aksi | Satu aksi per unit hidup per ronde; target/biaya divalidasi saat commit; aksi invalid tidak menghabiskan resource |
| Prana | Per unit integer0–5; awal0 tiap encounter; Dasar sukses+1 mengikuti teks; Spesial biaya2; Pamungkas biaya4; Bertahan+1 dan damage diterima×0.5 hingga giliran berikutnya |
| Cooldown | Dasar/Guard0, Spesial2, Pamungkas3 giliran pemilik berikutnya diblok. Setelah cast, blockedTurns=N; tiap giliran pemilik yang diblok menurunkan1 pada akhir giliran. Skip/stun tetap giliran yang dihitung |
| Item “cooldown -1 penggunaan” | Kurangi blockedTurns skill terkait sebanyak1, minimum0; tidak menambah charge, tidak menembus batas once-per-battle |
| Target default | Damage/debuff:1 musuh; heal/buff:1 ally hidup; resurrection hanya bila skill menyatakan. “Seluruh tim”/AoE mengikuti teks. Guard self |
| Magnitude tak bernilai | Damage kecil0.75×, tunggal biasa1×, besar1.5× baseline formula; heal kecil10% maxHP target; setiap penggunaan default ditandai tuningRequired |
| Damage | ATK²/(ATK+1.5DEF) × skill × elemen × crit × mitigation; floor sekali di akhir; minimum1 jika hit nonimmune,0 untuk miss/immunity/script lock |
| Accuracy gap | Default hit clamp(0.90+ACC_attacker-RES_target,0.05,1); nilai persentase pakai pecahan; guaranteed hit override. Status chance memakai baseChance×hitChance, satu roll status terpisah |
| Status duration | Ronde berarti N akhir ronde penuh setelah ronde aplikasi, kecuali source punya trigger khusus. Efek “selama giliran” mengikuti unit-turn; durasi tidak menyusut saat pause |
| Stacking | Key effectId+target: refresh durasi ke max, magnitude tertinggi, tidak jumlahkan kecuali sumber mengatakan stack. Stack eksplisit mengikuti cap sumber; tanpa cap max1. Buff stat beda effectId dijumlahkan sebelum multiplier damage |
| HP/resource | Clamp0..max; damage/HP permanen berlaku sisa battle jika sumber menyatakan; healing tidak resurrect otomatis; min-maxHP1 |
| Equipment | 4 slot: Senjata,Jimat,Pusaka,Kitab; 1 item per kategori; tidak duplikat instance di dua unit; syarat tipe/level/quest wajib; perubahan di luar battle |
| Item unik/spesial | Masuk kategori sumber dan memakai slot kategori; “permanen” sebagai world unlock tidak butuh equip. Bonus equipment pasif tetap butuh equip; efek sekali pakai=sekali per battle kecuali item konsumsi eksplisit |
| RNG | State/seed tersimpan untuk replay QA; combat bukan RNG recruitment; bonus crit=1+CRT_DMG |

Input cost/target/cooldown/status rules merupakan configuration versioned, tidak hardcoded di UI. Sloka cost, seluruh bespoke skill dan ekonomi lengkap tetap task produksi per karakter; validator melarang skill masuk build tanpa parameter efektif dari override atau baseline di atas. Test COM-01/02/03.

## C09 — Rarity

Sumber: Guide blok100 karakter dan Lampiran Distribusi Final. **ACCEPTED:** Common26, Uncommon19, Rare19, SuperRare14, UltraRare13, Legendary9. Audit seluruh100 heading+rarity mengonfirmasi distribusi ini; tabel Lampiran A Rare14/SR19 usang. ID tidak berubah. Migration tier display/effective stats mengikuti ID registry, tidak meroll ulang roster; compensation hanya bila ada pembelian/upgrade terdampak dengan receipt, bukan reward massal tanpa bukti. Test DATA-01.

## C10 — Empat mode UI

Sumber: UI §9 dan R9. **ACCEPTED:** `presentationMode = NORMAL | GESTURE | ICON_BATTLE | NO_HUD` monoton untuk progres Anawil pada playthrough yang sama. Tiga boolean lama adalah turunan, bukan tiga mode total.

| Mode | dialogTextDisabled | battleTextDisabled | hudTotalDisabled | Trigger |
|---|---|---|---|---|
| NORMAL | false | false | false | A1–A3 awal; foreshadow minor terpisah |
| GESTURE | true | false | false | AW-M03 masuk fase dialog gestur A3–A4 |
| ICON_BATTLE | true | true | false | AW-M04 A4–A5 |
| NO_HUD | true | true | true | AW-M05 Beat1 masuk A7; aturan spesifik ini mengalahkan ringkasan A6–A7 |

Pause/settings/recovery di lapisan sistem tetap bisa dipanggil, tidak menampilkan objective/CS/hint ketika HUD dilarang. Screen-reader label operasi sistem tetap tersedia; dialog diegetik tidak diam-diam diubah jadi walkthrough. Audio punya padanan visual nonteks. Migration boolean legacy mengambil tingkat tertinggi lalu menormalkan semua boolean sebelumnya. Test UI-02.

## C11 — Formula ending deterministik

Sumber: R9 AW-M05. **ACCEPTED:** CS=max16: NirwasitaWAITED2; KadewanMEANING2; SmaranaDECLINED2; WanasunyaINFORMED2; KalamrtuREVEALED2; HimagiriWITNESSED2; Warisan≥30:2/≥20:1/lain0; JaladriSCATTERED2.

`B = CS>=10 AND recruited>=75 AND encyclopedia>=80%`. Jika bukanB, hasilA. `eligibleC = CS>=14 AND recruited>=95 AND encyclopedia==100%`. C hanya dipilih bila eligibleC dan sukses diam final; jika memilih lanjut hasilB. Nama enum: KABUT_KEMBALI/YANG_MENGINGAT/LARAS.

Ensiklopedia: rata-rata persentase delapan region non-Anawil, sesuai R9; hitung dari entry eligible/total masing-masing tanpa pembulatan sebelum compare.100% hanya jika delapan region seluruhnya lengkap. Sold tidak dihitung, restored dihitung. Snapshot eligibility saat masuk AW-M05; tidak ada perubahan collection/recruitment selama final sequence. Null branch wajib yang belum recover sesuai C05 mencegah finalize; nilai0 sah tidak dianggap unknown. Test END-01/02.

## C12 — Reward sebelum finale dan pilihan diam

Sumber: R9 AW-H03/H04/M05, Item §3.13. **ACCEPTED:** pisahkan projectedEnding(A/B), eligibleC, dan finalEnding(null/A/B/C). Jangan menyimpan LARAS sebelum pilihan final.

- Reward #99/#100 langsung memberi **satu item instance** dengan efek final yang sudah dapat dipakai. Sebelum finale, textVariant=PENDING; gunakan ikon dalam Anawil dan label netral “Pusaka Penjaga” / “Jimat Tanpa Batas” bila layar sistem mengizinkan teks. Nama ini BASELINE DESAIN sementara, bukan ending keempat.
- Saat ending committed, update textVariant instance yang sama ke nama persis Item §3.13 untuk A/B/C; tidak tambah item, tidak reset equip/effect/level. Item #100 tetap kategori Jimat walau nama final sumber diawali “Pusaka”. Reward yang diberikan setelah ending langsung memakai varian final.
- Migration nama lama sebelum finale menjadi PENDING; simpan legacyName di metadata untuk audit. Final ending valid yang sudah dicapai tidak dihitung ulang setelah update balance.
- **BASELINE DESAIN:** pilihan diam AW-H04 dan AW-M05 selama8 detik simulasi aktif, setelah input pembuka dilepas. Tekanan keyboard/gamepad/pointer-down gameplay membatalkan diam; mousemove dan analog drift di bawah deadzone0.2 tidak dihitung. Jangan menghitung input yang membuka sequence sebagai pilihan jawaban.
- Pause/Escape, focus loss, tab hidden menghentikan timer dan tidak memilih cabang. Resume memerlukan aksi eksplisit di layar sistem; input resume dikonsumsi, timer diteruskan. AW-H04 input kategori menyebabkan gagal attempt yang dapat diulang; AW-M05 input lanjut memberiB dan mengunci finale. Save/reload tidak mengubah timer/choice committed.

Test END-01/UI-02/SAVE-01: nama provisional tidak spoiler;8 detik vs7.99; press/blur/pause/reload dan grant idempotent.

## C13 — Review budaya dan art gate

Sumber: Item catatan Anawil, Guide Lampiran B, World Bible §9.0. **ACCEPTED:** pernyataan review Arief08-08-2026 pada “Misi dan Karakter Anawil” diterima sebagai catatan dokumenter; tidak diklaim verifikasi eksternal maupun persetujuan otomatis aset baru.

| Cakupan | Status desain | Gate implementasi |
|---|---|---|
| Misi/karakter Anawil dalam sumber | Review tercatat di Dokumen Item | Dapat dipakai untuk spec/greybox sesuai keputusan pengguna |
| Model, kostum, ikon, animasi, audio/gestur final baru | Belum ada bukti review aset | Wajib review art sesuai Guide Lampiran B sebelum disahkan final |
| Lore card/bibliografi yang belum lengkap | Task produksi tercatat | Isi/rujukan harus diverifikasi sebelum asset/content gate ditutup |
| Karakter berisiko lain pada Lampiran B | Ikuti cakupan regional di sumber | Review sebelum final art sesuai sumber; jangan menganggap catatan Anawil mencakup semua region |

Ini menyelesaikan konflik status dokumen; review aset masa depan tetap dependency produksi. Tidak ada permintaan approval tambahan untuk kerja rencana atau greybox. Test ART-01.

## C14 — Level encounter dan angka eksplisit

Sumber: Combat §2, §3.2, §4.1/4.2; Quest Script. **ACCEPTED:** band party S1=1–15 adalah target progres party; lookup Kadewan16 adalah **reference encounter level** yang boleh satu tingkat di atas target, bukan perubahan cap/progres party. Tingkat referensi region berurutan:12/16/19/26/32/38/44/50/58.

Lookup non-Legendary §4.2 tetap tabel balance encounter; tidak wajib identik dengan growth playable C01. Contoh naratif §3.2 yang tidak cocok formula diberi status illustrative/historical, bukan assertion matematis. Legendary boss flat dan scripted exception mengikuti C07. Semua perubahan nilai encounter perlu content revision dan regresi, tidak rewrite angka otomatis berdasarkan level party. Test COM-03/KD-01.

## Gate dan handoff

Keputusan14/14 selesai pada tingkat desain; tidak ada C01–C14 berstatus PROPOSED. G1 keputusan lulus. G2 tetap menunggu greybox/spike, implementasi domain, dan pengujian. Binding encounter, tuning, final art review, migration runtime, serta uji browser tetap pekerjaan nyata; label ACCEPTED tidak menggantikannya.

Urutan berikut: B01 baseline runtime; B03 typed registry/save; B04–B06 traversal/UI/quest/combat; M1 Nirwasita. B02 rekonsiliasi telah selesai. Simpan decision revision bersama setiap build dan hasil QA agar sumber lama tidak kembali diterapkan.
