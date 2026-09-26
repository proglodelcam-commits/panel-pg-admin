# PG del Campo — Paquete para publicar

Sitio listo para publicar (por ejemplo en **GitHub Pages**) con las tres aplicaciones del negocio.

## Contenido

| Archivo | Descripción | Conexión |
|---|---|---|
| `index.html` | Portal de entrada con enlaces a las tres apps | Sin internet |
| `panel.html` | Panel Administrativo (Inicio + Promociones editables) | Interfaz **sin internet** (usa `vendor/`); la base de datos Firebase sí requiere conexión |
| `tienda.html` | Tienda en Línea para clientes (con pantalla de bienvenida y todas las promociones) | Requiere internet |
| `tarjeta-fidelidad.html` | Club de clientes frecuentes (estrellas, premios) | Requiere internet |
| `vendor/` | Librerías locales del panel: Tailwind, Chart.js, QRCode, Font Awesome y fuentes Google | — |
| `.nojekyll` | Evita que GitHub Pages ignore carpetas | — |

## Versión offline del panel

El `panel.html` ya no depende de CDNs para su interfaz: todas las librerías están
dentro de la carpeta `vendor/` y se cargan de forma local. Puede abrirse con doble
clic incluso sin conexión y la interfaz se verá correctamente.

> Nota: la **base de datos** (Firebase Realtime Database) siempre necesita internet
> para leer y guardar datos reales — eso no puede funcionar sin conexión porque es
> un servicio en la nube. Sin internet, la interfaz carga pero no habrá datos.

## Cómo publicar en GitHub Pages

1. Sube todo el contenido de esta carpeta a la raíz de tu repositorio.
2. En GitHub: **Settings → Pages**.
3. En *Source* elige la rama (por ejemplo `main`) y la carpeta **/ (root)**.
4. Guarda. En unos minutos el sitio quedará en `https://TU-USUARIO.github.io/TU-REPO/`.
5. La página de inicio será `index.html` (el portal).

## Reglas de promociones (referencia)

- **Descuento por monto:** 1% ≥ C$600 · 2% ≥ C$1,200 · 3% ≥ C$1,800
- **Premio de fidelidad:** 2% adicional en la 10.ª compra
- **Puntos:** 1 estrella por cada C$20 de compra
- **Envíos:** domicilio C$20 (Jinotepe, Dolores, Diriamba, San Marcos; otras zonas a convenir) · comercios gratis · empresas C$20 (retención 2% I.R. en compras mayores a C$1,000)

## ⚠️ Seguridad antes de producción

- **Cambia las credenciales demo** del panel (`admin` / `1234`).
- En un repositorio **público**, la configuración de Firebase queda visible en el HTML.
  Activa las **reglas de seguridad de Firebase** y **restringe la API key por dominio**
  desde Google Cloud Console.
