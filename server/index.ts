import express from 'express';
import cors from 'cors';
import path from 'path';
import kladrApi from 'kladrapi-for-node';

import contracts from '../server/mocks/contracts.json';
import contract from '../server/mocks/contract.json';

const app = express();
const SERVER_PORT = 8888;

// для бесплатной версии
const Kladr = new kladrApi();

app.use(cors({
    origin: true,
}));

app.use(express.json());

app.use(express.static(path.resolve('static')));

app.post('/api/suggest/adress', (req, res) => {
    Kladr.getData({ query: req.body.value, oneString: 1, contentType: 'building', limit: 5, withParent: 1 }, (err, result) => {
        res.json(result);
    });
});

app.get('/api/contracts', (req, res) => {
    res.json(contracts);
});

app.get('/api/contract/:id', (req, res) => {
    res.json(contract);
});

app.use('/api/*', (req, res) => {
    res.sendStatus(404);
});

app.get('*', (req, res) => {
    res.sendFile(path.resolve('static/index.html'));
})

app.listen(SERVER_PORT, function () {
    console.log(`Server started on ${SERVER_PORT} port!`);
});
