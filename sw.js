// Caches the app shell so Relay opens offline. Messages still need a connection.
const V="relay-v1",F=["./","index.html","manifest.json","icon-192.png","icon-512.png"];
self.addEventListener("install",e=>e.waitUntil(caches.open(V).then(c=>c.addAll(F)).then(()=>self.skipWaiting())));
self.addEventListener("activate",e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim())));
self.addEventListener("fetch",e=>{if(e.request.method!=="GET"||new URL(e.request.url).origin!==location.origin)return;
  e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request)))});   // only same-origin files; relay traffic is never cached
