import express from 'express';
import employee from './routers/manager';
import bodyParser from 'body-parser';
import swaggerdocs from './swagger.json';
import swaggerui from 'swagger-ui-express';
import './db/manager';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use('/api-docs', swaggerui.serve, swaggerui.setup(swaggerdocs));
app.use('/api/v1', employee);
const port = process.env.PORT || 3000;
app.listen(port);

console.log('app running on port', port);

export default app;