pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
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

        stage('Pull Changes') {
            steps {
                bat 'git pull origin main'
            }
        }

        stage('Build') {
            steps {
                bat 'npm install'
                bat 'npm run build'
            }
        }

        stage('Deploy Locally') {
            steps {
                // Your deployment steps here
            }
        }

        stage('Push Changes Locally') {
            steps {
                bat 'git add .'
                bat 'git commit -m "Jenkins: Automated commit after build"'
                bat 'git push origin main'
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
