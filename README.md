This is an example project for those who want to bootsrap an API using Express and MongoDB.

# Running the project

Change Directory to project root:

```
$ cd ${BASE_DIRECTORY}/express-mongodb-base
```

You can bootstrap the project right away using Docker:

```
$ docker-compose up
```

Or you can simply call Gulp:

```
$ npm install
$ npm install -g gulp-cli
$ gulp
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
  
* Gulp 4
  * Task Management
  * Hot Reloading
  * Sourcemaps used for debugging TypeScript code
	
* Docker
  * Containerization
  * Docker Compose used to attach MongoDB Image to application
