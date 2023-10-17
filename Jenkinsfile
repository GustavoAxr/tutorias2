pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm install'
            }
        }

        stage('Run Unit Tests') {
            steps {
                bat 'npm run:build'
            }
        }
    }

    post {
        always {
            junit '**/junit.xml'
        }
    }
}
