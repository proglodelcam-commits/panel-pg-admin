# PG del Campo — Panel + Portal

Repositorio `panel-pg-admin`: contiene el **Portal** (index.html) y el **Panel Administrativo** (panel.html).

La **Tienda en Línea** y la **Tarjeta de Fidelidad** están en repositorios independientes y se enlazan desde el portal por URL absoluta:

- 🛒 Tienda: [pgdelcampo-on-line](https://github.com/proglodelcam-commits/pgdelcampo-on-line)
- ⭐ Tarjeta: [tarjeta-fidelidad](https://github.com/proglodelcam-commits/tarjeta-fidelidad)

## Estructura

```
├── index.html              ← Portal (3 tarjetas: Panel / Tienda / Tarjeta)
├── panel.html              ← Panel Administrativo (funciona offline)
├── sw.js                   ← Service Worker (network-first HTML, cache v3)
├── manifest.webmanifest    ← Manifiesto PWA
├── favicon.ico
├── 404.html                ← Página personalizada de error
├── .nojekyll               ← Evita que GitHub Pages procese con Jekyll
├── .gitignore
├── vendor/                 ← Librerías locales (Tailwind, Chart.js, QRCode, Font Awesome, fuentes)
└── README.md
```

## Despliegue en GitHub Pages

1. Subir el contenido de este repo a la raíz del repositorio.
2. En Settings → Pages → Source: seleccionar la rama `main` y carpeta `/ (root)`.
3. El sitio estará en: `https://proglodelcam-commits.github.io/panel-pg-admin/`

## Notas

- Acceso demo del panel: usuario **admin** / clave **1234** — **cambiar antes de producción**.
- El panel funciona offline gracias al service worker y las librerías locales en `vendor/`.
- La Tienda y Tarjeta son enlaces externos a sus propios repos.