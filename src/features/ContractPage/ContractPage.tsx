import React, { PureComponent } from 'react';
import { cn } from '@bem-react/classname';
import { request } from '@lib/request';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Contract } from './components/Contract/Contract';
import { Header } from '@features/Header/Header';

import { IContract } from '@typings/IContract';

import './ContractPage.scss';

const cnContractPage = cn('ContractPage');

interface IContractPageProps {
    contractId?: string;
};

interface IContractPageState {
    contract?: IContract;
    loading: boolean;
};

export class ContractPage extends PureComponent<IContractPageProps, IContractPageState> {
    state: IContractPageState = {
        loading: false,
    }

    componentDidMount() {
        request
            .get(`contract/${window.location.pathname.split('/')[2]}`)
            .then(res => {
                this.setState({
                    contract: res.data,
                    loading: false,
                })
            });
    }

    render() {
        const { loading, contract } = this.state;

        if (loading) {
            return (
                <div className={cnContractPage()}>
                    <div className={cnContractPage('Progress')}>
                        <CircularProgress color="primary" />
                    </div>
                </div>
            )
        }

        return (
            <>
                <Header type="contract" />
                <div className={cnContractPage()}>
                    <Contract contract={contract} />
                </div>
            </>
        )
    }
}