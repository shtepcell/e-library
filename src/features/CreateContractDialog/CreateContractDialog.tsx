import React, { Component } from 'react';
import { cn } from '@bem-react/classname';
import './CreateContractDialog.scss';
import {
    Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, MenuItem
} from '@material-ui/core';
import { IContract, ContractType, ContractStatus } from '@typings/IContract';
import { KeyboardDatePicker } from '@material-ui/pickers';
import { Departments } from '@const/departments';
import { i18n } from '@lib/i18n';

const cnCreateContractDialog = cn('CreateContractDialog');

interface IOwnProps {
    open?: boolean;
    onClose?: () => void;
};

interface IOwnState {
    contract?: Partial<IContract>;
};

export class CreateContractDialog extends Component<IOwnProps, IOwnState> {
    state: IOwnState = {
        contract: {
            type: ContractType.Contract,
            status: ContractStatus.active,
            dateOfConclusion: new Date(),
        },
    }

    handlerContractChange = (field: keyof IContract) => (event) => {
        const newContract = { ...this.state.contract };

        // @ts-ignore
        newContract[field] = event.target.value;

        this.setState({ contract: newContract });
    }

    handleConclusionDateChange = (date) => {
        const newContract = { ...this.state.contract };

        newContract['dateOfConclusion'] = date;

        this.setState({ contract: newContract });
    };

    handleEndDateChange = (date) => {
        const newContract = { ...this.state.contract };

        newContract['endDate'] = date;

        this.setState({ contract: newContract });
    };

    render() {
        const { open, onClose } = this.props;
        const { type, department, status, serviceManager, personalManager, dateOfConclusion, endDate, amount } = this.state.contract;

        return (
            <Dialog open={open} onClose={onClose} fullWidth maxWidth="md" className={cnCreateContractDialog()}>
                <DialogTitle id="simple-dialog-title">Создание контракта</DialogTitle>
                <DialogContent>
                    <div className={cnCreateContractDialog('Row')}>
                        <TextField
                            className={cnCreateContractDialog('Field', { type: 'type' })}
                            select
                            value={type}
                            onChange={this.handlerContractChange('type')}
                            variant="outlined"
                            label="Тип контракта"
                            >
                                <MenuItem value={ContractType.Contract}>Договор</MenuItem>
                                <MenuItem value={ContractType.GovermentContract}>Государственный контракт</MenuItem>
                        </TextField>
                        <TextField
                            className={cnCreateContractDialog('Field', { type: 'department' })}
                            select
                            value={department}
                            onChange={this.handlerContractChange('department')}
                            variant="outlined"
                            label="Департамент"
                            >
                                {Departments.map(item => (<MenuItem value={item}>{item}</MenuItem>))}
                        </TextField>
                        <TextField
                            className={cnCreateContractDialog('Field', { type: 'status' })}
                            select
                            value={status}
                            onChange={this.handlerContractChange('status')}
                            variant="outlined"
                            label="Статус"
                            >
                                <MenuItem value={ContractStatus.active}>{i18n('active')}</MenuItem>
                                <MenuItem value={ContractStatus.blocked}>{i18n('blocked')}</MenuItem>
                                <MenuItem value={ContractStatus.waiting}>{i18n('waiting')}</MenuItem>
                                <MenuItem value={ContractStatus.deleted}>{i18n('deleted')}</MenuItem>
                        </TextField>
                    </div>
                    <div className={cnCreateContractDialog('Row')}>
                        <TextField
                            className={cnCreateContractDialog('Field', { type: 'client' })}
                            variant="outlined"
                            label="Клиент" />
                        <TextField
                            className={cnCreateContractDialog('Field', { type: 'serviceManager' })}
                            value={serviceManager}
                            onChange={this.handlerContractChange('serviceManager')}
                            variant="outlined"
                            label="Сервис-менеджер" />
                        <TextField
                            className={cnCreateContractDialog('Field', { type: 'personalManager' })}
                            value={personalManager}
                            onChange={this.handlerContractChange('personalManager')}
                            variant="outlined"
                            label="Персональный менеджер" />
                    </div>
                    <div className={cnCreateContractDialog('Row')}>
                        <TextField
                            className={cnCreateContractDialog('Field', { type: 'amount' })}
                            value={amount}
                            onChange={this.handlerContractChange('amount')}
                            variant="outlined"
                            label="Сумма контракта (с НДС)" />
                        <KeyboardDatePicker
                            className={cnCreateContractDialog('Field', { type: 'dateOfConclusion' })}
                            disableToolbar
                            format="DD.MM.YYYY"
                            id="date-picker-dialog"
                            label="Дата заключения контракта"
                            value={dateOfConclusion}
                            onChange={this.handleConclusionDateChange}
                            inputVariant="outlined"
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                        <KeyboardDatePicker
                            className={cnCreateContractDialog('Field', { type: 'endDate' })}
                            disableToolbar
                            format="DD.MM.YYYY"
                            id="date-picker-dialog"
                            label="Дата завершения действия контракта"
                            value={endDate}
                            onChange={this.handleEndDateChange}
                            inputVariant="outlined"
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
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