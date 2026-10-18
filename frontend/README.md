# PrepPilot React 19 Migration — Full UI Parity

This build restores the complete original PrepPilot surface in React routing: landing page, all 29 admin screens, all 20 candidate screens, and error pages. The original design system and legacy API/mock behavior are retained as a compatibility bridge so no screen is dropped during migration.

## Run

```bash
npm install
npm run dev
```

## Routes

- `/` — original PrepPilot landing page
- `/admin/*` — all 29 admin pages
- `/candidate/*` — all 20 candidate pages
- `/error/403`, `/error/404`, `/error/500`

## 30M+ customer architecture

`/admin/users` is implemented as a React-native scalable page. The production API should provide server-side search/filtering, cursor pagination, stable sorting, and asynchronous exports. The browser must never download the complete customer dataset.

## Migration strategy

The other screens intentionally retain their existing HTML + JS behavior inside a React route boundary. This is a compatibility phase, not a permanent architecture. It lets the team migrate one module at a time without dropping functionality. The next refactor should replace each legacy screen with typed React components, TanStack Query hooks, form schemas, and reusable data grids.


## Login, SSO and face sign-in UI

- `/login` — responsive login screen with email/password, Google and Microsoft SSO entry points, and camera-based face sign-in capture UI.
- Set `VITE_GOOGLE_SSO_URL` and `VITE_MICROSOFT_SSO_URL` to your identity-provider authorization endpoints to enable the SSO redirects.
- This is a frontend integration scaffold, not production authentication. The password form does not authenticate against a server, and face capture does not identify or verify a person. Connect the form to your backend auth endpoint, configure OAuth/OIDC with state/nonce and callback validation, and implement server-side biometric verification (with consent, retention controls, and a non-biometric fallback) before production use. Never store raw face images as a substitute for secure biometric templates.
