// Firebase push (সেটআপ না থাকলে নীরবে বাদ যায়)
try{self.window=self;self.FIREBASE_CONFIG={
  apiKey: "AIzaSyCporGjEQRLK5lGD56whFDEeSb8Jos6dIc",
  authDomain: "gopinathpur-jame-mosjid.firebaseapp.com",
  projectId: "gopinathpur-jame-mosjid",
  storageBucket: "gopinathpur-jame-mosjid.firebasestorage.app",
  messagingSenderId: "353240144381",
  appId: "1:353240144381:web:b0bd0cd84eb08e739a6194"
};importScripts('https://www.gstatic.com/firebasejs/10.14.1/firebase-app-compat.js','https://www.gstatic.com/firebasejs/10.14.1/firebase-messaging-compat.js');
if(self.FIREBASE_CONFIG&&!/^YOUR_/.test(self.FIREBASE_CONFIG.apiKey)){firebase.initializeApp(self.FIREBASE_CONFIG);firebase.messaging()}}catch(e){}
const CACHE='gopinathpur-masjid-v21';
const ASSETS=['./','./index.html','./manifest.json','./icon.svg','./icon-192.png','./icon-512.png','./mosque.jpg'];
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)))});
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==CACHE).map(x=>caches.delete(x)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{
  const u=new URL(e.request.url);
  if(e.request.method!=='GET'||u.origin!==location.origin||u.pathname.includes('/archive/'))return; // Firebase/Google অনুরোধ কখনো ক্যাশ হবে না
  e.respondWith(fetch(e.request,{cache:'reload'}).then(r=>{const c=r.clone();caches.open(CACHE).then(x=>x.put(e.request,c));return r}).catch(()=>caches.match(e.request,{ignoreSearch:true}).then(m=>m||caches.match('./index.html'))));
});
