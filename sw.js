/* Lista de compras — service worker
   Estrategia:
   - navegación (abrir la app): red primero, caché si no hay internet
     => siempre tienes la última versión cuando hay señal, y funciona offline sin señal.
   - resto de archivos: caché primero (arranque instantáneo).
   Para publicar una versión nueva basta con subir el VERSION de abajo. */

var VERSION = "lista-v3";
var ASSETS = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./icon-180.png",
  "./icon-512.png"
];

self.addEventListener("install", function (e) {
  e.waitUntil(
    caches.open(VERSION).then(function (c) {
      // { cache: "reload" } salta el caché HTTP del navegador. GitHub Pages
      // manda Cache-Control de 10 minutos: sin esto, una versión nueva podía
      // instalarse con los archivos viejos todavía guardados.
      return c.addAll(ASSETS.map(function (u) {
        return new Request(u, { cache: "reload" });
      }));
    }).then(function () { return self.skipWaiting(); })
  );
});

self.addEventListener("activate", function (e) {
  e.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.map(function (k) {
        if (k !== VERSION) return caches["delete"](k);
      }));
    }).then(function () { return self.clients.claim(); })
  );
});

self.addEventListener("fetch", function (e) {
  var req = e.request;
  if (req.method !== "GET") return;

  if (req.mode === "navigate") {
    e.respondWith(
      // Se pide por URL y con "no-cache" para obligar a revalidar contra el
      // servidor: si no, el caché HTTP de GitHub podía devolver la app vieja
      // hasta 10 minutos después de publicar un cambio.
      fetch(req.url, { cache: "no-cache", credentials: "same-origin" }).then(function (res) {
        // Solo se guarda una respuesta buena y del propio sitio. Si GitHub
        // devuelve un 404 o un error, NO debe reemplazar la app cacheada:
        // si no, offline quedaría mostrando esa página de error para siempre.
        if (res && res.ok && res.type === "basic") {
          var copy = res.clone();
          caches.open(VERSION).then(function (c) { c.put("./index.html", copy); });
        }
        return res;
      }).catch(function () {
        return caches.match("./index.html").then(function (r) { return r || caches.match("./"); });
      })
    );
    return;
  }

  e.respondWith(
    caches.match(req).then(function (hit) {
      return hit || fetch(req).then(function (res) {
        if (res && res.status === 200 && res.type === "basic") {
          var copy = res.clone();
          caches.open(VERSION).then(function (c) { c.put(req, copy); });
        }
        return res;
      });
    })
  );
});
