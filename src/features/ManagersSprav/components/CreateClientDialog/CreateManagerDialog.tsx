import React, { Component } from 'react';
import { cn } from '@bem-react/classname';
import './CreateManagerDialog.scss';
import {
    Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, MenuItem
} from '@material-ui/core';
import { ManagerType, IManager } from '@typings/IManager';
import { request } from '@lib/request';
import { i18n } from '@lib/i18n';

const cnCreateManagerDialog = cn('CreateManagerDialog');

interface IOwnProps {
    open?: boolean;
    onClose?: () => void;
    onCreateManager(manager: IManager): void;
};

interface IOwnState {
    manager?: Partial<IManager>;
};

export class CreateManagerDialog extends Component<IOwnProps, IOwnState> {
    state: IOwnState = {
        manager: {},
    }

    handlerManagerChange = (field: keyof IManager) => (event) => {
        const newManager = { ...this.state.manager };

        // @ts-ignore
        newManager[field] = event.target.value;

        this.setState({ manager: newManager });
    }

    createManagerHandler = () => {
        request.post('/manager', { ...this.state.manager }).then(() => {
            this.props.onCreateManager(this.state.manager as IManager);
            this.props.onClose()

            this.setState({ manager: {} });
        });
    }

    render() {
        const { open, onClose } = this.props;
        const { firstName, middleName, lastName, category } = this.state.manager;

        const canCreate = firstName && middleName && lastName && category;

        return (
            <Dialog open={open} onClose={onClose} fullWidth maxWidth="md" className={cnCreateManagerDialog()}>
                <DialogTitle id="simple-dialog-title">Менеджер</DialogTitle>
                <DialogContent>
                    <div className={cnCreateManagerDialog('Row')}>
                        <TextField
                            className={cnCreateManagerDialog('Field', { type: 'name' })}
                            value={lastName}
                            onChange={this.handlerManagerChange('lastName')}
                            variant="outlined"
                            label="Фамилия" />

                        <TextField
                            className={cnCreateManagerDialog('Field', { type: 'name' })}
                            value={firstName}
                            onChange={this.handlerManagerChange('firstName')}
                            variant="outlined"
                            label="Имя" />

                        <TextField
                            className={cnCreateManagerDialog('Field', { type: 'name' })}
                            value={middleName}
                            onChange={this.handlerManagerChange('middleName')}
                            variant="outlined"
                            label="Отчество" />

                        {/* <TextField
                            className={cnCreateManagerDialog('Field', { type: 'type' })}
                            select
                            value={category}
                            onChange={this.handlerManagerChange('category')}
                            variant="outlined"
                            label="Категория"
                            >
                                <MenuItem value={ManagerType.PersonalManager}>{i18n(ManagerType.PersonalManager)}</MenuItem>
                                <MenuItem value={ManagerType.ServiceManager}>{i18n(ManagerType.ServiceManager)}</MenuItem>
                        </TextField> */}

                    </div>
                </DialogContent>

                <DialogActions>
                    <Button onClick={onClose} color="primary">
                        Отменить
                    </Button>
                    <Button onClick={this.createManagerHandler} color="primary" variant="contained" disabled={!canCreate}>
                        Добавить
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }
}