// Teaches the route test about real paths: location has pathname/search, and history calls move it.
const fs=require('fs'),path=require('path');const p=path.join(__dirname,'..','test-router.js');let s=fs.readFileSync(p,'utf8');
const A=[
 ["global.location = { get hash(){ return hash; }, pathname:'/', search:'', hash:'' };\nObject.defineProperty(global.location, 'hash', { get: () => hash, set: v => { hash = v; } });",
  "global.location = { pathname:'/', search:'', hash:'' };\nObject.defineProperty(global.location, 'hash', { get: () => hash, set: v => { hash = v; } });\nconst setUrl = u => { if (u == null) return; const m = String(u).match(/^([^?#]*)(\?[^#]*)?(#.*)?$/); global.location.pathname = m[1] || '/'; global.location.search = m[2] || ''; hash = m[3] || ''; };"],
 ["global.history = { replaceState(){} };","global.history = { state: null, replaceState(s, t, u){ setUrl(u); }, pushState(s, t, u){ setUrl(u); } };"],
 ["function go(h) {\n  hash = h;\n  route();","function visit(h) {\n  setUrl(h);\n  route();"],
 ["    const v = go(h);","    const v = visit(h);"],
];
for(const[a,b]of A){if(!s.includes(a))throw new Error('missing '+a.slice(0,50));s=s.split(a).join(b);}
s=s.replace(/\[\['', 'home'\],[^\n]*\]\]\n/, "[['/', 'home'], ['/?season=spring', 'home'], ['/seasons', 'seas'], ['/spots/kenrokuen', 'spot'], ['/spots/oishi-park', 'spot'], ['/when/april', 'home'], ['/calendar', 'home'], ['/spots', 'home'], ['/flowers', 'home'], ['/flowers/wisteria', 'home'], ['/spots/meguro-river', 'spot'], ['/spots?q=kochia', 'home'], ['/spots?q=zzzz', 'home'], ['/#/spots/kenrokuen', 'spot'], ['/#/search/kochia', 'home'], ['/#/winter', 'home']]\n");
s=s.replace("console.log((h || '(empty)').padEnd(20)","console.log(h.padEnd(22)");
fs.writeFileSync(p,s);console.log('patched');
