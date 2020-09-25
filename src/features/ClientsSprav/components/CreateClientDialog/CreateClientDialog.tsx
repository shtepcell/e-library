import React, { Component } from 'react';
import { cn } from '@bem-react/classname';
import './CreateClientDialog.scss';
import {
    Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, MenuItem
} from '@material-ui/core';
import { DeliveryType, IClient } from '@typings/IClient';
import { KeyboardDatePicker } from '@material-ui/pickers';
import { Departments } from '@const/departments';

const cnCreateClientDialog = cn('CreateClientDialog');

interface IOwnProps {
    open?: boolean;
    onClose?: () => void;
};

interface IOwnState {
    client?: Partial<IClient>;
    contactFace?: Partial<IClient['contactFace']>;
};

export class CreateClientDialog extends Component<IOwnProps, IOwnState> {
    state: IOwnState = {
        client: {},
        contactFace: {}
    }

    handlerClientChange = (field: keyof IClient, addition?: keyof IClient['contactFace']) => (event) => {
        const newClient = { ...this.state.client };

        if (field == 'contactFace') {
            const newContactFace = { ...this.state.contactFace };

            newContactFace[addition] = event.target.value;

            return this.setState({ contactFace: newContactFace });
        }

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
        const { name, personalManager, deliveryMethod, regDate, department, externalId, inn } = this.state.client;
        const contactFace = this.state.contactFace;

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
                                <MenuItem value={DeliveryType.inOffice}>В офисе</MenuItem>
                                <MenuItem value={DeliveryType.SimplePost}>Почта (простое письмо)</MenuItem>
                                <MenuItem value={DeliveryType.PostWithNotify}>Почта (заказное письмо с уведомлнием)</MenuItem>
                                <MenuItem value={DeliveryType.Courier}>Курьер</MenuItem>
                        </TextField>
                    </div>
                </DialogContent>
                <DialogTitle>Контактное лицо</DialogTitle>
                <DialogContent>
                    <div className={cnCreateClientDialog('Row')}>
                        <TextField
                            className={cnCreateClientDialog('Field', { type: 'name' })}
                            // value={contactFace.name}
                            // onChange={this.handlerClientChange('contactFace', 'name')}
                            variant="outlined"
                            label="Фамилия" />

                        <TextField
                            className={cnCreateClientDialog('Field', { type: 'name' })}
                            value={contactFace.name}
                            onChange={this.handlerClientChange('contactFace', 'name')}
                            variant="outlined"
                            label="Имя" />

                        <TextField
                            className={cnCreateClientDialog('Field', { type: 'name' })}
                            // value={contactFace.name}
                            // onChange={this.handlerClientChange('contactFace', 'name')}
                            variant="outlined"
                            label="Отчество" />
                    </div>

                    <div className={cnCreateClientDialog('Row')}>
                        <TextField
                            className={cnCreateClientDialog('Field', { type: 'name' })}
                            // value={contactFace.name}
                            // onChange={this.handlerClientChange('name')}
                            variant="outlined"
                            label="Город" />

                        <TextField
                            className={cnCreateClientDialog('Field', { type: 'name' })}
                            // value={name}
                            // onChange={this.handlerClientChange('name')}
                            variant="outlined"
                            label="Улица" />

                        <TextField
                            className={cnCreateClientDialog('Field', { type: 'name' })}
                            // value={name}
                            // onChange={this.handlerClientChange('name')}
                            variant="outlined"
                            label="Дом" />
                    </div>

                    <div className={cnCreateClientDialog('Row')}>
                        <TextField
                            className={cnCreateClientDialog('Field', { type: 'name' })}
                            // value={name}
                            // onChange={this.handlerClientChange('name')}
                            variant="outlined"
                            label="Индекс" />

                        <TextField
                            className={cnCreateClientDialog('Field', { type: 'name' })}
                            // value={name}
                            // onChange={this.handlerClientChange('')}
                            variant="outlined"
                            label="Офис" />
                    </div>

                    <div className={cnCreateClientDialog('Row')}>
                        <TextField
                            className={cnCreateClientDialog('Field', { type: 'name' })}
                            value={contactFace.position}
                            onChange={this.handlerClientChange('contactFace', 'position')}
                            variant="outlined"
                            label="Должность" />

                        <TextField
                            className={cnCreateClientDialog('Field', { type: 'name' })}
                            value={contactFace.email}
                            onChange={this.handlerClientChange('contactFace', 'email')}
                            variant="outlined"
                            label="E-mail" />

                        <TextField
                            className={cnCreateClientDialog('Field', { type: 'name' })}
                            value={contactFace.phone}
                            onChange={this.handlerClientChange('contactFace', 'phone')}
                            variant="outlined"
                            label="Телефон" />
                    </div>
                </DialogContent>

                <DialogActions>
                    <Button onClick={onClose} color="primary">
                        Отменить
                    </Button>
                    <Button onClick={onClose} color="primary" variant="contained">
                        Создать
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }
}