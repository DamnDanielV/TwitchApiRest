FROM node:14

WORKDIR /pruebaTeleperfomance
COPY package.json .
RUN npm install
COPY . .
CMD npm start