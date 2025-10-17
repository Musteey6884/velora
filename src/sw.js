const CACHE_NAME = 'velora-cache-v2';
const ASSETS = ['/', '/index.html', '/favicon.ico', '/logo192.png'];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;
  const url = new URL(e.request.url);
  // network-first for API calls
  if (url.pathname.startsWith('/api') || url.pathname.startsWith('/api/')) {
    e.respondWith(fetch(e.request).catch(()=>caches.match('/index.html')));
    return;
  }
  e.respondWith(
    caches.match(e.request).then(resp => resp || fetch(e.request).then(r => {
      try { caches.open(CACHE_NAME).then(cache => cache.put(e.request, r.clone())); } catch {}
      return r;
    })).catch(()=>caches.match('/index.html'))
  );
});