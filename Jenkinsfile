node {
    
    stage('Checkout') {
        git branch: 'master',
            url: 'https://github.com/vicente490x/PortaleAzienda.git'
    }

    stage('Build') {
        sh "mvn clean install -DskipTests=false"
    }

    stage('Package') {
        sh "mvn package"
    }

    stage('Archive Artifact') {
        archiveArtifacts artifacts: 'target/*.jar', fingerprint: true
    }
}
