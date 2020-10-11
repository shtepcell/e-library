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

const cnManagersSprav = cn('ManagersSprav');

interface IOwnProps {
};

interface IOwnState {
    showCreateDialog: boolean;
    managers: IManager[];
    selectedManager?: IManager;
    search?: string;
};

export class ManagersSprav extends PureComponent<IOwnProps, IOwnState> {
    state: IOwnState = {
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

    onSelectManager = (id: number) => () => {
        request
            .get(`/manager/${id}`)
            .then(({ data }) => {
                this.setState({ selectedManager: data });
                this.handlerOpenDialog();
            });
    }

    onCreateClick = () => {
        this.setState({ selectedManager: null });
        this.handlerOpenDialog();
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


    onSearchChange = (event) => {
        this.setState({ search:  event.target.value });

        request.get('/managers', {
            params: {
                search: event.target.value,
            }
        }).then(({ data }) => {
            this.setState({ managers: data });
        })
    }

    render() {
        const { managers, selectedManager, search } = this.state;

        return (
            <div className={cnManagersSprav()}>
                <div className={cnManagersSprav('Controls')}>
                    <TextField className={cnManagersSprav('Search')} onChange={this.onSearchChange} variant="outlined" size='small' label="Поиск" type="search" value={search} />
                    <Button className={cnManagersSprav('AddButton')} variant="contained" color="primary" onClick={this.onCreateClick}>
                        Добавить менеджера
                    </Button>
                </div>

                <CreateManagerDialog open={this.state.showCreateDialog} onClose={this.handlerCloseDialog} onCreateManager={this.onCreateManager} manager={selectedManager} />
                <TableContainer component={Paper} className={cnManagersSprav('Table')}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Ф.И.О.</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {managers.length === 0 && (
                                <TableRow>
                                    <TableCell component="th" scope="row">
                                        Ничего не найдено
                                    </TableCell>
                                </TableRow>
                            )}
                            {managers.map((manager) => (
                                <TableRow className={cnManagersSprav('Row')} key={String(manager.id)} hover onClick={this.onSelectManager(manager.id)}>
                                    <TableCell component="th" scope="row">
                                        {`${manager.lastName} ${manager.firstName} ${manager.middleName}`}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        )
    }
}