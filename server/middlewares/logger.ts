import { RequestHandler } from 'express';
import moment from 'moment';
import chalk from 'chalk';

const codeCollor = (code) => {
    if (code >= 500) {
        return 'red'
    }

    if (code >= 400) {
        return 'yellow';
    }

    return 'green';
}

export const httpLogger: RequestHandler = (req, res, next) => {
    const startTime = Date.now();

    res.on('finish', () => {
        const message = `←  ${res.statusCode} ${req.method} ${req.url}`;

        console.log(moment().format('DD.MM.YY HH:MM:SS:ss'), chalk[codeCollor(res.statusCode)](message), `${Date.now() - startTime}ms`);
    });

    console.log(`${moment().format('DD.MM.YY HH:MM:SS:ss')}  →  ${req.method} ${req.url}`);

    next();
}
