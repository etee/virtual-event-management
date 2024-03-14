# Fetching the minified node image on apline linux
FROM node:18-alpine

# Setting up the work directory
WORKDIR /app

# Copying all the files in our project
COPY package*.json ./

# Installing dependencies
RUN npm install

COPY . .

# Exposing server port
EXPOSE 3000

CMD ["npm", "start"]