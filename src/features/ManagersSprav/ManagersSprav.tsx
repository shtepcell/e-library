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

const cnManagersSprav = cn('ManagersSprav');

interface IOwnProps {
};

interface IOwnState {
    showCreateDialog: boolean;
};

function createData(name, category) {
    return { name, category };
  }

  const rows = [
    createData('Иванов Сергей Иванович', 'Персональный менеджер'),
    createData('Петров Валерий Крипс', 'Сервис-менеджер'),
    createData('Анарич Светлана Пирова', 'Сервис-менеджер'),
    createData('Катрин Ростислав Евгениевич', 'Персональный менеджер'),
    createData('Алексеев Анатолий Григорьевич', 'Сервис-менеджер'),
    createData('Вал Петр Константинович', 'Персональный менеджер'),
  ];

export class ManagersSprav extends PureComponent<IOwnProps, IOwnState> {
    state = {
        showCreateDialog: false,
    }

    handlerCloseDialog = () => {
        this.setState({ showCreateDialog: false });
    }

    handlerOpenDialog = () => {
        this.setState({ showCreateDialog: true });
    }

    render() {
        return (
            <div className={cnManagersSprav()}>

                <div className={cnManagersSprav('Controls')}>
                    <TextField className={cnManagersSprav('Search')} variant="outlined" size='small' label="Поиск" type="search" />
                    <Button className={cnManagersSprav('AddButton')} variant="contained" color="primary" onClick={this.handlerOpenDialog}>
                        Добавить менеджера
                    </Button>
                </div>

                <CreateManagerDialog open={this.state.showCreateDialog} onClose={this.handlerCloseDialog}/>
                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>ФИО</TableCell>
                                <TableCell align="center">Категория</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <TableRow key={row.name}>
                                    <TableCell component="th" scope="row">
                                        {row.name}
                                    </TableCell>
                                    <TableCell align="center">{row.category}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        )
    }
}