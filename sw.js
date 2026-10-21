// Service worker: salva i file dell'app nel dispositivo, cosi' si apre anche senza internet.
// Se modifichi l'app, cambia il numero qui sotto (v2 -> v3) per far aggiornare i file salvati.
var NOME = "note-v2"
var FILE = ["./", "./index.html", "./manifest.webmanifest", "./icon-192.png", "./icon-512.png"]

self.addEventListener("install", function (e) {
  e.waitUntil(caches.open(NOME).then(function (c) { return c.addAll(FILE) }))
  self.skipWaiting()
})

self.addEventListener("activate", function (e) {
  e.waitUntil(caches.keys().then(function (nomi) {
    return Promise.all(nomi.filter(function (n) { return n !== NOME }).map(function (n) { return caches.delete(n) }))
  }))
  self.clients.claim()
})

self.addEventListener("fetch", function (e) {
  e.respondWith(caches.match(e.request).then(function (r) { return r || fetch(e.request) }))
})
