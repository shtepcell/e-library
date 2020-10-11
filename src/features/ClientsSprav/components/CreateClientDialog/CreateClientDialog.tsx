import React, { Component } from 'react';
import { cn } from '@bem-react/classname';
import './CreateClientDialog.scss';
import {
    Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, MenuItem
} from '@material-ui/core';
import { IClient } from '@typings/IClient';
import { KeyboardDatePicker } from '@material-ui/pickers';
import { Departments } from '@const/departments';
import { request } from '@lib/request';

const cnCreateClientDialog = cn('CreateClientDialog');

interface IOwnProps {
    open?: boolean;
    client?: IClient;
    onClose?: () => void;
};

interface IOwnState {
    client?: Partial<IClient>;
    adressSuggest?: string[];
};

export class CreateClientDialog extends Component<IOwnProps, IOwnState> {
    state: IOwnState = {
        client: this.props.client || { regDate: new Date(), deliveryMethod: 'Почта', department: Departments[0] },
        adressSuggest: [],
    }

    saveClickHandler = () => {
        const { client } = this.state;

        if (client.id) {
            request.patch(`/client/${client.id}`, client).then(() => {
                window.location.reload();
            });
        } else {
            request.post('/client', client).then(() => {
                window.location.reload();
            });
        }
    }

    handlerClientChange = (field: keyof IClient) => (event) => {
        const newClient = { ...this.state.client };

        // @ts-ignore
        newClient[field] = event.target.value;

        this.setState({ client: newClient });
    }

    handleRegistrationDateChange = (date) => {
        const newClient = { ...this.state.client };

        newClient.regDate = date;

        this.setState({ client: newClient });
    };

    render() {
        const { open, onClose } = this.props;
        const {
            id, name, personalManager, deliveryMethod, regDate, department, externalId, inn, address,
            contactLastName, contactFirstName, contactMiddleName, contactEmail, contactPhone, contactPosition,
        } = this.state.client;

        return (
            <Dialog open={open} onClose={onClose} fullWidth maxWidth="md" className={cnCreateClientDialog()}>
                <DialogTitle id="simple-dialog-title">Клиент</DialogTitle>
                <DialogContent>
                    <div className={cnCreateClientDialog('Row')}>
                        <TextField
                            className={cnCreateClientDialog('Field', { type: 'name' })}
                            value={name}
                            onChange={this.handlerClientChange('name')}
                            variant="outlined"
                            label="Наименование" />
                    </div>

                    <div className={cnCreateClientDialog('Row')}>
                        <KeyboardDatePicker
                            className={cnCreateClientDialog('Field', { type: 'regDate' })}
                            disableToolbar
                            format="DD.MM.YYYY"
                            id="date-picker-dialog"
                            label="Дата регистрации"
                            value={regDate}
                            onChange={this.handleRegistrationDateChange}
                            inputVariant="outlined"
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />

                        <TextField
                            className={cnCreateClientDialog('Field', { type: 'externalId' })}
                            value={externalId}
                            onChange={this.handlerClientChange('externalId')}
                            variant="outlined"
                            label="Внешний ID" />
                    </div>

                    <div className={cnCreateClientDialog('Row')}>
                        <TextField
                            className={cnCreateClientDialog('Field', { type: 'department' })}
                            select
                            value={department}
                            onChange={this.handlerClientChange('department')}
                            variant="outlined"
                            label="Департамент"
                            >
                                {Departments.map(item => (<MenuItem value={item}>{item}</MenuItem>))}
                        </TextField>

                        <TextField
                            className={cnCreateClientDialog('Field', { type: 'personalManager' })}
                            value={personalManager}
                            onChange={this.handlerClientChange('personalManager')}
                            variant="outlined"
                            label="Персональный менеджер" />

                    </div>
                    <div className={cnCreateClientDialog('Row')}>
                        <TextField
                            className={cnCreateClientDialog('Field', { type: 'inn' })}
                            value={inn}
                            onChange={this.handlerClientChange('inn')}
                            variant="outlined"
                            label="ИНН" />

                        <TextField
                            className={cnCreateClientDialog('Field', { type: 'deliveryMethod' })}
                            select
                            value={deliveryMethod}
                            onChange={this.handlerClientChange('deliveryMethod')}
                            variant="outlined"
                            label="Способ доставки документов"
                            >
                                <MenuItem value="В офисе">В офисе</MenuItem>
                                <MenuItem value="Почта">Почта (простое письмо)</MenuItem>
                                <MenuItem value="Почта (заказное письмо с уведомлнием)">Почта (заказное письмо с уведомлнием)</MenuItem>
                                <MenuItem value="Курьер">Курьер</MenuItem>
                        </TextField>
                    </div>
                </DialogContent>
                <DialogTitle>Контактное лицо</DialogTitle>
                <DialogContent>
                    <div className={cnCreateClientDialog('Row')}>
                        <TextField
                            className={cnCreateClientDialog('Field', { type: 'name' })}
                            value={contactLastName}
                            onChange={this.handlerClientChange('contactLastName')}
                            variant="outlined"
                            label="Фамилия" />

                        <TextField
                            className={cnCreateClientDialog('Field', { type: 'name' })}
                            value={contactFirstName}
                            onChange={this.handlerClientChange('contactFirstName')}
                            variant="outlined"
                            label="Имя" />

                        <TextField
                            className={cnCreateClientDialog('Field', { type: 'name' })}
                            value={contactMiddleName}
                            onChange={this.handlerClientChange('contactMiddleName')}
                            variant="outlined"
                            label="Отчество" />
                    </div>

                    <div className={cnCreateClientDialog('Row')}>
                        <TextField
                            className={cnCreateClientDialog('Field', { type: 'adress' })}
                            value={address}
                            onChange={this.handlerClientChange('address')}
                            variant="outlined"
                            label="Aдpec" />
                    </div>


                    <div className={cnCreateClientDialog('Row')}>
                        <TextField
                            className={cnCreateClientDialog('Field', { type: 'name' })}
                            value={contactPosition}
                            onChange={this.handlerClientChange('contactPosition')}
                            variant="outlined"
                            label="Должность" />

                        <TextField
                            className={cnCreateClientDialog('Field', { type: 'name' })}
                            value={contactEmail}
                            onChange={this.handlerClientChange('contactEmail')}
                            variant="outlined"
                            label="E-mail" />

                        <TextField
                            className={cnCreateClientDialog('Field', { type: 'name' })}
                            value={contactPhone}
                            onChange={this.handlerClientChange('contactPhone')}
                            variant="outlined"
                            label="Телефон" />
                    </div>
                </DialogContent>

                <DialogActions>
                    <Button onClick={onClose} color="primary">
                        Отменить
                    </Button>
                    <Button onClick={this.saveClickHandler} color="primary" variant="contained">
                        {id ? 'Сохранить' : 'Создать'}
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }
}