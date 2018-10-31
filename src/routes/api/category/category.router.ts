import {Router} from 'express';
import {injectable} from 'inversify';
import {auth} from '../index';
import CategoryDao from '../../../dao/categoryDao';

export interface ICategoryRouter {
    getRouter(): Router;
}

@injectable()
export class CategoryRouter implements ICategoryRouter {

    public getRouter(): Router {

        let router = Router();
        let categoryDao = new CategoryDao();

        router.route('/').get(categoryDao.getAll);
        router.route('/count').get(auth, categoryDao.count);
        router.route('/category').post(auth, categoryDao.insert);
        router.route('/category/:id').get(categoryDao.get);
        router.route('/category/:id').put(auth, categoryDao.update);
        router.route('/category/:id').delete(auth, categoryDao.delete);

        return router;
    }
}
