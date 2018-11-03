import {Router} from "express";
import {IItemRouter} from './items/item.router';
import {IUserRouter} from './users/user.router';
import {inject, injectable} from "inversify";
import "reflect-metadata";
import jwt = require('express-jwt');
import {IShopRouter} from './shops/shop.router';
import {IDbLogRouter} from './dbLogs/dblog.router';
import {ICategoryRouter} from './category/category.router';
import {Config} from '../../config';


export interface IApi {
    getRouter(): Router;
}

export const auth = jwt({
    secret: Config.privateKey,
    algorithms: ['HS256']
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

        router.use('/', (msg: any, res: any, next) => {
            res.send({
                message: 'I am a server route and can also be hot reloaded!'
            });
            next();
        });

        // error handlers
        // Catch unauthorised errors
        router.use((err: any, req, res: any, next) => {
            if (err.name === 'UnauthorizedError') {
                res.status(401);
                res.json({"message": err.name + ": " + err.message});
            }
            next();
        });

        return router;

    }

}