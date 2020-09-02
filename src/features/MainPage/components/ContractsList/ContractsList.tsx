import React, { PureComponent } from 'react';
import { cn } from '@bem-react/classname';
import { IContract } from '@typings/IContract';

import './ContractsList.scss';
import { Link } from '@components/Link/Link';

const cnContractsList = cn('ContractsList');

interface IContractsListProps {
    contracts: IContract[];
};

export class ContractsList extends PureComponent<IContractsListProps> {
    render() {
        const { contracts } = this.props;

        if (!contracts.length) {
            return (
                <div className={cnContractsList()}>
                    <div className={cnContractsList('NotFound')}>Ничего не найдено</div>
                </div>
            )
        }

        return (
            <div className={cnContractsList()}>
                <div className={cnContractsList('Row', { type: 'header' })}>
                    <div className={cnContractsList('Column', { type: 'id' })}>
                        ID
                    </div>
                    <div className={cnContractsList('Column', { type: 'client' })}>
                        <div className={cnContractsList('Client')}>Клиент</div>
                        <div className={cnContractsList('Date')}>Дата заключения</div>
                    </div>
                    <div className={cnContractsList('Column', { type: 'manager' })}>
                        Менеджер
                    </div>
                    <div className={cnContractsList('Column', { type: 'status' })}>
                        Статус
                    </div>
                </div>
                <div className={cnContractsList('Body')}>
                    {contracts.map(contract => this.renderContract(contract))}
                </div>
            </div>
        );
    }

    renderContract(contract: IContract) {
        const { client, id, status, dateOfConclusion = '01.01.1996' } = contract;

        return (
            <Link className={cnContractsList('Row')} href={`/contract/${id}`} key={id}>
                <div className={cnContractsList('Column', { type: 'id' })}>
                    #{id}
                </div>
                <div className={cnContractsList('Column', { type: 'client' })}>
                    <div className={cnContractsList('Client')}>{client.name}</div>
                    <div className={cnContractsList('Date')}>{dateOfConclusion}</div>
                </div>
                <div className={cnContractsList('Column', { type: 'manager' })}>
                    Писосий Андреевич Лукня
                </div>
                <div className={cnContractsList('Column', { type: 'status' })}>
                    {status}
                </div>
            </Link>
        );
    }

}