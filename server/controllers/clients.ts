import _ from 'lodash';
import createHttpError from 'http-errors';

import { Manager } from '../models/Manager';
import { Client } from '../models/Client';
import { onValidateError, onError } from '../libs/validate';
import { getId } from './counters';

const clientFields =  [
    'externalId',
    'name',
    'inn',
    'department',
    'personalManager',
    'regDate',
    'deliveryMethod',
    'address',
    'description',
    'contactFirstName',
    'contactMiddleName',
    'contactLastName',
    'contactPosition',
    'contactEmail',
    'contactPhone',
];

export const createClient = async (req, res)  => {
    const clientData = _.pick(req.body, clientFields);

    if (clientData.personalManager) {
        const [lastName, firstName, middleName] = clientData.personalManager.split(' ');

        clientData.personalManager = await Manager.findOne({lastName, firstName, middleName});
    }

    const client = new Client(clientData);

    const validateError = client.validateSync();

    if (validateError) {
        console.log(validateError);
        return onValidateError(req, res)(validateError);
    }

    const duplicate = await Client.findOne({ externalId: clientData.externalId });

    if (duplicate) {
        return onError(req, res)(createHttpError(422, { message: 'Found duplicate external id' }))
    }

    client.id = await getId('client');

    try {
        await client.save();
        console.log('Client created #%s', client.id);
    } catch(err) {
        return onError(req, res)(createHttpError(500, { message: 'MongoDB Error: Client create', ...err }, ));
    }

    return res.sendStatus(200);
}

export const getClients = async (req, res)  => {
    try {
        const { search, page } = req.query;
        const regex = { $regex: search, $options: 'i' };
        const limit = Number(req.query.limit) || 25;
        const sQ = search ? { $or:[ { 'name': regex }, { 'inn': regex }, { 'address': regex } ] } : {};

        const total = await Client.find(sQ).count();
        const clients = await Client.find(sQ).skip((page * limit) - limit).limit(Number(limit) || 25).sort({ id: -1 }).lean();

        return res.send({ items: clients, total });
    } catch (error) {
        return onError(req, res)(error);
    }
}

export const getOneClient = async (req, res)  => {
    try {
        const client = await Client.findOne({ id: req.params.id }).populate('personalManager').lean();

        if (client.personalManager) {
            // @ts-ignore
            client.personalManager = `${client.personalManager.lastName} ${client.personalManager.firstName} ${client.personalManager.middleName}`;
        }

        return res.send(client);
    } catch (error) {
        return onError(req, res)(error);
    }
}

export const saveClient = async (req, res)  => {
    try {
        const clientData = _.pick(req.body, clientFields);
        const client = await Client.findOne({ id: Number(req.params.id) });

        Object.keys(clientData).forEach(key => {
            client[key] = clientData[key];
        })

        if (clientData.personalManager) {
            const [lastName, firstName, middleName] = clientData.personalManager.split(' ');
            client.personalManager = await Manager.findOne({lastName, firstName, middleName});
        }

        const validateError = client.validateSync();

        if (validateError) {
            return onValidateError(req, res)(validateError);
        }

        try {
            await client.save();
            console.log('Client saving #%s', client.id);
        } catch(err) {
            console.log(err);
            return onError(req, res)(createHttpError(500, { message: 'MongoDB Error: Client create', ...err }, ));
        }

        return res.status(200).send(client);
    } catch (error) {
        return onError(req, res)(error);
    }
}
