# Brice — Systems & Infrastructure Portfolio

Personal portfolio website for **Brice** ([@supbrice](https://github.com/supbrice)).Target roles: Azure Administrator · Hybrid Cloud / Systems Admin · Entra / Identity-adjacent infra.

## Live site

**Azure Static Web Apps:** [mango-ground-0a1d23510.7.azurestaticapps.net](https://mango-ground-0a1d23510.7.azurestaticapps.net/)

Repo: [github.com/supbrice/brice-portfolio](https://github.com/supbrice/brice-portfolio)

## What this website is

A single-page hire-facing site (HTML + Tailwind CDN) that mirrors the current resume and links every public GitHub project.

| Section | What you see |
| --- | --- |
| Hero | Name **Brice**, Azure / hybrid positioning, resume + LinkedIn + GitHub |
| Skills | Cloud & identity, automation, networking/security, ITSM — aligned to the resume |
| Projects | Visual cards for all public labs + personal tools |
| Experience | Roundel → WTW → nVent → MTN (resume order) |
| Credentials | AZ-305, AZ-104, Azure coursework, Cisco networking track |
| Contact | Protected email, LinkedIn, GitHub, resume PDF |

This is a **personal portfolio / lab showcase**, not a company product and not a production customer deployment.

## Projects on the site

### Hire-facing labs
| Project | Repo | Focus |
| --- | --- | --- |
| Network Infrastructure Upgrade (CPS) | [CloudProjects](https://github.com/supbrice/CloudProjects) | UniFi, VLANs, OT/public/corporate isolation, troubleshooting scenarios |
| Multi-Region Azure Hybrid / Zero Trust Identity | [Multi-Region…](https://github.com/supbrice/Multi-Region-Azure-Hybrid-Infrastructure-Zero-Trust-Identity) | Terraform VNets, VPN hub, Bastion, RBAC, Monitor (lab) |
| Hybrid Identity Lab | [configure-ad](https://github.com/supbrice/configure-ad) | AD DS on Azure VMs, OU/GPO, Entra Connect/Cloud Sync notes |
| Azure Architect Labs | [Azure-Cloud-Skills-and-Use-Cases](https://github.com/supbrice/Azure-Cloud-Skills-and-Use-Cases) | Entra/CA/RBAC, hybrid DNS/VPN, Terraform, Monitor patterns |

### Personal utilities (clearly labeled on the site)
| Project | Repo | Live demo |
| --- | --- | --- |
| AI Usage Dashboard | [ai-usage-dashboard](https://github.com/supbrice/ai-usage-dashboard) | [GitHub Pages](https://supbrice.github.io/ai-usage-dashboard/) |
| SOFI Levels Card | [sofi-levels-card](https://github.com/supbrice/sofi-levels-card) | [GitHub Pages](https://supbrice.github.io/sofi-levels-card/) |

## Stack

- Static `index.html` + Tailwind CSS (CDN) + Lucide icons
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
