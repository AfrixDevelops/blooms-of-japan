// Location types for the spots that were added before types existed (cherry and plum spots were done
// when their new spots went in). Farms and open flower fields count as countryside; gardens as parks.
const fs = require('fs'), path = require('path');
const T = {
  1: ['park'], 2: ['river', 'countryside'], 3: ['park'], 4: ['park', 'river'], 5: ['mountain'], 6: ['park', 'mountain'],
  8: ['countryside'], 10: ['park'], 11: ['park', 'river'], 12: ['park'], 13: ['park'], 14: ['temple'], 16: ['park', 'mountain'],
  18: ['park'], 19: ['park'], 22: ['countryside'], 24: ['mountain', 'countryside'], 25: ['park'], 26: ['river', 'park'],
  27: ['shrine'], 28: ['park'], 29: ['shrine', 'park'], 30: ['park'], 31: ['park'], 32: ['temple'], 33: ['park'], 34: ['park'],
  36: ['park'], 37: ['park', 'mountain'], 40: ['countryside'], 42: ['park'], 43: ['park', 'mountain'], 45: ['park'],
  46: ['park'], 47: ['park'], 48: ['park'], 49: ['mountain', 'park'], 50: ['park'], 53: ['park'], 54: ['mountain'],
  57: ['park', 'mountain'], 58: ['park'], 60: ['park'], 61: ['park', 'mountain'], 63: ['countryside'], 64: ['countryside'],
  65: ['park', 'mountain'], 66: ['park'], 67: ['park'], 68: ['countryside'], 69: ['park'], 70: ['park'], 71: ['shrine', 'park'],
  72: ['countryside'], 75: ['park'], 76: ['park'], 77: ['park'], 78: ['park'], 79: ['park', 'mountain'], 81: ['park'],
  82: ['park', 'mountain'], 83: ['shrine', 'park'], 84: ['countryside'], 85: ['park'], 86: ['park', 'mountain'], 87: ['park'],
  88: ['mountain', 'park'], 89: ['park'], 90: ['park'],
  1015: ['temple'], 1018: ['park'], 1023: ['park'], 1024: ['park'], 1025: ['park'], 1026: ['park'], 1027: ['park'],
  1028: ['park'], 1029: ['park', 'river'], 1030: ['countryside'], 1032: ['park'], 1033: ['temple'], 1034: ['park', 'mountain'],
  1035: ['mountain'], 1038: ['park', 'mountain'], 1042: ['temple'], 1047: ['countryside'], 1048: ['countryside'],
  1049: ['mountain'], 1053: ['park'], 1054: ['castle', 'park'], 1055: ['park', 'mountain'], 1059: ['temple'],
  1060: ['castle', 'park'], 1061: ['park'], 1062: ['park', 'mountain'], 1064: ['countryside'], 1065: ['park'], 1066: ['park'],
  1067: ['park'], 1068: ['river', 'countryside'], 1069: ['countryside'], 1070: ['park', 'mountain'], 1071: ['countryside'],
  1074: ['park'], 1075: ['mountain'], 1076: ['park'], 1077: ['park'], 1078: ['mountain'], 1079: ['park'], 1080: ['park'],
  1081: ['countryside'], 1082: ['mountain', 'park'], 1083: ['countryside'], 1084: ['park'], 1085: ['mountain'], 1086: ['park'],
};
const P = path.join(__dirname, '..', '..', 'bloomjapan', 'index.html');
let s = fs.readFileSync(P, 'utf8'), n = 0;
for (const [id, t] of Object.entries(T)) {
  const a = s.indexOf(' {id:' + id + ','); if (a < 0) throw new Error('no row ' + id);
  // the row ends at its own closing brace, past any gal:[{...}] list
  let d = 0, q = false, b = a + 2;
  for (; b < s.length; b++) { const c = s[b];
    if (q) { if (c === '\\') b++; else if (c === '"') q = false; continue; }
    if (c === '"') q = true; else if (c === '{' || c === '[') d++; else if (c === '}' || c === ']') { if (!d--) break; } }
  const row = s.slice(a, b); if (/type:\[/.test(row)) continue;
  s = s.slice(0, b) + ',type:' + JSON.stringify(t) + s.slice(b); n++;
}
fs.writeFileSync(P, s);
console.log('typed', n, 'spots');
