import express from 'express';
import cors from 'cors';
import path from 'path';
import './libs/connect';

var bodyParser = require('body-parser')
require('dotenv').config()

import { apiRouter } from './api-router';

const app = express();
const SERVER_PORT = 8888;

app
    .disable('x-powered-by')
    .enable('trust proxy')
    .use(cors({
        origin: '*',
    }));

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.resolve('static')));

apiRouter(app);

app.get('*', (req, res) => {
    res.sendFile(path.resolve('static/index.html'));
})

app.listen(SERVER_PORT, function () {
    console.log(`Server started: http://127.0.0.1:${SERVER_PORT}`);
});
