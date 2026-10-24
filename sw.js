const V='planer-v3',SHELL=['./','index.html','manifest.webmanifest','icon-180.png','icon-192.png','icon-512.png','shortcut-prep.png','shortcut-sky.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>Promise.all(SHELL.map(u=>c.add(u).catch(()=>{})))).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET')return;const u=new URL(r.url);
if(u.hostname.endsWith('supabase.co'))return;
if(r.mode==='navigate'){e.respondWith(fetch(r).then(res=>{if(res&&res.ok){const cp=res.clone();caches.open(V).then(c=>c.put('index.html',cp))}return res}).catch(()=>caches.match('index.html',{ignoreSearch:true}).then(x=>x||caches.match('./',{ignoreSearch:true}))));return}
e.respondWith(caches.match(r).then(hit=>{const net=fetch(r).then(res=>{if(res&&(res.ok||res.type==='opaque')){const cp=res.clone();caches.open(V).then(c=>c.put(r,cp))}return res}).catch(()=>hit);return hit||net}))});
