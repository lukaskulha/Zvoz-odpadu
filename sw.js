/* Service worker: network first, cache as a fallback for offline use.
 * Bump C for every release. Files listed in PRE are cached on install (missing ones are skipped). */
const C="zvoz-v28";
const PRE=["/","/index.html","/i18n.js","/obce/zoznam.js","/obce/cana.js","/obce/geca.js","/obce/valaliky.js","/cana/","/geca/","/valaliky/","/icon-192.png"];
self.addEventListener("install",e=>{self.skipWaiting();e.waitUntil(caches.open(C).then(c=>Promise.all(PRE.map(u=>c.add(u).catch(()=>{})))))});
self.addEventListener("activate",e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!=C).map(x=>caches.delete(x)))).then(()=>self.clients.claim())));
self.addEventListener("fetch",e=>{const r=e.request;if(r.method!="GET"||new URL(r.url).origin!==location.origin)return;
e.respondWith(fetch(r).then(res=>{if(res.ok){const cp=res.clone();caches.open(C).then(c=>c.put(r,cp))}return res}).catch(()=>caches.match(r,{ignoreSearch:true}).then(m=>m||caches.match("/index.html"))))});
