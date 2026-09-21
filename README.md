# Ngu Brice Che — Systems & Cloud Portfolio

Personal portfolio for **Ngu Brice Che** ([@supbrice](https://github.com/supbrice)). Ready now for Azure, systems, hybrid cloud, Entra/IAM, and IT operations. Growing into security administration, SOC / security analysis, and cloud security — those are goals, not current titles.

## Live site

**Live (GitHub Pages):** [supbrice.github.io/portfolio](https://supbrice.github.io/portfolio/)

Repo: [github.com/supbrice/brice-portfolio](https://github.com/supbrice/portfolio)

## What this website is

A single-page hire-facing site (HTML + Tailwind CDN) that mirrors the current resume and links every public GitHub project.

Desktop layout borrows the *structure* of a fixed identity rail plus a scrolling canvas (inspired by samwrks.in). The visual theme stays dark navy, glass, and blue. It is not a light-theme copy.

| Section | What you see |
| --- | --- |
| Identity rail | Availability, name **Ngu Brice Che**, role line, pitch, project and contact CTAs, email / LinkedIn / GitHub / resume |
| About | Professional summary plus the approved About Me copy (the bio keeps “I'm Brice”) |
| Technical expertise | Six cards: Azure & Cloud, Systems Administration, Identity & Entra, Networking, Automation, Security (security-adjacent, expanding into) |
| Proof lanes | Tabs for Infrastructure projects, Creative & digital, and Security labs (empty on purpose) |
| Projects | CPS network, multi-region Terraform, hybrid identity, Azure architect labs, with Infrastructure / Identity / Security filters |
| Cybersecurity journey | Honest progression toward SOC, SecOps, IAM, cloud security, IR, and monitoring |
| Experience | Roundel → WTW → nVent → MTN (same titles, employers, dates, bullets) |
| Credentials | AZ-305, AZ-104, Azure coursework, Cisco networking track |
| Target roles | Ready now vs growing into |
| Collaborate | Inquiry chips plus the same contact methods |
| Tools | Logo cloud for Azure, Terraform, Entra ID, PowerShell, Python, ServiceNow, Salesforce |

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
- The identity rail and page title use **Ngu Brice Che**. The About Me copy keeps the approved line “I'm Brice”.
- Security labs are a placeholder lane. No SOC employment and no security certifications are claimed.
- Entra Conditional Access / PIM / Intune flagship lab is not claimed until it ships.

## Contact

[linkedin.com/in/ngubriceche](https://www.linkedin.com/in/ngubriceche) · [github.com/supbrice](https://github.com/supbrice) · ngubriceche@outlook.com
