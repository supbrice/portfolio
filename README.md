# Brice — Systems & Infrastructure Portfolio

Personal portfolio website for **Brice** ([@supbrice](https://github.com/supbrice)).Target roles: Azure Administrator · Hybrid Cloud / Systems Admin · Entra / Identity-adjacent infra.

## Live site

**Live (GitHub Pages):** [supbrice.github.io/portfolio](https://supbrice.github.io/portfolio/)

Repo: [github.com/supbrice/brice-portfolio](https://github.com/supbrice/portfolio)

## What this website is

A single-page bento board (static `index.html`) that mirrors the current resume. Hire, portfolio, and personal lanes are separate tiles. Technical depth opens from the Cloud & Infra tile instead of stacking down the page.

| Tile | Lane | What you see |
| --- | --- | --- |
| Hero | Personal | Name **Brice**, photo, editable tagline placeholder |
| Job / Role | Hire | Azure / hybrid headline, latest role, full experience |
| Cloud & Infra | Hire | Azure, Terraform, Entra ID, expertise, projects, credentials, toolkit |
| Creative | Portfolio | Video editing, photo editing, documentation (More skills) |
| Personal | Personal | Hobby and interest placeholders only — not work history |
| Let's Talk | Contact | Protected email, LinkedIn, GitHub, resume PDF |

About, projects, expertise, experience, credentials, and contact now live inside those tiles. Replace the bracketed tagline and hobby placeholders before publishing them as finished personal copy.

This is a **personal portfolio / lab showcase**, not a company product and not a production customer deployment.

## Projects on the site

### Hire-facing labs
| Project | Repo | Focus |
| --- | --- | --- |
| Network Infrastructure Upgrade (CPS) | [CloudProjects](https://github.com/supbrice/CloudProjects) | UniFi, VLANs, OT/public/corporate isolation, troubleshooting scenarios |
| Multi-Region Azure Hybrid / Zero Trust Identity | [Multi-Region…](https://github.com/supbrice/Multi-Region-Azure-Hybrid-Infrastructure-Zero-Trust-Identity) | Terraform VNets, VPN hub, Bastion, RBAC, Monitor (lab) |
| Hybrid Identity Lab | [configure-ad](https://github.com/supbrice/configure-ad) | AD DS on Azure VMs, OU/GPO, Entra Connect/Cloud Sync notes |
| Azure Architect Labs | [Azure-Cloud-Skills-and-Use-Cases](https://github.com/supbrice/Azure-Cloud-Skills-and-Use-Cases) | Entra/CA/RBAC, hybrid DNS/VPN, Terraform, Monitor patterns |

### Not on the hire site

Personal utilities (`ai-usage-dashboard`, `sofi-levels-card`) stay in GitHub but are **not** featured on this portfolio page (recruiter guidance: keep the skim on infra labs only).


## Stack

- Static `index.html` + Lucide icons (detail panels)
- Light / dark theme toggle
- Resume download: `Brice-Resume.pdf`
- Deploy: GitHub Actions → **Azure Static Web Apps** on every push to `main`

## Open locally

1. Clone this repo.
2. Open `index.html` in a browser (or VS Code Live Server).
3. No build step.

## Repo layout

```
index.html          # Portfolio page
Brice-Resume.pdf    # Resume linked from the site
web-pfp.png         # Profile image
README.md           # This file
.github/workflows/  # Azure Static Web Apps CI/CD
.gitignore
```

## Honest scope

- Labs are labeled as labs. No fake production SLAs or enterprise scale claims.
- Full legal name is kept off public GitHub prose (site uses **Brice**).
- Entra Conditional Access / PIM / Intune flagship lab is not claimed until it ships.

## Contact

[linkedin.com/in/ngubriceche](https://www.linkedin.com/in/ngubriceche) · [github.com/supbrice](https://github.com/supbrice) · ngubriceche@outlook.com
