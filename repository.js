import { STORAGE_KEY, PREVIOUS_KEY, UPGRADE_KEY } from './core.js';
const BEFORE_V3_KEY = 'english-garden.before-upgrade.v2';

// Browser-only persistence boundary. The learning rules in core.js have no storage dependency.
// A future Supabase implementation must make callers asynchronous and add authentication/conflict handling.
export class BrowserRepository {
  constructor(storage) { this.storage = storage; }
  loadRaw() { return this.storage.getItem(STORAGE_KEY); }
  save(state) { this.storage.setItem(STORAGE_KEY, JSON.stringify(state)); }
  previousRaw() { return this.storage.getItem(PREVIOUS_KEY); }
  beforeUpgradeRaw() { return this.storage.getItem(BEFORE_V3_KEY) || this.storage.getItem(UPGRADE_KEY); }
  upgradeWithBackup(state, raw) {
    let version;
    try { version=JSON.parse(raw)?.schemaVersion; } catch { /* Preserve legacy raw data. */ }
    const key=version===2?BEFORE_V3_KEY:UPGRADE_KEY;
    if (!this.storage.getItem(key)) this.storage.setItem(key, raw);
    this.save(state);
  }
  replaceWithBackup(state, previousRaw) {
    // If either write fails, never proceed to a later destructive step.
    this.storage.setItem(PREVIOUS_KEY, previousRaw);
    this.save(state);
  }
}
