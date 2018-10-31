import {Router} from 'express';
import {inject, injectable} from 'inversify';

import {UserService} from '../../../services/user.service';
import {auth} from '../index';
import UserDAO from '../../../dao/userDao';

export interface IUserRouter {
    getRouter(): Router;
}

@injectable()
export class UserRouter implements IUserRouter {

    @inject("userService")
    private userService: UserService;

    private userDAO = new UserDAO();

    public getRouter(): Router {

        let router = Router();

        // Users
        router.route('/').get(auth, this.userDAO.getAll);
        router.route('/login').post(this.userService.logIn);
        router.route('/logout').post(this.userService.logOut);
        router.route('/signup').post(this.userService.signUp);
        router.route('/profile').post(auth, this.userService.updateProfile);
        router.route('/password').post(auth, this.userService.updatePassword);
        router.route('/delete').post(auth, this.userService.deleteAccount);
        router.route('/user/:id').get(auth, this.userDAO.get);
        router.route('/find').post(auth, this.userService.find);
        router.route('/createSocialLoginUser').post(auth, this.userService.createSocialLoginUser);
        router.route('/update/:id').put(auth, this.userDAO.update);

        return router;
    }
}