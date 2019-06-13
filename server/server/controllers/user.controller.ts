import { Request, Response, NextFunction } from 'express';
import { injectable, inject } from 'inversify';
import { RegistrableController } from './registerable.controller';
import 'reflect-metadata';
import TYPES from '../configuration/types';
import LOGGER from '../configuration/winston';
import * as express from 'express';
import { ROUTE_CONSTANTS } from '../constants/route.constants';
import { UserDocument } from '../models/user.model';
import { UserService } from '../services/user.service';

@injectable()
export class UserController implements RegistrableController {

    private userService: UserService;

    constructor(@inject(TYPES.UserService) userService: UserService) {
        this.userService = userService;
    }


    register(app: express.Application): void {
        LOGGER.info('Inside registered !');

        app.get(`${ROUTE_CONSTANTS.REST_API_ROUTE}users`,
            this.getUsers.bind(this));
        app.get(`${ROUTE_CONSTANTS.REST_API_ROUTE}user/:id`,
            this.getUserById.bind(this));
        app.post(`${ROUTE_CONSTANTS.REST_API_ROUTE}user`,
            this.createUser.bind(this));
        app.post(`${ROUTE_CONSTANTS.REST_API_ROUTE}login`,
            this.userLogin.bind(this));
        app.put(`${ROUTE_CONSTANTS.REST_API_ROUTE}user/:id`,
            this.updateUser.bind(this));
        app.delete(`${ROUTE_CONSTANTS.REST_API_ROUTE}user/:id`,
            this.deleteUser.bind(this));
    }


    public createUser(req: Request, res: Response, next: NextFunction): void {
        const userDocument: UserDocument = req.body;
        LOGGER.debug('user information' + JSON.stringify(req.body));
        this.userService.createUser(userDocument).subscribe(
            (userModel: UserDocument) => {
                res.send({ userModel: userModel }).status(200);
            },
            (error: any) => {
                LOGGER.error(error);
                res.status(500).send({ message: error });
            });

    }

    public updateUser(req: Request, res: Response, next: NextFunction): void {
        const userDocument: UserDocument = req.body;
        LOGGER.debug('user information' + JSON.stringify(req.body));
        this.userService.updateUser(userDocument).subscribe(
            (userModel: UserDocument) => {
                res.send({ userModel: userModel }).status(200);
            },
            (error: any) => {
                LOGGER.error(error);
                res.status(500).send({ message: error });
            });

    }

    public getUsers(req: Request, res: Response, next: NextFunction): void {
        LOGGER.info('Inside get Users!');
        this.userService.getUsers().subscribe(
            (userModel: UserDocument[]) => {
                res.send(userModel);
            },
            (error: any) => {
                LOGGER.error(error);
                res.status(500).send({ message: error });
            });
    }

    public getUserById(req: Request, res: Response, next: NextFunction): void {
        LOGGER.info('Inside get User by id!');
        const id: string = req.params.id;
        this.userService.getUserById(id).subscribe(
            (userModel: UserDocument) => {
                res.send(userModel);
            },
            (error: any) => {
                LOGGER.error(error);
                res.status(500).send({ message: error });
            });
    }

    public deleteUser(req: Request, res: Response, next: NextFunction): void {
        LOGGER.info('Inside get User by id!');
        const id: string = req.params.id;
        this.userService.deleteUser(id).subscribe(
            (userModel: any) => {
                res.send(userModel);
            },
            (error: any) => {
                LOGGER.error(error);
                res.status(500).send({ message: error });
            });
    }

    userLogin(req: Request, res: Response, next: NextFunction) {
        LOGGER.info('Inside login!');
        const userDocument: UserDocument = req.body;
        this.userService.login(userDocument).subscribe(
            (userModel: UserDocument) => {
                LOGGER.debug('userModel is ');
                LOGGER.debug(userModel);
                res.send(userModel);
            },
            (error: any) => {
                console.log('error is ', error);
                LOGGER.error(error);
                res.status(500).send({ message: error });
            });
    }

}

