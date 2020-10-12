require('dotenv').config();
import '../server/libs/connect';
import { createCounter } from '../server/controllers/counters';

const counters = ['manager', 'contract', 'client', 'document'];

(async () => {
    console.log('------------------ Database init ------------------');

    setTimeout(() => {
        try {
            counters.forEach(async (counter) => {
                console.log('Creating %s counter...', counter);
                await createCounter(counter);
            })

            console.log('------------------ Database inited successfully! ------------------');
        } catch (err) {
            console.log('------------------ Database init error :( ------------------');
            console.log(err);
        }
    }, 3000)
})();