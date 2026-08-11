const CACHE = "whiteroom-v1";
const FILES = ["./index.html", "./manifest.json"];
self.addEventListener("install", (e)=>{
  e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)));
  self.skipWaiting();
});
self.addEventListener("activate", (e)=>{ self.clients.claim(); });
self.addEventListener("fetch", (e)=>{
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request).catch(()=>cached))
  );
});
