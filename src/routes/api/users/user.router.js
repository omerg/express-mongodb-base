"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var dataList = require('../model/customer/customer.json');
var UserRouter = (function () {
    /**
     * Initialize the userRouter
     */
    function UserRouter() {
        this.router = express_1.Router();
        this.init();
    }
    /**
     * GET all users.
     */
    UserRouter.prototype.getAll = function (req, res) {
        res.send(dataList);
    };
    /**
     * GET one data by id
     */
    UserRouter.prototype.getOne = function (req, res) {
        var query = parseInt(req.params.id);
        var data = dataList.find(function (data) { return data.id === query; });
        if (data) {
            res.status(200)
                .send({
                message: 'Success',
                status: res.status,
                data: data
            });
        }
        else {
            res.status(404)
                .send({
                message: 'No data found with the given id.',
                status: res.status
            });
        }
    };
    /**
     * Take each handler, and attach to one of the Express.Router's
     * endpoints.
     */
    UserRouter.prototype.init = function () {
        this.router.get('/', this.getAll);
        this.router.get('/:id', this.getOne);
    };
    return UserRouter;
}());
exports.UserRouter = UserRouter;
// Create the UserRouter, and export its configured Express.Router
var userRoutes = new UserRouter();
userRoutes.init();
exports.default = userRoutes.router;
