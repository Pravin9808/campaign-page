
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
                    branches: [[name: '*/master']],
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
                echo imagenameTag
                // withDockerRegistry(credentialsId: "${DOCKERHUB_CREDENTIALS}") {
                //     sh '''
                //     docker build -t ${imagenameTag} .
                //     docker push ${imagenameTag}
                //     '''
                docker.withRegistry('https://index.docker.io/v1/', "${DOCKERHUB_CREDENTIALS}") {
                    def appImage = docker.build(imagenameTag)
                    appImage.push()
                }
                env.IMAGE_TAG= imagenameTag
                env.COMMIT_HASH=commitHash
                }
            }
        }

        stage('Trivy Scan File System'){
            steps{
                sh '''
                trivy image --format table -o trivy-image-report.html ${IMAGE_TAG}
                '''
                 publishHTML([
                    reportDir: '.',
                    reportFiles: 'trivy-image-report.html',
                    reportName: 'Trivy Image Scan Report'
                ])
            }
        }

        stage("Update image tag in k8s deployment file"){
            steps{
                script{
                    // sh ''' git checkout master '''
                    //     sh '''
                    //     sed -i "s#image: .*#image: ${IMAGE_TAG}#g" Deployment/frontend.yaml
                    //     cat Deployment/frontend.yaml
                    //     '''
                      withCredentials([usernamePassword(credentialsId: GITHUB_CREDENTIALS, gitToolName: 'Default')]) {
                        sh '''
                        git checkout master
                        '''

                        # Update the image tag in the frontend deployment file
                        sed -i "s#image: .*#image: ${IMAGE_TAG}#g" Deployment/frontend.yaml

                        # Show the updated YAML for verification
                        cat Deployment/frontend.yaml
                        
                        sh '''
                        git config user.email "pravink891@gmail.com"
                        git config user.name "Pravin9808"
                        git add Deployment/frontend.yaml
                        git commit -m "Update frontend image to ${IMAGE_TAG}"
                        git push origin master
                        '''
                
                      }
                }
            }
                
            }

    }
    post {
        always {
            cleanWs()
        }
    }
}
