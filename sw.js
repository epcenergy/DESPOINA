const C='apothiki-v6';const F=['./','index.html','manifest.json','icon-192.png','icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>Promise.all(F.map(u=>fetch(new Request(u,{cache:'reload'})).then(r=>{if(r.ok)return c.put(u,r)}).catch(()=>{})))));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{
 const req=e.request;if(req.method!=='GET'||!req.url.startsWith(self.location.origin))return;
 const net=req.mode==='navigate'?new Request(req.url,{cache:'no-cache',credentials:'same-origin'}):new Request(req,{cache:'no-cache'});
 e.respondWith(fetch(net).then(r=>{if(r.ok){const cp=r.clone();caches.open(C).then(c=>c.put(req.mode==='navigate'?'./':req,cp))}return r})
  .catch(()=>caches.match(req,{ignoreSearch:true}).then(m=>m||caches.match('./'))));
});
