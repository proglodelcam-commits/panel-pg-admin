// ═══════════════════════════════════════════════════════
// PG del Campo — Service Worker Unificado (GitHub Pages PWA)
// Versión: 2.0 — 2026-09-11
// ═══════════════════════════════════════════════════════

const CACHE_NAME = 'pg-del-campo-v2';

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
    )
  );
  self.clients.claim();
});

// ── FETCH: estrategia cache-first para locales, network-first para externos ──
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // Solo interceptar GET requests
  if (event.request.method !== 'GET') return;

  // Firebase RTDB: NO cachear (datos en tiempo real)
  if (url.hostname.includes('firebaseio.com')) return;

  // Recursos locales: Cache-First
  if (url.origin === self.location.origin) {
    event.respondWith(
      caches.match(event.request).then(cached => {
        if (cached) return cached;
        return fetch(event.request).then(response => {
          // Cachear la respuesta para futuras visitas
          if (response.ok) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
          }
          return response;
        }).catch(() => {
          // Fallback offline para navegación
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
