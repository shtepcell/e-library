import React, { PureComponent } from 'react';
import { cn } from '@bem-react/classname';
import { request } from '@lib/request';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Contract } from './components/Contract/Contract';
import { Header } from '@features/Header/Header';

import { IContract } from '@typings/IContract';

import './ContractPage.scss';
import { CreateContractDialog } from '@features/CreateContractDialog/CreateContractDialog';
import { getFullName } from '@lib/helper';
import { IContractPageProps } from '.';

const cnContractPage = cn('ContractPage');

interface IContractPageState {
    contract?: IContract;
    documents?: any[];
    loading: boolean;
    openDialog?: boolean;
};

export class ContractPageBase extends PureComponent<IContractPageProps, IContractPageState> {
    state: IContractPageState = {
        loading: false,
    }

    componentDidMount() {
        request
            .get(`contract/${window.location.pathname.split('/')[2]}`)
            .then(({ data }) => {
                const { contract, documents } = data;

                this.setState({
                    contract,
                    documents,
                    loading: false,
                })
            });
    }

    handlerDialog = (value: boolean) => () => {
        this.setState({ openDialog: value });
    }

    render() {
        const { draftDocument, getDocument, onSwitchDocumentDialog, openDocumentDialog, onPresetPeriod } = this.props;
        const { loading, contract, openDialog, documents } = this.state;

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
                    <Contract
                        contract={contract}
                        onEditClick={this.handlerDialog(true)}
                        documents={documents}
                        draftDocument={draftDocument}
                        onSwitchDocumentDialog={onSwitchDocumentDialog}
                        onPresetPeriod={onPresetPeriod}
                        openDocumentDialog={openDocumentDialog}
                        onEditDocument={getDocument} />
                    <CreateContractDialog open={openDialog} onClose={this.handlerDialog(false)} contract={{
                        ...contract,
                        client: contract?.client?.name,
                        personalManager: contract && getFullName(contract?.personalManager),
                        serviceManager: contract && getFullName(contract.serviceManager),
                    }} />
                </div>
            </>
        )
    }
}