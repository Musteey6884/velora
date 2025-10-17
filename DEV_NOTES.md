Development notes - service worker and dev
========================================

If you see stale or blank pages during active development, a previously registered service worker may be serving cached assets.

Quick manual unregister (Chrome / Edge / Firefox):

1. Open DevTools (F12) -> Application (or Storage in Firefox).
2. Select "Service Workers" from the left sidebar.
3. If an active service worker is listed for the site, click "Unregister".
4. Clear site data (Clear storage -> Clear site data) to remove cached files.
5. Reload the page.

Tip: During development you can avoid registering the SW. The project currently includes `src/sw.js` but the app only registers it in production builds. If you need me to make the dev guard explicit in code, I can add a small conditional in `src/main.jsx` to ensure no registration happens when `import.meta.env.DEV` is true.

If you want me to automatically add the dev guard and/or a small script to unregister programmatically in dev, say so and I'll apply that change.
