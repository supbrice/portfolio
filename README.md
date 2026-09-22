# Ngu Brice Che — IT Professional Portfolio

Personal portfolio for **Ngu Brice Che** ([@supbrice](https://github.com/supbrice)).

Primary identity: **IT Professional**.

Core line: Systems Administration · IT Operations · Technical Support · Networking.

Cloud, infrastructure, identity, and automation (including Azure) support that work. Cybersecurity is a growth path, not a current specialty or a SOC role. Creative work is complementary.

## Live site

**Live (GitHub Pages):** [supbrice.github.io/portfolio](https://supbrice.github.io/portfolio/)

Repo: [github.com/supbrice/portfolio](https://github.com/supbrice/portfolio)

GitHub Pages serves this repo from the `main` branch root (`/`). The links page (LT) stays in the separate [supbrice/links](https://github.com/supbrice/links) repo and is not part of this site.

## What this website is

A multi-page glass IT portfolio. The header display name is **Ngu Brice Che | 🦾**, and the favicon is the same mark in `assets/favicon.svg`. The Minnesota pin on every page opens Apple Maps for Ramsey, Minnesota; the visible label stays “Minnesota”. Asset links are relative (`css/`, `js/`, `data/`, `assets/`) so they resolve under the `/portfolio/` project-pages base.

| Page | File | What you see |
| --- | --- | --- |
| Home | `index.html` | **Ngu Brice Che \| 🦾**, IT Professional positioning, clickable browse cards above the experience timeline |
| Projects | `projects.html` | Case-study card grid with View Case Study panels; the file browser sits under Explore Technical Files |
| Labs | `labs.html` | Lab catalog plus interactive Mermaid diagrams |
| Creative | `creative.html` | Single-column expandable list (video, photo, resume, docs, content) plus AI-assisted workflow tool cards |
| About | `about.html` | Intro lede, then My Background, What I Do, and Beyond IT |
| Contact | `contact.html` | Resume first, then LinkedIn, email, call, and schedule a call |

Labs are labeled **PORTFOLIO / LAB**. This is a personal portfolio and lab showcase, not a company product and not a production customer deployment.

## Projects on the site

| Project | Repo |
| --- | --- |
| Network upgrade lab | [CloudProjects](https://github.com/supbrice/CloudProjects) |
| Multi-region Azure hybrid lab | [Multi-Region…](https://github.com/supbrice/Multi-Region-Azure-Hybrid-Infrastructure-Zero-Trust-Identity) |
| Hybrid AD lab | [configure-ad](https://github.com/supbrice/configure-ad) |
| Azure reference labs | [Azure-Cloud-Skills-and-Use-Cases](https://github.com/supbrice/Azure-Cloud-Skills-and-Use-Cases) |
| Entra hybrid identity pack | [entra-hybrid-proof](https://github.com/supbrice/entra-hybrid-proof) |

## Stack

- Static HTML (no build step)
- `css/site.css` — Apple system font stack (`SF Pro Text` / `SF Pro Display` with system fallbacks) and glass styling, including light and dark themes
- `js/nav.js` — page navigation
- `js/theme.js` — light / dark theme toggle
- `js/skill-rotate.js` — rotating skill line on Home
- `js/creative.js` — creative card behavior
- `js/diagram.js` — interactive Mermaid (pan / zoom), wired from Labs and the Projects file view
- `data/bundle.js` — offline repo snapshot used by Projects and Labs
- `assets/favicon.svg` — 🦾 favicon
- `assets/previews/`, `assets/companies/`, `assets/tech/`, `assets/tools/` — previews, company marks, technology ticker, and creative tool logos
- `.nojekyll` so Pages serves the files as-is
- Azure Static Web Apps workflow remains in `.github/workflows/` for pushes to `main`
- Contact’s Resume button links to `assets/Brice-Resume.pdf`. `Brice-Resume.pdf` also stays at the repo root. `web-pfp.png` is unused and is not loaded.

## Open locally

1. Clone this repo.
2. Open `index.html` in a browser, or serve the repo root with any static file server.
3. No build step.

## Honest scope

- Labs are labeled PORTFOLIO / LAB. Diagrams come from the lab READMEs; they are not screenshots of a live customer environment.
- No invented metrics, clients, or awards on these pages.
- Header and brand show **Ngu Brice Che | 🦾**. About opens with “I'm Ngu Brice Che”.
- Cybersecurity is described as a growth path, without expert or SOC claims.

## Contact

[linkedin.com/in/ngubriceche](https://www.linkedin.com/in/ngubriceche) · [github.com/supbrice](https://github.com/supbrice) · supbricenow@gmail.com
