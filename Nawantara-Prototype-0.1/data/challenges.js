// Item names, levels and bonuses: Dokumen Item §3.2. Challenge objectives are preview design.
export const UNIQUE_ITEMS={
 1:{name:'Jimat Rombongan yang Tak Sampai',slot:'Jimat',level:20,title:'Titah Rombongan yang Tak Sampai',description:'Pamungkas Lampah: peluang Bingung 30% (dari 25%).'},
 2:{name:'Senjata Perang yang Tak Datang',slot:'Senjata',level:20,title:'Titah Perang yang Tak Datang',description:'Pamungkas Tandaraga: damage 275% (dari 260%).'},
 3:{name:'Jimat Yang Masih Hafal',slot:'Jimat',level:20,title:'Titah Yang Masih Hafal',description:'Pamungkas Sanra: heal sekutu hidup 50% (dari 45%); revive tetap 25%.'},
 4:{name:'Pusaka Sampai Sini Saja',slot:'Pusaka',level:25,title:'Titah Sampai Sini Saja',description:'Pamungkas pertama Watu per battle: DEF tim +8% sampai battle berakhir, tidak bertumpuk. Durasi kebal tetap 1 ronde (baseline role DEF).'},
 7:{name:'Senjata Yang Tak Bisa Digambarkan',slot:'Senjata',level:35,title:'Titah Yang Tak Bisa Digambarkan',description:'Pamungkas Tobelang: damage setiap hit 97% (dari 90%).'}
};
export const CHALLENGES={
 recruit3:{id:3,type:'recruit',title:'Pertemuan Sanra Ranu',goal:'Pulihkan sekutu terluka dengan Sebut Namanya, lalu menangkan pertemuan.'},
 recruit4:{id:4,type:'recruit',title:'Pertemuan Watu Palindra',goal:'Gunakan Menarik Batas untuk melindungi dua sekutu belakang selama tiga ronde. Bertahan memberi 1 Prana.'},
 recruit7:{id:7,type:'recruit',title:'Pertemuan Tobelang',goal:'Gunakan Tak Terjelaskan pada musuh yang belum pernah diserang Tobelang, lalu menang.'},
 ...Object.fromEntries(Object.entries(UNIQUE_ITEMS).map(([id,item])=>['item'+id,{id:+id,type:'item',title:item.title,goal:({1:'Terapkan Bingung dengan Pamungkas, lalu menang.',2:'Gunakan Pamungkas sebelum serangan pertama Tandaraga, lalu menang.',3:'Pulihkan sekutu terluka dengan Pamungkas, lalu menang.',4:'Gunakan Pamungkas untuk menahan serangan ke sekutu, lalu menang.',7:'Gunakan Pamungkas dan menangkan pertemuan.'})[id]}]))
};
export const challengeFlag=key=>'ext_challenge_'+key+'_complete';
