<div align="center">

<img src="icons/android-chrome-512x512.png" width="120" height="120" alt="PG del Campo">

# PG del Campo — PWA

### *Distribución inteligente del campo a tu hogar*

Aplicación web progresiva para la gestión y venta de productos nicaragüenses.<br>
Café · Pinolillo · Pinol · Humus y más desde Jinotepe, Carazo.

[![Deploy to GitHub Pages](https://github.com/FMARTINEZ20062024/pg-del-campo/actions/workflows/deploy.yml/badge.svg)](https://github.com/FMARTINEZ20062024/pg-del-campo/actions/workflows/deploy.yml)

</div>

---

## 🌿 Módulos

| Módulo | Archivo | Descripción |
|--------|---------|-------------|
| 🏠 Portal | `index.html` | Landing page con navegación visual a todos los módulos |
| 🛒 Tienda | `tienda.html` | Catálogo en línea con carrito, pago LAFISE y QR dinámico |
| ⭐ Fidelidad | `fidelidad.html` | Tarjeta de fidelidad con estrellas y descuentos automáticos |
| ⚙️ Admin | `admin.html` | Panel administrativo: inventario, ventas, clientes, reportes |
| 📞 Contacto | `enlaces.html` | WhatsApp, ubicación, horarios y cobertura de envíos |

## 📱 Funciones PWA

- ✅ **Instalable** — Banner de instalación automático en Chrome/Edge/Samsung Internet
- ✅ **Offline** — Service Worker con cache inteligente (páginas + CDN)
- ✅ **Ícono en pantalla de inicio** — Compatible con Android e iOS
- ✅ **Standalone** — Se ejecuta como app nativa, sin barra del navegador
- ✅ **Actualización automática** — GitHub Actions despliega al hacer push

---

## 🚀 Instalación y Despliegue

### Requisitos previos

| Requisito | Detalle |
|-----------|--------|
| Cuenta de GitHub | Gratuita — [github.com/signup](https://github.com/signup) |
| Git (opcional) | Para línea de comandos — [git-scm.com](https://git-scm.com/) |
| Navegador moderno | Chrome, Edge, Firefox o Safari |

---

### Método 1 — Subir archivos por la interfaz web de GitHub

> Ideal si no tienes Git instalado o prefieres no usar la terminal.

| Paso | Acción |
|------|--------|
| **1** | Inicia sesión en [github.com](https://github.com) y haz clic en **"New repository"** (icono + esquina superior derecha) |
| **2** | Nombra el repositorio: `pg-del-campo`. Selecciona **Public**. Marca **Add a README file**. Clic en **Create repository** |
| **3** | En tu repositorio nuevo, haz clic en **"Add file" → "Upload files"** |
| **4** | Arrastra todos los archivos del ZIP a la zona de carga (o haz clic para seleccionarlos). **Importante:** arrastra las carpetas `icons/` y `.github/` completas |
| **5** | Escribe un mensaje de commit: `Primer despliegue PWA` y haz clic en **Commit changes** |
| **6** | Ir a **Settings → Pages**. En **Source** selecciona **GitHub Actions**. Guardar |
| **7** | Espera 1–2 minutos. Tu sitio estará disponible en `https://TU_USUARIO.github.io/pg-del-campo/` |

---

### Método 2 — Usando Git desde la terminal

> Para usuarios con experiencia en línea de comandos.

```bash
# 1. Crear el repositorio en github.com (web) → New repository → pg-del-campo

# 2. Clonar el repositorio vacío
git clone https://github.com/TU_USUARIO/pg-del-campo.git
cd pg-del-campo

# 3. Copiar todos los archivos del paquete dentro de esta carpeta
#    (descomprime el ZIP aquí)
cp -r /ruta/al/directorio/github-pages/* .
cp -r /ruta/al/directorio/github-pages/.github .
cp -r /ruta/al/directorio/github-pages/icons .
cp    /ruta/al/directorio/github-pages/.nojekyll .
cp    /ruta/al/directorio/github-pages/.gitignore .

# 4. Subir al repositorio
git add .
git commit -m "🚀 Primer despliegue PWA — PG del Campo"
git push origin main

# 5. Activar GitHub Pages
#    Ir a Settings → Pages → Source: GitHub Actions

# 6. Tu URL será:
echo "https://TU_USUARIO.github.io/pg-del-campo/"
```

---

### Método 3 — GitHub CLI (gh)

> Si ya tienes [GitHub CLI](https://cli.github.com/) instalado.

```bash
# Crear repositorio y subir en un solo comando
cd /ruta/al/directorio/github-pages
gh repo create pg-del-campo --public --source=. --push

# Activar Pages (requiere gh 2.30+)
gh api repos/{owner}/pg-del-campo/pages \n  -X POST -f source.branch=main -f source.path=/

# Tu URL:
echo "https://$(gh api user -q .login).github.io/pg-del-campo/"
```

---

### Verificar el despliegue

1. Ve a la pestaña **Actions** en tu repositorio
2. Deberías ver un flujo de trabajo verde ✅ llamado "Deploy to GitHub Pages"
3. Si falla, haz clic en el flujo para ver los errores
4. Una vez exitoso, visita tu URL
5. Abre la **consola del navegador** (F12) para verificar que el Service Worker se registró:
   ```
   PG del Campo SW registrado: https://TU_USUARIO.github.io/pg-del-campo/
   ```

---

## 📲 Instalar la App (como usuario final)

### En Android

1. Abre la URL en **Chrome** o **Edge**
2. Espera 3 segundos — aparecerá un **banner de instalación** en la parte inferior
3. Toca **"Instalar"** o usa el menú del navegador (⋮) → **"Instalar aplicación"**
4. La app aparecerá en tu pantalla de inicio con el ícono de PG del Campo
5. Se abre como app nativa (sin barra de dirección del navegador)

### En iPhone / iPad

1. Abre la URL en **Safari**
2. Toca el botón **Compartir** (cuadrado con flecha ↑)
3. Selecciona **"Agregar a pantalla de inicio"**
4. Toca **Agregar** — el ícono de PG del Campo aparecerá en tu pantalla de inicio

### En Computadora (Chrome/Edge)

1. Abre la URL en Chrome o Edge
2. Haz clic en el **ícono de instalación** en la barra de dirección (⊕ o ↓)
3. O usa el menú → **"Instalar PG del Campo..."**
4. La app se instala como aplicación de escritorio

---

## 🔥 Firebase

| Elemento | Valor |
|----------|-------|
| Proyecto | `productos-globales-campo` |
| RTDB URL | `productos-globales-campo-default-rtdb.firebaseio.com` |
| SDK | Firebase Modular v10.12.0 |
| Contador de recibos | `meta/contador_recibo` (unificado, valor actual: 1071) |
| Reglas de seguridad | `database.rules.json` |

> **Nota:** Los datos de Firebase se cargan en **tiempo real** y nunca se cachean en el Service Worker.

---

## 🏢 Datos del Negocio

| Campo | Valor |
|-------|-------|
| Nombre | PG del Campo |
| RÚC | 0452907730000U |
| Régimen | Cuota Fija |
| Ubicación | Jinotepe, Carazo, Nicaragua |
| WhatsApp | +505 5797 3097 |
| Banco LAFISE | Cuenta 140051265 — Titular: Fernando Martínez — Alias ACH: 57973097 |

---

## 🛠️ Estructura del Proyecto

```
pg-del-campo/
├── .github/workflows/deploy.yml   ← Auto-deploy GitHub Actions
├── .gitignore                      ← Archivos excluidos
├── .nojekyll                       ← Desactiva Jekyll en GitHub Pages
├── 404.html                        ← Página no encontrada (redirige al portal)
├── README.md                       ← Este archivo
├── index.html                      ← 🏠 Portal principal
├── tienda.html                     ← 🛒 Tienda en Línea
├── fidelidad.html                  ← ⭐ Tarjeta de Fidelidad
├── admin.html                      ← ⚙️ Panel Administrativo
├── enlaces.html                    ← 📞 Contacto y Enlaces
├── manifest.webmanifest            ← 📱 Configuración PWA
├── sw.js                           ← 🔄 Service Worker (cache inteligente)
├── favicon.ico                     ← Favicon
├── icons/                          ← Íconos PWA (7 tamaños)
└── database.rules.json             ← 🔒 Reglas Firebase (referencia)
```

---

## ❓ Preguntas Frecuentes

<details>
<summary><strong>¿Por qué no se instala la app en mi teléfono?</strong></summary>

- Necesitas abrir la URL en **Chrome** (Android) o **Safari** (iOS)
- La PWA requiere **HTTPS** — GitHub Pages lo proporciona automáticamente
- En iOS, la instalación es manual: Safari → Compartir → Agregar a pantalla de inicio
- El banner aparece después de 3 segundos si el navegador lo soporta
</details>

<details>
<summary><strong>¿Cómo actualizo la app después de hacer cambios?</strong></summary>

1. Sube los cambios al repositorio (`git push`)
2. GitHub Actions despliega automáticamente en ~1 minuto
3. Al abrir la app, el Service Worker verifica actualizaciones y las aplica al recargar
4. Para forzar actualización: cierra todas las pestañas de la app y vuelve a abrir
</details>

<details>
<summary><strong>¿Funciona sin internet?</strong></summary>

- Las **páginas visitadas** se cargan offline gracias al Service Worker
- Los **datos de Firebase** (productos, compras) requieren conexión
- Los **iconos y estilos** cachean automáticamente en la primera visita
- Si no hay conexión y navegas a una página no cacheada, verás el portal
</details>

<details>
<summary><strong>¿Cómo personalizo el nombre del repositorio?</strong></summary>

- Puedes usar cualquier nombre: `pg-del-campo`, `tienda-pg`, etc.
- La URL cambia según el nombre: `https://TU_USUARIO.github.io/NOMBRE/`
- Si quieres una URL sin subdirectorio, crea un repositorio llamado `TU_USUARIO.github.io`
- En ese caso la URL será: `https://TU_USUARIO.github.io/`
</details>

<details>
<summary><strong>¿Puedo usar un dominio personalizado (ej: pgdelcampo.com)?</strong></summary>

Sí. En GitHub:
1. Ve a **Settings → Pages → Custom domain**
2. Escribe tu dominio: `pgdelcampo.com`
3. Marca **Enforce HTTPS**
4. En tu proveedor de dominio, configura los DNS:
   - Registro CNAME: `www` → `TU_USUARIO.github.io`
   - Registros A (apex):
     - `185.199.108.153`
     - `185.199.109.153`
     - `185.199.110.153`
     - `185.199.111.153`
</details>

<details>
<summary><strong>¿El panel Admin es seguro?</strong></summary>

- El panel requiere **inicio de sesión** con usuario y contraseña almacenados en Firebase
- Los datos de ventas, clientes y finanzas solo se leen con autenticación (`auth != null`)
- Los productos y cupones son de **lectura pública** (para que la tienda funcione sin login)
- Las reglas de seguridad están en `database.rules.json`
</details>

---

<div align="center">

## *BS"D

**Con la ayuda del Cielo todo es posible realizar**

© 2024–2026 PG del Campo — Jinotepe, Carazo, Nicaragua

</div>
