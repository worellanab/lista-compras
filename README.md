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

- **Lista** — el super. Lo que ya echaste al carrito se tacha; el segundo deslizado lo borra.
- **Pedidos** — lo que está en camino (Amazon, Temu, etc). Al recibirlo se tacha, y luego se borra.
- **Web** — links o cosas para ver/comprar online. Igual: primero tachado, luego borrado.

Funcionan exactamente igual. La app abre en la pestaña donde la dejaste.
La versión se muestra debajo de las pestañas.

## Cómo se usa

| Acción | Gesto |
|---|---|
| Cambiar de lista | Tocar "Lista" o "Pedidos" arriba (no cierra el teclado) |
| Escribir | Tocar cualquier parte de la pantalla → sube el teclado |
| Agregar | Escribir y darle a Enter. El teclado **no se cierra**: sigues escribiendo |
| Marcar (ya lo tengo) | Deslizar el producto hacia la izquierda: queda **tachado y apagado**, pero sigue en la lista |
| Desmarcar | Deslizar hacia la derecha un producto tachado |
| Borrar | Deslizar hacia la izquierda **otra vez**, ya estando tachado (con "Deshacer" por 5 segundos). **Tocar un producto no hace nada**: un roce accidental no cambia la lista |
| Ordenar | Dejar presionado un producto (medio segundo, sin mover el dedo) y arrastrarlo arriba o abajo. Al soltar, el orden queda guardado |
| Ver la lista completa | Botón "listo" del teclado o deslizar la lista |
| Compartir / respaldar | Flecha ↑ arriba a la derecha |
| Ajustes (tamaño y código) | Tocar **v1.08 aA** debajo de las pestañas |

Si agregas un producto que ya está en la lista, no se duplica: se resalta, sube al
tope y, si estaba tachado, vuelve a quedar pendiente.

El contador de arriba lleva las dos cuentas: lo que falta y lo que ya está tachado.

## Tamaño de la app

Tocar **v1.08 aA** (debajo de las pestañas) abre los ajustes, con un deslizador
que agranda o achica **toda** la app: letras, filas, pestañas y botones. Va del
80 % al 170 %.

Es un ajuste **de cada teléfono**: se guarda aparte de la lista y nunca se
sincroniza, así cada quien la ve del tamaño que le acomoda aunque compartan
la misma lista.

Por dentro: todas las medidas del CSS están en `rem`, y el deslizador solo mueve
la variable `--s` de `html`. Dos excepciones a propósito: los bordes de 1px (si
escalan dejan hilos de píxel partido) y el campo de escribir, que nunca baja de
16px reales porque por debajo de eso iOS hace zoom solo al tocarlo.

## Dónde viven los datos

En el propio iPhone (`localStorage`). Nada de la lista se sube a GitHub — este
repo solo tiene el código. Como respaldo, el botón ↑ comparte la lista como
texto (WhatsApp, Notas, etc.).

Si la sincronización está configurada (abajo), la lista además vive en una
base de datos de Firebase para poder compartirse entre teléfonos.

## Sincronizar entre teléfonos

Está activa: la base es la **Realtime Database** del proyecto `Lista-compras`
en Firebase, y la URL está en `index.html` (`var SYNC_URL = "…"`). Si se deja
esa variable vacía, la app vuelve a ser 100% local como antes.

- Cada lista vive bajo un **código** aleatorio (`xxxx-xxxx-xxxx`). Los ajustes
  (tocar la versión) lo muestran; en el otro teléfono se toca la versión y se
  teclea ese código una sola vez. Desde ahí, los dos ven la misma lista.
- Quien no tenga el código no puede leer ni adivinar la lista.
- Sin internet todo sigue funcionando local; al reconectar se emparejan.
  Por producto gana el cambio más reciente, y los borrados dejan "lápida"
  30 días para no renacer en el otro teléfono.
- Las tres pestañas se sincronizan por separado, como siempre.

Las reglas de esa base (pestaña Reglas en la consola) son estas: se puede
leer y escribir una lista si conoces su código, pero la raíz está cerrada,
así que nadie puede averiguar qué listas existen.

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

- `<button id="ver">v1.08 &nbsp;aA</button>` en `index.html`
- `var VERSION = "lista-v1.08"` en `sw.js` — si no, queda el caché viejo

Si cambias un ícono, **renómbralo** (`icon-cart-…-v2.png`): iOS y GitHub cachean
las imágenes por nombre y si no, sigue apareciendo el viejo.
