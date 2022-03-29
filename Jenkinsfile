def gv
pipeline {
    agent any
    triggers {
       githubPush()
    }
    tools {
        nodejs 'my-node'
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
                  
                   gv.buildImage(  'hazem06/ncsc_test:node-app-test-1.0')
                }
            }
        }
        stage("test") {
            steps {
                script {
                  
                   gv.test('hazem06/ncsc_test:node-app-test-1.0')
                }
            }
        }
        stage("release") {
            steps {
                script {
                  
                   gv.release('hazem06/ncsc_test:node-app-test-1.0')
                }
            }
        }
        stage("deployy") {
            steps {
                script {
                  
                    gv.deployApp('hazem06/ncsc_test:node-app-release-1.0')
                    
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
