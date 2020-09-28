import React, { PureComponent } from 'react';
import { cn } from '@bem-react/classname';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';

import './ManagersSprav.scss';
import Paper from '@material-ui/core/Paper';
import { request } from '@lib/request';
import Button from '@material-ui/core/Button';
import { CreateManagerDialog } from './components/CreateClientDialog/CreateManagerDialog';
import { IManager } from '@typings/IManager';
import { i18n } from '@lib/i18n';

const cnManagersSprav = cn('ManagersSprav');

interface IOwnProps {
};

interface IOwnState {
    showCreateDialog: boolean;
    managers: IManager[];
};

export class ManagersSprav extends PureComponent<IOwnProps, IOwnState> {
    state = {
        showCreateDialog: false,
        managers: [],
    }

    componentDidMount() {
        request
            .get('/managers')
            .then(({ data }) => {
                this.setState({ managers: data });
            });
    }

    onCreateManager = (manager) => {
        this.setState({ managers: [ manager, ...this.state.managers]} )
    }

    handlerCloseDialog = () => {
        this.setState({ showCreateDialog: false });
    }

    handlerOpenDialog = () => {
        this.setState({ showCreateDialog: true });
    }

    render() {
        const { managers } = this.state;

        return (
            <div className={cnManagersSprav()}>
                <div className={cnManagersSprav('Controls')}>
                    <TextField className={cnManagersSprav('Search')} variant="outlined" size='small' label="Поиск" type="search" />
                    <Button className={cnManagersSprav('AddButton')} variant="contained" color="primary" onClick={this.handlerOpenDialog}>
                        Добавить менеджера
                    </Button>
                </div>

                <CreateManagerDialog open={this.state.showCreateDialog} onClose={this.handlerCloseDialog} onCreateManager={this.onCreateManager}/>
                <TableContainer component={Paper} className={cnManagersSprav('Table')}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Ф.И.О.</TableCell>
                                <TableCell align="center">Категория</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {managers.map((manager) => (
                                <TableRow key={manager._id} hover>
                                    <TableCell component="th" scope="row">
                                        {`${manager.lastName} ${manager.firstName} ${manager.middleName}`}
                                    </TableCell>
                                    <TableCell align="center">{i18n(manager.category)}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        )
    }
}