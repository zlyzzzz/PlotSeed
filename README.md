# PlotSeed

English story-creation web application using JavaScript, React and Node.js. This is the clean source edition for GitHub and Render.

## Local setup

Use Node.js 22.12+ (22 LTS recommended).

```text
npm ci
npm test
npm run build
npm start
```

Open http://127.0.0.1:3001 . On Windows, Start-PlotSeed.cmd also installs dependencies, builds and starts the app.
Copy .env.example to .env and configure your provider key privately for local AI generation.

## Source structure

- src/main.jsx: React pages and UI interactions.
- src/style.css and src/Illustrations.jsx: styling, responsive layout and SVG illustrations.
- src/questions.js: 20 question slots, candidate pools and sampling; shared with the backend.
- src/library.js, src/metrics.js and src/navigation.js: local records, active planning time and review navigation.
- src/story-markers.js: shared paragraph and annotation validation helpers.
- src/word-export.js: readable Word exports.
- server/index.js: HTTP server serving frontend and APIs on one origin.
- server/api.js: input validation, generation and annotation APIs.
- server/providers.js: DeepSeek and optional OpenAI adapters.
- tests/: automated application checks.
- licenses/: bundled font license.
- index.html and vite.config.js: frontend entry, build and development settings.
- package.json and package-lock.json: commands and dependency versions.
- .env.example: configuration template without actual credentials.
- .node-version: deployment Node.js version.

## Render deployment

See Render部署说明.md. Use Web Service, not Static Site. Never upload .env or actual API keys to GitHub.

## Current scope

Includes 3 settings, 20 guided questions, random option batches, optional skipping, free writing, active planning time, editable review, story reading, AI-suggested choice markers, local history with soft deletion, and Word export.

Records use browser localStorage; there is no server database, login or cross-device synchronization. There is no automatic knowledge-base retrieval. Experimental questionnaires are separate. Planning time is visible active input-page time, not total task duration or a cognitive-load score.

AI availability requires valid server-side credentials, balance and an available provider. This edition has not yet been deployed or verified on Render. Application tests do not establish research results or guarantee story quality.

Netlify functions, previous hosting metadata, Docker/Caddy deployment files, generated dist, node_modules, obsolete notes and actual credentials are excluded. npm run build generates dist locally or on Render.

## Navigation update

Home and Saved stories are independent navigation buttons. Saved stories includes drafts and finished stories. Normal question navigation uses Previous question; review editing keeps Back to all choices.

UI navigation icons and shared navigation buttons are in src/Navigation.jsx. Layout and responsive button sizing are in src/style.css. Source files use consistent formatting and English comments for key behavior.
