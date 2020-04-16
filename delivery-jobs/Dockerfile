FROM node:10

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

#copies the .edge templates that do not come with the build
RUN cp -r src/views dist

EXPOSE 3334

CMD ["npm", "start"]



