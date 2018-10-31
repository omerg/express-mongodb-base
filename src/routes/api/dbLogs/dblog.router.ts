import {Router} from 'express';
import {inject, injectable} from 'inversify';
import {DbLogService} from '../../../services/dbLog.service';

export interface IDbLogRouter {
    getRouter(): Router;
}

@injectable()
export class DbLogRouter implements IDbLogRouter{

    @inject("dbLogService")
    private dbLogService: DbLogService;

    public getRouter(): Router {

        let router = Router();

        router.post('/log', DbLogService.log);
        router.post('/logErrorDetail', this.dbLogService.logErrorDetail);

        return router;
    }
}
