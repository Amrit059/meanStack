import { Request, Response, NextFunction } from 'express';
import LOGGER from '../configuration/winston';
import { UserRepository } from '../repositories/user.repository';
import { UserRepositoryImpl } from '../repositories/user.repository';
import { UserDocument } from '../models/user.model';

const userRepository: UserRepository = new UserRepositoryImpl();

export let userAccessMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    LOGGER.info('inside user access middleware');
    // console.log("user access middleware is working perfectly")
    // console.log(req.headers['authorization'])
    const _id: string = res.locals._id;
    userRepository.getUserById(_id).subscribe(
        (user: UserDocument) => {
            if (user) {
                // TODO
                if (user.roles && user.roles.indexOf('ROLE_ADMIN') > -1) {
                    next();
                    return;
                } else {
                    res.status(403).send('You are not authorized to access resource.');
                    return;
                }
            } else {
                res.status(403).send('Invalid User');
                return;
            }
        },
        (error: Error) => {
            console.log('error is ', error);
            res.status(403).send(error.message);
        }
    );
};
