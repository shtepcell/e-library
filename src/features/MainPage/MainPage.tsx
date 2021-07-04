import React, { PureComponent } from 'react';
import { cn } from '@bem-react/classname';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import { Filters } from './components/Filters';
import { ContractsList } from './components/ContractsList/ContractsList';

import './MainPage.scss';

import { IContract } from '@typings/IContract';

import CircularProgress from '@material-ui/core/CircularProgress';
import { Header } from '@features/Header/Header';
import { CreateContractDialog } from '@features/CreateContractDialog/CreateContractDialog';
import { Pagination } from '@material-ui/lab';
import { IContractsSpravProps } from '.';

const cnMainPage = cn('MainPage');

interface IMainPageState {
    allContracts: IContract[];
    disabledStatuses?: Record<IContract["status"], boolean> | {};
    loading: boolean;
    openCreateDialog: boolean;
};

export class MainPageBase extends PureComponent<IContractsSpravProps, IMainPageState> {
    state: IMainPageState = {
        allContracts: [],
        disabledStatuses: {},
        loading: true,
        openCreateDialog: false,
    }

    onFiltersChange = (field: string, value: string) => {
        const { filters, onFiltersChange } = this.props;

        onFiltersChange({ ...filters, [field]: value });
    }

    handlerCloseDialog = () => {
        this.setState({ openCreateDialog: false });
    }

    handlerClickAddButton = () => {
        this.setState({ openCreateDialog: true });
    }

    componentDidMount() {
        const search = location.search.substring(1);
        
        let filters = {};

        try {
            filters = JSON.parse('{"' + decodeURI(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}');
        } catch (err) {}
        
        this.props.onFiltersChange(filters);
        this.props.getContracts(filters);
    }

    render() {
        const { page, total, items, changePage, loading, filters } = this.props;

        return (
            <div className={cnMainPage()}>
                <Header type="main" />
                <Filters filters={filters} onChange={this.onFiltersChange} />
                {loading ? (
                    <div className={cnMainPage('Progress')}>
                        <CircularProgress  color="primary" />
                    </div>
                ) : (
                    <>
                        <ContractsList contracts={items} />
                        <div className="Pagination">
                            <Pagination size="large" count={Math.ceil(total / 25) || 1} page={page} onChange={(event, value) => changePage(value)} />
                        </div>
                    </>
                )}
                <Fab onClick={this.handlerClickAddButton} className={cnMainPage('Add')} color="primary" aria-label="add">
                    <AddIcon />
                </Fab>
                <CreateContractDialog open={this.state.openCreateDialog} onClose={this.handlerCloseDialog} />
            </div>
        )
    }
}