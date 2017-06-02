import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import mJson from 'morgan-json';
import winston from 'winston';
// import swaggerJSDoc from 'swagger-jsdoc';
import routes from './routes';
// import swagger from './routes/swagger';
import { SERVER } from './configs';
import middleware from './middlewares/';

const app = express();
const router = express.Router();
const format = mJson(':method :url :status :res[content-length] bytes :response-time ms');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));
app.use([middleware.verifyAuthentication, middleware.verifyRouteAndMethod]);
app.use(morgan(format));

// const swaggerDefinition = {
//   info: {
//     title: 'Hermes Document Management System API',
//     version: '1.0.0',
//     description: 'API documentation for to create, manage and edit documents',
//   },
//   host: 'http://localhost:9090',
//   basePath: '/'
// };

// // options for the swagger docs
// const options = {
//   // import swaggerDefinitions
//   swaggerDefinition,
//   // path to the API docs
//   apis: [
//     './server/routes/documents.routes.js',
//     './server/routes/users.routes.js',
//     './server/routes/search.routes.js',
//     './server/routes/role.routes.js'
//   ],
// };

// // initialize swagger-jsdoc
// const swaggerSpec = swaggerJSDoc(options);
// app.get('/swagger.json', (req, res) => {
//   res.setHeader('Content-Type', 'application/json');
//   res.send(swaggerSpec);
// });

routes(router);
// swagger(router);

app.use('/api', router);
// app.get('/api-docs', (req, res) => {
//   res.sendFile(path.join(__dirname, '../../api-docs/index.html'));
// });

app.listen(SERVER.PORT, () =>
  winston.info(`Hermes is Awakened ON PORT ${SERVER.PORT}`));

export default app;
