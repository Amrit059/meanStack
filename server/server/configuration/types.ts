import 'reflect-metadata';
/* types services,repository and http */
const TYPES = {
    UserService: Symbol('UserService'),
    UserRepository: Symbol('UserRepository'),
    Controller: Symbol('Controller')
};

export default TYPES;
