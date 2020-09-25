import React, { PureComponent } from 'react';
import { cn } from '@bem-react/classname';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

import './ClientsSprav.scss';
import Paper from '@material-ui/core/Paper';
import { request } from '@lib/request';
import Button from '@material-ui/core/Button';
import { CreateClientDialog } from './components/CreateClientDialog/CreateClientDialog';

const cnClientsSprav = cn('ClientsSprav');

interface IOwnProps {
};

interface IOwnState {
    adressSuggest: string[];
    showCreateDialog: boolean;
};

function createData(name, calories, fat, carbs) {
    return { name, calories, fat, carbs };
  }

  const rows = [
    createData('ПАО "РНКБ"', 'Симферополь', 'Иванов П.П.', '20.10.2020'),
    createData('ООО ГАЗПРОМ', 'Симферополь', 'Золотов И.А.','09.05.2017'),
    createData('ИП Яблоко', 'Севастополь', 'Коричнева З.С.', '31.12.2018'),
    createData('Меганом', 'Севастополь', 'Елка Х.В.', '03.01.2010'),
    createData('Магазинчик', 'Ялта', 'Ранимова О.О.', '11.09.2019'),
  ];

export class ClientsSprav extends PureComponent<IOwnProps, IOwnState> {
    state = {
        adressSuggest: [],
        showCreateDialog: false,
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
                                <TableCell>Наименования</TableCell>
                                <TableCell align="right">Департамент</TableCell>
                                <TableCell align="right">Персональный менеджер</TableCell>
                                <TableCell align="right">Дата регистрации</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <TableRow key={row.name}>
                                    <TableCell component="th" scope="row">
                                        {row.name}
                                    </TableCell>
                                    <TableCell align="right">{row.calories}</TableCell>
                                    <TableCell align="right">{row.fat}</TableCell>
                                    <TableCell align="right">{row.carbs}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        )
    }
}