def buildImage(String imageName) {
    echo 'building the docker image...'
    //getting credentials of github from jenkins
    withCredentials([usernamePassword(credentialsId: 'dockerhub', passwordVariable: 'PASS', usernameVariable: 'USER')]) {
        //building the image with dockerhub repo tag
        sh "docker build -t $imageName ."
        //login to dockerhub
        sh "echo $PASS | docker login -u $USER --password-stdin"
        //pushing the image to dockerhub
        sh "docker push $imageName "
    }
} 
def test(String imageName) {
    withCredentials([usernamePassword(credentialsId: 'dockerhub', passwordVariable: 'PASS', usernameVariable: 'USER')]) {
        //login to dockerhub
        sh "echo $PASS | docker login -u $USER --password-stdin"
        sh "docker pull $imageName "

        echo 'testing the application...'
    }
}
def release(String imageName) {
     withCredentials([usernamePassword(credentialsId: 'dockerhub', passwordVariable: 'PASS', usernameVariable: 'USER')]) {
        //login to dockerhub
        sh "echo $PASS | docker login -u $USER --password-stdin"
        sh "docker pull $imageName "

        sh "docker tag  $imageName hazem06/ncsc_test:node-app-release-1.0"
        sh "docker push hazem06/ncsc_test:node-app-release-1.0 "
    }
}
def deployApp(String imageName) {
    sshagent(['ec2-deploy-instance']) {
    def shellcmd="bash ./server-cmd.sh ${imageName}"
    sh "ssh -o StrictHostKeyChecking=no  ubuntu@18.156.82.152"
    sh "ssh -o StrictHostKeyChecking=no  ubuntu@18.156.82.152"
    sh "ssh -o StrictHostKeyChecking=no  ubuntu@18.156.82.152 ${shellcmd}"
    }

    
} 

return this
