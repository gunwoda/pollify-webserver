pipeline {
  agent any
  
  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }
    
    stage('Build') {
      steps {
        script {
          docker.withRegistry('https://registry.hub.docker.com', 'dockerhub-credentials') {
            def imageName = "syua0529/pollify-webserver:latest"
            def dockerfile = "Dockerfile"
            docker.build(imageName, "-f ${dockerfile} .")

            docker.withRegistry('https://registry.hub.docker.com', 'dockerhub-credentials') {
              docker.image(imageName).push()
            }
          }
        }
      }
    }
    
    stage('Deploy') {
      environment {
        KUBECONFIG = credentials('syua0529') 
      }
      steps {
        echo 'deployment'
        //sh 'kubectl apply -f deployment.yaml'
        //sh 'kubectl apply -f service.yaml'
      }
    }
  }
}
