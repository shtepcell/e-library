import moment from 'moment';

export const getFullName = (manager) => {
    if (!manager) {
        return null;
    }

    const { firstName, middleName, lastName } = manager;

    return `${lastName} ${firstName} ${middleName}`;
}

const startDate = new Date('01.01.2014');

interface generateMonthParams {
    from?: Date;
    to?: Date;
}

const fillMonths = (to = 12) => {
    return
}

export const generateMonth = (params?: generateMonthParams) => {
    const { from = startDate, to = Date.now() } = params || {};

    const firstMonth = moment(from);
    const endMonth = moment(to);

    // Кол-во месяцев между датами
    const diff = Math.ceil(endMonth.diff(firstMonth, 'month', true));

    const months = [firstMonth.format('MM.YYYY')];

    for (let i = 0; i < diff - 1; i++) {
        const date = firstMonth.add(1, 'month');

        months.push(date.format('MM.YYYY'));
    }

    return months;
}