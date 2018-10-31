import {Router} from "express";
import {IItemRouter} from './items/item.router';
import {IUserRouter} from './users/user.router';
import {inject, injectable} from "inversify";
import "reflect-metadata";
import jwt = require('express-jwt');
import jwks = require('jwks-rsa');
import {IShopRouter} from './shops/shop.router';
import {IDbLogRouter} from './dbLogs/dblog.router';
import {ICategoryRouter} from './category/category.router';


export interface IApi {
    getRouter(): Router;
}

// export const auth = jwt({
//     secret: Config.privateKey
// });

// We are going to implement a JWT middleware that will ensure the validity of our token.
// We'll require each protected route to have a valid access_token sent in the Authorization header
export const auth = jwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: "https://lucidcode.eu.auth0.com/.well-known/jwks.json"
    }),
    // This is the identifier we set when we created the API
    audience: 'https://auth.boxlin.com/api/v2/',
    issuer: "https://lucidcode.eu.auth0.com/", // e.g., you.auth0.com
    algorithms: ['RS256']
});

@injectable()
export class Api implements IApi {

    @inject("itemRouter")
    private itemRouter: IItemRouter;

    @inject("userRouter")
    private userRouter: IUserRouter;

    @inject("categoryRouter")
    private categoryRouter: ICategoryRouter;

    @inject("shopRouter")
    private shopRouter: IShopRouter;

    @inject("dbLogRouter")
    private dbLogRouter: IDbLogRouter;

    public getRouter(): Router {

        let router = Router();

        // split up route handling
        router.use('/items', this.itemRouter.getRouter());
        router.use('/shops', this.shopRouter.getRouter());
        router.use('/users', this.userRouter.getRouter());
        router.use('/categories', this.categoryRouter.getRouter());
        router.use('/logs', this.dbLogRouter.getRouter());


        // error handlers
        // Catch unauthorised errors
        router.use((err: any, req, res: any) => {
            if (err.name === 'UnauthorizedError') {
                res.status(401);
                res.json({"message": err.name + ": " + err.message});
            }
        });

        return router;

    }


}