import S3 from 'aws-sdk/clients/s3';
import { Contract } from '../models/Contract';
import { onError, onValidateError } from '../libs/validate';
import { Document, IDocument } from '../models/Document';
import { getId } from './counters';
import _ from 'lodash';

const editableFields = [
    'type', 'number', 'trackNumber', 'period', 'date', 'orig', 'fileName'
]

const S3Client = new S3({ endpoint: 'https://storage.yandexcloud.net', secretAccessKey: 'D4Ps5tVVrdvpOJJ1EEv9ntwO-T0JNXRpl28sQTmc', accessKeyId: 'HuuomsMnTqbVH5KSrUBT' });

export const uploadToS3 = (file: any, cb) => {
    if (!file) {
        cb();

        return;
    }

    S3Client.upload({
        Bucket: 'miranda',
        Key: file.originalname,
        Body: file.buffer,
        ContentType: file.mimetype,
    }, (err, data) => {
        if (err) {
            throw err;
        }

        cb(data.Location, file.Key);
    })
}

export const createDocument = (req, res) => uploadToS3(req.file, async (fileUrl) => {
    try {
        const { type, number, trackNumber, period, date, orig, contract: contractId, fileName } = req.body;

        const document: IDocument = new Document({ type, number, trackNumber, period: new Date(Number(period)), date: new Date(Number(date)), orig, file: fileUrl, fileName });

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

export const saveDocument = (req, res) => uploadToS3(req.file, async (fileUrl) => {
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

