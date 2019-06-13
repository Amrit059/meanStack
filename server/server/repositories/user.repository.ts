import { Observable, from, of, Observer } from 'rxjs';
import 'reflect-metadata';
import LOGGER from '../configuration/winston';
import { injectable } from 'inversify';
import User, { UserDocument } from '../models/user.model';
import * as mongoose from 'mongoose';
import { ObjectId } from 'bson';

export interface UserRepository {
    getUsers(): Observable<UserDocument[]>;
    createUser(userModel: UserDocument): Observable<UserDocument>;
    getUserById(id: string): Observable<UserDocument>;
    getUserbyEmail(emailId: string): Observable<UserDocument>;
    updateUser(userModel: UserDocument): Observable<UserDocument>;
    deleteUser(id: string): Observable<null>;
}

@injectable()
export class UserRepositoryImpl implements UserRepository {

    constructor() {
        LOGGER.info('User Repository');
    }

    getUsers(): Observable<UserDocument[]> {
        LOGGER.debug('get user list');
        return from(User.find().exec());
    }

    getUserById(id: string): Observable<UserDocument> {
        LOGGER.debug(' get user by id is: ' + JSON.stringify(id));
        return from(User.findById({ _id: new mongoose.Types.ObjectId(id) }).exec());
    }

    getUserbyEmail(emailId: string): Observable<UserDocument> {
        LOGGER.debug(' get user by email id is: ' + JSON.stringify(emailId));
        return from(User.findOne({ emailId: emailId }).exec());
    }
    createUser(userModel: UserDocument): Observable<UserDocument> {
        LOGGER.debug('create user model is: ' + JSON.stringify(userModel));
        const newUserDocument: UserDocument = new User(userModel);
        return from(newUserDocument.save());
    }

    updateUser(userModel: UserDocument): Observable<UserDocument> {
        LOGGER.debug('update user model is: ' + JSON.stringify(userModel));
        const newUserDocument: UserDocument = new User(userModel);
        return Observable.create(
            (observer: Observer<any>) => {
                from(User.findById(userModel._id).exec()).subscribe(
                    (dbUser: UserDocument) => {
                        dbUser._id = newUserDocument._id;
                        dbUser.emailId = newUserDocument.emailId;
                        dbUser.password = newUserDocument.password;
                        dbUser.mNo = newUserDocument.mNo;
                        dbUser.dob = newUserDocument.dob;
                        dbUser.bio = newUserDocument.bio;
                        dbUser.gender = newUserDocument.gender;
                        dbUser.maritalStatus = newUserDocument.maritalStatus;
                        from(dbUser.save()).subscribe(
                            (result: UserDocument) => {
                                observer.next(result);
                            },
                            (error: Error) => {
                                // TODO
                            }
                        );
                    });
            }
        );
    }

    deleteUser(id: string): Observable<null> {
        LOGGER.debug('delete user by id is: ' + JSON.stringify(id));
        return from(User.deleteOne({ _id: new mongoose.Types.ObjectId(id) }).exec());
    }

}
