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
import { Pagination } from '@material-ui/lab';
import { IManagersSpravProps } from '.';

const cnManagersSprav = cn('ManagersSprav');

interface IOwnState {
    showCreateDialog: boolean;
    selectedManager?: IManager;
};

export class ManagersSpravBase extends PureComponent<IManagersSpravProps, IOwnState> {
    state: IOwnState = {
        showCreateDialog: false,
    }

    componentDidMount() {
        this.props.getManagers({});
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
        window.location.reload();
    }

    handlerCloseDialog = () => {
        this.setState({ showCreateDialog: false });
    }

    handlerOpenDialog = () => {
        this.setState({ showCreateDialog: true });
    }

    onSearchChange = (event) => {
        this.props.onSearch(event.target.value);
    }

    render() {
        const { search, items, page, total, changePage, onDeleteManager } = this.props;
        const { selectedManager } = this.state;

        return (
            <div className={cnManagersSprav()}>
                <div className={cnManagersSprav('Controls')}>
                    <TextField className={cnManagersSprav('Search')} onChange={this.onSearchChange} variant="outlined" size='small' label="Поиск" type="search" value={search} />
                    <Button className={cnManagersSprav('AddButton')} variant="contained" color="primary" onClick={this.onCreateClick}>
                        Добавить менеджера
                    </Button>
                </div>

                <CreateManagerDialog
                    open={this.state.showCreateDialog}
                    onClose={this.handlerCloseDialog}
                    onCreateManager={this.onCreateManager}
                    onDeleteManager={onDeleteManager}
                    manager={selectedManager} />

                <TableContainer component={Paper} className={cnManagersSprav('Table')}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Ф.И.О.</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {total === 0 && (
                                <TableRow>
                                    <TableCell component="th" scope="row">
                                        Ничего не найдено
                                    </TableCell>
                                </TableRow>
                            )}
                            {items.map((manager) => (
                                <TableRow className={cnManagersSprav('Row')} key={String(manager.id)} hover onClick={this.onSelectManager(manager.id)}>
                                    <TableCell component="th" scope="row">
                                        {`${manager.lastName} ${manager.firstName} ${manager.middleName}`}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                {Boolean(total) && (
                    <div className="Pagination">
                        <Pagination size="large" count={Math.ceil(total / 25) || 1} page={page} onChange={(event, value) => changePage(value)} />
                    </div>
                )}
            </div>
        )
    }
}