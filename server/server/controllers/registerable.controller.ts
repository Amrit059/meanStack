import * as express from 'express';
import "reflect-metadata";

export interface RegistrableController {
    register(app: express.Application): void;
}