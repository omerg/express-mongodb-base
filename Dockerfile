FROM node:8

# Create app directory
WORKDIR /usr/src/app

COPY . .

#install and run gulp

RUN npm install -g gulp
RUN npm install -g gulp-cli
RUN npm install gulp-typescript

EXPOSE 3001

# Run the image as a non-root user
RUN adduser -D expressDemoUser
USER expressDemoUser

CMD [ "gulp" ]