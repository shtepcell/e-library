import React, { PureComponent } from 'react';
import { cn } from '@bem-react/classname';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import { Filters } from './components/Filters/Filters';
import { ContractsList } from './components/ContractsList/ContractsList';

import './ContractsPage.scss';

import { IContract } from '@typings/IContract';

import { request } from '@lib/request';
import CircularProgress from '@material-ui/core/CircularProgress';

const cnContractsPage = cn('ContractsPage');

interface IContractsPageProps {};

interface IContractsPageState {
    allContracts: IContract[];
    disabledStatuses?: Record<IContract["status"], boolean> | {};
    loading: boolean;
};

export class ContractsPage extends PureComponent<IContractsPageProps, IContractsPageState> {
    state: IContractsPageState = {
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
            <div className={cnContractsPage()}>
                <Filters onChange={this.onFiltersChange} disabledStatuses={disabledStatuses} />
                {loading ? (
                    <div className={cnContractsPage('Progress')}>
                        <CircularProgress  color="primary" />
                    </div>
                ) : (
                    <ContractsList contracts={filteredContracts} />
                )}
                <Fab className={cnContractsPage('Add')} color="primary" aria-label="add">
                    <AddIcon />
                </Fab>
            </div>
        )
    }
}