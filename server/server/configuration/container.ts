import 'reflect-metadata';
import TYPES from './types';
import { Container } from 'inversify';
import { RegistrableController } from '../controllers/registerable.controller';
import { UserServiceImpl, UserService } from '../services/user.service';
import { UserRepository, UserRepositoryImpl } from '../repositories/user.repository';
import { UserController } from '../controllers/user.controller';

/* container contain all services,repository and http */
const container = new Container();

container.bind<RegistrableController>(TYPES.Controller).to(UserController);
container.bind<UserService>(TYPES.UserService).to(UserServiceImpl);
container.bind<UserRepository>(TYPES.UserRepository).to(UserRepositoryImpl);


export default container;
