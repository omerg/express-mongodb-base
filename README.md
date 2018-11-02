This is an example project for those who want to bootsrap an API using Express and MongoDB.

# Pre-reqs
To build and run this app locally you will need a few things:
- Install [Node.js](https://nodejs.org/en/)
- Install [MongoDB](https://docs.mongodb.com/manual/installation/)

# Getting started
- Clone the repository
```
git clone --depth=1 https://github.com/Microsoft/TypeScript-Node-Starter.git <project_name>
```
- Install dependencies
```
cd <project_name>
npm install
```

# Running the project

You can simply call Npm Script:

```
$ npm run debug
```

Or you can bootstrap the project right away using Docker:

```
$ docker-compose up
```

Start Using the API at http://localhost:3001/api/

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
