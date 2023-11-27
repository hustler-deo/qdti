pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                script {
                    // Clean workspace and checkout the code from GitHub
                    cleanWs()
                    checkout([$class: 'GitSCM', 
                              branches: [[name: '*/main']], 
                              doGenerateSubmoduleConfigurations: false, 
                              extensions: [[$class: 'RelativeTargetDirectory', 
                                           relativeTargetDir: 'workspace']], 
                              submoduleCfg: [], 
                              userRemoteConfigs: [[url: 'https://github.com/hustler-deo/qdti.git']]])
                }
            }
        }

        stage('Pull Changes') {
            steps {
                script {
                    // Pull changes from the remote repository
                    bat 'git pull origin main'
                }
            }
        }

        stage('Build') {
            steps {
                script {
                    // Your build steps here for Node.js
                    bat 'npm install'
                    bat 'npm run build'
                }
            }
        }

        stage('Deploy Locally') {
            steps {
                script {
                    // Your deployment steps here (e.g., copying files, starting a server)
                }
            }
        }

        stage('Push Changes Locally') {
            steps {
                script {
                    // Push changes back to the local repository
                    bat 'git add .'
                    bat 'git commit -m "Jenkins: Automated commit after build"'
                    bat 'git push origin main'
                }
            }
        }
    }

    post {
        success {
            echo 'Pipeline succeeded!'
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
}
