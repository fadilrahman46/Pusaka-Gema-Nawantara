import test from 'node:test';import assert from 'node:assert/strict';
import {fresh,migrateSave} from '../src/state.js';import {encounterAvailable} from '../src/quest-graph.js';
import {vendorPrice,refuseVendor,buyFragment,receiveFragment,finishSong} from '../src/song.js';
test('vendor remembers explicit refusal after reload; purchase is atomic and idempotent',()=>{
 let s=fresh();s.chapter=4;assert.equal(vendorPrice(s),20);assert.ok(refuseVendor(s));s=migrateSave(s);assert.equal(vendorPrice(s),30);
 s.kepeng=29;const before=JSON.stringify(s);assert.equal(buyFragment(s),false);assert.equal(JSON.stringify(s),before);
 s.kepeng=30;assert.ok(buyFragment(s));assert.equal(s.kepeng,0);assert.equal(buyFragment(s),false);assert.equal(s.fragments.length,1);
});
test('all fragment permutations require Ranaya reunion before tower; old complete songs preserved',()=>{
 const orders=[['sanra','vendor','elder'],['sanra','elder','vendor'],['vendor','sanra','elder'],['vendor','elder','sanra'],['elder','sanra','vendor'],['elder','vendor','sanra']];
 for(const order of orders){let s=fresh();s.chapter=4;s.flags.flag_ranaya_song_stage=1;
  for(let i=0;i<3;i++){receiveFragment(s,order[i]);assert.equal(s.flags.flag_ranaya_song_stage,Math.min(3,i+2));s=migrateSave(s);assert.equal(encounterAvailable(s,'tower'),false);}
  assert.ok(finishSong(s));assert.equal(finishSong(s),false);assert.equal(encounterAvailable(s,'tower'),true);
 }
 const old=fresh();old.chapter=4;old.fragments=['sanra','vendor','elder'];old.flags.flag_ranaya_song_stage=4;assert.ok(encounterAvailable(migrateSave(old),'tower'));
});
