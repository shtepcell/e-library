import React, { Component } from 'react';
import { cn } from '@bem-react/classname';
import './CreateManagerDialog.scss';
import {
    Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, MenuItem
} from '@material-ui/core';
import { IManager } from '@typings/IManager';
import { request } from '@lib/request';
import { i18n } from '@lib/i18n';

const cnCreateManagerDialog = cn('CreateManagerDialog');

interface IOwnProps {
    open?: boolean;
    manager?: IManager;
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

    componentDidUpdate(prevProps) {
        if (this.props.manager !== prevProps.manager) {
            this.setState({ manager: this.props.manager || {} });
        }
    }

    handlerManagerChange = (field: keyof IManager) => (event) => {
        const newManager = { ...this.state.manager };

        // @ts-ignore
        newManager[field] = event.target.value;

        this.setState({ manager: newManager });
    }

    createManagerHandler = () => {
        const { id } = this.state.manager;

        if (id) {
            request.patch(`/manager/${id}`, { ...this.state.manager }).then(() => {
                window.location.reload();
            });
        } else {
            request.post('/manager', { ...this.state.manager }).then(({ data }) => {
                this.props.onCreateManager(data as IManager);
                this.props.onClose()

                this.setState({ manager: {} });
            });
        }
    }

    // deleteManagerHandler = () => {
    //     request.delete(`/manager/${this.state.manager.id}`).then(() => {
    //         window.location.reload();
    //     });
    // }

    render() {
        const { open, onClose } = this.props;
        const { firstName, middleName, lastName, id } = this.state.manager;

        const canCreate = firstName && middleName && lastName;

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
                    </div>
                </DialogContent>

                <DialogActions className={cnCreateManagerDialog('Actions')}>
                    <Button onClick={onClose} color="primary">
                        Отменить
                    </Button>
                    <Button onClick={this.createManagerHandler} color="primary" variant="contained" disabled={!canCreate}>
                        {id ? 'Сохранить' : 'Добавить'}
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }
}