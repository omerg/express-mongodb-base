# Express MongoDB Base
[![Build Status](https://travis-ci.org/omerg/express-mongodb-base.png?branch=master)](https://travis-ci.org/omerg/express-mongodb-base)  [![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/dwyl/esta/issues)

This is an example project for those who want to bootsrap an API using Express and MongoDB.

There is a [video](https://youtu.be/dp9QF088Zqc) in Turkish examining the project: 

# Demo
https://express-mongodb-base.herokuapp.com/api
 
# Heroku Automatic Deployment
[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)
  
If you forked this repository, you can link it to your heroku app afterwards.

# Pre-reqs
To build and run this app locally you will need a few things:
- Install [Node.js](https://nodejs.org/en/)
- Install [MongoDB](https://docs.mongodb.com/manual/installation/)

# Getting started
- Install dependencies
```
cd <project_name>
npm install
```

# Running the project
You can simply call Npm Script:

```
$ npm start
```
Or you can bootstrap the project right away using [Docker](https://www.docker.com/):

```
$ docker-compose up
```
Start Using the API at [http://localhost:3001/api/](http://localhost:3001/api/)

# Debugging the project
In order to enable debugging in local environment, start project with the following command:

```
$ npm run debug
```

> **Note on editors!** - TypeScript has great support in [every editor](http://www.typescriptlang.org/index.html#download-links) . 
You can place breakpoints in TypeScript code and debug at runtime. 

For configuration of your favorite IDE, see the documentation for:
 
  * [Debugging in VS Code](https://github.com/Microsoft/vscode-recipes/tree/master/nodemon)
  * [Debugging in IntelliJ](https://www.jetbrains.com/help/idea/run-debug-configuration-node-js-remote-debug.html)

# Feature Highlights

* File Structure
  * The project file structure is defined as below:
	* src/dao for Data Access Objects
	* src/model for Database Object Model Representations
	* src/routes/api for API Routes
	* src/services for Services
	
* Express-JWT
   * Token Based Authorization

* Inversify
   * Annotation Based Configuration
   * Inversion of Control

* Mongoose
	* Object Relational Mapping (ORM) Layer
	* Model Validation
	* Data Access Object (DAO) Layer
	* Create Read Update Delete (CRUD) Operations Abstracted via Super Class
  
* Nodemon
  * Hot Reloading
	
* Docker
  * Containerization
  * Docker Compose used to attach MongoDB Image to application

* Travis CI
  * Continuous Integration
  * Has an extra .gitlab-ci.yml file for Gitlab users!
