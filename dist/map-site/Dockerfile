FROM node:21.7.3-alpine3.18
WORKDIR /map-site
COPY package.json .
COPY package-lock.json .
RUN npm ci
COPY server.js .
ADD app app
EXPOSE 3000
CMD ["node", "server.js"]