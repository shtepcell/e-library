import axios from "axios"

const request = axios.create({
    baseURL: 'http://localhost:8888/api'
});

const names = ['Валерий', 'Анна', 'Катерина', 'Виктор', 'Александр', 'Петр', 'Сергей', 'Джон', 'Игнат'];
const middleNames = ['Петрович', 'Алексеевич', 'Александрович', 'Викторович', 'Антонович', 'Сергеевич', 'Михалыч', 'Валентиновна', 'Игнатьевна'];
const familyNames = ['Буд', 'Кирка', 'Ломакин', 'Иванов', 'Петров', 'Королева', 'Авдеева', 'Соловьев', 'Аксенов'];

function randomInteger(min, max) {
    // случайное число от min до (max+1)
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
}


export const createManager = async () => {
    const promises = [];

    const start = Date.now();

    for (let index = 0; index < 15; index++) {
        await request.post('/manager', {
            firstName: names[randomInteger(0, names.length - 1)],
            middleName: middleNames[randomInteger(0, middleNames.length - 1)],
            lastName: familyNames[randomInteger(0, familyNames.length - 1)],
        });
    }

    await Promise.all(promises).then(() => {
        console.log(Date.now() - start);
    });
}

createManager();