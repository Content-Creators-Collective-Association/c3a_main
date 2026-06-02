const fs = require('fs');
const path = require('path');

function parseCSV(content) {
  const rows = [];
  let cur = '';
  let inQuotes = false;
  let row = [];
  for (let i = 0; i < content.length; i++) {
    const ch = content[i];
    if (ch === '"') {
      if (inQuotes && content[i+1] === '"') { cur += '"'; i++; continue; }
      inQuotes = !inQuotes;
      continue;
    }
    if (!inQuotes && (ch === '\r')) continue;
    if (!inQuotes && ch === ',') { row.push(cur); cur = ''; continue; }
    if (!inQuotes && ch === '\n') { row.push(cur); rows.push(row); row = []; cur = ''; continue; }
    cur += ch;
  }
  // final
  if (cur.length || row.length) { row.push(cur); rows.push(row); }
  return rows;
}

function buildMap(rows) {
  const headers = rows[0].map(h => h.trim());
  const idx = {
    en: headers.findIndex(h => /english/i.test(h)),
    bn: headers.findIndex(h => /bengali/i.test(h)),
    as: headers.findIndex(h => /assam|assamese/i.test(h)),
  };
  const map = new Map();
  for (let i = 1; i < rows.length; i++) {
    const r = rows[i];
    const en = (r[idx.en] || '').trim();
    if (!en) continue;
    map.set(en, {
      bn: (idx.bn>=0? (r[idx.bn]||'').trim() : ''),
      as: (idx.as>=0? (r[idx.as]||'').trim() : ''),
    });
  }
  return map;
}

function traverseAndFill(enObj, map) {
  if (typeof enObj === 'string') return enObj;
  if (Array.isArray(enObj)) return enObj.map(v => traverseAndFill(v, map));
  const out = {};
  for (const k of Object.keys(enObj)) {
    const v = enObj[k];
    if (typeof v === 'string') {
      const found = map.get(v);
      out[k] = found ? found : v;
    } else {
      out[k] = traverseAndFill(v, map);
    }
  }
  return out;
}

(async function(){
  try {
    const csvPath = process.argv[2] || path.join(process.env.USERPROFILE || '.', 'Downloads', 'C3A - Sheet1.csv');
    if (!fs.existsSync(csvPath)) { console.error('CSV not found at', csvPath); process.exit(1); }
    const csv = fs.readFileSync(csvPath, 'utf8');
    const rows = parseCSV(csv);
    const map = buildMap(rows);

    const translationsPath = path.join(__dirname, '..', 'src', 'lib', 'translations.json');
    const translationsRaw = fs.readFileSync(translationsPath, 'utf8');
    const translations = JSON.parse(translationsRaw);

    const en = translations.en;
    if (!en) { console.error('No en block found'); process.exit(2); }

    function buildLang(langKey) {
      const result = {};
      function recurse(src, dst) {
        for (const k of Object.keys(src)) {
          const v = src[k];
          if (typeof v === 'string') {
            const match = map.get(v);
            dst[k] = match && match[langKey] ? match[langKey] : v;
          } else if (Array.isArray(v)) {
            dst[k] = v.map(item => typeof item === 'string' ? (map.get(item)?.[langKey] || item) : recurse(item, {}));
          } else {
            dst[k] = {};
            recurse(v, dst[k]);
          }
        }
      }
      recurse(en, result);
      return result;
    }

    translations.bn = buildLang('bn');
    translations.as = buildLang('as');

    fs.writeFileSync(translationsPath, JSON.stringify(translations, null, 2), 'utf8');
    console.log('Updated translations.json with bn and as');
  } catch (err) {
    console.error(err);
    process.exit(10);
  }
})();
