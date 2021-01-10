import axios from 'axios';
import managersData from '../data/managers.json';

(async () => {
    for (let index = 0; index < managersData.length; index++) {
       const [lastName, firstName, middleName] = managersData[index].split(' ');

        try {
            await axios.post('http://127.0.0.1:8888/api/manager', { firstName, middleName, lastName }, {
                params: {
                    auth: '0',
                }
            });
        } catch (err) {
            console.log(err.toString ? err.toString() : err);
        }
    }
})();