import express from 'express';
import cors from 'cors';
import path from 'path';

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

app.use('/static', express.static(path.join(__dirname, '../static')))
app.use('/static*', (req, res) => {
    res.sendStatus(404);
})

app.get('/api/person/:id', function (req, res) {
    res.send(some);
});


app.get('*', (req, res) => {
    res.sendFile(path.resolve('./static/index.html'));
});

app.listen(SERVER_PORT, function () {
    console.log(`Server started on ${SERVER_PORT} port!`);
});
