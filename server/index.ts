import express from 'express';
import cors from 'cors';

import { IPerson } from '../types/models/IPerson';

const app = express();
const SERVER_PORT = 8888;

app.use(cors({
    origin: true,
}));

const some: IPerson = {
    age: 20,
    name: 'Vasya'
};

app.get('/api/person/:id', function (req, res) {
    res.send(some);
});

app.listen(SERVER_PORT, function () {
    console.log(`Server started on ${SERVER_PORT} port!`);
});
