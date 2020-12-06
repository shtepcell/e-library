import _ from 'lodash';
import createHttpError from 'http-errors';

import { onValidateError, onError } from '../libs/validate';
import { Manager } from '../models/Manager';
import { Client } from '../models/Client';
import { Contract } from '../models/Contract';
import { getId } from './counters';

export const createManager = async (req, res)  => {
    const { firstName, middleName, lastName } = req.body || {};

    const manager = new Manager({ firstName, middleName, lastName });

    const validateError = manager.validateSync();

    if (validateError) {
        return onValidateError(req, res)(validateError);
    }

    manager.id = await getId('manager');

    await manager.save();

    return res.status(200).send(_.pick(manager, ['id', 'firstName', 'middleName', 'lastName' ]));
}

export const saveManager = async (req, res)  => {
    const id = req.params.id;
    const { firstName, middleName, lastName } = req.body || {};

    const manager = await Manager.findOne({ id });

    manager.firstName = firstName;
    manager.middleName = middleName;
    manager.lastName = lastName;

    const validateError = manager.validateSync();

    if (validateError) {
        return onValidateError(req, res)(validateError);
    }

    await manager.save();

    return res.sendStatus(200);
}

export const getManagers = async (req, res)  => {
    const { search, page } = req.query;
    const regex = { $regex: (search || '').split(' ')[0], $options: 'i' };
    const query = [  { 'firstName': regex }, { 'middleName': regex }, { 'lastName': regex }];
    const sQ = search ? { $or: query } : {};
    const limit = Number(req.query.limit) || 25;

    try {
        const total = await Manager.count(sQ);

        const managers = await Manager.find(search ? {
            $or: query,
        } : {}).skip((page * limit) - limit).limit(limit).sort({ id: -1 }).lean();

        return res.send({ items: managers, total, });
    } catch (error) {
        return onError(req, res)(error);
    }
}

export const getOneManager = async (req, res)  => {
    try {
        const manager = await Manager.findOne({ id: req.params.id }).lean();

        const clients = await Client.find({ personalManager: manager._id }).select('id').lean();
        const contracts = await Contract.find({ $or: [{ personalManager: manager._id }, { serviceManager: manager._id }] }).select('id').lean();

        if (clients.length || contracts.length) {
            // @ts-ignore
            manager.isUsed = true;
        }

        return res.send(manager);
    } catch (error) {
        return onError(req, res)(error);
    }
}

export const deleteManager = async (req, res)  => {
    try {
        const manager = await Manager.findOne({ id: req.params.id });

        if (!manager) {
            return onError(req, res)(createHttpError(404));
        }

        const clients = await Client.find({ personalManager: manager }).select('id').lean();
        const contracts = await Contract.find({ $or: [{ personalManager: manager }, { serviceManager: manager }] }).select('id').lean();

        if (clients.length || contracts.length) {
            return res.status(400).send({ clients, contracts });
        }

        await manager.deleteOne();

        return res.send();
    } catch (error) {
        return onError(req, res)(error);
    }
}
