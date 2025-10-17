- Added map integration (react-leaflet) lazy-loaded in Listings (src/components/MapView.jsx).
- Favorites persisted in localStorage (src/services/favorites.js), UI in ListingCard and Favorites page.
- Demo Sign In implemented (src/components/SignInModal.jsx) and wired to Header (localStorage token velora_token).
- Service worker updated (src/sw.js) — registered only in production.
- To run locally:
  npm install
  npm install leaflet react-leaflet
  npm run dev
- To run unit tests:
  npm install -D vitest @testing-library/react @testing-library/jest-dom jsdom
  npx vitest