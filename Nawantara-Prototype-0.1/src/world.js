import {SIDE_NPCS} from './side-ui.js';
import * as T from 'three';
export const zones=['Teluk Ranaya','Wana Sanu','Danu Sanu','Lembah Diam','Kabut Kelambu','Kuta Wisata','Menara Pandu'];
export const center=i=>-i*30;
export function createWorld(canvas){
 const renderer=new T.WebGLRenderer({canvas,antialias:false,alpha:false});renderer.setPixelRatio(1);renderer.shadowMap.enabled=false;renderer.shadowMap.type=T.PCFSoftShadowMap;renderer.toneMapping=T.ACESFilmicToneMapping;renderer.toneMappingExposure=1.15;
 const scene=new T.Scene();scene.background=new T.Color('#a9c8c4');scene.fog=new T.FogExp2('#a9c8c4',.012);
 const camera=new T.PerspectiveCamera(43,1,.1,300);const ambient=new T.HemisphereLight('#dbf3f1','#234438',2.4);scene.add(ambient);
 const sun=new T.DirectionalLight('#ffe0a2',3.3);sun.position.set(-30,55,15);sun.castShadow=true;sun.shadow.mapSize.set(1024,1024);Object.assign(sun.shadow.camera,{left:-40,right:40,top:40,bottom:-40,near:1,far:150});sun.shadow.bias=-.0005;scene.add(sun,sun.target);
 const mats={};const mat=(color)=>mats[color]||(mats[color]=new T.MeshStandardMaterial({color,roughness:.87,flatShading:true}));
 const boxGeo=new T.BoxGeometry(1,1,1),sphereGeo=new T.IcosahedronGeometry(1,0),coneGeo=new T.ConeGeometry(1,1,7),cylGeo=new T.CylinderGeometry(1,1,1,10);
 function mesh(geo,color,x,y,z,sx=1,sy=1,sz=1,parent=scene){const o=new T.Mesh(geo,mat(color));o.position.set(x,y,z);o.scale.set(sx,sy,sz);o.castShadow=true;o.receiveShadow=true;parent.add(o);return o;}
 const box=(c,x,y,z,sx,sy,sz,p)=>mesh(boxGeo,c,x,y,z,sx,sy,sz,p), rock=(c,x,y,z,sx,sy,sz,p)=>mesh(sphereGeo,c,x,y,z,sx,sy,sz,p);
 let seed=734;function rand(){seed=(seed*16807)%2147483647;return (seed-1)/2147483646;}
 const water=mesh(new T.PlaneGeometry(600,600,1,1),'#3c9d9c',0,-.78,-80);water.rotation.x=-Math.PI/2;water.receiveShadow=true;water.castShadow=false;
 const colliders=[];
 function tree(x,z,scale=1,gold=false){const g=new T.Group();g.position.set(x,0,z);g.scale.setScalar(scale);scene.add(g);box('#574c3e',0,1.4,0,.35,2.8,.35,g);rock(gold?'#cda453':'#32645b',0,3.2,0,1.7,2,1.6,g);rock(gold?'#e3bd6c':'#518274',.7,3,0,1.2,1.2,1.25,g);colliders.push({x,z,r:.6*scale});return g;}
 function pillar(x,z,h=4){box('#52675e',x,h/2,z,.85,h,.85);box('#99a38a',x,h,z,1.3,.3,1.3);box('#dcb971',x,h+.22,z,1,.16,1);}
 function arch(z,large=false){const w=large?6:4,h=large?7:4.5;pillar(-w,z,h);pillar(w,z,h);box('#496359',0,h,z,2*w+1,.7,1.3);box('#b7a570',0,h+.4,z,2*w+1.5,.18,1.5);box('#6f8570',0,h+.9,z,w,1,1.2);rock('#dfc785',0,h+1.65,z,.7,.7,.3);}
 function house(x,z,rot=0){const g=new T.Group();g.position.set(x,0,z);g.rotation.y=rot;scene.add(g);box('#6c6854',0,1.6,0,5,3.2,4,g);for(const dx of [-2,2])for(const dz of [-1.5,1.5])box('#b1a179',dx,1.7,dz,.3,3.6,.3,g);const roof=mesh(new T.ConeGeometry(4.4,2,4),'#344f49',0,4.2,0,1,1,.85,g);roof.rotation.y=Math.PI/4;box('#d3b06a',0,3.3,0,6,.15,5,g);box('#253c36',0,1.2,2.02,1.2,2.4,.1,g);colliders.push({x,z,r:3});}
 // Each island has a walkable axial route, environmental landmarks and a Sesajen.
 for(let i=0;i<7;i++){const z=center(i),ground=i===0?'#d5c394':i===4?'#78968b':i===6?'#798577':'#779777';mesh(new T.CylinderGeometry(20,17,2.5,12),ground,0,-1.35,z,1,1,1);mesh(new T.CylinderGeometry(17.5,19,4,12),'#355955',0,-4.4,z);box(i===0?'#decda3':'#b1b08a',0,.04,z,5,.16,29);
 for(let j=0;j<16;j++){const x=(j%2?1:-1)*(6+rand()*11),zz=z+(rand()-.5)*26;tree(x,zz,.6+rand()*.65,i===3||i===5);}
 for(let j=0;j<10;j++){const x=(j%2?1:-1)*(7+rand()*11),zz=z+(rand()-.5)*25;rock('#66867d',x,.25,zz,1+rand()*2,.5+rand()*1.2,1+rand()*2);}
 // V-marked landmarks remain visible independently of compass.
 for(let j=0;j<3;j++){const x=j%2?4:-4,zz=z+8-j*8;box('#445f50',x,1.1,zz,.25,2.2,.25);const a=box('#eac577',x-.17,1.9,zz,.1,.55,.12);a.rotation.z=.65;const b=box('#eac577',x+.17,1.9,zz,.1,.55,.12);b.rotation.z=-.65;}
 if(i<6){box('#657467',0,-.05,z-16,4.5,.3,5);for(const x of [-2.3,2.3])box('#b1ac81',x,.5,z-16,.15,.8,5);}
 arch(z-10,i===6);
 }
 // Coastal pier, boat and cairns.
 box('#796a50',1,.1,12,4,.3,12);for(let j=0;j<11;j++)box('#a59870',1,.29,7+j,3.9,.07,.1);box('#504d3e',6,.1,11,2,.7,6);mesh(coneGeo,'#dec997',6,2,11,1.5,2,.1);
 // Lake to the right of N3, layered stone rings.
 mesh(new T.CylinderGeometry(6,6, .12,24),'#4bbaae',9,.04,-59,1,1,1.5);for(let j=0;j<10;j++){const a=j/10*Math.PI*2;rock('#8b9e88',9+6.4*Math.cos(a),.3,-59+9*Math.sin(a),.8,.5,.8);}
 // Three standing stones in the valley.
 for(let j=0;j<3;j++){rock('#60776d',7+j*2.6,2,-90-j*2,1,2.6,.7);box('#d3bd80',7+j*2.6,2,-89.4-j*2,.13,2,.06);}
 // Settlement and temple backdrop.
 house(-9,-147,.15);house(10,-149,-.25);house(-10,-156,.4);
 for(let j=0;j<5;j++)box('#62766b',0,.15+j*.24,-187-j*.4,10-j*.7,.3,8-j*.3);
 for(let j=0;j<4;j++){box('#3f5e54',0,1.4+j*2,-192,9-j*1.8,2.3,6-j);box('#b1a074',0,2.65+j*2,-192,10-j*1.8,.3,7-j);}
 mesh(coneGeo,'#d7bd77',0,10.6,-192,1.2,2,1.2);
 const npcs=[],lights=[],floaters=[];
 function avatar(color,x,z,ghost=false,size=1){const g=new T.Group();g.position.set(x,0,z);g.scale.setScalar(size);scene.add(g);mesh(new T.CylinderGeometry(.3,.65,1.35,7),color,0,.95,0,1,1,1,g);rock('#d6b77e',0,1.88,0,.36,.42,.36,g);mesh(coneGeo,'#344f4c',0,2.18,0,.66,.3,.66,g);box('#dfc281',0,1.28,.35,.2,.65,.05,g);if(!ghost){box('#304a46',-.19,.28,0,.22,.5,.25,g);box('#304a46',.19,.28,0,.22,.5,.25,g);}else floaters.push(g);box('#554f43',.62,1.05,0,.08,2.05,.08,g);rock('#ffe2a0',.62,2.1,0,.16,.18,.16,g);return g;}
 const player=avatar('#e1c077',0,7,false,1);
 // Prototype silhouettes follow Guide #01/#02/#09; not final character art.
 const characterMotion=[];
 const veilGeometry=new T.TorusGeometry(.72,.065,6,36,Math.PI*1.85);
 function character(id,color,x,z,ghost,size=1){
  if(id==='nirsmara'){
   const g=new T.Group();g.position.set(x,0,z);g.scale.setScalar(size);scene.add(g);
   const veil=mesh(veilGeometry,'#34404e',0,1.35,0,.85,1.65,.8,g);veil.rotation.z=.24;
   mesh(veilGeometry,'#a0b8c6',0,1.35,-.06,.94,1.76,.8,g).rotation.z=-.25;
   for(const side of [-1,1])box('#627f8d',side*.55,.52,0,.14,.9,.16,g);
   floaters.push(g);return g;
  }
  const g=avatar(color,x,z,ghost,size);
  if(id==='tandaraga'){
   // Replace the lantern staff with a long spear and rigid guard silhouette.
   g.remove(g.children[g.children.length-1],g.children[g.children.length-2]);
   box('#665b46',.7,1.55,0,.065,3.1,.065,g);mesh(coneGeo,'#d4c2a3',.7,3.23,0,.13,.5,.13,g);
   box('#745245',-.45,1.32,0,.32,.25,.46,g);
  }
  if(id==='lampah'){
   g.children[2].visible=false;g.children[1].material=mat('#a3cbc4');
   for(const side of [-1,1])box('#639f9a',side*.36,.52,.25,.15,.9,.14,g);
   characterMotion.push(g);
  }
  return g;
 }
 const beaconMat=new T.MeshBasicMaterial({color:'#ffe0a0',transparent:true,opacity:.6,depthWrite:false});
 function npc(id,name,x,z,color='#88cbb9',ghost=false){const obj=character(id==='mist'||id==='adiReal'?'adi':id,color,x,z,id==='mist'?false:ghost);const marker=new T.Mesh(new T.OctahedronGeometry(.27),beaconMat);marker.position.set(x,3.2,z);scene.add(marker);npcs.push({id,name,x,z,obj,marker});return npcs[npcs.length-1];}
 for(const [id,name,x,z] of [['route0','Penanda V · barat',-3,-114],['route1','Batu kembar · timur',3,-121],['route2','Tanda air · barat',-3,-125]]){const obj=rock('#e0ca87',x,.6,z,.6,1.2,.6);npcs.push({id,name,x,z,obj,marker:obj});}
 for(const [i,x,z] of [[0,3,-114],[1,-3,-121],[2,3,-125]]){const obj=rock('#96a599',x,.6,z,.6,1.2,.6);npcs.push({id:'wrongRoute'+i,name:'Jalur kabut · periksa arah',x,z,obj,marker:obj});box('#7a8977',0,.03,z,7,.06,.55);}
 // M02's unique river makes two sharp turns; scene remains prototype geometry.
 for(const [x,z,w,d] of [[2,-57,1,4],[3.5,-59,4,1],[5,-61.5,1,6]])box('#4bbaae',x,.16,z,w,.12,d);
 const bend=rock('#e0ca87',4,.35,-62,.45,.7,.45);npcs.push({id:'riverBend',name:'Sungai dua tikungan · periksa jejak',x:4,z:-62,obj:bend,marker:bend});
 npc('extraction','Jalur keluar · ekstraksi',3,-35,'#d9c781');
 for(const [i,x,z] of [[0,6,-66],[1,3,-66]]){const n=npc('lampahGhost'+i,'Pengembara yang tersesat',x,z,'#adc4bb',true);n.noninteractive=true;}
 for(const [i,x,z,angle] of [[0,-1,-113,-Math.PI/2],[1,1,-120,Math.PI/2]]){const n=npc('adiHint'+i,'Jejak Adi',x,z,'#d4cda6');n.noninteractive=true;n.obj.rotation.y=angle;if(i===0)box('#d4cda6',0,1.5,.75,.15,.15,1.2,n.obj);}
 const prints=new T.Group();scene.add(prints);for(let i=0;i<7;i++){const x=-i*.42,z=-115+i*.16;for(const side of [-1,1])box('#d9c781',x+side*.13,.16,z,.12,.04,.24,prints);}npcs.push({id:'adiFootprints',name:'Jejak kaki',x:0,z:-115,obj:prints,marker:prints,noninteractive:true});
 npc('mandala','Mandala · manuskrip skill',0,-75,'#bda977');
 npc('nirsmaraAltar','Altar Kesepakatan',0,-189,'#988daf',true);
 npc('challenges','Rekrutmen & Titah · Kuta Wisata',0,-160,'#cdb67b');
 npc('adiReal','Sosok di timur',3,-132,'#dbd4a5');
 npc('adiTalk','Adi · dunia luar',3,-155,'#dbd4a5');
 const adiTrail=rock('#d9bc71',-3,.25,-181,.65,.5,.65);npcs.push({id:'adiTrail',name:'Persimpangan · batu bertanda V',x:-3,z:-181,obj:adiTrail,marker:adiTrail});
 npc('guide','Penjaga dermaga',-3,5,'#8a9981');npc('checkpoint','Penanda V',0,-29,'#75a78b',true);npc('ranaya','Nenek Ranaya',-5,-57,'#bd9d77');npc('lampah','Lampah Sinaru',5,-64,'#83c7c2',true);npc('tandaraga','Tandaraga',0,-90,'#b17455');npc('adi','Adi',0,-118,'#dbd4a5');npc('mist','Sosok di tengah kabut',0,-129,'#dbd4a5',false);npc('sanra','Sanra Ranu',-6,-148,'#77b0bc');npc('vendor','Sanra Buri',7,-148,'#b2a46d');npc('elder','Tetua',-6,-157,'#afa182');npc('tower','Penjaga Menara',0,-172,'#788f7d',true);npc('adiEnd','Adi',4,-178,'#dbd4a5');npc('nirsmara','Nirsmara',0,-185,'#7d8db0',true).obj.scale.setScalar(1.8);
 for(const [id,name,x,z] of SIDE_NPCS){if(id.startsWith('memory')){const obj=rock('#ead9a5',x,1,z,.24,.5,.24);npcs.push({id,name,x,z,obj,marker:obj});}else npc(id,name,x,z,id==='oldHouse'?'#bcaa72':'#84b8ad',true);}
 for(let i=0;i<7;i++){const z=center(i)+7;mesh(cylGeo,'#586f5c',-5,.2,z,.9,.4,.9);mesh(coneGeo,'#d9bc71',-5,.75,z,.45,.7,.45);const ring=new T.Mesh(new T.TorusGeometry(1.1,.035,5,32),mat('#f2d699'));ring.rotation.x=-Math.PI/2;ring.position.set(-5,.08,z);scene.add(ring);npcs.push({id:'save'+i,name:'Sesajen · simpan & perjalanan',x:-5,z,obj:ring,marker:ring});}
 for(let i=0;i<3;i++){const z=-92-i*29;const obj=rock('#b7bd98',-9,.3,z,1.1,.55,1.1);npcs.push({id:'burial'+i,name:'Ingatan yang tertanam',x:-9,z,obj,marker:obj});}
 for(let i=0;i<4;i++)npc('roam'+i,'Bayang di jalur samping',3,center(i)+10,'#699c9c',true);
 const motes=new T.BufferGeometry();const pos=[];for(let j=0;j<240;j++)pos.push((rand()-.5)*38,1+rand()*9,14-rand()*211);motes.setAttribute('position',new T.Float32BufferAttribute(pos,3));const particles=new T.Points(motes,new T.PointsMaterial({color:'#f6d999',size:.13,transparent:true,opacity:.65}));scene.add(particles);
 const battleGroup=new T.Group();scene.add(battleGroup);let enemyMeshes=[];
 function setBattle(b){for(const m of enemyMeshes){scene.remove(m);for(const list of [floaters,characterMotion]){const index=list.indexOf(m);if(index>=0)list.splice(index,1);}}enemyMeshes=[];if(b){for(let i=0;i<b.enemies.length;i++){const o=character(b.kind,b.kind==='nirsmara'?'#8a91c0':'#75b1a2',player.position.x+3+i*2,player.position.z-5,b.kind!=='tandaraga',b.kind==='nirsmara'?2:1.3);enemyMeshes.push(o);}}}
 let yaw=.28,zoom=1;
 function render(dt,time,inBattle,started,visible,revealed=()=>true,reducedMotion=false){
 const target=player.position.clone();if(!started)target.set(0,0,-176);
 const offset=new T.Vector3(Math.sin(yaw)*29,25,Math.cos(yaw)*29).multiplyScalar(zoom);const desired=target.clone().add(offset);camera.position.lerp(desired,1-Math.exp(-dt*4));camera.lookAt(target.x,target.y+1,target.z-2);
 sun.position.set(target.x-30,55,target.z+15);sun.target.position.copy(target);
 for(const g of floaters)g.position.y=.14+(reducedMotion?0:Math.sin(time*1.3+g.position.x)*.12);
 for(const g of characterMotion){g.rotation.z=Math.sin(time*3)*.04;g.children.at(-1).rotation.x=Math.sin(time*3)*.12;}
 for(const n of npcs){const show=!inBattle&&visible(n)&&revealed(n);n.obj.visible=show;n.marker.visible=show;if(n.id==='adiReal'||n.id==='mist'){const moving=n.id==='adiReal'||Math.floor(time/2)%2===0;n.obj.position.x=n.x+(moving?Math.sin(time*3)*.18:0);if(!moving){n.obj.rotation.z=0;n.obj.children.at(-1).rotation.x=0;}}if(n.marker!==n.obj){n.marker.rotation.y=time;n.marker.position.y=3.3+Math.sin(time*2)*.12;}}
 for(let i=0;i<enemyMeshes.length;i++)enemyMeshes[i].visible=inBattle&&inBattle.enemies[i]>0;
 particles.rotation.y=reducedMotion?0:Math.sin(time*.05)*.002;renderer.render(scene,camera);
 }
 function resize(){renderer.setSize(innerWidth,innerHeight);camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();}resize();addEventListener('resize',resize);
 function move(dx,dz,dt,minZ){const speed=8.5;const a=yaw;const vx=dx*Math.cos(a)+dz*Math.sin(a),vz=dz*Math.cos(a)-dx*Math.sin(a);const x=Math.max(-16,Math.min(16,player.position.x+vx*dt*speed)),z=Math.max(minZ,Math.min(13,player.position.z+vz*dt*speed));const blocked=(xx,zz)=>colliders.some(c=>Math.hypot(xx-c.x,zz-c.z)<c.r+.35);if(!blocked(x,z))player.position.set(x,0,z);else if(!blocked(x,player.position.z))player.position.x=x;else if(!blocked(player.position.x,z))player.position.z=z;if(dx||dz)player.rotation.y=Math.atan2(vx,vz);}
 function quality(mode){const standard=mode==='standard';renderer.setPixelRatio(standard?Math.min(devicePixelRatio,1.65):1);renderer.shadowMap.enabled=standard;particles.visible=standard;resize();}
 let lastNight=null;function lighting(isNight){if(lastNight===isNight)return;lastNight=isNight;scene.background.set(isNight?'#263c53':'#a9c8c4');scene.fog.color.copy(scene.background);ambient.intensity=isNight?1.5:2.4;sun.intensity=isNight?1.2:3.3;}quality('low');
 return {quality,lighting,renderer,scene,camera,player,npcs,render,move,setBattle,orbit:d=>yaw+=d,zoom:d=>zoom=Math.max(.7,Math.min(1.5,zoom+d))};
}
