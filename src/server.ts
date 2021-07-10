import path from 'path';
import cors from 'cors';
require('dotenv').config({path: path.resolve(__dirname, '..', '.env')});
import express from 'express';
import routes from './routes';

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes)

app.listen(3333);