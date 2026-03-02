# Portfolio Landing Page 11 - React, Vite, Bootstrap Frontend Project

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-19.2.4-blue)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-7.3.1-646CFF)](https://vitejs.dev/)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3.8-7952B3)](https://getbootstrap.com/)

This repository is a single-page portfolio template built with React and Vite. It includes a hero banner, skills carousel, project showcase with tabs, contact form (backed by an Express + Nodemailer API), and a newsletter signup (Mailchimp). Use it as a learning reference, a starter for your own portfolio, or as a teaching example for React, Vite, and a simple Node.js backend.

- **Live Demo:** [https://portfolio-ui-11.vercel.app/](https://portfolio-ui-11.vercel.app/)

---

## Table of Contents

- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [How to Run](#how-to-run)
- [Features & Functionality](#features--functionality)
- [Components Walkthrough](#components-walkthrough)
- [API & Backend](#api--backend)
- [Reusing Components in Other Projects](#reusing-components-in-other-projects)
- [Scripts Reference](#scripts-reference)
- [Keywords](#keywords)
- [Conclusion](#conclusion)
- [License](#license)

---

## Project Overview

Portfolio UI 11 is a **single-page portfolio** that demonstrates:

- **Frontend:** React 19 with Vite 7, Bootstrap 5, and custom CSS. Sections: Navbar, Banner (hero with typing effect), Skills (carousel), Projects (tabs + cards), Contact (form), and Footer (newsletter + social links).
- **Backend (optional):** Express server with a `/contact` POST endpoint that sends emails via Nodemailer (Gmail). The frontend posts to `http://localhost:5000/contact` when the contact form is submitted.
- **Newsletter:** Footer uses `react-mailchimp-subscribe`; signup is driven by Mailchimp env vars.

The app uses **hash-based in-page navigation** (e.g. `#home`, `#skills`, `#projects`, `#connect`) via `react-router-hash-link` and `BrowserRouter`, so it works as a single HTML page suitable for static hosting (e.g. Vercel) while the backend can be deployed separately.

---

## Tech Stack

| Layer      | Technology                                   |
| ---------- | -------------------------------------------- |
| Build tool | Vite 7                                       |
| UI library | React 19                                     |
| Styling    | Bootstrap 5, custom CSS (App.css, index.css) |
| Icons      | react-bootstrap-icons                        |
| Animations | animate.css, react-on-screen                 |
| Carousel   | react-multi-carousel                         |
| Routing    | react-router-dom, react-router-hash-link     |
| Newsletter | react-mailchimp-subscribe                    |
| Backend    | Node.js, Express 5, CORS, Nodemailer         |
| Testing    | Vitest, Testing Library                      |
| Linting    | ESLint 9 (flat config)                       |

---

## Project Structure

```bash
portfolio-ui-11/
├── public/                 # Static assets (e.g. favicon, robots.txt)
├── src/
│   ├── assets/img/        # Images and icons (logo, header, meters, project images)
│   ├── components/
│   │   ├── Banner.js      # Hero section with typing effect
│   │   ├── Contact.js     # Contact form (POST to backend)
│   │   ├── Footer.js      # Newsletter + logo + social links
│   │   ├── MailchimpForm.js  # Mailchimp wrapper for newsletter
│   │   ├── Newsletter.js  # Newsletter email input + status
│   │   ├── NavBar.js      # Top navbar with hash links
│   │   ├── ProjectCard.js # Single project card
│   │   └── Projects.js    # Projects section with tabs
│   │   └── Skills.js      # Skills carousel
│   ├── App.js             # Root component composing all sections
│   ├── App.css            # Global and section-specific styles
│   ├── main.jsx           # React entry (createRoot)
│   ├── index.css          # Base styles (e.g. fonts, body)
│   ├── setupTests.js      # Vitest/Testing Library setup
│   └── App.test.js        # Sample App test
├── server.js              # Express + Nodemailer contact API
├── index.html             # HTML shell + SEO meta
├── vite.config.js         # Vite + React plugin, test config
├── eslint.config.mjs      # ESLint flat config
├── .env.example           # Env var template
└── package.json
```

---

## Getting Started

**Prerequisites:** Node.js (LTS recommended), npm or yarn.

1. **Clone and install**

   ```bash
   git clone <your-repo-url>
   cd portfolio-ui-11
   npm install
   ```

2. **Configure environment**  
   Copy `.env.example` to `.env` and fill in the values. See [Environment Variables](#environment-variables) below.

3. **Run frontend (no backend)**

   ```bash
   npm run dev
   ```

   Open <http://localhost:5173>. The contact form will fail without the backend; newsletter will only work after setting Mailchimp env vars.

4. **Run backend (contact form)**

   In a second terminal:

   ```bash
   npm run server
   ```

   Backend runs on <http://localhost:5000> and exposes `POST /contact`. Ensure `.env` has `EMAIL_USER`, `EMAIL_PASS`, and optionally `EMAIL_TO` and `PORT`.

---

## Environment Variables

Create a `.env` file in the project root (never commit real secrets). Use `.env.example` as a template.

### Frontend (Vite)

Used by the Mailchimp newsletter in the footer. Get these from your Mailchimp audience’s “Embedded forms” / “Signup form URL”.

| Variable             | Description                                                                      |
| -------------------- | -------------------------------------------------------------------------------- |
| `VITE_MAILCHIMP_URL` | Mailchimp form action URL (e.g. `https://...list-manage.com/subscribe/post?...)` |
| `VITE_MAILCHIMP_U`   | Mailchimp user/list identifier (`u=...`)                                         |
| `VITE_MAILCHIMP_ID`  | Mailchimp list/audience ID (`id=...`)                                            |

**How to get them:** Mailchimp → Audience → Signup forms → Embedded forms → copy the form’s `action` URL and parse `u` and `id` from the query string.

### Backend (Node / server.js)

Used by the Express server for sending contact-form emails via Gmail.

| Variable     | Description                                                                                                              |
| ------------ | ------------------------------------------------------------------------------------------------------------------------ |
| `EMAIL_USER` | Gmail address used to send mail                                                                                          |
| `EMAIL_PASS` | Gmail App Password (not your normal password). [Create one](https://myaccount.google.com/apppasswords) with 2FA enabled. |
| `EMAIL_TO`   | (Optional) Where contact form submissions are sent. Defaults to `EMAIL_USER`.                                            |
| `PORT`       | (Optional) Server port. Defaults to `5000`.                                                                              |

**Summary:** For contact form only, set `EMAIL_USER`, `EMAIL_PASS`, and optionally `EMAIL_TO` and `PORT`. For newsletter only, set the three `VITE_MAILCHIMP_*` variables. For both, set all of them.

---

## How to Run

| Goal           | Command            | Notes                          |
| -------------- | ------------------ | ------------------------------ |
| Dev (frontend) | `npm run dev`      | Vite dev server (e.g. :5173)   |
| Build          | `npm run build`    | Output in `dist/`              |
| Preview build  | `npm run preview`  | Serve `dist/` locally          |
| Backend API    | `npm run server`   | Express on PORT (default 5000) |
| Tests          | `npm run test`     | Vitest                         |
| Lint           | `npm run lint`     | ESLint                         |
| Lint + fix     | `npm run lint:fix` | ESLint with auto-fix           |

**Full local setup (contact + newsletter):**

1. `cp .env.example .env` and fill in Mailchimp and Gmail variables.
2. Terminal 1: `npm run server`
3. Terminal 2: `npm run dev`
4. Open <http://localhost:5173>, use Contact form and footer newsletter.

---

## Features & Functionality

- **Responsive navbar:** Logo, nav links (Home, Skills, Projects), social icons, “Let’s Connect” button. Uses hash links; adds a “scrolled” class after 50px for styling.
- **Banner (hero):** Headline, rotating typing text (Web Developer / Web Designer / UI/UX Designer), short intro, CTA. Uses `react-on-screen` and `animate.css` for scroll-in effects.
- **Skills:** Carousel of skill items (e.g. Web Development, Brand Identity, Logo Design) with responsive breakpoints (mobile → desktop).
- **Projects:** Tabs (Tab 1/2/3); Tab 1 shows a grid of project cards (image + title + description). Other tabs show placeholder text. Easy to replace with real projects.
- **Contact form:** First name, last name, email, phone, message. On submit, POSTs JSON to `http://localhost:5000/contact`. Success/error message shown below form. Requires backend and `.env` email config.
- **Footer:** Mailchimp newsletter (email input, submit, status messages) and social links. Newsletter requires `VITE_MAILCHIMP_*` in `.env`.

---

## Components Walkthrough

### NavBar (`src/components/NavBar.js`)

- Wraps the app in `BrowserRouter` and renders a Bootstrap `Navbar`.
- Tracks scroll with `useEffect` + `window.scrollY` and sets `scrolled` to toggle a class.
- Nav links use `#home`, `#skills`, `#projects`; “Let’s Connect” uses `HashLink` to `#connect`.
- **Reuse:** Drop into any React app; ensure `react-bootstrap`, `react-router-dom`, and `react-router-hash-link` are installed. Replace logo and nav links as needed.

### Banner (`src/components/Banner.js`)

- Typing effect: cycles through `ROTATE_TEXTS` with a timer; uses `useState` for `loopNum`, `isDeleting`, `text`, `delta` and `setInterval` in `useEffect`.
- Uses `TrackVisibility` so content animates when it enters the viewport.
- **Reuse:** Change `ROTATE_TEXTS`, headline, and image. Keep the same structure if you want the typing effect.

### Skills (`src/components/Skills.js`)

- Uses `react-multi-carousel` with a `responsive` object (superLargeDesktop, desktop, tablet, mobile). Replace the list of `<div className="item">` with your own skills and images.
- **Reuse:** Install `react-multi-carousel` and its CSS; copy the `responsive` config and swap in your data.

### Projects & ProjectCard (`src/components/Projects.js`, `ProjectCard.js`)

- **ProjectCard:** Receives `title`, `description`, `imgUrl`; renders a card with overlay text. Use in any grid.
- **Projects:** Holds an array of project objects, uses `Tab.Container` and maps the first tab’s content to `<ProjectCard key={index} {...project} />`. Replace the `projects` array and tab content for your data.
- **Reuse:** Export `ProjectCard` and use it in another page; pass an array of `{ title, description, imgUrl }`.

### Contact (`src/components/Contact.js`)

- Controlled form with `formDetails` (firstName, lastName, email, phone, message). `handleSubmit` does `fetch("http://localhost:5000/contact", { method: "POST", body: JSON.stringify(formDetails), headers: { "Content-Type": "application/json;charset=utf-8" } })`, then sets success/error status. For production, replace the URL with your deployed API.
- **Reuse:** Copy the form and submit logic; point `fetch` to your own endpoint and adjust fields if needed.

### Footer, MailchimpForm, Newsletter (`Footer.js`, `MailchimpForm.js`, `Newsletter.js`)

- **MailchimpForm:** Builds Mailchimp post URL from `import.meta.env.VITE_MAILCHIMP_*` and uses `MailchimpSubscribe` with a `render` prop that passes `subscribe`, `status`, `message` to **Newsletter**.
- **Newsletter:** Email input and submit; on submit calls `onValidated({ EMAIL: email })`. Shows sending/error/success from `status` and `message`.
- **Footer:** Renders MailchimpForm, logo, social icons, and copyright. **Reuse:** Use MailchimpForm + Newsletter in any Vite/React app; set the three `VITE_MAILCHIMP_*` env vars.

---

## API & Backend

The backend is a single Express app in `server.js` (ES modules).

**Endpoint:** `POST /contact`

- **Request body (JSON):** `firstName`, `lastName`, `email`, `phone`, `message`
- **Response:** JSON. On success: `{ code: 200, status: "Message Sent" }`. On error: Nodemailer error object (e.g. `EAUTH` if credentials are wrong).
- **Behavior:** Reads `EMAIL_USER`, `EMAIL_PASS`, `EMAIL_TO` (optional) from `process.env`, creates a Nodemailer Gmail transport, and sends an HTML email to `EMAIL_TO` with the form data. CORS is enabled for all origins (`cors()`).

**Run:** `node server.js` or `npm run server`. Ensure `.env` has valid Gmail App Password and that the frontend’s fetch URL matches the server (e.g. `http://localhost:5000` in dev, or your production API URL).

---

## Reusing Components in Other Projects

1. **Copy component file(s)** from `src/components/` into your project (e.g. `components/`).
2. **Install dependencies** used by that component (e.g. `react-bootstrap`, `react-multi-carousel`, `react-on-screen`, `react-router-hash-link`, `react-mailchimp-subscribe` as needed).
3. **Copy or adapt styles** from `App.css` / `index.css` for the sections you use (e.g. `.banner`, `.skill`, `.project`, `.contact`, `.footer`).
4. **Assets:** Copy referenced images from `src/assets/img/` or replace paths with your own.
5. **Contact form:** Either run this repo’s `server.js` or implement your own endpoint that accepts the same JSON and send mail (or store) as you like.
6. **Newsletter:** In a Vite project, set `VITE_MAILCHIMP_URL`, `VITE_MAILCHIMP_U`, `VITE_MAILCHIMP_ID` and use `MailchimpForm` + `Newsletter` as in this repo.

Example: using only the navbar and banner in a new Vite + React app:

```bash
npm install react-bootstrap react-router-dom react-router-hash-link react-on-screen animate.css
```

Then import and render `<NavBar />` and `<Banner />` in your root component, and include the relevant CSS classes from this project’s `App.css`.

---

## Scripts Reference

| Script          | Command          | Purpose                     |
| --------------- | ---------------- | --------------------------- |
| `start` / `dev` | `vite`           | Start Vite dev server       |
| `build`         | `vite build`     | Production build to `dist/` |
| `preview`       | `vite preview`   | Serve `dist/`               |
| `server`        | `node server.js` | Start Express contact API   |
| `test`          | `vitest run`     | Run tests                   |
| `lint`          | `eslint .`       | Lint all files              |
| `lint:fix`      | `eslint . --fix` | Lint and auto-fix           |

---

## Keywords

Portfolio, React, Vite, Bootstrap, single-page, landing page, contact form, Nodemailer, Express, Mailchimp, newsletter, hero, banner, skills carousel, project showcase, hash routing, Gmail, App Password, environment variables, frontend, backend API, open source, MIT.

---

## Conclusion

This project gives you a ready-made portfolio layout with a contact API and newsletter signup. You can run it locally with the provided scripts, deploy the frontend to Vercel (or similar) and the backend to a Node host, and reuse individual components or the whole structure in your own apps. Adjust content, env vars, and API URL for production use.

---

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT). Feel free to use, modify, and distribute the code as per the terms of the license.

## Happy Coding! 🎉

This is an **open-source project** - feel free to use, enhance, and extend this project further!

If you have any questions or want to share your work, reach out via GitHub or my portfolio at [https://www.arnobmahmud.com](https://www.arnobmahmud.com).

**Enjoy building and learning!** 🚀
