
import {inject, injectable} from 'inversify';
import ItemDAO from '../../../dao/itemDao';
import {IItemService} from '../../../services/item.service';
import {auth} from '../index';
import {Router, Request, Response} from 'express';

export interface IItemRouter {
    getRouter(): Router;
}

@injectable()
export class ItemRouter implements IItemRouter{

    @inject("itemService")
    private itemService: IItemService;

    public getRouter(): Router {

        let router = Router();
        let itemDAO = new ItemDAO();

        // Dao Routes
        router.route('/').get(auth, itemDAO.getAll);
        router.route('/count').get(auth, itemDAO.count);
        router.route('/item').post(auth, itemDAO.insert);
        router.route('/item/:id').get(auth, itemDAO.get);
        router.route('/item/:id').put(auth, itemDAO.update);

        //Service Routes

        router.route('/findByShop').get(auth, this.itemService.findByShop);
        router.route('/findByShopAndCategory').get(auth, this.itemService.findByShopAndCategory);
        router.route('/findByCategory').get(this.itemService.findByCategory);
        router.route('/findPublic').get(this.itemService.findPublic);

        router.delete('/item/:id', (request: Request, response: Response) => {
            itemDAO.delete(request, response);
        });
        return router;
    }
}
