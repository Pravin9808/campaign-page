[![SonarQube, Docker Build & K8s YAML Update](https://github.com/Pravin9808/campaign-page/actions/workflows/main.yml/badge.svg?branch=main)](https://github.com/Pravin9808/campaign-page/actions/workflows/main.yml)


![ChatGPT Image Jan 13, 2026, 10_01_24 PM](https://github.com/user-attachments/assets/414f74ef-6b25-4094-a6a4-46ab982dbdb2)

🚀 Next.js Application
CI/CD • Docker • Kubernetes

This repository contains a Next.js web application with a complete Dev to Prod CI/CD pipeline, containerized using Docker and deployed on Kubernetes using Kustomize.

Both GitHub Actions and Jenkins pipelines are supported.

📁 Repository Structure
.
├── .github/workflows/
│   ├── devtoprod.yaml
│   └── main.yml
│
├── Deployment/
├── Pipeline/
├── app/
├── prod-dep/
├── public/
│
├── .dockerignore
├── .gitignore
├── Dockerfile
├── Jenkinsfile
├── kustomization.yaml
│
├── eslint.config.mjs
├── jsconfig.json
├── next.config.mjs
├── postcss.config.mjs
│
├── package.json
├── package-lock.json
└── README.md

🧰 Technology Stack

Frontend : Next.js (React)

Language : JavaScript

CI/CD : GitHub Actions, Jenkins

Containerization : Docker

Orchestration : Kubernetes

Config Management : Kustomize

Code Quality : ESLint

Styling : PostCSS

⚙️ Local Setup
Install Dependencies
npm install

Start Development Server
npm run dev


Application will be available at:

http://localhost:3000

🧪 Linting
npm run lint

🐳 Docker Usage
Build Docker Image
docker build -t nextjs-app .

Run Docker Container
docker run -p 3000:3000 nextjs-app

🔁 CI/CD Pipelines
GitHub Actions

Workflows are defined under:

.github/workflows/


main.yml

Code checkout

Install dependencies

Build and lint

devtoprod.yaml

Dev to Prod promotion

Docker image build

Kubernetes deployment

Jenkins Pipeline

The Jenkins pipeline is defined in:

Jenkinsfile


Pipeline stages include:

Install dependencies

Build application

Docker image creation

Kubernetes deployment

☸️ Kubernetes Deployment

Kubernetes manifests are managed using Kustomize.

Configuration Locations

Base config: kustomization.yaml

Deployment manifests: Deployment/

Production overrides: prod-dep/

Apply Deployment
kubectl apply -k .
