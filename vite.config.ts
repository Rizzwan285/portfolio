import { copyFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
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

/**
 * Static hosts only know about index.html, so a deep link like /work would
 * 404. Shipping an identical 404.html makes GitHub Pages (and most other
 * static hosts) hand those paths back to the app, which then routes them.
 */
function spaFallbackPlugin(): Plugin {
  let outDir = 'dist';
  return {
    name: 'spa-fallback',
    apply: 'build',
    configResolved(config) {
      outDir = config.build.outDir;
    },
    // After the write, so index.html has been through every HTML transform.
    closeBundle() {
      const index = resolve(outDir, 'index.html');
      if (existsSync(index)) copyFileSync(index, resolve(outDir, '404.html'));
    },
  };
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const base = env.VITE_BASE || '/';

  return {
    base,
    plugins: [react(), siteMetaPlugin(env.VITE_SITE_URL), spaFallbackPlugin()],
    build: {
      target: 'es2022',
      assetsInlineLimit: 0,
    },
  };
});
