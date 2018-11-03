
import * as express from 'express';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';
import * as mongoose from 'mongoose';
import * as compression from 'compression';
import * as cors from "cors";
import {Config} from './config';
import {Api, IApi} from './routes/api';

import {UserRouter, IUserRouter} from './routes/api/users/user.router';
import {Container} from "inversify";
import {Connection, IConnection} from "./services/connection";
import {UserService, IUserService} from "./services/user.service";
import {IItemRouter, ItemRouter} from './routes/api/items/item.router';
import {IItemService, ItemService} from './services/item.service';
import {IShopRouter, ShopRouter} from './routes/api/shops/shop.router';
import {DbLogService, IDbLogService} from './services/dbLog.service';
import {DbLogRouter, IDbLogRouter} from './routes/api/dbLogs/dblog.router';
import {CategoryRouter, ICategoryRouter} from './routes/api/category/category.router';

// Creates and configures an ExpressJS web server.
class App {

    public container = new Container({defaultScope: "Singleton"});

    // ref to Express instance
    public app: express.Application;

    //Run configuration methods on the Express instance.
    constructor() {

        // DI injected! excellent :)
        // ====================================================================

        //services 
        this.container.bind<IConnection>("connection").to(Connection);
        this.container.bind<IUserService>("userService").to(UserService);
        this.container.bind<IItemService>("itemService").to(ItemService);
        this.container.bind<IDbLogService>("dbLogService").to(DbLogService);

        //routers
        this.container.bind<IItemRouter>("itemRouter").to(ItemRouter);
        this.container.bind<IUserRouter>("userRouter").to(UserRouter);
        this.container.bind<IShopRouter>("shopRouter").to(ShopRouter);
        this.container.bind<IDbLogRouter>("dbLogRouter").to(DbLogRouter);
        this.container.bind<ICategoryRouter>("categoryRouter").to(CategoryRouter);
        this.container.bind<IApi>("api").to(Api);

        this.app = express();
        this.middleware();
        this.routes();
    }

    // Configure Express middleware.
    private middleware(): void {

        // BASE SETUP
        // =============================================================================

        this.app.use(logger('dev'));

        // configure app to use bodyParser()
        // this will let us get the data from a POST
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended: true}));

        //options for cors midddleware
        const options:cors.CorsOptions = {
            allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "X-Access-Token"],
            credentials: true,
            methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
            origin: "*",
            preflightContinue: false
        };

        //use cors middleware
        this.app.use(cors(options));

        //serve images publicly in public/images folder
        this.app.use(express.static(__dirname + '/../public/'));

        mongoose.connect(Config.mongoUrl, {
            useMongoClient: true,
        }); // connect to our database

        process.on('unhandledRejection', (reason, p) => {
            console.log('Unhandled Rejection at:', p, 'reason:', reason);
            // application specific logging, throwing an error, or other logic here
        });

        process.on('uncaughtException', (err) => {
            console.log('Uncaught exception:', err);
        });

        //compress served files
        this.app.use(compression());


    }

    // Configure API endpoints.
    private routes(): void {

        // ROUTES FOR OUR API
        // =============================================================================

        // middleware to use for all requests
        this.app.use(function (req, res, next) {
            // do logging
            console.log('Something is happening 2.');
            next(); // make sure we go to the next routes and don't stop here
        });

        // REGISTER OUR ROUTES -------------------------------
        // all of our routes will be prefixed with /api

        //Router definition is here
        let apiRouter: IApi = this.container.get("api");
        this.app.use('/api', apiRouter.getRouter());

        // test route to make sure everything is working (accessed at GET http://localhost:3001/api)
        this.app.use('/', function (req, res) {
            res.json({message: 'hooray! welcome to our api! please append /api to access functions'});
        });


    }
}

export default new App().app;
