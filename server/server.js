import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import mJson from 'morgan-json';
import winston from 'winston';
import routes from './routes';
import { SERVER } from './configs/configs';
import middleware from './configs/middlewares/';

const server = express();
const router = express.Router();
const format = mJson(':method :url :status :res[content-length] bytes :response-time ms');

server.set('views', path.join(__dirname, 'views'));
server.set('view engine', 'pug');

server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());
server.use(bodyParser.json({ limit: '100mb' }));
server.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));
server.use([middleware.verifyAuthentication, middleware.verifyRouteAndMethod]);
server.use(morgan(format));

routes(router);
server.use('/api', router);
server.listen(SERVER.PORT, () => winston.info(`Hermes is Awakened ON PORT ${SERVER.PORT}`));

export default server;
