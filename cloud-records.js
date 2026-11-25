import { createState, prepareState, validateState } from './core.js?v=book2-v1';

const personalFields = ['notes', 'favorite', 'needsCheck', 'deletedAt'];
const fold = value => value.normalize('NFKC').trim().toLowerCase().replace(/\s+/g, ' ');
const wordKey = entry => JSON.stringify([fold(entry.en), fold(entry.zh)]);

export function createStudyRecords(seeds) {
  const catalog = validateState(createState(seeds)).entries;
  const byId = new Map(catalog.map(entry => [entry.id, entry]));
  const bookTwo = catalog.filter(entry => entry.id.startsWith('nce2-handwritten-'));
  const oldBookTwoKeys = new Map();
  for (const entry of bookTwo) {
    const key = wordKey(entry);
    oldBookTwoKeys.set(key, oldBookTwoKeys.has(key) ? null : entry.id);
  }

  function catalogId(entry) {
    if (byId.has(entry.id)) return entry.id;
    if (entry.module === 'words' && entry.scene === bookTwo[0]?.scene) return oldBookTwoKeys.get(wordKey(entry));
  }

  function pack(state) {
    const publicIds = new Map();
    const records = new Map();
    for (const entry of state.entries) {
      const id = catalogId(entry);
      if (!id) continue;
      publicIds.set(entry.id, id);
      const base = byId.get(id);
      const changes = personalFields.filter(key => entry[key] !== base[key]);
      if (changes.length) records.set(id, {id,...Object.fromEntries(changes.map(key => [key,entry[key]]))});
    }
    const progress = Object.fromEntries(Object.keys(state.progress).sort().flatMap(id =>
      publicIds.has(id) ? [[publicIds.get(id),state.progress[id]]] : []));
    return {
      schemaVersion: state.schemaVersion, studyRecords: 1,
      entries: [...records.keys()].sort().map(id => records.get(id)), lessons: {}, progress,
      activities: state.activities.filter(activity => publicIds.has(activity.itemId)).map(activity =>
        ({...activity,itemId: publicIds.get(activity.itemId)})),
      settings: state.settings
    };
  }

  function unpack(payload) {
    if (payload?.studyRecords === undefined) return prepareState(payload,seeds).state;
    if (payload.studyRecords !== 1 || !Array.isArray(payload.entries)) throw Error('云端学习记录版本不支持。');
    const changes = new Map();
    for (const entry of payload.entries) {
      if (!byId.has(entry?.id) || changes.has(entry.id)) throw Error('云端词条编号无法匹配，请刷新网页。');
      changes.set(entry.id, Object.fromEntries(personalFields.filter(key => Object.prototype.hasOwnProperty.call(entry,key)).map(key => [key,entry[key]])));
    }
    return validateState({...payload, entries: catalog.map(entry => ({...entry,...changes.get(entry.id)}))});
  }

  function merge(incoming, local) {
    if (!local) return incoming;
    const localPublic = new Map();
    const localPrivate = new Map();
    for (const entry of local.entries) {
      const id = catalogId(entry);
      if (id) localPublic.set(id,entry);
      else localPrivate.set(entry.id,entry);
    }
    const remapped = new Map();
    const entries = incoming.entries.map(entry => {
      const current = localPublic.get(catalogId(entry)) ?? localPrivate.get(entry.id);
      if (!current) return entry;
      localPrivate.delete(entry.id);
      remapped.set(entry.id,current.id);
      return {...current,...Object.fromEntries(personalFields.map(key => [key,entry[key]]))};
    });
    entries.push(...localPrivate.values());
    const progress = Object.fromEntries(Object.entries(incoming.progress).map(([id,value]) => [remapped.get(id) ?? id,value]));
    for (const id of localPrivate.keys()) if (local.progress[id]) progress[id] = local.progress[id];
    const activities = incoming.activities.map(activity => ({...activity,itemId:remapped.get(activity.itemId) ?? activity.itemId}));
    activities.push(...local.activities.filter(activity => localPrivate.has(activity.itemId)));
    return validateState({...incoming,entries,lessons:{...incoming.lessons,...local.lessons},progress,activities});
  }

  return {pack,unpack,merge};
}
