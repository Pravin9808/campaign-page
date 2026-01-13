[![SonarQube, Docker Build & K8s YAML Update](https://github.com/Pravin9808/campaign-page/actions/workflows/main.yml/badge.svg?branch=main)](https://github.com/Pravin9808/campaign-page/actions/workflows/main.yml)
🚀 Next.js Application – CI/CD & Kubernetes Deployment

This repository contains a Next.js web application with a complete Dev → Prod CI/CD pipeline, containerization using Docker, and deployment to Kubernetes using Kustomize.
It supports both GitHub Actions and Jenkins–based pipelines.

📂 Project Structure
.
├── .github/workflows/
│   ├── devtoprod.yaml        # GitHub Actions pipeline (Dev → Prod)
│   └── main.yml              # Main CI workflow
│
├── Deployment/               # Kubernetes deployment manifests
├── Pipeline/                 # CI/CD pipeline-related configs/scripts
├── app/                      # Next.js App Router source code
├── prod-dep/                 # Production-specific deployment configs
├── public/                   # Static assets
│
├── .dockerignore             # Docker ignore rules
├── .gitignore                # Git ignore rules
├── Dockerfile                # Docker image definition
├── Jenkinsfile               # Jenkins CI/CD pipeline
├── kustomization.yaml        # Kustomize configuration
│
├── eslint.config.mjs         # ESLint configuration
├── jsconfig.json             # JavaScript path aliases & config
├── next.config.mjs           # Next.js configuration
├── postcss.config.mjs        # PostCSS configuration
│
├── package.json              # Project dependencies & scripts
├── package-lock.json         # Dependency lock file
└── README.md                 # Project documentation

🛠️ Tech Stack

Frontend: Next.js (React)

Language: JavaScript

Containerization: Docker

CI/CD:

GitHub Actions

Jenkins (Declarative Pipeline)

Orchestration: Kubernetes

Config Management: Kustomize

Linting: ESLint

Styling: PostCSS

⚙️ Local Development
1️⃣ Install Dependencies
npm install

2️⃣ Run Development Server
npm run dev


Application will be available at:

http://localhost:3000

🧪 Linting
npm run lint

🐳 Docker
Build Docker Image
docker build -t nextjs-app .

Run Container
docker run -p 3000:3000 nextjs-app

🔁 CI/CD Pipelines
🔹 GitHub Actions

Located in .github/workflows/

main.yml – CI workflow (build, test, lint)

devtoprod.yaml – Dev → Prod promotion pipeline

Typical flow:

Code push / PR

Build & test

Docker image build

Deployment to Kubernetes
