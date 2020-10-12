import axios from 'axios';
import contractsData from './data/contracts.json';

(async () => {
    contractsData.forEach(contract => {
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

        axios.post('http://127.0.0.1:8888/api/contract', newContract);
    });
})();