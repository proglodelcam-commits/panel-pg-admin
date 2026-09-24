# PG del Campo — Panel de Escritorio (descargable, con base de datos local)

Convierte el Panel Administrativo web en una **aplicación instalable para PC**
(Windows / macOS / Linux) que:

- Guarda todo en una **base de datos local SQLite** en la propia computadora.
- **Funciona sin internet** (local-first): registras ventas, clientes, pedidos, etc. aunque no haya conexión.
- **Se sincroniza automáticamente** con la nube (Firebase, la misma que usa la tienda y la tarjeta de fidelidad) **cuando vuelve la conexión**.
- Permite **exportar cualquier resumen a PDF y a Excel** con dos botones.

> La misma `index.html` sirve para web y escritorio. El puente
> (`pg-desktop-bridge.js`) sólo se activa dentro de la app; en un navegador
> normal no cambia nada.

---

## 1) Requisitos (una sola vez)

1. Instala **Node.js LTS 18 o 20** desde https://nodejs.org (incluye `npm`).
2. En Windows, para compilar SQLite necesitas las *Build Tools*:
   abre PowerShell como administrador y ejecuta:
   ```powershell
   npm install --global windows-build-tools
   ```
   (En macOS basta con `xcode-select --install`; en Linux, `build-essential` y `python3`.)

## 2) Instalar dependencias

Abre una terminal dentro de esta carpeta y ejecuta:

```bash
npm install
```

## 3) Probar la app en tu PC

```bash
npm start
```

Se abrirá la ventana del panel. Verás:
- Abajo a la **izquierda**: un indicador de estado (Sin conexión / Sincronizado).
- Abajo a la **derecha**: los botones **Exportar PDF** y **Exportar Excel**.

## 4) Generar el instalador descargable

| Sistema  | Comando              | Resultado (en la carpeta `dist/`)      |
|----------|----------------------|----------------------------------------|
| Windows  | `npm run dist:win`   | `PG del Campo - Panel Setup 1.0.0.exe` |
| macOS    | `npm run dist:mac`   | `PG del Campo - Panel-1.0.0.dmg`       |
| Linux    | `npm run dist:linux` | `.AppImage` y `.deb`                    |

> Cada sistema operativo debe compilarse en su propia plataforma
> (Windows en Windows, macOS en Mac, etc.).

Entrega el archivo de `dist/` a quien lo vaya a usar: lo instala como cualquier
programa y aparece con su ícono en el escritorio / menú de inicio.

---

## 5) Dónde se guardan los datos

La base de datos local (`pg-del-campo.db`) se crea automáticamente en la carpeta
de datos del usuario del sistema operativo:

- **Windows:** `%APPDATA%\PG del Campo - Panel`
- **macOS:** `~/Library/Application Support/PG del Campo - Panel`
- **Linux:** `~/.config/PG del Campo - Panel`

Para hacer respaldo, basta con copiar ese archivo `.db`.

---

## 6) Cómo funciona la sincronización

1. Cada registro se guarda **primero en SQLite** (siempre disponible, offline).
2. Un vigilante detecta cuando hay internet (`online`).
3. Al haber conexión, la app **sube** los cambios locales a Firebase y **baja**
   los cambios de la nube al SQLite local.
4. Si no hay internet, todo sigue funcionando; los cambios se suben en cuanto
   vuelve la conexión.

Puedes forzar la sincronización haciendo **clic en el indicador de estado**.
La sincronización también se ejecuta sola al abrir la app y **cada 5 minutos**.

### Qué se sincroniza y a dónde

| Colección       | Nodo en Firebase              | Notas |
|-----------------|-------------------------------|-------|
| `PRODUCTOS`     | `productos` (compartido)      | Mismo nodo que usan la Tienda y la Tarjeta de Fidelidad. |
| `CLIENTES`      | `panel_admin/clientes`        | Nodo propio del panel. Los clientes que ya provienen del nodo compartido de la Tienda (`cloudKey`/`online`) **no se reenvían**. |
| `VENTAS`        | `panel_admin/ventas`          | Nodo propio del panel (clave: `recibo`). |
| `TRANSACCIONES` | `panel_admin/transacciones`   | Nodo propio del panel (clave: `id`/`recibo`). |

> **Importante:** clientes, ventas y transacciones se sincronizan en nodos
> **propios del panel** (`panel_admin/*`) para **no tocar** los nodos que la
> Tienda en Línea y la Tarjeta de Fidelidad comparten y leen. Así, varias PCs
> con esta app se mantienen sincronizadas entre sí sin interferir con las demás
> aplicaciones.

### Direcciones de la sincronización

- **Subida (local → nube):** ocurre dentro de `syncNow()` — al abrir la app,
  cada 5 minutos, al reconectar y al pulsar el badge. Sube productos, clientes,
  ventas y transacciones locales.
- **Bajada (nube → local):** *watchers* en tiempo real sobre `panel_admin/*`
  fusionan los cambios en los arreglos y los persisten en SQLite de inmediato.
  Los watchers **no** disparan una subida, lo que evita bucles de
  sincronización.

---

## 7) Guardado automático en la base de datos local (YA CONECTADO)

No tienes que editar nada del panel: el guardado a SQLite es **automático**.

El panel llama a `refrescar()` después de cada cambio (registrar una venta, dar
de alta un cliente, editar un producto, crear un pedido, etc.). El puente
`pg-desktop-bridge.js` intercepta esa función y, con un pequeño retardo,
**vuelca todos los arreglos a SQLite** reflejando altas, ediciones y bajas.

Se guardan automáticamente estas colecciones:

| Colección en el panel | Tabla en SQLite | Clave usada        |
|-----------------------|-----------------|--------------------|
| `PRODUCTOS`           | `productos`     | `id`               |
| `CLIENTES`            | `clientes`      | `id`               |
| `VENTAS`              | `ventas`        | `recibo`           |
| `PEDIDOS`             | `pedidos`       | `recibo`           |
| `TRANSACCIONES`       | `transacciones` | `id` / `recibo`    |
| `CUPONES`             | `cupones`       | `codigo`           |
| `USUARIOS`            | `usuarios`      | `id`               |
| `SALIDAS`             | `salidas`       | `id`               |

Garantías del guardado automático:

- **Altas, ediciones y bajas** quedan reflejadas (la tabla local se reescribe
  para que coincida exactamente con lo que ves en pantalla).
- Los registros que provienen de la nube (marcados `cloud:true`, como pedidos de
  la Tienda en Línea o la Tarjeta de Fidelidad) **no** se guardan como locales:
  se regeneran solos desde Firebase al reconectar, evitando duplicados.
- Además del guardado tras cada cambio, hay una **red de seguridad** que graba
  cada 30 segundos y otra **al cerrar la ventana**.
- Al abrir la app, los datos se **cargan primero desde SQLite** (funciona sin
  internet).

### Uso manual (opcional)

Aunque no hace falta, tienes una API disponible por si quieres guardar o
recargar a mano desde la consola o desde tu propio código:

```js
PGLocal.persistNow();          // fuerza el guardado inmediato de todo
PGLocal.reload();              // recarga los arreglos desde SQLite
PGLocal.save('clientes', obj); // guarda/actualiza un registro suelto
PGLocal.remove('ventas', id);  // elimina un registro por id
```

> Nota: la primera vez que abras la app, los datos de ejemplo que trae el panel
> se guardarán en SQLite y pasarán a ser tus datos iniciales. Puedes
> eliminarlos desde la interfaz y las bajas quedarán guardadas.

---

## 8) Íconos de la app (YA INCLUIDOS)

La app **ya trae su ícono oficial** de PG del Campo (el logotipo dorado sobre
fondo verde) en la carpeta `build/`:

- `icon.ico` — Windows (multi-resolución: 16 a 256 px)
- `icon.icns` — macOS
- `icon.png` — Linux (512×512)

Con estos archivos, el ícono aparece automáticamente:

- en el **instalador** y en el **acceso directo del escritorio / menú de inicio**,
- en la **ventana de la app** y en la **barra de tareas / Dock** al abrirla.

> Si algún día quieres cambiar el ícono, solo reemplaza esos tres archivos en
> `build/` (manteniendo los mismos nombres) y vuelve a generar el instalador.

---

## Estructura del proyecto

```
pg-desktop/
├── package.json              Configuración y scripts de compilación
├── electron/
│   ├── main.js               Proceso principal + exportación PDF/Excel
│   ├── preload.js            Puente seguro (window.PGDesktop)
│   ├── db.js                 Base de datos local SQLite
│   └── export-excel.js       Generador de Excel (exceljs)
├── src/
│   ├── index.html            Tu panel administrativo
│   └── pg-desktop-bridge.js  Local-first + sync + botones de exportación
└── build/                    Íconos de la app
```