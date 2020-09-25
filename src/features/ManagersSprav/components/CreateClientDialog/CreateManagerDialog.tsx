import React, { Component } from 'react';
import { cn } from '@bem-react/classname';
import './CreateManagerDialog.scss';
import {
    Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, MenuItem
} from '@material-ui/core';
import { ManagerType, IManager } from '@typings/IManager';

const cnCreateManagerDialog = cn('CreateManagerDialog');

interface IOwnProps {
    open?: boolean;
    onClose?: () => void;
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

    render() {
        const { open, onClose } = this.props;
        const { name, type } = this.state.manager;

        return (
            <Dialog open={open} onClose={onClose} fullWidth maxWidth="md" className={cnCreateManagerDialog()}>
                <DialogTitle id="simple-dialog-title">Менеджер</DialogTitle>
                <DialogContent>
                    <div className={cnCreateManagerDialog('Row')}>
                        <TextField
                            className={cnCreateManagerDialog('Field', { type: 'name' })}
                            value={name}
                            onChange={this.handlerManagerChange('name')}
                            variant="outlined"
                            label="ФИО" />

                        <TextField
                            className={cnCreateManagerDialog('Field', { type: 'type' })}
                            select
                            value={type}
                            onChange={this.handlerManagerChange('type')}
                            variant="outlined"
                            label="Категория"
                            >
                                <MenuItem value={ManagerType.PersonalManager}>Пероснальный менеджер</MenuItem>
                                <MenuItem value={ManagerType.ServiceManager}>Сервис-менеджер</MenuItem>
                        </TextField>

                    </div>
                </DialogContent>

                <DialogActions>
                    <Button onClick={onClose} color="primary">
                        Отменить
                    </Button>
                    <Button onClick={onClose} color="primary" variant="contained">
                        Добавить
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }
}