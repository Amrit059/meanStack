import { Observable } from 'rxjs/internal/Observable';
import 'reflect-metadata';
import { UserDocument } from '../models/user.model';
import TYPES from '../configuration/types';
import { inject, injectable } from 'inversify';
import { UserRepository } from '../repositories/user.repository';
import { of, Observer } from 'rxjs';
import { switchMap, map, flatMap } from 'rxjs/operators';
import { ROLES } from '../constants/constants';

export interface UserService {
    getUsers(): Observable<UserDocument[]>;
    createUser(userModel: UserDocument): Observable<UserDocument>;
    getUserById(id: string): Observable<UserDocument>;
    updateUser(userModel: UserDocument): Observable<UserDocument>;
    deleteUser(id: string): Observable<null>;
    getUserbyEmail(emailId: string): Observable<UserDocument>;
    login(userModel: UserDocument): Observable<UserDocument>;
}
@injectable()

export class UserServiceImpl implements UserService {

    @inject(TYPES.UserRepository)
    private userRepository: UserRepository;

    constructor() {
        console.log('user service');
    }


    getUsers(): Observable<UserDocument[]> {
        return this.userRepository.getUsers();
    }

    getUserById(id: string): Observable<UserDocument> {
        return this.userRepository.getUserById(id);
    }

    updateUser(userModel: UserDocument): Observable<UserDocument> {
        return this.userRepository.updateUser(userModel);
    }

    deleteUser(id: string): Observable<null> {
        return this.userRepository.deleteUser(id);
    }

    getUserbyEmail(emailId: string): Observable<UserDocument> {
        return this.userRepository.getUserbyEmail(emailId);
    
    }

    login(userModel: UserDocument): Observable<UserDocument> {
        console.log('inside login');
        if (userModel.emailId) {
            console.log('inside if');
            return this.getUserbyEmail(userModel.emailId).pipe(
                switchMap((result: UserDocument) => {
                    console.log('inside switchmap');
                    if (result) {
                        return of(result);
                    } else {
                        userModel.roles = [ROLES.admin]; 
                        return this.userRepository.createUser(userModel);
                    }
                })
            );
        } else {
            console.log('invalid user');
        }
    }

    createUser(userModel: UserDocument): Observable<UserDocument> {
        return Observable.create(
            (observer: Observer<UserDocument>) => {
                userModel.roles = ['ROLE_USER'];
                this.userRepository.createUser(userModel).subscribe(
                    (newUser: UserDocument) => {
                        observer.next(newUser);
                        return;
                    },
                    (error: Error) => {
                        // TODO
                    });
            });
    }
}
