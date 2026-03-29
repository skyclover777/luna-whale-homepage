/**
 * Luna Whale Art Lab — Service Worker
 * Cache strategy: Network-first for HTML, Cache-first for assets
 */

const CACHE_NAME = 'luna-whale-v1';
const STATIC_CACHE = 'luna-static-v1';

// Pre-cache critical resources
const PRECACHE_URLS = [
    '/',
    '/index.html',
    '/assets/css/luna-core.css',
    '/assets/js/app.js',
    '/assets/js/luna-nav-v2.js',
    '/assets/data/classes-data.js',
    '/assets/data/i18n.js',
    '/logo.png'
];

// Install: pre-cache critical files
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(STATIC_CACHE)
            .then(cache => cache.addAll(PRECACHE_URLS))
            .then(() => self.skipWaiting())
    );
});

// Activate: clean old caches
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then(keys =>
            Promise.all(
                keys.filter(key => key !== CACHE_NAME && key !== STATIC_CACHE)
                    .map(key => caches.delete(key))
            )
        ).then(() => self.clients.claim())
    );
});

// Fetch: strategy by request type
self.addEventListener('fetch', (event) => {
    const { request } = event;
    const url = new URL(request.url);

    // Skip non-GET requests
    if (request.method !== 'GET') return;

    // Skip Firebase/external API calls
    if (url.origin !== location.origin) return;

    // HTML pages: Network-first (fallback to cache)
    if (request.headers.get('accept')?.includes('text/html') || url.pathname.endsWith('.html')) {
        event.respondWith(networkFirst(request));
        return;
    }

    // Static assets (CSS, JS, fonts, images): Cache-first
    if (isStaticAsset(url.pathname)) {
        event.respondWith(cacheFirst(request));
        return;
    }

    // Default: Network-first
    event.respondWith(networkFirst(request));
});

function isStaticAsset(path) {
    return /\.(css|js|woff2?|ttf|otf|eot|png|jpg|jpeg|webp|gif|svg|ico)$/i.test(path);
}

async function cacheFirst(request) {
    const cached = await caches.match(request);
    if (cached) return cached;

    try {
        const response = await fetch(request);
        if (response.ok) {
            const cache = await caches.open(STATIC_CACHE);
            cache.put(request, response.clone());
        }
        return response;
    } catch {
        return new Response('Offline', { status: 503 });
    }
}

async function networkFirst(request) {
    try {
        const response = await fetch(request);
        if (response.ok) {
            const cache = await caches.open(CACHE_NAME);
            cache.put(request, response.clone());
        }
        return response;
    } catch {
        const cached = await caches.match(request);
        return cached || new Response('Offline', { status: 503, headers: { 'Content-Type': 'text/html' } });
    }
}
