import _ from 'lodash';

import { onValidateError, onError } from '../libs/validate';
import { Manager } from '../models/Manager';
import { getId } from './counters';

export const createManager = async (req, res)  => {
    const { firstName, middleName, lastName, category } = req.body || {};

    const manager = new Manager({ firstName, middleName, lastName, category });

    const validateError = manager.validateSync();

    if (validateError) {
        return onValidateError(req, res)(validateError);
    }

    manager.id = await getId('manager');

    await manager.save();

    return res.sendStatus(200);
}

export const getManagers = async (req, res)  => {
    const query = _.pick(req.query, ['firstName', 'middleName', 'lastName', 'category']);

    try {
        const managers = await Manager.find(query).limit(100).sort({ id: -1 }).lean();

        return res.send(managers);
    } catch (error) {
        return onError(req, res)(error);
    }
}