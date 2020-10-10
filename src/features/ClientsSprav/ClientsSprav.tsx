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

interface IOwnProps {
};

interface IOwnState {
    adressSuggest: string[];
    showCreateDialog: boolean;
    clients: IClient[];
};

export class ClientsSprav extends PureComponent<IOwnProps, IOwnState> {
    state = {
        adressSuggest: [],
        showCreateDialog: false,
        clients: [],
    }

    componentDidMount() {
        request.get('/clients').then(({ data }) => {
            this.setState({ clients: data });
        })
    }

    handleAdressChange = (event) => {
        request
            .post('/suggest/adress', { value: event.target.value })
            .then(res => {
                if (!res.data.result) this.setState({adressSuggest: [] });

                this.setState({
                    adressSuggest: res.data.result.map(item => item.fullName),
                })
            })
    }

    handlerCloseDialog = () => {
        this.setState({ showCreateDialog: false });
    }

    handlerOpenDialog = () => {
        this.setState({ showCreateDialog: true });
    }

    render() {
        return (
            <div className={cnClientsSprav()}>
                {/* <div className={cnClientsSprav('Adress')}>
                    <Autocomplete
                        id="combo-box-demo"
                        filterOptions={(x) => x}
                        options={this.state.adressSuggest}
                        getOptionLabel={(option) => option}
                        renderInput={(params) => <TextField {...params} onChange={this.handleAdressChange} label="Адрес" variant="outlined" />}
                    />
                </div> */}
                <div className={cnClientsSprav('Controls')}>
                    <TextField className={cnClientsSprav('Search')} variant="outlined" size='small' label="Поиск" type="search" />
                    <Button className={cnClientsSprav('AddButton')} variant="contained" color="primary" onClick={this.handlerOpenDialog}>
                        Создать клиента
                    </Button>
                </div>

                <CreateClientDialog open={this.state.showCreateDialog} onClose={this.handlerCloseDialog}/>
                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell className={cnClientsSprav('Column', { type: 'name'})} >Наименования</TableCell>
                                <TableCell className={cnClientsSprav('Column', { type: 'department'})} align="center">Департамент</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.clients.map(client => (
                                <TableRow key={client.id}>
                                    <TableCell className={cnClientsSprav('Column', { type: 'name'})} component="th" scope="row">
                                        {client.name}
                                    </TableCell>
                                    <TableCell className={cnClientsSprav('Column', { type: 'department'})} align="center">{client.department}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                <Pagination className={cnClientsSprav('Pagination')} count={10} size="large" />
            </div>
        )
    }
}