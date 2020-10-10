import _ from 'lodash';
import createHttpError from 'http-errors';

import { Manager } from '../models/Manager';
import { Client } from '../models/Client';
import { onValidateError, onError } from '../libs/validate';
import { getId } from './counters';

export const createClient = async (req, res)  => {
    const clientData = _.pick(req.body, [
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
    ])

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
        const managers = await Client.find().limit(25).sort({ id: -1 }).lean();

        return res.send(managers);
    } catch (error) {
        return onError(req, res)(error);
    }
}