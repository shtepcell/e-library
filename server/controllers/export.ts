import { generateMonth } from '../../src/lib/helper';
import xl from 'excel4node';
import _get from 'lodash/get';
import moment from 'moment';
import { Contract } from '../models/Contract';
import { Document } from '../models/Document';
import { buildContractQuery } from './contracts';

const managerConverter = ({ lastName, firstName, middleName }) => [lastName, firstName, middleName].join(' ');

const boolConverter = (value) => value ? 'Да' : 'Нет';

const contractFields = [
    { name: 'ID', path: 'id', type: 'number' },
    { name: 'Номер договора', path: 'orderNumber', type: 'string' },
    { name: 'Статус', path: 'status', type: 'string' },
    { name: 'Департамент', path: 'department', type: 'string' },
    { name: 'Клиент', path: 'client.name', type: 'string' },
    { name: 'Дата заключения', path: 'conclusionDate', type: 'date' },
    { name: 'Дата завершения', path: 'endDate', type: 'date' },
    { name: 'Сумма контракта', path: 'amount', type: 'string' },
    { name: 'Сервис-менеджер', path: 'serviceManager', type: 'string', converter: managerConverter },
    { name: 'Персональный-менеджер', path: 'personalManager', type: 'string', converter: managerConverter  },
    { name: 'Оригинал в архиве', path: 'orig', type: 'string', converter: boolConverter },
];

const createContractHeader = (ws) => {
    const months = generateMonth();

    contractFields.forEach(({ name }, index) => {
        ws.cell(1, index + 1).string(name);
    });

    months.forEach((item, index) => {
        ws.cell(1, index + contractFields.length + 1 ).string(item);
        ws.column(index + contractFields.length + 1).setWidth(19);
    })
}

const contractMapper = async (contract, row, ws) => {
    const documents = await Document.find({ contract: contract._id, withPeriod: true }).lean();

    const months = generateMonth();

    contractFields.forEach(({ path, type, converter }, index) => {
        const value = _get(contract, path);

        if (value !== undefined) {
            ws.cell(row + 2, index + 1)[type](converter ? converter(value) : value).style({ alignment: { vertical: 'center' }});
        }
    });

    const documentsHash = {};

    documents.forEach((doc) => {
        const period = moment(doc.period).format('MM.YYYY');

        const idx = months.indexOf(period);

        if (idx >= 0) {
            if (documentsHash[period]) {
                documentsHash[period].push(doc.type);
            } else {
                documentsHash[period] = [doc.type];
            }

            ws.cell(row + 2, contractFields.length + idx + 1).string(documentsHash[period].join('\n')).style({ alignment: { wrapText: true }, font: { size: 12 } });
        }
    })

}

export const contractExporter = async (req, res) => {
    const wb = new xl.Workbook();
    const ws = wb.addWorksheet('Таблица 1');

    createContractHeader(ws);

    const query = await buildContractQuery(req);

    const contracts = await Contract.find(query).populate('client serviceManager personalManager');

    for (let i = 0; i < contracts.length; i++) {
        const contract = contracts[i];
        await contractMapper(contract, i, ws);
    }

    return wb.write('Excel.xlsx', res);
}