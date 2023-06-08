pipeline {
  agent any
  
  stages {
    stage('Checkout') {
      steps {
        // Git 저장소에서 소스 코드를 체크아웃합니다.
        checkout scm
      }
    }
    
    stage('Build') {
      steps {
        // Docker 이미지를 빌드합니다.
        script {
          def imageName = "syua0529/pollify-webserver:latest"
          def dockerfile = "Dockerfile"
          
          // Docker 이미지 빌드 명령어 실행
          docker.withRegistry('https://registry.hub.docker.com', 'dockerhub-credentials') {
            docker.build(imageName, "-f ${dockerfile} .")
          }
          
          // Docker 이미지 푸시 명령어 실행
          docker.withRegistry('https://registry.hub.docker.com', 'dockerhub-credentials') {
            docker.image(imageName).push()
          }
        }
      }
    }
    
    stage('Deploy') {
      environment {
        KUBECONFIG = credentials('syua0529') // Kubernetes 구성 파일의 credentials ID
      }
      steps {
        // Kubernetes 클러스터에 배포합니다.
        //sh 'kubectl apply -f deployment.yaml'
        //sh 'kubectl apply -f service.yaml'
      }
    }
  }
}
