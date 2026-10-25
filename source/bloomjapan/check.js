const fs = require('fs');
const h = fs.readFileSync('index.html', 'utf8');
const js = h.slice(h.lastIndexOf('<script>') + 8, h.lastIndexOf('</script>'));

try { new (require('vm').Script)(js); console.log('JS parses OK'); }
catch (e) { console.log('SYNTAX ERROR:', e.message); process.exit(1); }

const calls = [...h.matchAll(/onclick="([A-Za-z_]\w*)\(/g)].map(m => m[1]);
let bad = 0;
[...new Set(calls)].forEach(fn => {
  const ok = js.includes('function ' + fn + '(');
  if (!ok) bad++;
  console.log((ok ? 'ok      ' : 'MISSING ') + fn);
});

// element ids referenced by getElementById must exist in markup
const ids = [...new Set([...js.matchAll(/getElementById\("([^"]+)"\)/g)].map(m => m[1]))];
ids.forEach(id => {
  const ok = h.includes('id="' + id + '"');
  if (!ok) bad++;
  console.log((ok ? 'ok      #' : 'MISSING #') + id);
});
console.log(bad ? `\n${bad} PROBLEM(S)` : '\nall references resolve');
