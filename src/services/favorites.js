export const FAV_KEY = 'velora_favs';

export function getFavorites() {
  try {
    return JSON.parse(localStorage.getItem(FAV_KEY) || '[]');
  } catch {
    return [];
  }
}

export function isFavorite(id) {
  return getFavorites().includes(id);
}

export function toggleFavorite(id) {
  const f = new Set(getFavorites());
  if (f.has(id)) f.delete(id); else f.add(id);
  const arr = Array.from(f);
  localStorage.setItem(FAV_KEY, JSON.stringify(arr));
  // emit storage-like event for same window listeners
  try { window.dispatchEvent(new Event('storage')); } catch {}
  return arr;
}