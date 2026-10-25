const fs=require('fs'),path=require('path');const d=path.join(__dirname,'..');
let r=fs.readFileSync(path.join(d,'build-router.js'),'utf8');
const line=r.split('\n').find(l=>l.startsWith('const flowerName = '));if(!line)throw new Error('router line');
r=r.replace('// the flower as a reader would say it ("Kochia", "Cherry blossom"), for titles, crumbs and alt text\n'+line+'\n','');
if(r.includes('const flowerName = '))throw new Error('not removed');fs.writeFileSync(path.join(d,'build-router.js'),r);
let s=fs.readFileSync(path.join(d,'index.src.html'),'utf8');
const anchor="document.getElementById('nspots').textContent = D.feat.length;";
if(!s.includes(anchor))throw new Error('anchor');
// the router copy is inside a template literal, so its backslashes are doubled; undo that for the page
const plain=line.split('\\').join('\');
s=s.replace(anchor,anchor+'\n// the flower as a reader would say it ("Kochia", "Cherry blossom"), for titles, crumbs and alt text\n'+plain);
const A=[['<img src="${f.th}" alt="${f.name}" loading="lazy" decoding="async">','<img src="${f.th}" alt="${esc(flowerName(f))} at ${esc(f.name)}" loading="lazy" decoding="async">']];
for(const[a,b]of A){const n=s.split(a).length-1;if(n<1)throw new Error('alt '+n);s=s.split(a).join(b);console.log('alt replaced x'+n);}
fs.writeFileSync(path.join(d,'index.src.html'),s);console.log('moved:',plain);
