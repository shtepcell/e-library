import axios from 'axios';
import contractsData from './data/contracts.json';
import _ from 'lodash';

(async () => {
    for (let index = 0; index < contractsData.length; index++) {
        const contract = contractsData[index];

        const newContract = {
            department: contract.ДЕПАРТАМЕНТ,
            client: contract.НАИМЕНОВАНИЕ_КЛИЕНТА,
            conclusionDate: contract.ДАТА_ЗАКЛЮЧЕНИЯ,
            endDate: contract.ДАТА_ЗАВЕРШЕНИЯ_ДЕЙСТВИЯ,
            personalManager: contract.ПЕРСОНАЛЬНЫЙ_МЕНЕДЖЕР,
            serviceManager: contract.СЕРВИС_МЕНЕДЖЕР,
            status: contract.СТАТУС_ДОГОВОРА,
        }

        if (['Договор', 'Государственный контракт'].includes(contract.ТИП_ДОКУМЕНТА)) {
            // @ts-ignore
            newContract.type = contract.ТИП_ДОКУМЕНТА;
        }

        try {
            await axios.post('http://127.0.0.1:8888/api/contract', newContract);
        } catch (error) {
            console.log('Error', contract)
        }
    }
})();