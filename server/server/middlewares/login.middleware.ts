import { Request, Response, NextFunction } from 'express';
import LOGGER from '../configuration/winston';
import * as config from 'config';
import { from } from 'rxjs/internal/observable/from';
import { UserDocument } from '../models/user.model';
const serviceAccount: any = require('../../config/bag2bag-in-firebase-adminsdk-q59fq-382c90b173.json');

const FireBaseConfig: any = config.get('appConfig.firebaseConfig');

// console.log('before admin');
// const firebaseApp: admin.app.App = admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount),
//     databaseURL: FireBaseConfig.dburl
// });

// console.log('after admin');
// console.log(firebaseApp);

export let loginMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    // LOGGER.info('inside login middleware');
    // // console.log('auth middleware is working perfectly')
    // console.log(req.headers['x-access-token']);
    // const authToken: any = req.headers['x-access-token'];
    // if (!authToken) {
    //     // TODO
    //     res.status(403).send('Please login!');
    //     return;
    // }

    // const user: UserDocument = req.body;

    // console.log('user is ', JSON.stringify(user));

    // from(admin.auth().verifyIdToken(authToken)).subscribe(
    //     (decodeToken: admin.auth.DecodedIdToken) => {
    //         const _id: string = decodeToken.token;
    //         res.locals._id = _id;
    //         if (res.locals._id) {
    //             res.locals.emailId = decodeToken['email'];
    //             if (decodeToken['email'] === user.emailId) {
    //                 next();
    //                 return;
    //             } else {
    //                 res.status(403).send('Emailid is invalid');
    //             }
    //         } else {
    //             res.status(403).send('Invalid User');
    //         }
    //         console.log('decodeToken is ', JSON.stringify(decodeToken));
    //         // next();
    //     },
    //     (error: Error) => {
    //         console.log('error is ', error);
    //         res.status(403).send(error.message);
    //     }
    // );
};

