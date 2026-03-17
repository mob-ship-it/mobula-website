# Auditoría SEO y plan de implementación – Mobula Estudio

Fecha: marzo 2025. Estado del sitio antes de aplicar las mejoras.

---

# Parte 1: Auditoría SEO (estado actual)

## 1.1 Meta y `<head>`

| Elemento | Estado | Notas |
|----------|--------|--------|
| `<title>` | ✅ Presente | Por página vía `MainLayout title`. Home: "Mobula Estudio - Digital Marketing". |
| Meta description | ❌ Ausente | No existe `<meta name="description">` en el layout ni en páginas. |
| Open Graph | ❌ Ausente | Sin `og:title`, `og:description`, `og:image`, `og:url`, `og:type`. |
| Twitter Card | ❌ Ausente | Sin `twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`. |
| Canonical | ❌ Ausente | No hay `<link rel="canonical">`. |
| Hreflang | ❌ Ausente | No hay `<link rel="alternate" hreflang="es|en">` ni `x-default`. |
| `lang` en `<html>` | ✅ Correcto | `lang={lang}` según idioma (es/en). |
| Viewport / charset | ✅ Correcto | Incluidos en `MainLayout.astro`. |
| Favicons / PWA | ✅ Presente | manifest, apple-touch-icon, favicon.ico, 32x32, 16x16. |

---

## 1.2 Contenido y estructura

| Elemento | Estado | Notas |
|----------|--------|--------|
| H1 en home | ⚠️ Duplicado | `HeroSection.astro`: dos `<h1>` en DOM (bloque móvil y desktop). |
| H1 en resto de páginas | ✅ Un H1 | Proyectos, brief, casos: un H1 por página. |
| Jerarquía H2/H3 | ✅ Aceptable | Secciones con H2. |

---

## 1.3 Technical SEO

| Elemento | Estado | Notas |
|----------|--------|--------|
| robots.txt | ❌ Ausente | No existe `public/robots.txt`. |
| Sitemap | ❌ Ausente | No hay sitemap; `astro.config.mjs` sin `site` ni integración sitemap. |
| JSON-LD | ❌ Ausente | Sin Organization ni WebSite. |
| site.webmanifest | ⚠️ Errores | `name`: "Mobula Herso"; `description`: "Portafolio y servicios de Mobula Herso". Debe ser "Mobula Estudio". |

---

## 1.4 URLs e i18n

| Elemento | Estado | Notas |
|----------|--------|--------|
| Rutas ES | ✅ OK | `/`, `/proyectos`, `/brief`, `/LegalLawOffice`, etc. |
| Rutas EN | ✅ OK | `/en`, `/en/projects`, `/en/brief`, etc. |
| Duplicado EN | ⚠️ Revisar | `/en/proyectos` y `/en/projects` existen; mismo contenido. Decidir canonical o redirect. |
| `getAlternateLangPath` | ✅ Existe | En `src/i18n/utils.ts`; usable para hreflang. |

---

## 1.5 Otros

| Elemento | Estado | Notas |
|----------|--------|--------|
| Typo Header | ⚠️ | `alt="Mobula Etudio Logo"` en logo pequeño. |
| console.log en home | ⚠️ | `index.astro` y `en/index.astro`: `console.log('Página cargada correctamente')`. |

---

## Resumen de la auditoría

- **Crítico (bloquean o dañan indexación/snippets):** meta description, canonical, hreflang, robots.txt, sitemap, H1 único en home.
- **Importante (redes sociales y confianza):** Open Graph, Twitter Card, JSON-LD, corrección webmanifest, resolución /en/proyectos vs /en/projects.
- **Menor:** typo Etudio, quitar console.log, mejorar alts (ver `docs/SEO-RECOMMENDATIONS.md`).

---

# Parte 2: Plan de implementación

Orden sugerido para implementar las mejoras sin bloqueos. Cada fase puede ser un PR.

---

## Fase 0: Configuración base (una sola vez)

**Objetivo:** Definir URL del sitio y dependencia del sitemap para usarlos en el resto del plan.

| Paso | Acción | Archivos |
|------|--------|----------|
| 0.1 | Definir URL canónica del sitio. Opción A: constante en código. Opción B: `import.meta.env.SITE_URL` (variable de entorno en build). Ejemplo: `https://www.mobulaestudio.com`. | Crear `src/config/site.ts` o usar env. |
| 0.2 | Instalar integración de sitemap: `npm i @astrojs/sitemap`. | `package.json` |
| 0.3 | En `astro.config.mjs`: añadir `site: 'https://www.mobulaestudio.com'` (o leer de env) y `sitemap()` en `integrations`. | `astro.config.mjs` |

**Nota:** Con `site` configurado, el build generará el sitemap. La URL debe coincidir con la que uses en canonical y OG.

---

## Fase 1: Meta description, canonical y hreflang (layout)

**Objetivo:** Que cada página tenga description, URL canónica y enlaces hreflang. Todo se resuelve en el layout y en i18n.

| Paso | Acción | Archivos |
|------|--------|----------|
| 1.1 | Añadir en `ui.ts` (es y en) claves para descripciones por página, por ejemplo: `seo.home.description`, `seo.projects.description`, `seo.brief.description`, `seo.legal.description`, `seo.stanzza.description`, `seo.ecp.description`, `seo.kase.description`. Textos 150–160 caracteres. | `src/i18n/ui.ts` |
| 1.2 | En `MainLayout.astro`: (1) Añadir prop opcional `description`. (2) Si no se pasa, usar un default desde i18n según ruta (ej. home vs /proyectos vs /brief). (3) Renderizar `<meta name="description" content={description} />`. | `src/layouts/MainLayout.astro` |
| 1.3 | En `MainLayout.astro`: Construir `canonicalUrl` = SITE_URL + pathname (sin query). Renderizar `<link rel="canonical" href={canonicalUrl} />`. | `src/layouts/MainLayout.astro` |
| 1.4 | En `MainLayout.astro`: Usar `getAlternateLangPath(Astro.url)` para ES y EN. Construir URLs absolutas (SITE_URL + path). Renderizar `<link rel="alternate" hreflang="es" href={urlEs} />`, `<link rel="alternate" hreflang="en" href={urlEn} />`, y `<link rel="alternate" hreflang="x-default" href={urlDefault} />` (default = español). | `src/layouts/MainLayout.astro`, `src/i18n/utils.ts` |
| 1.5 | En cada página que use `MainLayout`: pasar `description` cuando corresponda (o dejar que el layout infiera por ruta). Revisar: index, en/index, proyectos, en/projects, brief, en/brief, LegalLawOffice, en/LegalLawOffice, Stanzza, en/Stanzza, ECP, en/ECPConsultingGroup, KaseCab, en/KaseCab. | `src/pages/**/*.astro` |

**Dependencias:** Fase 0 (SITE_URL). No depende de sitemap ni robots.

---

## Fase 2: robots.txt y sitemap

**Objetivo:** Que los crawlers tengan instrucciones y lista de URLs.

| Paso | Acción | Archivos |
|------|--------|----------|
| 2.1 | Crear `public/robots.txt` con: `User-agent: *`, `Allow: /`, `Sitemap: https://www.mobulaestudio.com/sitemap-index.xml` (o la URL que genere Astro; revisar en `dist/` tras el build). | `public/robots.txt` |
| 2.2 | Verificar que `astro build` genera `sitemap-index.xml` y sitemaps. Ajustar `astro.config.mjs` si hace falta (filtros por idioma o rutas). | `astro.config.mjs`, `dist/` |

**Dependencias:** Fase 0. robots.txt puede crearse antes; el sitemap depende de la integración.

---

## Fase 3: Un solo H1 en la home

**Objetivo:** Una sola etiqueta H1 en la página de inicio.

| Paso | Acción | Archivos |
|------|--------|----------|
| 3.1 | En `HeroSection.astro`: Mantener un único `<h1>` con el título (línea 1 + línea 2). En el otro bloque (móvil o desktop), reemplazar el segundo `<h1>` por un `<p>` o `<div>` con la misma clase de estilo para no cambiar el diseño. | `src/sections/HeroSection.astro` |

**Dependencias:** Ninguna. Puede hacerse en paralelo a Fase 1–2.

---

## Fase 4: Open Graph y Twitter Card

**Objetivo:** Que al compartir el enlace se muestre título, descripción e imagen.

| Paso | Acción | Archivos |
|------|--------|----------|
| 4.1 | Añadir en `MainLayout.astro` (o en un componente Head reutilizable) meta OG: `og:title` (= title de la página), `og:description` (= description), `og:image` (URL absoluta; imagen por defecto en `public/`, ej. 1200×630), `og:url` (= canonicalUrl), `og:type` (= "website"), `og:locale` / `og:locale:alternate` si se quiere. | `src/layouts/MainLayout.astro` |
| 4.2 | Añadir Twitter Card: `twitter:card` (= "summary_large_image"), `twitter:title`, `twitter:description`, `twitter:image` (mismas que OG). | `src/layouts/MainLayout.astro` |
| 4.3 | Añadir imagen por defecto en `public/` para OG (ej. `public/og-default.png`) y referenciarla cuando no haya imagen por página. | `public/og-default.png` (o similar) |

**Dependencias:** Fase 1 (title y description ya disponibles en el layout). SITE_URL para URLs absolutas.

---

## Fase 5: JSON-LD (Organization + WebSite)

**Objetivo:** Datos estructurados para el buscador.

| Paso | Acción | Archivos |
|------|--------|----------|
| 5.1 | Crear un componente o bloque en `MainLayout.astro` que inyecte un `<script type="application/ld+json">` con Organization (name, url, logo, sameAs si hay redes, contactPoint si aplica) y WebSite (url, name, potentialAction opcional). Usar SITE_URL y datos reales de Mobula. | `src/layouts/MainLayout.astro` o `src/components/StructuredData.astro` |

**Dependencias:** Fase 0 (SITE_URL). No depende de las demás fases.

---

## Fase 6: Correcciones rápidas

**Objetivo:** Cerrar errores menores de la auditoría.

| Paso | Acción | Archivos |
|------|--------|----------|
| 6.1 | Corregir `site.webmanifest`: `name` y `short_name` a "Mobula Estudio", `description` a una frase acorde (ej. agencia de marketing digital). | `public/site.webmanifest` |
| 6.2 | Corregir typo en Header: `alt="Mobula Etudio Logo"` → `alt="Mobula Estudio Logo"`. | `src/components/Header.astro` |
| 6.3 | Quitar o condicionar `console.log('Página cargada correctamente')` en `index.astro` y `en/index.astro` (ej. solo si `import.meta.env.DEV`). | `src/pages/index.astro`, `src/pages/en/index.astro` |

**Dependencias:** Ninguna.

---

## Fase 7 (opcional): /en/proyectos vs /en/projects

**Objetivo:** Evitar contenido duplicado en inglés.

| Paso | Acción | Archivos |
|------|--------|----------|
| 7.1 | Decidir URL canónica en inglés para el listado (recomendado: `/en/projects`). | — |
| 7.2 | Opción A: Eliminar `src/pages/en/proyectos.astro` y configurar redirect 301 de `/en/proyectos` a `/en/projects` (en hosting o en Astro). Opción B: Mantener una sola ruta y que todos los enlaces apunten a `/en/projects`. | Hosting / `astro.config.mjs` / enlaces en Header y Footer |
| 7.3 | Actualizar todos los enlaces internos que apunten a `/en/proyectos` para que vayan a `/en/projects`. | `src/components/Header.astro`, `src/i18n/ui.ts` (anchors), otros enlaces |

**Dependencias:** Ninguna técnica; es decisión de producto + enlaces.

---

## Orden recomendado de PRs

1. **Fase 0 + Fase 2** – Config + sitemap + robots.txt (una base técnica).
2. **Fase 1** – Meta description, canonical, hreflang (mayor impacto en snippets e indexación).
3. **Fase 3** – Un solo H1 en home (rápido).
4. **Fase 4** – Open Graph y Twitter Card (compartir en redes).
5. **Fase 5** – JSON-LD (rich results).
6. **Fase 6** – Webmanifest, typo, console.log (limpieza).
7. **Fase 7** – Decisión y redirect/eliminación de /en/proyectos (cuando se defina).

---

## Checklist de implementación (resumen)

- [ ] Fase 0: SITE_URL, @astrojs/sitemap, site en astro.config
- [ ] Fase 1: Meta description, canonical, hreflang en MainLayout + i18n
- [ ] Fase 2: robots.txt, verificar sitemap en build
- [ ] Fase 3: Un solo H1 en HeroSection
- [ ] Fase 4: OG + Twitter Card en MainLayout, imagen default
- [ ] Fase 5: JSON-LD Organization + WebSite
- [ ] Fase 6: site.webmanifest, typo Header, console.log
- [ ] Fase 7: /en/proyectos vs /en/projects (opcional)

---

*Documento generado a partir de la auditoría SEO actual y del informe previo en `SEO-RECOMMENDATIONS.md`.*
