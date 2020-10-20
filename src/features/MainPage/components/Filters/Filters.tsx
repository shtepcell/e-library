import React, { PureComponent } from 'react';
import { cn } from '@bem-react/classname';
import { Statuses } from '../../../../const/statuses';
import { i18n } from '@lib/i18n';

import './Filters.scss';
import { CircularProgress, MenuItem, TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { IFiltersProps } from '.';

const cnFilters = cn('Filters');

export class FiltersBase extends PureComponent<IFiltersProps> {
    onManagerTextChange = (event) => {
        this.props.getSuggestManagers(event.target.value);
    }

    onClientTextChange = (event) => {
        this.props.getSuggestClients(event.target.value);
    }

    onChangeId = (event) => {
        const value = event.target.value;
        this.props.onChange('id', value ? value : undefined);
    }

    onChangeType = (event) => {
        const value = event.target.value;
        this.props.onChange('type', value ? value : undefined);
    }

    onChangeStatus = (event) => {
        const value = event.target.value;
        this.props.onChange('status', value ? value : undefined);
    }

    onChangeOrig = (event) => {
        const value = event.target.value;
        this.props.onChange('orig', value ? value : undefined);
    }

    onChangeClient = (event) => {
        const value = event.target.value;
        this.props.onChange('client', value ? value : undefined);
    }

    onChangeManager = (event) => {
        const value = event.target.value;
        this.props.onChange('manager', value ? value : undefined);
    }


    render() {
        const { loading, suggestedClients, suggestedManagers} = this.props;

        return (
            <div className={cnFilters()}>
                <h2>Поисковые фильтры</h2>
                <div className={cnFilters('Row')}>
                    <TextField style={{ width: 120, marginRight: 12 }} variant="outlined" size="small" label="ID" type="search" onChange={this.onChangeId}/>
                    <TextField
                        style={{ width: 150, marginRight: 12 }}
                        select
                        onChange={this.onChangeStatus}
                        variant="outlined"
                        label="Статус"
                        size="small"
                    >
                        <MenuItem value=""><em>Не важно</em></MenuItem>
                        {Statuses.map(item=> <MenuItem value={i18n(item)}>{i18n(item)}</MenuItem>)}
                    </TextField>
                    <TextField
                        style={{ width: 180, marginRight: 12 }}
                        select
                        onChange={this.onChangeType}
                        variant="outlined"
                        label="Тип контракта"
                        size="small"
                    >
                        <MenuItem value=""><em>Не важно</em></MenuItem>
                        <MenuItem value="Договор">Договор</MenuItem>
                        <MenuItem value="Государственный контракт">Государственный контракт</MenuItem>
                    </TextField>
                    <TextField
                        style={{ width: 200, marginRight: 12 }}
                        select
                        onChange={this.onChangeOrig}
                        variant="outlined"
                        label="Оригинал в архиве"
                        size="small"
                    >
                        <MenuItem value=""><em>Не важно</em></MenuItem>
                        <MenuItem value="1">Да</MenuItem>
                        <MenuItem value="0">Нет</MenuItem>
                    </TextField>
                </div>
                <div className={cnFilters('Row')}>
                    <Autocomplete
                        style={{ flex: '1 1 auto', marginRight: 12 }}
                        options={suggestedClients || []}
                        noOptionsText="Нет доступных вариантов"
                        filterOptions={(x) => x}
                        loading={loading}
                        size="small"
                        onSelect={this.onChangeClient}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Клинет"
                                variant="outlined"
                                onChange={this.onClientTextChange}
                            />
                        )}
                    />
                    <Autocomplete
                        style={{ flex: '1 1 auto', marginRight: 12 }}
                        options={suggestedManagers}
                        noOptionsText="Нет доступных вариантов"
                        filterOptions={(x) => x}
                        size="small"
                        loading={loading}
                        loadingText="Загрузка..."
                        onSelect={this.onChangeManager}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                onChange={this.onManagerTextChange}
                                label="Сервис менеджер"
                                variant="outlined"
                            />
                        )}
                    />
                </div>
            </div>
        )
    }
}