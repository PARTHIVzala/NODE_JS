## Quick orientation

- This is an Express + EJS application using Mongoose for MongoDB. The server entrypoint is `app.js` (listens on port 3000).
- Authentication is handled with Passport (local strategy) — see `controller/localStregert.js` (used by `app.js`) and a secondary `config/passcort.js` present in the repo (possible duplicate/conflict).
- Routes live in `routes/` and are mounted from `app.js` (see `routes/index.routes.js`). Controllers are in `controller/` and models in `model/`.
- Views are EJS templates in `views/`. Static assets are served from `public/`. File uploads use `middleware/multer.js` and are written to `uploads/`.

## Architecture & important flows (what to read first)
- `app.js` — bootstrap, session setup (`express-session`), passport initialization, static folders, and route mount points.
- `config/dbconnect.js` — connects to MongoDB with Mongoose. The connection string is currently hard-coded here.
- `controller/localStregert.js` — the active Passport local-strategy implementation for admin login; includes `passport.checkAuthenticate` middleware used to protect routes.
- `routes/index.routes.js` — primary routes; demonstrates how to apply `passport.checkAuthenticate` and `upload.single('img')` for protected routes and file uploads.
- `controller/index.controller.js` — common controller patterns: try/catch, `res.render(...)`, redirect-on-error, file handling (deleting uploads with `fs.unlinkSync`). Use this file as the canonical style reference.

## Conventions and patterns to follow
- Authentication: use `passport.checkAuthenticate` to protect routes. Example: `routes.get('/dashboard', passport.checkAuthenticate, dashboard)`.
- File uploads: use `upload` from `middleware/multer.js`; examples show `upload.single('img')` for single-image uploads and storing filenames in Mongoose documents.
- Models: files follow `model/<name>.model.js` and are used directly in controllers (e.g., `const blog = require('../model/blog.model')`).
- Error handling: controllers generally log errors and `res.redirect('/')`. Follow the same minimal error surfacing unless a change is approved.
- Sessions: `express-session` is configured in `app.js` with a hard-coded secret `vivekSecret`; be cautious when modifying session behavior (this is production-sensitive).

## Project-specific inconsistencies you should know
- There are typos/multiple passport files: `controller/localStregert.js` is imported in `app.js`, while `config/passcort.js` exists and references `../models/User` which does not match this repo's `model/` folder—prefer `controller/localStregert.js` as the canonical auth implementation.
- Both `bcrypt` and `bcryptjs` appear in `package.json`. Code uses `bcrypt` in `localStregert.js` and `bcryptjs` appears in `config/passcort.js` — pick one consistently when changing auth code.
- `dbconnect.js` contains an embedded connection string. Treat this as sensitive; avoid committing new secrets and prefer environment variables when editing.

## How to run & debug (concrete commands)
- Start dev server with nodemon: `npm run dev` (runs `nodemon app.js`).
- Start production-like server: `npm start` (runs `node app.js`).
- Visit the app at: `http://localhost:3000`.
- To debug auth flows: set breakpoints in `controller/localStregert.js` and routes in `routes/index.routes.js` (these show where `passport.authenticate` is invoked).

## Where to add things
- New routes: add files in `routes/` and mount them from `routes/index.routes.js` (or similar). Subroutes for admin are in `routes/admin.routes.js` and are mounted as `/admin`.
- New controllers: add to `controller/` and export handler functions; follow existing pattern (`async (req,res) => { try { ... } catch(e){ console.log(e); res.redirect('/') } }`).
- New models: add to `model/` as Mongoose schemas and require them in controllers.

## Security & maintenance notes for AIs
- Do not introduce hard-coded secrets or new credentials; this repo already has a DB URI and session secret in code — flag these to a human if you must modify.
- When modifying auth, prefer `controller/localStregert.js` as the live implementation. If you change hashing libraries, update all places consistently.

## Examples (copy-paste patterns)
- Protect a route: `routes.get('/dashboard', passport.checkAuthenticate, dashboard)`
- Upload and save image: `routes.post('/blog', passport.checkAuthenticate, upload.single('img'), blogFrom)` — controller reads `req.file.filename`.
- Delete stored image: see `controller/index.controller.js` usage of `fs.existsSync()` and `fs.unlinkSync()` before `findByIdAndDelete`.

If anything here is unclear or you'd like me to expand an area (routing pattern, auth, or secure config), tell me which section to refine.
