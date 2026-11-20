const prefix = 'seizu-stage:' + self.registration.scope + ':';
const version = prefix + '27b673777662';
const files = [
 "art/aoi_debut.webp",
 "art/aoi_encore.webp",
 "art/aoi_starlight.webp",
 "art/minagi_debut.webp",
 "art/minagi_encore.webp",
 "art/minagi_starlight.webp",
 "art/nagi_debut.webp",
 "art/nagi_encore.webp",
 "art/nagi_starlight.webp",
 "art/ritsu_debut.webp",
 "art/ritsu_encore.webp",
 "art/ritsu_starlight.webp",
 "art/ruka_debut.webp",
 "art/ruka_encore.webp",
 "art/ruka_starlight.webp",
 "art/sora_debut.webp",
 "art/sora_encore.webp",
 "art/sora_starlight.webp",
 "icon-192.png",
 "icon-512.png",
 "index.html",
 "manifest.webmanifest"
];
self.addEventListener('install', event => event.waitUntil((async () => {
 const cache = await caches.open(version);
 await cache.addAll(files.map(path => new Request(new URL(path,self.registration.scope),{cache:'reload'})));
 await self.skipWaiting();
})()));
self.addEventListener('activate', event => event.waitUntil((async () => {
 for (const key of await caches.keys()) if (key.startsWith(prefix) && key !== version) await caches.delete(key);
 await self.clients.claim();
})()));
self.addEventListener('fetch', event => {
 if (event.request.method !== 'GET' || !event.request.url.startsWith(self.registration.scope)) return;
 event.respondWith((async () => {
  const cache = await caches.open(version);
  const path = event.request.mode === 'navigate' ? new URL('index.html',self.registration.scope).href : event.request;
  return await cache.match(path) || fetch(event.request);
 })());
});
