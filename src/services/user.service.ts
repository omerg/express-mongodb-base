import {injectable} from "inversify";
import "reflect-metadata";
import {Request, Response} from 'express';
import {Config} from '../config';
import User from '../model/user';
import Shop from '../model/shop';

const Jwt = require('jsonwebtoken');

export interface IUserService {

    find(req: Request, res: Response)

    logIn(req: Request, res: Response);

    logOut(req: Request, res: Response);

    signUp(req: Request, res: Response);

    createSocialLoginUser(req: Request, res: Response);

    updateProfile(req: Request, res: Response);

    updatePassword(req: Request, res: Response);

    deleteAccount(req: Request, res: Response);

    reset(req: Request, res: Response);

    isAuthenticated(req: Request, res: Response, callback: any);
}

@injectable()
export class UserService implements IUserService {

    /**
     * GET /
     * Sign in using email and password.
     */
    public find(request: Request, response: Response) {

        // fetch user and test password verification
        User.findOne({email: request.body.email}, function (err, user: any) {
            if (err) {
                response.status(404).send({
                    error: 'System Error: ' + err,
                    status: response.status,
                    err
                });
                return;
            }

            if (user == null) {
                response.status(200).send({
                    error: 'User Not Found.',
                    status: response.status,
                    user: null
                });
                return;
            }

            else {
                response.status(200).send({
                    error: 'User Found.',
                    status: response.status,
                    user: user
                });
            }
        });
    };

    public createSocialLoginUser(request: Request, response: Response) {

        class OpenID {
            name: string;
            email: string;
            picture: string;
        }

        // fetch user and test password verification
        let openID: OpenID = request.body;

        User.findOne({email: openID.email}, function (err, existingUser: any) {
            if (err) {
                response.status(404).send({
                    error: 'System Error: ' + err,
                    status: response.status,
                    err
                });
                return;
            }

            if (existingUser != null) {
                response.status(404).send({
                    error: 'Existing User.',
                    status: response.status,
                    err
                });
                return;
            }

            // ****************************
            // Create User and Shop
            // ****************************

            let shop = new Shop({
                name : "My Shop"
            });
            shop.save();


            //create user
            let user = new User({
                username: openID.name,
                email: openID.email,
                shopId: shop._id
            });
            user.save();

            response.status(200).send(user);
        });
    };

    /**
     * POST /login
     * Sign in using email and password.
     */
    public logIn(request: Request, response: Response) {

        // fetch user and test password verification
        User.findOne({email: request.body.email}, function (err, user: any) {
            if (err) {
                response.status(404).send({
                    authorized: false,
                    error: 'System Error: ' + err,
                    status: response.status,
                    err
                });
                return;
            }

            if (user == null) {
                response.status(404).send({
                    authorized: false,
                    error: 'User Not Found.',
                    status: response.status,
                    err
                });
                return;
            }

            // test a matching password
            user.comparePassword(request.body.password, function (err, data) {

                if (err) {
                    response.status(404).send({
                        authorized: false,
                        message: 'Unknown Error.',
                        status: response.status,
                        err
                    });
                }
                else if (data) {
                    let token = Jwt.sign(user, Config.privateKey, {
                        expiresInMinutes: Config.tokenExpiry
                    });

                    response.status(200).send({
                        authorized: true,
                        message: 'Log In Successfull.',
                        status: response.status,
                        token
                    });
                } else {
                    response.status(404).send({
                        authorized: false,
                        error: 'Incorrect Password.',
                        status: response.status,
                        err
                    });
                }
            });
        });
    };

    /**
     * GET /logout
     * Log out.
     */
    public logOut(request: Request, response: Response) {
        response.status(200).send({
            authorized: true,
            message: 'Log Out Successfull.',
            status: response.status
        });
    };

    /**
     * POST /signup
     * Create a new local account.
     */
    public signUp(request: Request, response: Response) {

        // fetch user and test password verification
        User.findOne({email: request.body.email}, function (err, existingUser: any) {
            if (err) {
                response.status(404).send({
                    authorized: false,
                    error: 'System Error: ' + err,
                    status: response.status,
                    err
                });
                return;
            }

            if (existingUser != null) {
                response.status(404).send({
                    authorized: false,
                    error: 'Existing User Name.',
                    status: response.status,
                    err
                });
                return;
            }

            // ****************************
            // Create User and Shop
            // ****************************

            let shop = new Shop({
                name : "My Shop"
            });
            shop.save();


            //create user
            let user = new User({
                username: request.body.username,
                email: request.body.email,
                phone: request.body.phone,
                password: request.body.password,
                shopId: shop._id
            });
            user.save();

            //login user
            let token = Jwt.sign(user, Config.privateKey, {
                expiresInMinutes: Config.tokenExpiry
            });
            response.status(200).send({
                authorized: true,
                message: 'Sign Up Successfull.',
                status: response.status,
                token
            });
        });
    };

    /**
     * POST /profile
     * Update profile information.
     */
    public updateProfile(req: Request, res: Response) {
        //TODO
    };

    /**
     * POST /password
     * Update current password.
     */
    public updatePassword(req: Request, res: Response) {
        //TODO
    };

    /**
     * POST /delete
     * Delete user account.
     */
    public deleteAccount(req: Request, res: Response) {
        //TODO
    };

    /**
     * POST /reset/:username
     * Process the reset password request.
     */
    public reset(req: Request, res: Response) {
        //TODO
    };


    /**
     * POST /forgot
     * Create a random token, then the send user an email with a reset link.
     */
    //public forget(req: Request, res: Response) {
        //TODO
    //}


    public isAuthenticated(request: Request, response: Response, callback) {

        // fetch user and test password verification
        User.findOne({username: request.body.email}, function (err, user: any) {
            if (err) {
                callback(err, false);
                return;
            }

            if (user == null) {
                callback(null, false);
                return;
            }

            // test a matching password
            user.comparePassword(request.body.password, function (err, isMatch) {
                if (isMatch) {
                    callback(null, isMatch);
                } else {
                    callback(err, null);
                }
            });
        });
    }
}


