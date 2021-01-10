import axios from 'axios';
import moment from 'moment';

import clients from '../data/clients.json';

(async () => {
    for (let index = 0; index < clients.length; index++) {
        const item = clients[index];

        const client = {
            externalId: item['ВНЕШНИЙ_ИДЕНТИФИКАТОР_КЛИЕНТА'].replace(',', ''),
            name: item['НАИМЕНОВАНИЕ'],
            inn: item['ИНН'],
            department: item['ДЕПАРТАМЕНТ'],
            description: item['ОПИСАНИЕ'],
            address: item['V_ADDRESS_CONTACT'],
            regDate: moment(item['ДАТА_РЕГИСТРАЦИИ_КЛИЕНТА'].replace(' 00:00:00', ''), 'MM/DD/YYYY').toDate(),
            deliveryMethod: item['СПОСОБ_ДОСТАВКИ_ДОКУМЕНТОВ'],
            contactFirstName: item['КОНТАКТНОЕ_ЛИЦО_ИМЯ'],
            contactMiddleName: item['КОНТАКТНОЕ_ЛИЦО_ОТЧЕСТВО'],
            contactLastName: item['КОНТАКТНОЕ_ЛИЦО_ФАМИЛИЯ'],
            contactEmail: item['КОНТАКТНОЕ_ЛИЦО_EMAIL'],
            contactPhone: item['КОНТАКТНОЕ_ЛИЦО_ТЕЛЕФОН'],
            personalManager: item['ПЕРСОНАЛЬНЫЙ_МЕНЕДЖЕР'],
        }

        await axios.post('http://127.0.0.1:8888/api/client', client, { params: { auth: '0' }}).catch(error => {});
    }
})();