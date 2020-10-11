import { createManager, getManagers, getOneManager, saveManager, deleteManager } from "./controllers/manager";
import { getClients, createClient, getOneClient, saveClient } from "./controllers/clients";
import contracts from '../server/mocks/contracts.json';
import contract from '../server/mocks/contract.json';

import kladrApi from 'kladrapi-for-node';

const Kladr = new kladrApi();

export const apiRouter = (app) => {
    app.get('/api/managers', getManagers);
    app.get('/api/manager/:id', getOneManager);
    app.post('/api/manager', createManager);
    app.patch('/api/manager/:id', saveManager);
    app.delete('/api/manager/:id', deleteManager);

    app.get('/api/clients', getClients);
    app.get('/api/client/:id', getOneClient);
    app.post('/api/client', createClient);
    app.patch('/api/client/:id', saveClient);

    // #########################################


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
        return res.sendStatus(404);
    });

    app.use((error, req, res, next) => {
        return res.sendStatus(500);
    });
}
