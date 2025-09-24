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



