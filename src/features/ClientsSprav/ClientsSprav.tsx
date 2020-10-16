import React, { PureComponent } from 'react';
import { cn } from '@bem-react/classname';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';

import './ClientsSprav.scss';
import Paper from '@material-ui/core/Paper';
import { request } from '@lib/request';
import Button from '@material-ui/core/Button';
import { CreateClientDialog } from './components/CreateClientDialog/CreateClientDialog';
import { IClient } from '@typings/IClient';
import { IClientsSpravProps } from '.';
import { Pagination } from '@material-ui/lab';

const cnClientsSprav = cn('ClientsSprav');

interface IOwnState {
    adressSuggest: string[];
    showCreateDialog: boolean;
    selectedClient?: IClient;
};

export class ClientsSpravBase extends PureComponent<IClientsSpravProps, IOwnState> {
    state: IOwnState = {
        adressSuggest: [],
        showCreateDialog: false,
    }

    componentDidMount() {
        this.props.getClients({});
    }

    handlerCloseDialog = () => {
        this.setState({ showCreateDialog: false, selectedClient: undefined });
    }

    handlerOpenDialog = () => {
        this.setState({ showCreateDialog: true, selectedClient: undefined });
    }

    selectManagerHandler = (id: string) => () => {
        request
            .get(`/client/${id}`)
            .then(({ data }) => {
                this.setState({ selectedClient: data, showCreateDialog: true });
            })
    }

    onSearchChange = (event) => {
        this.props.onSearch(event.target.value);
    }

    render() {
        const { items, total, page, search, changePage } = this.props;
        const { selectedClient, showCreateDialog } = this.state;

        return (
            <div className={cnClientsSprav()}>
                <div className={cnClientsSprav('Controls')}>
                    <TextField className={cnClientsSprav('Search')} onChange={this.onSearchChange} variant="outlined" size='small' label="Поиск" type="search" value={search} />
                    <Button className={cnClientsSprav('AddButton')} variant="contained" color="primary" onClick={this.handlerOpenDialog}>
                        Создать клиента
                    </Button>
                </div>

                {showCreateDialog && <CreateClientDialog open={this.state.showCreateDialog} onClose={this.handlerCloseDialog} client={selectedClient}/>}
                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell className={cnClientsSprav('Column', { type: 'name'})} >Наименования</TableCell>
                                <TableCell className={cnClientsSprav('Column', { type: 'department'})} align="center">Департамент</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {items.map(client => (
                                <TableRow className={cnClientsSprav('Row')} key={client.id} onClick={this.selectManagerHandler(String(client.id))} hover>
                                    <TableCell className={cnClientsSprav('Column', { type: 'name'})} component="th" scope="row">
                                        {client.name}
                                    </TableCell>
                                    <TableCell className={cnClientsSprav('Column', { type: 'department'})} align="center">{client.department}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                <div className="Pagination">
                    <Pagination size="large" count={Math.ceil(total / 25) || 1} page={page} onChange={(event, value) => changePage(value)} />
                </div>
            </div>
        )
    }
}