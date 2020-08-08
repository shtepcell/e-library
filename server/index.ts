import express from 'express';
import cors from 'cors';
import path from 'path';

import contracts from '../server/mocks/contracts.json';
import contract from '../server/mocks/contract.json';

const app = express();
const SERVER_PORT = 8888;

app.use(cors({
    origin: true,
}));

app.use(express.static(path.resolve('static')));

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
