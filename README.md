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

On a wide screen a fixed left rail holds the identity: status, name, role, pitch, two calls to action, and text links. The right side scrolls. A quiet control switches **Case studies** (the four labs as a vertical gallery) and **Capabilities** (about, skills, experience, certifications, career direction, Beyond IT, and contact). On a phone the identity stacks first, then the same control and gallery. There is no profile photo, and `web-pfp.png` is not requested.

The background is a light field with a slow drift of soft washes. With `prefers-reduced-motion: reduce`, those washes stay still and the status dot does not pulse.

| Section | What you see |
| --- | --- |
| Identity rail | Name **Ngu Brice Che**, IT Professional positioning, two calls to action, text links, no photo |
| Case studies | Four labs as rounded schematic cards, labeled lab / portfolio |
| Capabilities | About, skills, experience, AZ-305 / AZ-104, career direction, Beyond IT, contact |

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
- `web-pfp.png` is unused. The page does not load it and does not render a profile image.
- GitHub Pages: `.nojekyll` so Pages serves the files as-is
- Azure Static Web Apps workflow remains in `.github/workflows/` for pushes to `main`

## Open locally

1. Clone this repo.
2. Open `index.html` in a browser.
3. No build step.

## Honest scope

- Labs are labeled as labs. Diagrams on the project cards are schematics, not screenshots.
- No invented metrics, clients, or awards.
- Hero and header show **Ngu Brice Che**. The About section keeps “I'm Brice”.
- AZ-305 and AZ-104 are the certifications. The Cisco Networking Academy line is training, not a CCNA claim.
- Entra Conditional Access / PIM is not claimed as a shipped lab. MFA and cybersecurity are marked as growth.

## Contact

[linkedin.com/in/ngubriceche](https://www.linkedin.com/in/ngubriceche) · [github.com/supbrice](https://github.com/supbrice) · ngubriceche@outlook.com
