import xl from 'excel4node';
import _get from 'lodash/get';
import { Contract } from '../models/Contract';

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
    contractFields.forEach(({ name }, index) => {
        ws.cell(1, index + 1).string(name);
    });
}

const contractMapper = (ws) => (contract, row) => {
    contractFields.forEach(({ path, type, converter }, index) => {
        const value = _get(contract, path);

        if (value !== undefined) {
            ws.cell(row + 2, index + 1)[type](converter ? converter(value) : value);
        }
    });
}

export const contractExporter = async (req, res) => {
    const wb = new xl.Workbook();
    const ws = wb.addWorksheet('Таблица 1');

    createContractHeader(ws);

    const contracts = await Contract.find({ id: req.params.id }).populate('client serviceManager personalManager');

    contracts.forEach(contractMapper(ws));

    return wb.write('Excel.xlsx', res);
}
