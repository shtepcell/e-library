import axios from 'axios';
import managersData from '../data/managers.json';

(async () => {
    managersData.forEach(manager => {
       const [lastName, firstName, middleName] = manager.split(' ');

        axios.post('http://127.0.0.1:8888/api/manager', { firstName, middleName, lastName });
    });
})();