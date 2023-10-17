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
        stage('Build') {
            steps {
                bat 'npm run build'
            }
        }

        stage('Run Unit Tests') {
            steps {
                bat 'npm run test'
            }
        }
    }

    post {
        always {
            junit '**/junit.xml'
        }
    }
}
