import _ from 'lodash';

import { onValidateError, onError } from '../libs/validate';
import { Contract } from '../models/Contract';
import { Manager } from '../models/Manager';
import { Client } from '../models/Client';
import { Document } from '../models/Document';
import { getId } from './counters';

const fields = ['client', 'personalManager', 'serviceManager', 'orig', 'status', 'conclusionDate', 'endDate', 'department', 'type', 'amount'];

export const createContract = async (req, res)  => {
    const data = _.pick(req.body, fields);

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

export const saveContract = async (req, res)  => {
    const data = _.pick(req.body, fields);

    const contract = await Contract.findOne({ id: req.params.id });

    fields.forEach(field => {
        contract[field] = data[field];
    });

    if (data.personalManager) {
        const [lastName, firstName, middleName] = data.personalManager.split(' ');
        // @ts-ignore
        contract.personalManager = await Manager.findOne({lastName, firstName, middleName});
    }

    if (data.serviceManager) {
        const [lastName, firstName, middleName] = data.serviceManager.split(' ');
        // @ts-ignore
        contract.serviceManager = await Manager.findOne({lastName, firstName, middleName});
    }

    // @ts-ignore
    contract.client = await Client.findOne({ name: data.client });
    const validateError = contract.validateSync();

    if (validateError) {
        return onValidateError(req, res)(validateError);
    }

    await contract.save();

    return res.status(200).send(_.pick(contract, fields));
}

export const getContracts = async (req, res)  => {
    try {
        const query = {};
        const limit = 25;

        const total = await Contract.count(query);
        const contracts = await Contract.find(query).populate('client serviceManager').skip(req.query.page * (limit - 1)).limit(limit).sort({ id: -1 }).lean();

        return res.send({ items: contracts, total });
    } catch (error) {
        return onError(req, res)(error);
    }
}


export const getOneContract = async (req, res)  => {
    try {
        const contract = await Contract.findOne({ id: req.params.id }).populate('client serviceManager personalManager').lean();
        const documents = await Document.find({ contract: contract._id }).limit(5).sort({ id: -1 }).lean();

        return res.send({ contract, documents });
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