import "regenerator-runtime/runtime.js";
import express from 'express';
import cors from 'cors';
import path from 'path';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import mockUSer from './mocks/user.json';

const isDev = process.env.MENV === 'development';

const LdapStrategy = require('passport-ldapauth').Strategy;

require('dotenv').config();

const MOUNTH = 1000 * 60 * 60 * 24 * 30; // 30 дней

import { httpLogger } from './middlewares/logger';

import './libs/connect';
import './controllers/documents';

var bodyParser = require('body-parser')

import { apiRouter } from './api-router';
import { contractExporter } from "./controllers/export";

const app = express();
const SERVER_PORT = 8888;
const { bindDN, bindCredentials, ldapURL } = process.env;

passport.use(new LdapStrategy({
    server: {
        url: ldapURL,
        bindDN,
        bindCredentials,
        searchBase: "ou=MIRANDA-MEDIA,dc=miranda-media,dc=ru",
        searchFilter: 'sAMAccountName={{username}}',
    }
}));

app
    .disable('x-powered-by')
    .enable('trust proxy')
    .use(cors({
        origin: true,
        credentials: true,
    }));

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});

app.use(express.static(path.resolve('static')));

app.use(httpLogger);

app.use(passport.initialize());
app.use(passport.session());

app.post('/api/auth', (req, res, next) => {
    if (isDev) {
        const { mail, name, department, displayName } = mockUSer;

        res.cookie('X-User-Mail', mail, { maxAge: MOUNTH });
        res.cookie('X-User-Name', displayName || name, { maxAge: MOUNTH });
        res.cookie('X-User-Department', department, { maxAge: MOUNTH });

        return res.send(mockUSer);
    }

    passport.authenticate('ldapauth', {}, function (err, user, info) {
        if (err) {
            return next(err);
        }

        if (!user) {
            return res.status(401).send({ error: true });
        }

        const { mail, name, department, displayName } = user;

        res.cookie('X-User-Mail', mail, { maxAge: MOUNTH });
        res.cookie('X-User-Name', displayName || name, { maxAge: MOUNTH });
        res.cookie('X-User-Department', department, { maxAge: MOUNTH });

        return res.send(user);
    })(req, res, next);
});


app.get('/auth', (req, res) => {
    const mail = req.cookies['X-User-Mail'];

    if (mail) {
        return res.redirect('/');
    }

    return res.sendFile(path.resolve('static/project.html'));
});

app.get('/logout', (req, res) => {
    res.clearCookie('X-User-Mail');
    res.clearCookie('X-User-Name');
    res.clearCookie('X-User-Department');

    res.redirect('/auth');
})

app.use((req, res, next) => {
    const mail = req.cookies['X-User-Mail'];

    if (isDev && req.query.auth === '0') {
        return next();
    }

    if (mail) {
        next();
    } else {
        if (req.xhr) {
            return res.sendStatus(401);
        } else {
            return res.redirect('/auth');
        }
    }
});

apiRouter(app);

app.get('/export/contract/:id', contractExporter);

app.get('*', (req, res) => {
    return res.sendFile(path.resolve('static/project.html'));
})

app.listen(SERVER_PORT, function () {
    console.log(`Server started: http://127.0.0.1:${SERVER_PORT}`);
});
