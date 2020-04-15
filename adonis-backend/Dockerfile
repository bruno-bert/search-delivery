FROM mhart/alpine-node:10

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm install -g @adonisjs/cli

EXPOSE 3333

CMD ["npm", "start"]



