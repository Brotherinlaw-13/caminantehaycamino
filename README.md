# Caminante No Hay Camino 🌍

Blog de viajes de una pareja española explorando el mundo desde 2011.

> *"Caminante, no hay camino, se hace camino al andar"* — Antonio Machado

## 🚀 Características

- **SEO Optimizado**: Meta tags, Open Graph, Twitter Cards, Schema.org structured data
- **Rendimiento**: CSS/JS mínimo, imágenes lazy loading, sin frameworks pesados
- **Accesibilidad**: WCAG 2.1 compliant, skip links, ARIA labels, reduced motion support
- **Responsive**: Mobile-first design, funciona en todos los dispositivos
- **Moderno**: CSS Custom Properties, Grid/Flexbox, vanilla JavaScript

## 📁 Estructura

```
caminantehaycamino/
├── index.html          # Página principal
├── css/
│   └── styles.css      # Estilos (CSS moderno)
├── js/
│   └── main.js         # JavaScript (vanilla, sin dependencias)
├── assets/
│   └── images/         # Favicon y assets
├── robots.txt          # Instrucciones para crawlers
├── sitemap.xml         # Mapa del sitio para SEO
└── README.md           # Este archivo
```

## 🎯 SEO Implementado

- ✅ Meta description optimizada
- ✅ Open Graph tags (Facebook, LinkedIn)
- ✅ Twitter Card tags
- ✅ Schema.org structured data (WebSite + Blog)
- ✅ Canonical URL
- ✅ Sitemap XML
- ✅ Robots.txt
- ✅ Semantic HTML5
- ✅ Alt text descriptivo en imágenes
- ✅ Heading hierarchy correcta

## 🛠️ Desarrollo Local

Simplemente abre `index.html` en tu navegador o usa un servidor local:

```bash
# Con Python
python -m http.server 8000

# Con Node.js
npx serve
```

## 📝 Personalización

### Cambiar imágenes
Las imágenes usan Unsplash por defecto. Para usar tus propias imágenes:
1. Sube las imágenes a `assets/images/`
2. Actualiza los `src` en `index.html`
3. Mantén los atributos `alt` descriptivos para SEO

### Añadir nuevos viajes
1. Copia un bloque `<article class="trip-card">` en `index.html`
2. Actualiza el `data-year`, título, imagen, y URL
3. Asegúrate de incluir `alt` text descriptivo

## 📄 Licencia

Contenido © Caminante No Hay Camino. Código disponible para uso personal.
