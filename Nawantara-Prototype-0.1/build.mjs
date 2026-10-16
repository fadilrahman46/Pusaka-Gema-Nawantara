import {build} from 'esbuild';
import {readFileSync,writeFileSync,mkdirSync} from 'node:fs';
const result=await build({entryPoints:['src/game.js'],bundle:true,minify:true,format:'iife',write:false,legalComments:'inline',target:'es2020'});
const template=readFileSync('index.template.html','utf8');mkdirSync('dist',{recursive:true});const standalone=template.replace('/* BUNDLE */',()=>result.outputFiles[0].text.replaceAll('</script','<\\/script'));writeFileSync('dist/Nawantara-3D.html',standalone);writeFileSync('dist/index.html',standalone);console.log('Built standalone HTML.');
