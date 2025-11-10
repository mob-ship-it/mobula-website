import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';

export default defineConfig({
  integrations: [
    tailwind({
      applyBaseStyles: true,
    }),
    react(),
  ],
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en'],
  },
  vite: {
    logLevel: process.env.NODE_ENV === 'development' ? 'error' : 'info',
    plugins: [
      {
        name: 'suppress-astro-internal-unused-import-warnings',
        apply: 'serve',
        configResolved(config) {
          const originalWarn = config.logger.warn;
          config.logger.warn = (msg, options) => {
            const s = typeof msg === 'string' ? msg : (msg?.message || '');
            if (s.includes('@astrojs/internal-helpers/remote') && s.includes('never used')) {
              return;
            }
            return originalWarn(msg, options);
          };
        },
      },
    ],
    resolve: {
      alias: {
        '@i18n': '/src/i18n',
      },
    },
    css: {
      postcss: {
        plugins: [],
      },
    },
    build: {
      rollupOptions: {
        onwarn(warning, defaultHandler) {
          if (warning.code === 'UNUSED_EXTERNAL_IMPORT') {
            if (warning.id && warning.id.includes('node_modules')) {
              return;
            }
          }
          defaultHandler(warning);
        },
      },
    },
  },
});
