FROM node:8

# Create app directory
WORKDIR /usr/src/app

COPY . .

EXPOSE 3001

CMD [ "npm", "start" ]