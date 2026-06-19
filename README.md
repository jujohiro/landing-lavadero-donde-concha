# Donde Concha Car Wash & Café — Landing Page

Landing page para **Donde Concha Car Wash & Café**, lavadero en Armenia, Quindío.

## Características

- HTML5 + Tailwind CSS (CDN) + JavaScript vanilla
- Responsive (mobile-first)
- Modo claro / oscuro
- Tarifas de autos, camionetas y motos
- Reservas vía WhatsApp
- Enlace a Google Maps e Instagram
- Listo para desplegar en Vercel (sitio estático)

## Datos del negocio

| Campo | Valor |
|---|---|
| Dirección | Av. Centenario con Calle 17 Norte, Armenia, Quindío |
| WhatsApp | +57 312 641 1889 |
| Horario | Lun – Dom, 7:00 a.m. – 7:00 p.m. |
| Instagram | @DONDECONCHACARWASH |

## Estructura

```
landing/
├── index.html
├── js/main.js
├── css/styles.css
├── images/logo-donde-concha.svg
├── vercel.json
└── README.md
```

## Despliegue en Vercel

1. Importa el repo en [vercel.com](https://vercel.com)
2. **Root Directory:** dejar vacío (raíz del repo)
3. **Framework Preset:** Other
4. **Build Command:** (vacío)
5. **Output Directory:** (vacío)
6. Deploy

## Logo

El logo actual es un SVG placeholder con los colores de marca. Reemplázalo por tu PNG oficial en:

`images/logo-donde-concha.png`

Y actualiza las referencias en `index.html` si usas PNG.

## Personalización

- Colores: bloque `tailwind.config` en `index.html`
- WhatsApp y mensajes: `js/main.js`
- Tarifas: sección `#tarifas` en `index.html`

© 2026 Donde Concha Car Wash & Café
