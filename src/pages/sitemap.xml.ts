import type { APIRoute } from 'astro';
import { LOCALES, LOCALE_LABELS, getLocalizedPath, getTranslation } from '../i18n/translations';

export const GET: APIRoute = () => {
  const siteUrl = 'https://upscaleimage.github.io';
  const mainUrl = 'https://upscaleimage.github.io/';
  const ogImageUrl = 'https://res.cloudinary.com/dpx6w78bt/image/upload/f_auto/q_auto/v1786342039/Online_Tool_rc1ybr.png';
  const lastmod = new Date().toISOString().split('T')[0];

  const urls = LOCALES.map((loc) => {
    const locUrl = `${siteUrl}${getLocalizedPath(loc)}`;
    const t = getTranslation(loc);
    const alternates = LOCALES.map(
      (altLoc) =>
        `    <xhtml:link rel="alternate" hreflang="${LOCALE_LABELS[altLoc].htmlLang}" href="${siteUrl}${getLocalizedPath(altLoc)}" />`
    ).join('\n');

    return `  <url>
    <loc>${locUrl}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${loc === 'en' ? '1.0' : '0.9'}</priority>
    <xhtml:link rel="alternate" hreflang="x-default" href="${mainUrl}" />
${alternates}
    <image:image>
      <image:loc>${ogImageUrl}</image:loc>
      <image:title>${t.meta.title.replace(/&/g, '&amp;')}</image:title>
      <image:caption>${t.meta.description.replace(/&/g, '&amp;')}</image:caption>
    </image:image>
  </url>`;
  }).join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
};
