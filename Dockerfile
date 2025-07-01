FROM node:18.19.1


WORKDIR /app


COPY package*.json ./


RUN npm install --omit=dev


COPY . .


EXPOSE 3000


CMD ["node", "app.js"]

