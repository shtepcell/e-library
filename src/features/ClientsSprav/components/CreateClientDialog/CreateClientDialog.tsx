import React, { Component } from 'react';
import { cn } from '@bem-react/classname';
import './CreateClientDialog.scss';
import _debounce from 'lodash/debounce';
import {
    Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, MenuItem
} from '@material-ui/core';
import { IClient } from '@typings/IClient';
import { KeyboardDatePicker } from '@material-ui/pickers';
import { Departments } from '@const/departments';
import { onDeleteClient } from '@store/modules/clients';
import { request } from '@lib/request';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import { getFullName } from '@lib/helper';
import { AdressSuggest } from '@components/AdressSuggest';

const cnCreateClientDialog = cn('CreateClientDialog');

interface IOwnProps {
    open?: boolean;
    client?: IClient;
    onClose?: () => void;
    onDeleteClient?: typeof onDeleteClient;
};

interface IOwnState {
    client?: Partial<IClient>;
    adressSuggest?: string[];
    managerSuggest: string[];
    managerSuggestLoading?: boolean;
};

export class CreateClientDialog extends Component<IOwnProps, IOwnState> {
    state: IOwnState = {
        // @ts-ignore
        client: this.props.client || { regDate: new Date(), deliveryMethod: 'Почта', department: Departments[0] },
        adressSuggest: [],
        managerSuggest: [],
    }

    componentDidMount() {
        this.getSuggestedManager();
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

    getSuggestedManager = _debounce(() => {
        this.setState({ managerSuggestLoading: true, managerSuggest: [] });

        request.get('/managers', {
            params: {
                search: this.state.client.personalManager,
                limit: 5,
            }
        }).then(({ data: { items } }) => {
            this.setState({ managerSuggest: items.map(getFullName), managerSuggestLoading: false  })
        }).catch(() => {
            this.setState({ managerSuggestLoading: false });
        });
    }, 500);

    onManagerChange = (event) => {
        this.handlerClientChange('personalManager')(event);

        this.getSuggestedManager();
    };

    onManagerSelect = (event) => {
        this.setState({
            client: {
                ...this.state.client,
                personalManager: event.target.value,
            }
        })
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

    handleDeleteClient = () => {
        this.props.onDeleteClient(this.state.client.id);
    }

    onPostAdressChange = (value) => {
        const newClient = { ...this.state.client };

        newClient.address = value;

        this.setState({ client: newClient });
    }

    onLegalAdressChange = (value) => {
        const newClient = { ...this.state.client };

        newClient.legalAddress = value;

        this.setState({ client: newClient });
    }

    render() {
        const { open, onClose } = this.props;
        const {
            id, name, personalManager, deliveryMethod, regDate, department, externalId, inn, address,
            contactLastName, contactFirstName, contactMiddleName, contactEmail, contactPhone, contactPosition,
            legalAddress,
        } = this.state.client;

        const isDisabledCreate = !name || !externalId;

        const { managerSuggest, managerSuggestLoading } = this.state;

        return (
            <Dialog open={open} onClose={onClose} fullWidth maxWidth="md" className={cnCreateClientDialog()}>
                <DialogContent>
                    <h1>Клиент</h1>
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

                        <Autocomplete
                            style={{ width: 450 }}
                            options={managerSuggest}
                            noOptionsText="Нет доступных вариантов"
                            loading={managerSuggestLoading}
                            filterOptions={(x) => x}
                            value={personalManager}
                            onSelect={this.onManagerSelect}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    onChange={this.onManagerChange}
                                    className={cnCreateClientDialog('Field', { type: 'personalManager' })}
                                    label="Персональный менеджер"
                                    variant="outlined"
                                    InputProps={{
                                        ...params.InputProps,
                                        endAdornment: (
                                            <React.Fragment>
                                                {managerSuggestLoading ? <CircularProgress color="inherit" size={20} /> : null}
                                                {params.InputProps.endAdornment}
                                            </React.Fragment>
                                        ),
                                    }}
                                />
                            )}
                        />
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
                    <h1>Контактное лицо</h1>
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
                        <AdressSuggest label="Почтовый адрес" value={address} onSelect={this.onPostAdressChange} />
                    </div>

                    <div className={cnCreateClientDialog('Row')}>
                        <AdressSuggest label="Юридический адрес" value={legalAddress} onSelect={this.onLegalAdressChange} />
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
                <DialogActions className={cnCreateClientDialog('Actions')}>
                    <div>
                        {id && (
                            <Button onClick={this.handleDeleteClient} color="secondary">
                                Удалить
                            </Button>
                        )}
                    </div>

                    <DialogActions>
                        <Button onClick={onClose} color="primary">
                            Отменить
                        </Button>
                        <Button onClick={this.saveClickHandler} color="primary" variant="contained" disabled={isDisabledCreate}>
                            {id ? 'Сохранить' : 'Создать'}
                        </Button>
                    </DialogActions>
                </DialogActions>
            </Dialog>
        )
    }
}