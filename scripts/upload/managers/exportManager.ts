import contracts from '../data/contracts.json';
import clients from '../data/clients.json';

const managers: string[] = [];

function addManager(manager: string) {
    !managers.includes(manager) && managers.push(manager);
}

(async () => {
    clients.forEach(item => {
        const persManager = item['ПЕРСОНАЛЬНЫЙ_МЕНЕДЖЕР'];

        persManager && addManager(persManager);
    });

    contracts.forEach(item => {
        const persManager = item['ПЕРСОНАЛЬНЫЙ_МЕНЕДЖЕР'];
        const serviceManager = item['СЕРВИС_МЕНЕДЖЕР'];

        persManager && addManager(persManager);
        serviceManager && addManager(serviceManager);
    });

    console.log(JSON.stringify(managers));

    process.exit(0);
})();