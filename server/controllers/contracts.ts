import _ from 'lodash';

import { onValidateError, onError } from '../libs/validate';
import { Contract } from '../models/Contract';
import { Manager } from '../models/Manager';
import { Client } from '../models/Client';
import { getId } from './counters';

const fields = ['client', 'personalManager', 'serviceManager', 'orig', 'status', 'conclusionDate', 'endDate', 'department', 'type'];

export const createContract = async (req, res)  => {
    const data = _.pick(req.body, fields);

    const cloe = data.client;

    if (data.personalManager) {
        const [lastName, firstName, middleName] = data.personalManager.split(' ');
        data.personalManager = await Manager.findOne({lastName, firstName, middleName});
    }

    if (data.serviceManager) {
        const [lastName, firstName, middleName] = data.serviceManager.split(' ');
        data.serviceManager = await Manager.findOne({lastName, firstName, middleName});
    }

    data.client = await Client.findOne({ name: data.client });

    const contract = new Contract(data);

    const validateError = contract.validateSync();

    if (validateError) {
        return onValidateError(req, res)(validateError);
    }

    contract.id = await getId('contract');

    await contract.save();

    return res.status(200).send(_.pick(contract, fields));
}

// export const saveContract = async (req, res)  => {
//     const id = req.params.id;
//     const { firstName, middleName, lastName } = req.body || {};

//     const Contract = await contract.findOne({ id });

//     Contract.firstName = firstName;
//     Contract.middleName = middleName;
//     Contract.lastName = lastName;

//     const validateError = Contract.validateSync();

//     if (validateError) {
//         return onValidateError(req, res)(validateError);
//     }

//     await Contract.save();

//     return res.sendStatus(200);
// }

export const getContracts = async (req, res)  => {
    try {
        const contracts = await Contract.find({}).populate('client serviceManager').limit(25).sort({ id: -1 }).lean();

        return res.send(contracts);
    } catch (error) {
        return onError(req, res)(error);
    }
}


export const getOneContract = async (req, res)  => {
    try {
        const contract = await Contract.findOne({ id: req.params.id }).populate('client serviceManager personalManager').lean();

        return res.send(contract);
    } catch (error) {
        return onError(req, res)(error);
    }
}

// export const deleteContract = async (req, res)  => {
//     try {
//         const Contract = await Contract.deleteOne({ id: req.params.id }).lean();

//         return res.send(Contract);
//     } catch (error) {
//         return onError(req, res)(error);
//     }
// }