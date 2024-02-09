pipeline {
    agent any

    environment{
        imageName = 'prodtrace_frontend'
        registryCredential = 'dockerhub'
        stagingRegistryUrl = 'http://192.168.1.23:5000'
        productionRegistryUrl = 'http://45.32.22.181:5000'
        dockerImage = ''
        STAGING_SERVER ='192.168.1.24'
        PRODUCTION_SERVER ='45.76.214.70'
        mailRecepients= 'victor.kanam@prodtrace.io, philip.junior@prodtrace.io'
    }
    
    stages {
        stage('Cloning our Git') {
            steps {
                echo 'Pulling....' + env.gitlabBranch
                git(url:'http://192.168.0.207/prodtrace/prodtrace-frontend.git', branch: env.gitlabBranch , credentialsId: 'GIT_CRED')
            }
        }

        stage ('BUILD') {
            steps{
                script {
                       if (env.gitlabBranch == 'master') {
                            dockerImage = docker.build("$imageName:$BUILD_NUMBER"," -f Dockerfile.production .")
                            docker.withRegistry( productionRegistryUrl,  ) {
                            dockerImage.push()
                            dockerImage.push("latest")
                            }
                        } else {
                            dockerImage = docker.build("$imageName:$BUILD_NUMBER", "-f Dockerfile.staging .")
                            docker.withRegistry( stagingRegistryUrl,  ) {
                            dockerImage.push()
                            dockerImage.push("latest")
                        }
                    }
                }
                sh '''docker rmi $imageName:$BUILD_NUMBER'''
            }

            post{
                failure{
                    mail to: "${mailRecepients}",
                    subject: "jenkins build:${currentBuild.currentResult}: ${env.JOB_NAME}",
                    body: "${currentBuild.currentResult}: Job ${env.JOB_NAME}\nMore Info can be found here: ${env.BUILD_URL}"
                }
            }
        }

        stage ('SERVER SETUP') {
            steps{
                sshagent(credentials:['JENKINS']) {
                    script{
                        if (env.gitlabBranch == 'master') {
                            sh "scp prod-setup.sh  $PRODUCTION_SERVER:~/"
                            sh 'ssh  -o StrictHostKeyChecking=no  $PRODUCTION_SERVER "chmod +x prod-setup.sh ; ./prod-setup.sh"'
                            sh 'scp docker-compose-prod.yml $PRODUCTION_SERVER:~/prodtrace-frontend/deployment/current/'
                        } else {
                            sh "scp staging-setup.sh  $STAGING_SERVER:~/"
                            sh 'ssh  -o StrictHostKeyChecking=no  $STAGING_SERVER "chmod +x staging-setup.sh ; ./staging-setup.sh"'
                            sh 'scp docker-compose-staging.yml $STAGING_SERVER:~/prodtrace-frontend/deployment/current/'
                        }
                    }

                 }
            }

             post{
                failure{
                    mail to: "${mailRecepients}",
                    subject: "jenkins build:${currentBuild.currentResult}: ${env.JOB_NAME}",
                    body: "${currentBuild.currentResult}: Job ${env.JOB_NAME}\nMore Info can be found here: ${env.BUILD_URL}"
                }
            }
        }
        stage('deploying prodtrace-frontend') {
            steps{
                sshagent(credentials:['JENKINS']) {
                    script{
                        if (env.gitlabBranch == 'master') {
                        sh "ssh -o StrictHostKeyChecking=no  $PRODUCTION_SERVER docker-compose -f prodtrace-frontend/deployment/current/docker-compose-prod.yml up -d"

                        } else {
                        sh "ssh -o StrictHostKeyChecking=no  $STAGING_SERVER docker-compose -f prodtrace-frontend/deployment/current/docker-compose-staging.yml up -d"
                        }
                    }
                }  
            }

            post{
                success{
                    mail to: "${mailRecepients}",
                    subject: "jenkins build:${currentBuild.currentResult}: ${env.JOB_NAME}",
                    body: "${currentBuild.currentResult}: Job ${env.JOB_NAME}\nMore Info can be found here: ${env.BUILD_URL}"
                }
                failure{
                    mail to: "${mailRecepients}",
                    subject: "jenkins build:${currentBuild.currentResult}: ${env.JOB_NAME}",
                    body: "${currentBuild.currentResult}: Job ${env.JOB_NAME}\nMore Info can be found here: ${env.BUILD_URL}"
                }
            }
        }
    }   
}
