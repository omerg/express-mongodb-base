import {injectable, inject} from "inversify";
import "reflect-metadata";
import {Connection} from "./connection";
import ItemDAO from '../dao/itemDao';
import {Request, Response} from 'express';

export interface IItemService {

    findByShop (request: Request, response: Response);

    findByShopAndCategory (request: Request, response: Response);

    findByCategory (request: Request, response: Response);

    findPublic (request: Request, response: Response);
}

@injectable()
export class ItemService implements IItemService {

    @inject("connection")
    private connection: Connection;

    public findByShop = (request, response) => {

        console.log("findByShop Service Called");

        let itemDAO = new ItemDAO();
        itemDAO.model.find({
            $or: [
                {shopId: request.query.shopId},
                {isPublic: true}
            ]
        }, (error: Error, obj) => {
            if (error) {
                return console.error(error);
            }
            response.json(obj);
        });
    };

    public findPublic = (request, response) => {

        console.log("findPublic Service Called");

        let itemDAO = new ItemDAO();
        itemDAO.model.find({
                isPublic: true
        }, (error: Error, obj) => {
            if (error) {
                return console.error(error);
            }
            response.json(obj);
        });
    };

    public findByShopAndCategory = (request, response) => {

        console.log("findByShopAndCategory Service Called");

        let itemDAO = new ItemDAO();

        //build query object
        let criteria = {
            $and: [{
                $or: [
                    {shopId: request.query.shopId},
                    {isPublic: true}
                ]
            }, {
                categoryId: request.query.categoryId
            }
            ]
        };

        if (request.query.categoryId == "all") {
            criteria.$and.pop();
        }

        itemDAO.model.find(criteria, (error: Error, obj) => {
            if (error) {
                return console.error(error);
            }
            response.json(obj);
        });
    };

    public findByCategory = (request, response) => {

        console.log("findByCategory Service Called");

        let itemDAO = new ItemDAO();

        //build query object
        let criteria = {
            $and: [
                {isPublic: true},
                {categoryId: request.query.categoryId}
            ]
        };

        if (request.query.categoryId == "all") {
            criteria.$and.pop();
        }

        itemDAO.model.find(criteria, (error: Error, obj) => {
            if (error) {
                return console.error(error);
            }
            response.json(obj);
        });
    }
}


