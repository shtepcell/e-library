import { createManager, getManagers, getOneManager, saveManager, deleteManager } from "./controllers/manager";
import { getClients, createClient, getOneClient, saveClient, deleteClient } from "./controllers/clients";
import { createDocument, getOneDocument, saveDocument, getDocuments, deleteDocument } from "./controllers/documents";
import { createContract, getContracts, getOneContract, saveContract, uploadContractDocument } from "./controllers/contracts";
import multer from 'multer';

const upload = multer();

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
    app.delete('/api/client/:id', deleteClient);

    app.get('/api/contracts', getContracts);
    app.get('/api/contract/:id', getOneContract);
    app.post('/api/contract', createContract);
    app.post('/api/contract/:id/file', upload.single('file'), uploadContractDocument);
    app.patch('/api/contract/:id', saveContract);

    app.get('/api/documents', getDocuments);
    app.post('/api/document', upload.single('file'), createDocument);
    app.put('/api/document/:id', upload.single('file'), saveDocument);
    app.get('/api/document/:id', getOneDocument);
    app.delete('/api/document/:id', deleteDocument);

    // #########################################

    app.post('/api/suggest/adress', (req, res) => {
        Kladr.getData({ query: req.body.value, oneString: 1, contentType: 'building', limit: 5, withParent: 1 }, (err, result) => {
            res.json(result);
        });
    });

    app.use('/api/*', (req, res) => {
        return res.sendStatus(404);
    });

    app.use((error, req, res, next) => {
        return res.sendStatus(500);
    });
}
