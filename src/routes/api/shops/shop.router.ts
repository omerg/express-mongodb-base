import {Router} from 'express';
import {injectable} from 'inversify';
import ShopDAO from '../../../dao/shopDao';
import {auth} from '../index';

export interface IShopRouter {
    getRouter(): Router;
}

@injectable()
export class ShopRouter implements IShopRouter{

    public getRouter(): Router {

        let router = Router();
        let shopDAO = new ShopDAO();

        // Cats
        router.route('/').get(auth, shopDAO.getAll);
        router.route('/count').get(auth, shopDAO.count);
        router.route('/shop').post(auth, shopDAO.insert);
        router.route('/shop/:id').get(auth, shopDAO.get);
        router.route('/shop/:id').put(auth, shopDAO.update);
        router.route('/shop/:id').delete(auth, shopDAO.delete);

        return router;
    }
}
