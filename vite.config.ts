import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv, type Plugin } from 'vite';
import { siteMeta } from './src/content/site.ts';

const escapeHtml = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/**
 * Fills the title/description placeholders in index.html from
 * src/content/site.ts, and adds absolute Open Graph tags when
 * VITE_SITE_URL is set.
 */
function siteMetaPlugin(siteUrl: string | undefined): Plugin {
  return {
    name: 'site-meta',
    transformIndexHtml(html) {
      let output = html
        .replaceAll('%SITE_TITLE%', escapeHtml(siteMeta.title))
        .replaceAll('%SITE_DESCRIPTION%', escapeHtml(siteMeta.description));

      if (siteUrl) {
        const url = siteUrl.replace(/\/+$/, '');
        const tags = [
          `<link rel="canonical" href="${url}/" />`,
          `<meta property="og:url" content="${url}/" />`,
          `<meta property="og:image" content="${url}/og-image.jpg" />`,
          `<meta property="og:image:width" content="1200" />`,
          `<meta property="og:image:height" content="630" />`,
          `<meta name="twitter:image" content="${url}/og-image.jpg" />`,
        ];
        output = output.replace(/\n?\s*<\/head>/, `\n${tags.map((t) => `    ${t}`).join('\n')}\n  </head>`);
      }
      return output;
    },
  };
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const base = env.VITE_BASE || '/';

  return {
    base,
    plugins: [react(), siteMetaPlugin(env.VITE_SITE_URL)],
    build: {
      target: 'es2022',
      assetsInlineLimit: 0,
    },
  };
});
