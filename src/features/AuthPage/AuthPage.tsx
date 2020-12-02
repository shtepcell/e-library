import React, { PureComponent, ChangeEventHandler } from 'react';
import { cn } from '@bem-react/classname';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { TextField, Button, Snackbar } from '@material-ui/core';
import { request } from '@lib/request';
import './AuthPage.scss';

const cnAuthPage = cn('AuthPage');

interface IAuthPageState {
    login?: string;
    password?: string;
    showError?: boolean;
    errorText: string;
};

export class AuthPage extends PureComponent<{}, IAuthPageState> {
    state: IAuthPageState = {
        errorText: 'Ошибка!'
    }

    componentDidMount() {
        window.addEventListener('keyup', (ev) => {
            if (ev.key === 'Enter') {
                this.onSubmit();
            }
        })
    }

    onPasswordChange: ChangeEventHandler<HTMLInputElement> = (event) => {
        this.setState({ password: event.target.value });
    }

    onLoginChange: ChangeEventHandler<HTMLInputElement> = (event) => {
        this.setState({ login: event.target.value });
    }

    onSubmit = () => {
        const { login, password } = this.state;

        request.post('/auth', { username: login, password })
            .then(() => {
                window.location.reload();
            })
            .catch(err => {
                const { status } = err.response;

                if (status === 401) {
                    this.setState({ showError: true, errorText: 'Данные введены неверно!' });
                } else {
                    this.setState({ showError: true, errorText: 'Прозошла ошибка!' });
                }
            });
    }

    handleClose = () => {
        this.setState({ showError: false });
    }

    render() {
        const { login, password, showError, errorText } = this.state;

        return (
            <div className={cnAuthPage()}>
                <div className={cnAuthPage('Title')}>Электронный архив</div>
                <div className={cnAuthPage('Hint')}>Для входа используйте пару доменного логина и пароля, точно такую же как и для почты @miranda-media</div>

                <TextField
                    fullWidth
                    value={login}
                    onChange={this.onLoginChange}
                    variant="outlined"
                    label="Логин"
                />
                <TextField
                    type="password"
                    fullWidth
                    value={password}
                    onChange={this.onPasswordChange}
                    variant="outlined"
                    label="Пароль"
                />

                <Button disabled={!login || !password} onClick={this.onSubmit} variant="contained" color="primary" fullWidth size="large">Войти</Button>
                <Snackbar open={showError} autoHideDuration={6000} onClose={this.handleClose}>
                    <MuiAlert elevation={6} variant="filled" severity="error" onClose={this.handleClose}>{errorText}</MuiAlert>
                </Snackbar>
            </div>
        )
    }
}