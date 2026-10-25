const fs = require('fs');
const vm = require('vm');
const h = fs.readFileSync('index.html', 'utf8');
const js = h.slice(h.lastIndexOf('<script>') + 8, h.lastIndexOf('</script>'));

for (const [label, re] of [['DATA', /const DATA = \[[\s\S]*?\n\];/], ['GALLERY', /const GALLERY = \{[\s\S]*?\n\};/], ['CLIMATE', /const CLIMATE = \{[\s\S]*?\n\};/]]) {
  const m = js.match(re);
  if (!m) { console.log(label, 'not found'); continue; }
  try { new vm.Script(m[0]); console.log(label, 'ok'); }
  catch (e) {
    console.log(label, 'ERROR:', e.message);
    // bisect by line to find the offender
    const lines = m[0].split('\n');
    for (let i = 1; i < lines.length - 1; i++) {
      const probe = lines[0] + '\n' + lines[i] + '\n' + lines[lines.length - 1];
      try { new vm.Script(probe); } catch { console.log('   line', i, '->', lines[i].slice(0, 150)); }
    }
  }
}
