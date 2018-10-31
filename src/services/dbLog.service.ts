import {injectable, inject} from "inversify";
import "reflect-metadata";
import {Connection} from "./connection";
import DbLog from '../model/dbLog';
import ErrorDetailLog from '../model/errorDetailLog';

export interface IDbLogService {
}

@injectable()
export class DbLogService implements IDbLogService {

    @inject("connection")
    private connection: Connection;

    static log(request, response) {

        let logModel = new DbLog({
            dateTime : new Date(),
            user : request.body.email,
            message: request.body.message
        });

        logModel.save();
        response.end();
    }

    public logErrorDetail(request, response) {

        let logModel = new ErrorDetailLog({
            user : request.body.user,
            time : request.body.time,
            location: request.body.location,
            url: request.body.url,
            status: request.body.status,
            message: request.body.message,
            stack: request.body.stack
        });

        logModel.save().then(() => {
            console.log("log save success");
        }).catch ( (error) => {
            console.log("log save error: " + error);
        });
        response.end();
    }

}


