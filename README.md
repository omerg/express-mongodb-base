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

* Inversify
	* Annotation Based Configuration
	* Inversion of Control

* Mongoose
	* ORM Mapping
	* Model Validation
  
* Gulp 4
  * Task Management
  * Sourcemap management for debugging
  * Hot Reloading
	
* NPM
	* Dependency Management
	* Single line of command to clean, test, build and deploy	

* MongoDB
  * No SQL Database Management
	
* Docker
  * Containerization
