const KEY = 'nexus_app_v1';

export function loadStore() {
  const raw = localStorage.getItem(KEY);
  if (!raw) return null;
  try { return JSON.parse(raw); }
  catch { return null; }
}

export function saveStore(state) {
  localStorage.setItem(KEY, JSON.stringify(state));
}

// initialize if empty
export function initStore(initial) {
  const existing = loadStore();
  if (!existing) {
    saveStore(initial);
    return initial;
  }
  return existing;
}

