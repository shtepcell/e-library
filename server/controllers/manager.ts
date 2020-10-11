import _ from 'lodash';

import { onValidateError, onError } from '../libs/validate';
import { Manager } from '../models/Manager';
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
    const { search, limit } = req.query;
    const regex = { $regex: (search || '').split(' ')[0], $options: 'i' };
    const query = [  { 'firstName': regex }, { 'middleName': regex }, { 'lastName': regex }];

    try {
        const managers = await Manager.find(search ? {
            $or: query,
        } : {}).limit(Number(limit) || 25).sort({ id: -1 }).lean();

        return res.send(managers);
    } catch (error) {
        return onError(req, res)(error);
    }
}

export const getOneManager = async (req, res)  => {
    try {
        const manager = await Manager.findOne({ id: req.params.id }).lean();

        return res.send(manager);
    } catch (error) {
        return onError(req, res)(error);
    }
}

export const deleteManager = async (req, res)  => {
    try {
        const manager = await Manager.deleteOne({ id: req.params.id }).lean();

        return res.send(manager);
    } catch (error) {
        return onError(req, res)(error);
    }
}