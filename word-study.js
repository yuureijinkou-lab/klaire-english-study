const posNames = new Map([
  ['名词', 'n.'], ['动词', 'v.'], ['形容词', 'adj.'], ['副词', 'adv.'],
  ['代词', 'pron.'], ['介词', 'prep.'], ['连词', 'conj.'], ['感叹词', 'interj.'],
  ['限定词', 'det.'], ['冠词', 'art.'], ['基数词', 'num.'], ['数词', 'num.'],
  ['情态动词', 'modal v.'], ['动词短语', 'v. phr.'], ['名词短语', 'n. phr.'], ['短语', 'phr.']
]);

const wordKey = value => value.normalize('NFKC').trim().toLowerCase().replace(/\s+/g, ' ');

export function partOfSpeechLabel(value = '') {
  return [...new Set(value.split(/[／/、；;，,]+/).map(part => {
    const name = part.trim();
    return posNames.get(name) || (/^[a-zA-Z.\s]+$/.test(name) ? name : '');
  }).filter(Boolean))].join(' / ');
}

export function validateWordStudy(value) {
  const fail = () => { throw new Error('词卡补充资料格式不正确。'); };
  const validText = (field, max) => typeof field === 'string' && Boolean(field.trim()) && field.length <= max;
  if (!value || !validText(value.pos, 100) || !Array.isArray(value.examples) || value.examples.length > 6 ||
      !Array.isArray(value.related) || value.related.length > 6) fail();
  function pairs(items, max) {
    return items.map(pair => {
      if (!pair || !validText(pair.en, max) || !validText(pair.zh, max)) fail();
      return { en: pair.en.trim(), zh: pair.zh.trim() };
    });
  }
  return { pos: value.pos.trim(), examples: pairs(value.examples, 2000), related: pairs(value.related, 500) };
}

export function planWordStudyImport(entries, text, scene) {
  const byWord = new Map();
  for (const [index, raw] of text.split(/\r\n|\n|\r/).entries()) {
    if (!raw.trim()) continue;
    const [word, pos, en1, zh1, en2, zh2, links, extra] = raw.split('｜').map(field => field.trim());
    if (!word || !links || extra !== undefined) throw new Error(`第 ${index + 1} 行应包含单词、词性、两组例句和相关词。`);
    const key = wordKey(word);
    if (byWord.has(key)) throw new Error(`第 ${index + 1} 行有重复单词。`);
    const related = links.split(';').map(link => {
      const separator = link.indexOf('=');
      if (separator < 1) throw new Error(`第 ${index + 1} 行的相关词请写成「英文=中文」。`);
      return { en: link.slice(0, separator), zh: link.slice(separator + 1) };
    });
    byWord.set(key, validateWordStudy({ pos, examples: [{ en: en1, zh: zh1 }, { en: en2, zh: zh2 }], related }));
  }

  const changes = new Map();
  for (const entry of entries) {
    if (entry.kind !== 'word' || entry.deletedAt || entry.needsCheck || entry.scene !== scene) continue;
    const wordStudy = byWord.get(wordKey(entry.en));
    if (wordStudy && JSON.stringify(entry.wordStudy) !== JSON.stringify(wordStudy)) changes.set(entry.id, wordStudy);
  }
  return changes;
}

export function studyExamples(entry) {
  const examples = entry.example || entry.exampleZh ? [{ en: entry.example, zh: entry.exampleZh }] : [];
  for (const pair of entry.wordStudy?.examples || []) {
    const match = examples.find(existing => wordKey(existing.en) === wordKey(pair.en));
    if (!match) examples.push(pair);
    else if (!match.zh) match.zh = pair.zh;
  }
  return examples;
}

export function relatedReviewIds(entry, entries, queue) {
  const links = entry.wordStudy?.related || [];
  const queued = new Set(queue);
  const queuedWords = new Set(entries.filter(card => card.kind === 'word' && queued.has(card.id)).map(card => wordKey(card.en)));
  queuedWords.add(wordKey(entry.en));
  const eligible = entries.filter(card => card.kind === 'word' && !card.deletedAt && !card.needsCheck);
  const ids = [];
  for (const link of links) {
    const key = wordKey(link.en);
    if (queuedWords.has(key)) continue;
    const matches = eligible.filter(card => wordKey(card.en) === key);
    const card = matches.find(item => item.scene === entry.scene) || matches[0];
    if (!card) continue;
    ids.push(card.id);
    queuedWords.add(key);
  }
  return ids;
}
