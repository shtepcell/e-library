import React, { PureComponent } from 'react';
import { cn } from '@bem-react/classname';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import { Filters } from './components/Filters/Filters';
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

    handlerCloseDialog = () => {
        this.setState({ openCreateDialog: false });
    }

    handlerClickAddButton = () => {
        this.setState({ openCreateDialog: true });
    }

    componentDidMount() {
        this.props.getContracts({});
    }

    render() {
        const { page, total, items, changePage, loading } = this.props;

        return (
            <div className={cnMainPage()}>
                <Header type="main" />
                {/* <Filters onChange={this.onFiltersChange} disabledStatuses={disabledStatuses} /> */}
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