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
    mr: headers.findIndex(h => /marathi|mr/i.test(h)),
  };
  const map = new Map();
  function normalize(s){ return (s||'').replace(/[“”]/g,'"').replace(/[‘’]/g,"'").replace(/\s+/g,' ').trim(); }
  for (let i = 1; i < rows.length; i++) {
    const r = rows[i];
    const en = normalize(r[idx.en] || '');
    if (!en) continue;
    map.set(en, {
      bn: (idx.bn>=0? (r[idx.bn]||'').trim() : ''),
      as: (idx.as>=0? (r[idx.as]||'').trim() : ''),
      mr: (idx.mr>=0? (r[idx.mr]||'').trim() : ''),
    });
  }
  return map;
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
                const norm = (function(s){ return (s||'').replace(/[“”]/g,'\"').replace(/[‘’]/g,"' ").replace(/\s+/g,' ').trim(); })(v);
                const match = map.get(norm) || map.get(v);
                dst[k] = match && match[langKey] ? match[langKey] : v;
          } else if (Array.isArray(v)) {
                dst[k] = v.map(item => typeof item === 'string' ? (map.get((item||'').replace(/[“”]/g,'\"').replace(/[‘’]/g,"' ").replace(/\s+/g,' ').trim())?.[langKey] || map.get(item)?.[langKey] || item) : (typeof item === 'object' ? (function(){ const nested = {}; recurse(item, nested); return nested; })() : item));
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
    translations.mr = buildLang('mr');

    fs.writeFileSync(translationsPath, JSON.stringify(translations, null, 2), 'utf8');
    console.log('Updated translations.json with bn, as and mr');
  } catch (err) {
    console.error(err);
    process.exit(10);
  }
})();
