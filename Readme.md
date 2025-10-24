🔹 Basic Docker Commands
docker --version               
docker info                    
docker help               

🔹 Images
docker images                   
docker pull <image:tag>         # Download image
docker build -t <name:tag> .    # Build image from Dockerfile
docker rmi <image_id>           # Remove image
docker tag <image_id> <repo:tag> # Tag an image
docker inspect <image_id>       # Get image details

🔹 Containers
docker ps                       # List running containers
docker ps -a                    # List all containers
docker run <image>              # Run container
docker run -it <image> bash     # Run interactively
docker start <container_id>     # Start stopped container
docker stop <container_id>      # Stop running container
docker restart <container_id>   # Restart container
docker rm <container_id>        # Remove container
docker logs <container_id>      # View container logs
docker exec -it <container_id> bash   # Exec into container

🔹 Volumes
docker volume ls                # List volumes
docker volume create <name>     # Create volume
docker volume rm <name>         # Remove volume
docker volume inspect <name>    # Inspect volume

🔹 Networks
docker network ls               # List networks
docker network create <name>    # Create network
docker network rm <name>        # Remove network
docker network inspect <name>   # Inspect network

🔹 Cleanup
docker system prune             # Remove unused data
docker image prune              # Remove unused images
docker container prune          # Remove stopped containers
docker volume prune             # Remove unused volumes

🔹 Docker Compose
docker-compose up               # Start services
docker-compose up -d            # Start in detached mode
docker-compose down             # Stop and remove containers
docker-compose ps               # List compose containers
docker-compose logs -f          # View logs

kubectl exec -it pod/mysql-8d76cf595-htjps -- mysql  -u user -p password

sqlserver---
kubectl exec -it mssql-76c9d88d7b-mxqvj -- /bin/bash
/opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P 'yourStrongP@ssword'

cp -v saiyam.crt saiyam.key "$HOME/.kube/"
kubectl config set-credentials test \
  --client-certificate="$HOME/.kube/test.crt" \
  --client-key="$HOME/.kube/test.key"

# bash (from D:/Automation/campaign-page)
cp -v "$HOME/.kube/config" ./kubeconfig-local
export KUBECONFIG="$PWD/kubeconfig-local"
kubectl config set-credentials test --client-certificate="$PWD/test.crt" --client-key="$PWD/test.key"

 kubectl config set-context saiyam-context --cluster=kubernetes --namespace=default --user=saiyam
 kubectl config get-contexts
CURRENT   NAME             CLUSTER      AUTHINFO   NAMESPACE
*         minikube         minikube     minikube   default
          saiyam-context   kubernetes   saiyam     default

 openssl genrsa -out saiyam.key 2048
 openssl req -new -key saiyam.key -out saiyam.csr
 cat saiyam.csr | base64 | tr -d "\n"
 kubectl apply -f csr.yaml
 kubectl certificate approve saiyam
 kubectl get csr saiyam -o jsonpath='{.status.certificate}' | base64 --decode > saiyam.crt
 openssl x509 -in saiyam.crt -text -noout
 cp -v saiyam.crt saiyam.key "$HOME/.kube/"
 kubectl config set-credentials saiyam --client-certificate=/c/Users/Pravin/.kube/saiyam.crt --client-key=/c/Users/Pravin/.kube/
saiyam.key

kubectl config set-context saiyam-context --cluster=kubernetes --namespace=default --user=saiyam
<!-- cp -v "$HOME/.kube/config" ./kubeconfig-local
export KUBECONFIG="$PWD/kubeconfig-local" -->

cp test.crt test.key "$HOME/.kube/"
kubectl config set-credentials my-user --client-certificate="$HOME/.kube/test.crt" --client-key="$HOME/.kube/test.key"  


