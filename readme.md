## Monorepo to Search Delivery application

#### Contains: 

- Services: 
  - mail jobs
  - feed service (google to local raw -> local raw  to definitive tables )
- Web App (react)
- Mongo (only the Dockerfile and initialization script)
- Redis (only the Dockerfile)
- Api (AdonisJs)  
- Support files
- docker-compose.yml file to up the containers
  - each project/subfolder contains it's own Dockerfile (and docker compose refers to these Dockerfiles)