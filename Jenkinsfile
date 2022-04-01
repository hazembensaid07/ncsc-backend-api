def gv
pipeline {
    agent aws
    tools {
        nodejs 'my-node'
    }
    environment {
        VERSION=1.0
        IMAGE_NAME='hazem06/ncsc_backend:node-app-test-1.0'
        IMAGE_NAME_RELEASE='hazem06/ncsc_backend:node-app-release-1.0'
    }
    stages {
        stage("init") {
            steps {
                script {
                    gv = load "script.groovy"
                }
            }
        }
        
        stage("build image") {
            steps {
                script {
                  
                   gv.buildImage(env.IMAGE_NAME)
                }
            }
        }
        stage("test") {
            steps {
                script {
                  
                   gv.test(env.IMAGE_NAME)
                }
            }
        }
        stage("release") {
            steps {
                script {
                  
                   gv.release(env.IMAGE_NAME)
                }
            }
        }
        stage("deploy") {
            steps {
                script {
                  
                    gv.deployApp(env.IMAGE_NAME_RELEASE)
                    
                }
            }
        }
    } 
    post {
       always {
        emailext body: 'build', recipientProviders: [[$class: 'DevelopersRecipientProvider'], [$class: 'RequesterRecipientProvider']], subject: 'Test'
        }
  
         success {  
              emailext body: 'successss', recipientProviders: [[$class: 'DevelopersRecipientProvider'], [$class: 'RequesterRecipientProvider']], subject: 'success'
         }  
         failure {  
            emailext body: 'failll', recipientProviders: [[$class: 'DevelopersRecipientProvider'], [$class: 'RequesterRecipientProvider']], subject: 'fail'
         }  
}


}
