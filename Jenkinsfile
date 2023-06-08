/* pipeline 변수 설정 */
def DOCKER_IMAGE_NAME = "pollify-webserver"           // 생성하는 Docker image 이름
def DOCKER_IMAGE_TAGS = "1"  // 생성하는 Docker image 태그
def DOCKER_CONTAINER_NAME = "pollify-webserver"    // 생성하는 Docker Container 이름
def NAMESPACE = "pollify-webserver"
def VERSION = "${env.BUILD_NUMBER}"
def DATE = new Date();

podTemplate(label: 'builder',
            containers: [
                containerTemplate(name: 'docker', image: 'docker', command: 'cat', ttyEnabled: true),
                containerTemplate(name: 'kubectl', image: 'lachlanevenson/k8s-kubectl:v1.15.3', command: 'cat', ttyEnabled: true),
            ],
            volumes: [
                hostPathVolume(mountPath: '/var/run/docker.sock', hostPath: '/var/run/docker.sock'),
            ]) {
    node('builder') {
            stage('Checkout'){
                 checkout scm   // gitlab으로부터 소스 다운
            }
            stage('Build') {
                container('node') {
                    sh "npm install"
                    sh "npm run build"
                }
            }
            stage('Docker build') {
                container('docker') {
                    withCredentials([usernamePassword(
                        credentialsId: 'syua0529',
                        usernameVariable: 'syua0529',
                        passwordVariable: 'adg789951')]) {
                            sh "docker build -t ${DOCKER_IMAGE_NAME}:${DOCKER_IMAGE_TAGS} ."
                            sh "docker login -u ${USERNAME} -p ${PASSWORD}"
                            sh "docker push ${DOCKER_IMAGE_NAME}:${DOCKER_IMAGE_TAGS}"
                    }
                }
            }
            stage('Run kubectl') {
                container('kubectl') {
                    withCredentials([usernamePassword(
                        credentialsId: 'syua0529',
                        usernameVariable: 'syua0529',
                        passwordVariable: 'adg789951')]) {
                            sh "kubectl get ns ${NAMESPACE}|| kubectl create ns ${NAMESPACE}"
                        
                            sh """
                                kubectl get secret my-secret -n ${NAMESPACE} || \
                                kubectl create secret docker-registry my-secret \
                                --docker-server=https://index.docker.io/v1/ \
                                --docker-username=${USERNAME} \
                                --docker-password=${PASSWORD} \
                                --docker-email=ekfrl2815@gmail.com \
                                -n ${NAMESPACE}
                            """

                            /* k8s-deployment.yaml 의 env값을 수정해준다(VERSION과 DATE로). 배포시 수정을 해주지 않으면 변경된 내용이 정상 배포되지 않는다. */
                            sh "echo ${VERSION}"
                            sh "sed -i.bak 's#VERSION_STRING#${VERSION}#' ./k8s/k8s-deployment.yaml"
                            sh "echo ${DATE}"
                            sh "sed -i.bak 's#DATE_STRING#${DATE}#' ./k8s/k8s-deployment.yaml"

                            /* yaml파일로 배포를 수행한다 */
                            //sh "kubectl apply -f ./k8s/k8s-deployment.yaml -n ${NAMESPACE}"
                            //sh "kubectl apply -f ./k8s/k8s-service.yaml -n ${NAMESPACE}"
                    }
                }
            }
        } catch(e) {
            currentBuild.result = "FAILED"
        }
    }
}
