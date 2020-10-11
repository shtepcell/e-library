import React, { PureComponent } from 'react';
import { cn } from '@bem-react/classname';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import Pagination from '@material-ui/lab/Pagination';

import './ClientsSprav.scss';
import Paper from '@material-ui/core/Paper';
import { request } from '@lib/request';
import Button from '@material-ui/core/Button';
import { CreateClientDialog } from './components/CreateClientDialog/CreateClientDialog';
import { IClient } from '@typings/IClient';

const cnClientsSprav = cn('ClientsSprav');

interface IOwnProps {};

interface IOwnState {
    adressSuggest: string[];
    showCreateDialog: boolean;
    clients: IClient[];
    selectedClient?: IClient;
    search?: string;
};

export class ClientsSprav extends PureComponent<IOwnProps, IOwnState> {
    state: IOwnState = {
        adressSuggest: [],
        showCreateDialog: false,
        clients: [],
    }

    componentDidMount() {
        request.get('/clients').then(({ data }) => {
            this.setState({ clients: data });
        })
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
        this.setState({ search:  event.target.value });

        request.get('/clients', {
            params: {
                search: event.target.value,
            }
        }).then(({ data }) => {
            this.setState({ clients: data });
        })
    }

    render() {
        const { selectedClient, clients, showCreateDialog, search } = this.state;

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
                            {clients.map(client => (
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

                {/* <Pagination className={cnClientsSprav('Pagination')} count={10} size="large" /> */}
            </div>
        )
    }
}