FROM node:12
WORKDIR /usr/src/app/client
COPY package*.json ./
RUN npm install
EXPOSE 3000
CMD ["npm","run", "start"]