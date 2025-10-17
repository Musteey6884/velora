import { describe, it, expect } from 'vitest';
import { getFavorites, toggleFavorite } from '../src/services/favorites';

describe('favorites service', () => {
  it('toggles favorites and persists', () => {
    localStorage.clear();
    const id = 't1';
    expect(getFavorites()).toEqual([]);
    toggleFavorite(id);
    expect(getFavorites()).toContain(id);
    toggleFavorite(id);
    expect(getFavorites()).not.toContain(id);
  });
});