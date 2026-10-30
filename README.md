# VStore Frontend

## Run with SteamBackEnd

Clone both repositories into the same parent directory:

```sh
git clone https://github.com/qqwwalls/SteamBackEnd.git
git clone https://github.com/qqwwalls/VStoreFrontend.git
```

Start the backend in one terminal, from that parent directory:

```sh
cd SteamBackEnd
dotnet run --project Steam.Api --launch-profile local
```

Then run this frontend in a second terminal, from the same parent directory:

```sh
cd VStoreFrontend
npm ci
npm run dev -- --port 5173 --strictPort
```

Keep both terminals open while using the store at <http://localhost:5173/>. Swagger is available at <http://localhost:5067/swagger/index.html>.

The development server proxies `/api` and `/swagger` to `VITE_API_TARGET` (currently `http://localhost:5067`). `VITE_API_URL=/api` keeps browser requests on the frontend origin. Restart Vite after changing environment settings.

The catalogue, game details, registration, login, wishlist and library use backend requests. Network failures are displayed with a retry option; mock login and mock catalogue fallbacks are not used. The original catalogue fixtures remain in `src/api/games.ts` for reference.

Guest users can collect games in a local cart, but checkout requires a verified server session. Carts are stored as game identifiers in the browser, separately for each account, and resolve current prices from the API. Guest cart items are merged into the signed-in user's cart. Wishlist entries and acquired games are stored on the server.

The backend validates ownership and prices independently of the UI. Free games can be added to the library after signing in. The local backend profile enables demo purchases: the checkout explicitly says no money is charged, and the Complete demo purchase button saves paid and free games to the authenticated account after a successful API response. No card details are requested. When the server disables demo purchases, paid checkout remains unavailable. Personal profile game counts and library entries come from the server.

Artwork URLs come from the API. Portrait catalogue covers and wide banners use separate high-resolution images, rather than enlarging one small thumbnail into every layout.

`npm run build` checks TypeScript and builds production assets. `npm run lint` runs Oxlint. News and desktop download screens are still existing UI demonstrations, not implemented backend services.

## Original Template Notes

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend enabling type-aware lint rules by installing `oxlint-tsgolint` and editing `.oxlintrc.json`:

```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "plugins": ["react", "typescript", "oxc"],
  "options": {
    "typeAware": true
  },
  "rules": {
    "react/rules-of-hooks": "error",
    "react/only-export-components": ["warn", { "allowConstantExport": true }]
  }
}
```

See the [Oxlint rules documentation](https://oxc.rs/docs/guide/usage/linter/rules) for the full list of rules and categories.
