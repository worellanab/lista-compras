# Lista

Lista de compras minimalista. Una PWA de un solo archivo pensada **solo** para usarse
en el iPhone desde la pantalla de inicio.

**App:** https://worellanab.github.io/lista-compras/

## Instalar en el iPhone

1. Abrir el enlace de arriba **en Safari** (no en Chrome).
2. Botón Compartir (el cuadrito con la flecha) → **Añadir a pantalla de inicio**.
3. Abrirla desde el ícono. Ya no muestra barra de navegador y funciona sin internet.

## Tres pestañas

Arriba hay tres listas que **no se mezclan**, cada una con su propio guardado:

- **Lista** — el super. Lo que ya compraste se desliza y se borra.
- **Pedidos** — lo que está en camino (Amazon, Temu, etc). Al recibirlo, se desliza y se borra.
- **Web** — links o cosas para ver/comprar online. Cuando está listo, se desliza y se borra.

Funcionan exactamente igual. La app abre en la pestaña donde la dejaste.
La versión se muestra debajo de las pestañas.

## Cómo se usa

| Acción | Gesto |
|---|---|
| Cambiar de lista | Tocar "Lista" o "Pedidos" arriba (no cierra el teclado) |
| Escribir | Tocar cualquier parte de la pantalla → sube el teclado |
| Agregar | Escribir y darle a Enter. El teclado **no se cierra**: sigues escribiendo |
| Comprado / borrar | Deslizar el producto hacia la izquierda (con "Deshacer" por 5 segundos). **Tocar un producto no hace nada**: un roce accidental no cambia la lista |
| Ordenar | Dejar presionado un producto (medio segundo, sin mover el dedo) y arrastrarlo arriba o abajo. Al soltar, el orden queda guardado |
| Ver la lista completa | Botón "listo" del teclado o deslizar la lista |
| Compartir / respaldar | Flecha ↑ arriba a la derecha |

Si agregas un producto que ya está en la lista, no se duplica: se resalta y sube al tope.

## Dónde viven los datos

En el propio iPhone (`localStorage`). Nada de la lista se sube a GitHub — este
repo solo tiene el código. Como respaldo, el botón ↑ comparte la lista como
texto (WhatsApp, Notas, etc.).

Si la sincronización está configurada (abajo), la lista además vive en una
base de datos de Firebase para poder compartirse entre teléfonos.

## Sincronizar entre teléfonos (opcional)

Solo funciona si en `index.html` está pegada la URL de una base **Realtime
Database** de Firebase (`var SYNC_URL = "…"`). Sin URL, la app es 100% local
como siempre.

- Cada lista vive bajo un **código** aleatorio (`xxxx-xxxx-xxxx`). Tocar la
  versión (v1.06) lo muestra; en el otro teléfono se toca la versión y se
  teclea ese código una sola vez. Desde ahí, los dos ven la misma lista.
- Quien no tenga el código no puede leer ni adivinar la lista.
- Sin internet todo sigue funcionando local; al reconectar se emparejan.
  Por producto gana el cambio más reciente, y los borrados dejan "lápida"
  30 días para no renacer en el otro teléfono.
- Las tres pestañas se sincronizan por separado, como siempre.

Cómo se creó la base (una vez): console.firebase.google.com → crear proyecto
(sin Analytics) → Realtime Database → crear → pestaña Reglas:

```json
{
  "rules": {
    "listas": {
      "$codigo": {
        ".read": true,
        ".write": true
      }
    }
  }
}
```

## Archivos

- `index.html` — toda la app (HTML + CSS + JS, sin dependencias ni build)
- `sw.js` — service worker: funciona sin internet
- `manifest.webmanifest` — nombre, ícono y modo pantalla completa
- `icon-cart-180.png` / `icon-cart-512.png` — ícono de carrito para la pantalla de inicio

## Publicar un cambio

`git push` a `main`. GitHub Pages lo publica solo.

Al cambiar algo, subir el número en **los dos lados** (deben coincidir):

- `<span id="ver">v1.06</span>` en `index.html`
- `var VERSION = "lista-v1.06"` en `sw.js` — si no, queda el caché viejo

Si cambias un ícono, **renómbralo** (`icon-cart-…-v2.png`): iOS y GitHub cachean
las imágenes por nombre y si no, sigue apareciendo el viejo.
