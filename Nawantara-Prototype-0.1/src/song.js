// NR-M05. Price premium is a preview baseline; the source specifies no amount.
export const vendorPrice=s=>s.flags.flag_vendor_refused?30:20;
export function updateSong(s){if(s.flags.flag_ranaya_song_stage===4)return;s.flags.flag_ranaya_song_stage=Math.min(3,1+s.fragments.length);}
export function receiveFragment(s,id){if(s.chapter!==4||!['sanra','vendor','elder'].includes(id)||s.fragments.includes(id))return false;s.fragments.push(id);s.flags['flag_fragment_'+(id==='sanra'?'sanra_ranu':id)]=true;updateSong(s);return true;}
export function refuseVendor(s){if(s.chapter!==4||s.fragments.includes('vendor'))return false;s.flags.flag_vendor_refused=true;return true;}
export function buyFragment(s){if(s.chapter!==4||s.fragments.includes('vendor')||s.kepeng<vendorPrice(s))return false;const price=vendorPrice(s);if(!receiveFragment(s,'vendor'))return false;s.kepeng-=price;return true;}
export function finishSong(s){if(s.chapter!==4||s.fragments.length!==3||s.flags.flag_ranaya_song_stage===4)return false;s.flags.flag_ranaya_song_stage=4;s.flags.flag_ranaya_song_reunited=true;return true;}
