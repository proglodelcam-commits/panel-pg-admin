// ═══════════════════════════════════════════════════════
// PG del Campo — Service Worker Unificado (GitHub Pages PWA)
// Versión: 3.0 — index.html ahora Network-First (recibe actualizaciones)
// ═══════════════════════════════════════════════════════
const CACHE_NAME = 'pg-del-campo-v3';
// Assets locales a pre-cachear durante la instalación
const PRECACHE_ASSETS = [
  './',
  './index.html',
  './tienda.html',
  './fidelidad.html',
  './admin.html',
  './enlaces.html',
  './manifest.webmanifest',
  './favicon.ico',
  './icons/favicon.png',
  './icons/favicon-16x16.png',
  './icons/favicon-32x32.png',
  './icons/favicon-48x48.png',
  './icons/apple-touch-icon.png',
  './icons/android-chrome-192x192.png',
  './icons/android-chrome-512x512.png'
];
// Dominios externos que cacheamos como runtime
const RUNTIME_CACHE_HOSTS = [
  'fonts.googleapis.com',
  'fonts.gstatic.com',
  'cdnjs.cloudflare.com',
  'www.gstatic.com',
  'cdn.jsdelivr.net',
  'api.qrserver.com'
];
// ── INSTALL: pre-cachea todos los assets locales ──
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('[SW] Pre-cacheando assets locales');
        return cache.addAll(PRECACHE_ASSETS);
      })
      .then(() => self.skipWaiting())
  );
});
// ── ACTIVATE: limpia caches viejas y toma control ──
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => {
          console.log('[SW] Eliminando cache vieja:', k);
          return caches.delete(k);
        })
      )
    ).then(() => self.clients.claim())
  );
});
// ── FETCH ──
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  // Solo interceptar GET requests
  if (event.request.method !== 'GET') return;
  // Firebase RTDB: NO cachear (datos en tiempo real)
  if (url.hostname.includes('firebaseio.com') || url.hostname.includes('firebasedatabase.app')) return;

  // Recursos locales
  if (url.origin === self.location.origin) {

    // HTML / navegación: NETWORK-FIRST (siempre trae la última versión publicada)
    if (event.request.mode === 'navigate' ||
        url.pathname === '/' || url.pathname.endsWith('/') ||
        url.pathname.endsWith('.html')) {
      event.respondWith(
        fetch(event.request).then(response => {
          if (response.ok) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
          }
          return response;
        }).catch(() =>
          caches.match(event.request).then(cached => cached || caches.match('./index.html'))
        )
      );
      return;
    }

    // Resto de estáticos (íconos, favicon, manifest…): Cache-First
    event.respondWith(
      caches.match(event.request).then(cached => {
        if (cached) return cached;
        return fetch(event.request).then(response => {
          if (response.ok) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
          }
          return response;
        }).catch(() => {
          if (event.request.mode === 'navigate') {
            return caches.match('./index.html');
          }
        });
      })
    );
    return;
  }

  // Recursos externos (CDNs): Stale-While-Revalidate
  if (RUNTIME_CACHE_HOSTS.some(h => url.hostname.includes(h))) {
    event.respondWith(
      caches.open(CACHE_NAME).then(cache =>
        cache.match(event.request).then(cached => {
          const fetchPromise = fetch(event.request).then(response => {
            if (response.ok) {
              cache.put(event.request, response.clone());
            }
            return response;
          }).catch(() => cached);
          return cached || fetchPromise;
        })
      )
    );
    return;
  }
  // Otros recursos: Network only
});
