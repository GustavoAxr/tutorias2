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
                bat 'vue-cli-service test:unit'
            }
        }
    }

    post {
        always {
            junit '**/junit.xml'
        }
    }
}
