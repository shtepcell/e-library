import React, { PureComponent } from 'react';
import { cn } from '@bem-react/classname';

import './DocumentsPage.scss';

import { Header } from '@features/Header/Header';
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Link, TextField, MenuItem } from '@material-ui/core';
import { KeyboardDatePicker } from '@material-ui/pickers';

const cnDocumentsPage = cn('DocumentsPage');

interface IDocumentsPageProps {};

interface IDocumentsPageState {
    period?: Date;
};

function createData(type, period, contract, trackNumber) {
    return { type, period, contract, trackNumber };
}

const rows = [
    createData('Акт оказанных услуг', '11.2020', '1234', '8557-123'),
    createData('Акт свертки', '11.2020', '321','8557-365'),
    createData('Бланк заказа', '03.2019', '9484', '8556-409'),
    createData('Письмо', '03.2019', '8393', '8532-781'),
    createData('Претензия', '06.2020', '9382', '8553-990'),
    createData('Акт оказанных услуг', '11.2020', '1234', '8557-123'),
    createData('Акт свертки', '11.2020', '321','8557-365'),
    createData('Претензия', '06.2020', '9382', '8553-990'),
    createData('Акт свертки', '11.2020', '321','8557-365'),
    createData('Бланк заказа', '03.2019', '9484', '8556-409'),
    createData('Письмо', '03.2019', '8393', '8532-781'),
    createData('Бланк заказа', '03.2019', '9484', '8556-409'),
    createData('Письмо', '03.2019', '8393', '8532-781'),
    createData('Акт свертки', '11.2020', '321','8557-365'),
    createData('Письмо', '03.2019', '8393', '8532-781'),
    createData('Претензия', '06.2020', '9382', '8553-990'),
    createData('Акт свертки', '11.2020', '321','8557-365'),
    createData('Бланк заказа', '03.2019', '9484', '8556-409'),
    createData('Письмо', '03.2019', '8393', '8532-781'),
];

export class DocumentsPage extends PureComponent<IDocumentsPageProps, IDocumentsPageState> {
    state: IDocumentsPageState = {}

    handlePeriodChange = (date) => {
        this.setState({ period: date })
    }

    render() {
        return (
            <div className={cnDocumentsPage()}>
                <Header type="documents" />
                <div className={cnDocumentsPage('Filters')}>
                    <TextField
                        className={cnDocumentsPage('FiltersField', { type: 'type' })}
                        select
                        size="small"
                        variant="outlined"
                        label="Тип документа"
                        >
                            <MenuItem value={1}>Акт оказанных услуг</MenuItem>
                            <MenuItem value={2}>Акт свертки</MenuItem>
                            <MenuItem value={3}>Бланк заказа</MenuItem>
                            <MenuItem value={4}>Письмо</MenuItem>
                            <MenuItem value={5}>Претензия</MenuItem>
                    </TextField>
                    <KeyboardDatePicker
                        className={cnDocumentsPage('FiltersField', { type: 'period' })}
                        views={['year', 'month']}
                        disableToolbar
                        value={this.state.period}
                        onChange={this.handlePeriodChange}
                        format="MM.YYYY"
                        id="date-picker-dialog"
                        label="Период"
                        size="small"
                        inputVariant="outlined"
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />
                    <TextField className={cnDocumentsPage('FiltersField', { type: 'contract' })} variant="outlined" size="small" label="Контракт"/>
                    <TextField className={cnDocumentsPage('FiltersField', { type: 'contract' })} variant="outlined" size="small" label="Номер трека"/>
                </div>
                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>№</TableCell>
                                <TableCell align="left">Тип</TableCell>
                                <TableCell align="center">Период</TableCell>
                                <TableCell align="center">Контракт</TableCell>
                                <TableCell align="center">Номер трека</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row, index) => (
                                <TableRow key={index}>
                                    <TableCell component="th" scope="row" align="left">
                                        {index + 1}
                                    </TableCell>
                                    <TableCell align="left">{row.type}</TableCell>
                                    <TableCell align="center">{row.period}</TableCell>
                                    <TableCell align="center">
                                        <Link href={`/contract/${row.contract}`} target="_blank">#{row.contract}</Link>
                                    </TableCell>
                                    <TableCell align="center">{row.trackNumber}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        )
    }
}