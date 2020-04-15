FROM mongo AS my-mongo
ENV MONGO_INITDB_DATABASE=delivery  
WORKDIR /usr/src/app
COPY init.js /docker-entrypoint-initdb.d/
EXPOSE 27017