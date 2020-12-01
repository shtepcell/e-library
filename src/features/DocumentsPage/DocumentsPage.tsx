import React, { PureComponent } from 'react';
import { cn } from '@bem-react/classname';

import './DocumentsPage.scss';

import { Header } from '@features/Header/Header';
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, TextField, MenuItem, Link } from '@material-ui/core';

import { DatePicker } from '@material-ui/pickers';
import { IDocumentsPageProps } from '.';
import moment from 'moment';
import { Pagination } from '@material-ui/lab';

const cnDocumentsPage = cn('DocumentsPage');

export class DocumentsPageBase extends PureComponent<IDocumentsPageProps> {
    componentDidMount() {
        this.props.getDocuments({});
    }

    onChangeType = (event) => {
        const value = event.target.value;
        this.props.onFiltersChange({ ...this.props.filters, type: value ? value : undefined });
    }

    onChangeOrig = (event) => {
        const value = event.target.value;
        this.props.onFiltersChange({ ...this.props.filters, orig: value ? value : undefined });
    }

    onChangeContract = (event) => {
        const value = event.target.value;
        this.props.onFiltersChange({ ...this.props.filters, contract: value ? value : undefined });
    }

    onChangePeriod = (value) => {
        this.props.onFiltersChange({ ...this.props.filters, period: value ? value.valueOf() : undefined });
    }

    onChangeTrackNumber = (event) => {
        const value = event.target.value;
        this.props.onFiltersChange({ ...this.props.filters, trackNumber: value ? value : undefined });
    }

    render() {
        const { items, total, page, changePage, filters } = this.props;

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
                        onChange={this.onChangeType}
                    >
                        <MenuItem value=""><em>Не важно</em></MenuItem>
                        <MenuItem value={'Акт оказанных услуг'}>Акт оказанных услуг</MenuItem>
                        <MenuItem value={'Акт свертки'}>Акт свертки</MenuItem>
                        <MenuItem value={'Бланк заказа'}>Бланк заказа</MenuItem>
                        <MenuItem value={'Письмо'}>Письмо</MenuItem>
                        <MenuItem value={'Претензия'}>Претензия</MenuItem>
                    </TextField>
                    <DatePicker
                        autoOk
                        className={cnDocumentsPage('FiltersField', { type: 'period' })}
                        views={['year', 'month']}
                        value={filters.period ? new Date(filters.period) : null}
                        onChange={this.onChangePeriod}
                        format="MM.YYYY"
                        defaultValue=""
                        id="date-picker-dialog"
                        label="Период"
                        clearLabel="Очистить"
                        size="small"
                        inputVariant="outlined"
                        clearable
                    />
                    <TextField className={cnDocumentsPage('FiltersField', { type: 'trackNumber' })} variant="outlined" size="small" label="Номер трека" onChange={this.onChangeTrackNumber} />
                    <TextField className={cnDocumentsPage('FiltersField', { type: 'contract' })} variant="outlined" size="small" label="Контракт" onChange={this.onChangeContract} />
                    <TextField
                        className={cnDocumentsPage('FiltersField', { type: 'orig' })}
                        select
                        size="small"
                        variant="outlined"
                        label="Оригинал"
                        onChange={this.onChangeOrig}
                    >
                        <MenuItem value=""><em>Не важно</em></MenuItem>
                        <MenuItem value={'has_orig'}>Оригинал есть</MenuItem>
                        <MenuItem value={'no_orig'}>Нет оригинала</MenuItem>
                    </TextField>
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
                                <TableCell align="center">Файл</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {items.map(row => (
                                <TableRow className={cnDocumentsPage('Row')} key={row.id}>
                                    <TableCell component="th" scope="row" align="left">
                                        {row.number}
                                    </TableCell>
                                    <TableCell align="left">{row.type}</TableCell>
                                    <TableCell align="center">{moment(row.period).format('MM.YYYY')}</TableCell>
                                    <TableCell align="center">
                                        <Link href={`/contract/${row.contract}`} target="_blank">#{row.contract}</Link>
                                    </TableCell>
                                    <TableCell align="center">{row.trackNumber}</TableCell>
                                    <TableCell align="center"><Link href={row.file} target="_blank">Открыть</Link></TableCell>
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