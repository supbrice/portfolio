# Ngu Brice Che — IT Professional Portfolio

Personal portfolio for **Ngu Brice Che** ([@supbrice](https://github.com/supbrice)).

Primary identity: **IT Professional**.

Core line: Systems Administration · IT Operations · Technical Support · Networking.

Cloud, infrastructure, identity, and automation support that work. Azure is one skill, not the headline. Cybersecurity and security operations are a direction, not a current specialty or a SOC role.

## Live site

**Live (GitHub Pages):** [supbrice.github.io/portfolio](https://supbrice.github.io/portfolio/)

Repo: [github.com/supbrice/portfolio](https://github.com/supbrice/portfolio)

## What this website is

A single-page portfolio (static `index.html`) that follows the resume and links the four public infrastructure labs.

The page is a light, vertical document: a short header, a hero, then the sections in order. There is no profile photo. `.portrait-slot` is empty until an image is placed inside it. The page does not load `web-pfp.png`.

With `prefers-reduced-motion: reduce`, smooth scrolling and the work-card fade are turned off.

| Section | What you see |
| --- | --- |
| Hero | Name **Ngu Brice Che**, headline **IT Professional**, the four-part line, and the supporting sentence |
| Selected work | Four lab case studies. Diagrams are redrawn from the repository topologies. They are not screenshots. |
| About | Short personal note. "I'm Brice." |
| Technical focus | IT and systems, cloud and infrastructure, identity and security, automation |
| Experience | Roundel, WTW, nVent HOFFMAN, MTN Cameroon, with AZ-305, AZ-104, and the training lines |
| Cybersecurity journey | Current operations work, and security operations as a labeled direction |
| Beyond IT | Video, photo, documents, content, AI-assisted workflows, automation |
| Contact | Inquiry types plus email, LinkedIn, GitHub, and resume |

This is a **personal portfolio / lab showcase**, not a company product and not a production customer deployment.

## Projects on the site

| Project | Repo | Focus |
| --- | --- | --- |
| Network Infrastructure Upgrade (CPS) | [CloudProjects](https://github.com/supbrice/CloudProjects) | UniFi, VLANs, OT/public/corporate isolation, troubleshooting scenarios |
| Multi-Region Azure Hybrid / Zero Trust Identity | [Multi-Region…](https://github.com/supbrice/Multi-Region-Azure-Hybrid-Infrastructure-Zero-Trust-Identity) | Terraform VNets, VPN hub, Bastion, RBAC, Monitor (lab) |
| Hybrid Identity Lab | [configure-ad](https://github.com/supbrice/configure-ad) | AD DS on Azure VMs, OU/GPO, Entra Connect/Cloud Sync notes |
| Azure Architect Labs | [Azure-Cloud-Skills-and-Use-Cases](https://github.com/supbrice/Azure-Cloud-Skills-and-Use-Cases) | Entra/CA/RBAC, hybrid DNS/VPN, Terraform, Monitor patterns |

Personal utilities stay in GitHub and are not featured on this page.

## Stack

- Static `index.html` (no build step)
- Resume download: `Brice-Resume.pdf`
- `web-pfp.png` is unused. The page does not load it. Add an `img` inside `.portrait-slot` when a photo is ready.
- GitHub Pages: `.nojekyll` so Pages serves the files as-is
- Azure Static Web Apps workflow remains in `.github/workflows/` for pushes to `main`

## Open locally

1. Clone this repo.
2. Open `index.html` in a browser.
3. No build step.

## Honest scope

- Labs are labeled as labs. Diagrams on the project cards are schematics traced from the repo write-ups, not screenshots. The lab repositories do not contain image files.
- No invented metrics, clients, or awards.
- Hero and header show **Ngu Brice Che**. The About section keeps "I'm Brice".
- AZ-305 and AZ-104 are the certifications. The Cisco Networking Academy line is training, not a CCNA claim.
- Entra Conditional Access / PIM is not claimed as a shipped lab. MFA and cybersecurity are marked as growth.

## Still needs a real visual from Brice

- A portrait, if you want one. Drop an `img` inside `.portrait-slot`. Do not point the page at a missing file.
- Screenshots or exported diagrams, if you want photographic previews. Until then the cards use the repo topologies, drawn as figures and captioned as diagrams.

## Contact

[linkedin.com/in/ngubriceche](https://www.linkedin.com/in/ngubriceche) · [github.com/supbrice](https://github.com/supbrice) · ngubriceche@outlook.com
