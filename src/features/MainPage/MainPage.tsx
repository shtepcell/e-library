import React, { PureComponent } from 'react';
import { cn } from '@bem-react/classname';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import { Filters } from './components/Filters/Filters';
import { ContractsList } from './components/ContractsList/ContractsList';

import './MainPage.scss';

import { IContract } from '@typings/IContract';

import { request } from '@lib/request';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Header } from '@features/Header/Header';

const cnMainPage = cn('MainPage');

interface IMainPageProps {};

interface IMainPageState {
    allContracts: IContract[];
    disabledStatuses?: Record<IContract["status"], boolean> | {};
    loading: boolean;
};

export class MainPage extends PureComponent<IMainPageProps, IMainPageState> {
    state: IMainPageState = {
        allContracts: [],
        disabledStatuses: {},
        loading: true,
    }

    onFiltersChange = (status: IContract["status"]) => {
        const { disabledStatuses } = this.state;
        const newStatus = !disabledStatuses[status];

        this.setState({
            disabledStatuses: {
                ...disabledStatuses,
                [status]: newStatus
            }
        });
    }

    componentDidMount() {
        request
            .get('/contracts')
            .then(response => {
                const contracts = response.data as IContract[];

                setTimeout(() => this.setState({
                    allContracts: contracts,
                    loading: false,
                }), 1000);
            })
    }

    render() {
        const { allContracts, disabledStatuses, loading } = this.state;

        const filteredContracts = allContracts.filter(({ status }) => {
            return !disabledStatuses[status];
        });

        return (
            <div className={cnMainPage()}>
                <Header type="main" />
                <Filters onChange={this.onFiltersChange} disabledStatuses={disabledStatuses} />
                {loading ? (
                    <div className={cnMainPage('Progress')}>
                        <CircularProgress  color="primary" />
                    </div>
                ) : (
                    <ContractsList contracts={filteredContracts} />
                )}
                <Fab className={cnMainPage('Add')} color="primary" aria-label="add">
                    <AddIcon />
                </Fab>
            </div>
        )
    }
}