const CACHE_NAME = 'msv-portal-v1'
const urlsToCache = [
    '/',
    '/manifest.json',
    '/login',
    '/dashboard'
]

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(urlsToCache))
    )
})

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => response || fetch(event.request))
    )
})