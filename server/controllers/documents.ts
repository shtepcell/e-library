import S3 from 'aws-sdk/clients/s3';
import createHttpError from 'http-errors';

import { Contract } from '../models/Contract';
import { Client } from '../models/Client';
import { onError, onValidateError } from '../libs/validate';
import { Document, IDocument } from '../models/Document';
import { Garbage } from '../models/Garbage';
import { getId } from './counters';
import _ from 'lodash';

const editableFields = [
    'type', 'number', 'trackNumber', 'period', 'date', 'fileName', 'comment', 'deliveryMethod'
]

const S3Client = new S3({
    endpoint: 'https://storage.yandexcloud.net',
    secretAccessKey: process.env.S3_SERET_KEY,
    accessKeyId: process.env.S3_SECRET_ID,
});

function makeid(length) {
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;

    for (let i = 0; i < length; i++) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}

export const uploadToS3 = (req, res, cb) => {
    const { file, body } = req;

    if (!file) {
        cb();

        return;
    }

    const splitedFileName = file.originalname.split('.');

    if (!splitedFileName.length) {
        return onError(req, res)(createHttpError(400));
    }

    const type = splitedFileName[splitedFileName.length - 1];
    const fileName = splitedFileName.slice(0, splitedFileName.length - 1).join('.')

    S3Client.upload({
        Bucket: 'miranda',
        Key: `${fileName}_${makeid(5)}.${type}`,
        Body: file.buffer,
        ContentType: file.mimetype,
    }, (err, data) => {
        if (err) {
            throw err;
        }

        cb(data.Location, file.Key);
    })
}

export const createDocument = (req, res) => uploadToS3(req, res, async (fileUrl) => {
    try {
        let { type, number, trackNumber, period, date, contract: contractId, fileName, comment, deliveryMethod } = req.body;

        const document: IDocument = new Document({
            type, number, trackNumber, period: new Date(Number(period)),
            date: new Date(Number(date)), file: fileUrl, fileName, comment,
            deliveryMethod,
        });

        document.contract = await Contract.findOne({ id: contractId });

        const validateError = document.validateSync();

        if (validateError) {
            return onValidateError(req, res)(validateError);
        }

        document.id = await getId('document');

        await document.save();

        return res.status(200).send(document);
    } catch (err) {
        return onError(req, res)(err);
    }
});

export const saveDocument = (req, res) => uploadToS3(req, res, async (fileUrl) => {
    try {
        const documentData = _.pick(req.body, editableFields);
        const document = await Document.findOne({ id: req.params.id });

        documentData.period = new Date(Number(documentData.period));
        documentData.date = new Date(Number(documentData.date));

        fileUrl && (document.file = fileUrl);

        Object.keys(documentData).forEach(key => {
            document[key] = documentData[key];
        });

        const validateError = document.validateSync();

        if (validateError) {
            return onValidateError(req, res)(validateError);
        }

        await document.save();

        return res.sendStatus(200);
    } catch (err) {
        return onError(req, res)(err);
    }
});


export const deleteDocument = async (req, res) => {
    try {
        const document = await Document.findOne({ id: req.params.id });

        if (document.file) {
            const garbage = new Garbage({ url: document.file });

            garbage.save();
        }

        await document.deleteOne();

        return res.status(200).send(document);
    } catch (err) {
        return onError(req, res)(err);
    }
};

export const getOneDocument = async (req, res) => {
    try {
        const { id } = req.params;

        const document = await Document.findOne({ id }).populate('contract', 'id').lean();

        // @ts-ignore
        document.contract = document.contract.id;

        return res.status(200).send(document);
    } catch (err) {
        return onError(req, res)(err);
    }
};


export const getDocuments = async (req, res) => {
    try {
        const { page = 1, limit = 25, type, contract: contractId, period, trackNumber, orig, client } = req.query;
        const query: any = {};

        type && (query.type = type);

        if (contractId) {
            const contract = await Contract.findOne({ id: contractId });

            contract && (query.contract = contract);
        }

        if (period) {
            const date = new Date(Number(period));
            const startDate = new Date(date.getFullYear(), date.getMonth(), 0);
            const endDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);

            query.period = { $gte: startDate, $lt: endDate };
        }

        if (orig) {
            query.fileName = { '$exists': orig === 'has_orig'}
        }

        if (client) {
            const clientDocument = await Client.findOne({ name: client });

            if (clientDocument) {
                const contracts = await Contract.find({ client: clientDocument });

                if (contracts) {
                    query.contract = { '$in': contracts }
                }
            }
        }

        trackNumber && (query.trackNumber = { $regex: trackNumber });

        const total = await Document.countDocuments(query);

        let documents = await Document.find(query)
            .skip(limit * page - limit)
            .limit(Number(limit))
            .populate('contract', 'id')
            .lean();

        documents = documents.map(item => {
            // @ts-ignore
            item.contract = item.contract.id;

            return item;
        });

        return res.status(200).send({ items: documents, total });
    } catch (err) {
        return onError(req, res)(err);
    }
};
