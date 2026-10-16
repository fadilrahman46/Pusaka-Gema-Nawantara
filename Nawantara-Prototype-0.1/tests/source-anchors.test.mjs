import test from 'node:test';import assert from 'node:assert/strict';import {readFileSync} from 'node:fs';
import registry from '../data/nirwasita-stats.js';
test('generated registry matches 33 normal stat rows in original Guide Markdown',()=>{
 const source=readFileSync(new URL('../../GUIDE_KARAKTER_100_Nawantara_FINAL_v1_1.md',import.meta.url),'utf8');
 for(const [id,row] of Object.entries(registry)){
  const start=source.search(new RegExp('^### '+id.padStart(2,'0')+' ·','m'));assert.ok(start>=0);const rest=source.slice(start+1),end=rest.search(/^### \d+ ·/m),block=end<0?rest:rest.slice(0,end);
  for(const [level,label] of [[1,'Level 1 (Basic)'],[40,'Level 40 (belum Awaken)'],[60,'Level 60 (belum Awaken, maks)']]){
   const line=block.split('\n').find(line=>line.startsWith('| '+label+' |'));assert.ok(line,id+' '+label);
   const values=line.split('|').slice(2,-1).map(s=>Number(s.trim().replace(/[%*]/g,'')));
   assert.deepEqual(Object.values(row.anchors[level]),values,id+' '+level);
  }
 }
});
