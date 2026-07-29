# Lista

Lista de compras minimalista. Una PWA de un solo archivo pensada **solo** para usarse
en el iPhone desde la pantalla de inicio.

**App:** https://worellanab.github.io/lista-compras/

## Instalar en el iPhone

1. Abrir el enlace de arriba **en Safari** (no en Chrome).
2. Botón Compartir (el cuadrito con la flecha) → **Añadir a pantalla de inicio**.
3. Abrirla desde el ícono. Ya no muestra barra de navegador y funciona sin internet.

## Dos pestañas

Arriba hay dos listas que **no se mezclan**, cada una con su propio guardado:

- **Lista** — el super. Se marcan como comprados y van "En el carrito".
- **Pedidos** — lo que está en camino (Amazon, Temu, etc). Se marcan como recibidos.

Funcionan exactamente igual. La app abre en la pestaña donde la dejaste.
La versión se muestra debajo de las pestañas.

## Cómo se usa

| Acción | Gesto |
|---|---|
| Cambiar de lista | Tocar "Lista" o "Pedidos" arriba (no cierra el teclado) |
| Escribir | Tocar cualquier parte de la pantalla → sube el teclado |
| Agregar | Escribir y darle a Enter. El teclado **no se cierra**: sigues escribiendo |
| Marcar comprado | Tocar el producto (se tacha y baja al carrito) |
| Borrar | Deslizar el producto hacia la izquierda (con "Deshacer" por 5 segundos) |
| Ver la lista completa | Botón "listo" del teclado o deslizar la lista |
| Compartir / respaldar | Flecha ↑ arriba a la derecha |

Si agregas un producto que ya está en la lista, no se duplica: se resalta y sube al tope.
Si ya estaba comprado, vuelve a la lista de pendientes.

## Dónde viven los datos

En el propio iPhone (`localStorage`). **No hay servidor, no hay cuenta, no hay nube.**
Nada de la lista se sube a GitHub — este repo solo tiene el código.
Como respaldo, el botón ↑ comparte la lista como texto (WhatsApp, Notas, etc.).

## Archivos

- `index.html` — toda la app (HTML + CSS + JS, sin dependencias ni build)
- `sw.js` — service worker: funciona sin internet
- `manifest.webmanifest` — nombre, ícono y modo pantalla completa
- `icon-cart-180.png` / `icon-cart-512.png` — ícono de carrito para la pantalla de inicio

## Publicar un cambio

`git push` a `main`. GitHub Pages lo publica solo.

Al cambiar algo, subir el número en **los dos lados** (deben coincidir):

- `<span id="ver">v1.01</span>` en `index.html`
- `var VERSION = "lista-v1.01"` en `sw.js` — si no, queda el caché viejo

Si cambias un ícono, **renómbralo** (`icon-cart-…-v2.png`): iOS y GitHub cachean
las imágenes por nombre y si no, sigue apareciendo el viejo.
