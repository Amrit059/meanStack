import * as express from 'express';
import * as bodyParser from 'body-parser';
import { Request, Response, NextFunction } from 'express';
import * as config from 'config';
import * as cors from 'cors';
import mongoConfig from './configuration/mongodb-bag2bag.config';
import { RegistrableController } from './controllers/registerable.controller';
import TYPES from './configuration/types';
import container from './configuration/container';
import 'reflect-metadata';
import LOGGER from './configuration/winston';

const app = express();
// LOGGER.info('after app express');
const HOST_CONFIG: any = config.get('appConfig.hostConfig');
// LOGGER.info('after HOST_CONFIG');
const PORT_NO = HOST_CONFIG.port;

// LOGGER.debug(`HOST_CONFIG PORT NO IS ${PORT_NO}`);

app.set('port', PORT_NO);
// LOGGER.debug(`PORT NO IS ${PORT_NO}`);
app.use(bodyParser.json());
// LOGGER.info('after bodypaser use');
app.use(bodyParser.urlencoded({ extended: true }));
// LOGGER.info('before cors use');
app.use(cors());
// LOGGER.info('after cors use');

// LOGGER.info('new server');

/* grabs the Controller from IoC container and registers all the endpoints */
// LOGGER.info('before constroller');
const controllers: RegistrableController[] = container.getAll<RegistrableController>(TYPES.Controller);
// LOGGER.info('before For each constroller');
controllers.forEach(controller => controller.register(app));
// LOGGER.info('after For each constroller and before server request');

app.get('/', (request: Request, response: Response, next: NextFunction) => {
  // LOGGER.info('Server is working perfectly');
  response.send('Server is working perfectly');
});

// LOGGER.info('before mongodb init');
mongoConfig.init();
// LOGGER.info('after mongodb init and before port listener');

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  // LOGGER.info('inside error handller');
  res.status(500).json({ error: 'Error Handler' });
});

app.listen(app.get('port'), () => {
  LOGGER.info(('App is running at http://localhost:%d in %s mode'),
    app.get('port'), app.get('env'));
  LOGGER.info('Press CTRL-C to stop\n');
});

export default app;
