
pipeline {
    agent any

    environment {
        GITHUB_CREDENTIALS = 'github-token'
        DOCKERHUB_CREDENTIALS = 'dockerhub-credential'
        REPO_URL = 'https://github.com/Pravin9808/campaign-page.git'
        SONARQUBE_AUTH_TOKEN = credentials('sonarqube')
    }

    stages {
        stage('Checkout') {
            steps {
                checkout([
                    $class: 'GitSCM',
                    branches: [[name: '*/main']],
                    userRemoteConfigs: [[url: "${REPO_URL}", credentialsId: "${GITHUB_CREDENTIALS}"]]
                ])
            }
        }

        stage('Code Analysis') {
            steps {
                withSonarQubeEnv('SonarQube') {
                    script {
                    def scannerHome = tool 'sonar-scanner'
                    sh """
                    ${scannerHome}/bin/sonar-scanner\
                            -Dsonar.projectKey=campaign-page \
                            -Dsonar.sources=. \
                            -Dsonar.login=${SONARQUBE_AUTH_TOKEN}
            """
             // -Dsonar.host.url= http://host.docker.internal:9001 \
                    }
                }
            }
        }

        stage('Build and Push Docker Images') {
            steps {
                script{
                def commitHash = sh(script: 'git rev-parse --short HEAD', returnStdout: true).trim()
                def imageTag= commitHash
                def imagenameTag="pravindevopsch/campaign:${imageTag}"
                docker.withRegistry('https://index.docker.io/v1/', "${DOCKERHUB_CREDENTIALS}") {
                    def appImage = docker.build(imagenameTag)
                    appImage.push()
                }
                env.commitHash=commithash
                }
            }
        }

        stage('Trivy Scan File System'){
            steps{
                sh '''
                trivy image --format table -o trivy-image-report.html pravindevopsch/campaign:${imageTag}
                '''
            }
        }
    }
}
