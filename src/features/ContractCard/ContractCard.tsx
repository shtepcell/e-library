import React, { FunctionComponent } from 'react';
import { cn } from '@bem-react/classname';

import { i18n } from '@lib/i18n';

import './ContractCard.scss';
import { Link } from '@components/Link';
import { IContract } from 'typings/IContract';

const cnContractCard = cn('ContractCard');

interface IContractCardProps {
    contract: IContract;
};

export const ContractCard: FunctionComponent<IContractCardProps> = ({ contract }) => {
    const { id, status } = contract;

    return (
        <Link className={cnContractCard({ status })}>
            <div className={cnContractCard('StatusLine')} />
            <div className={cnContractCard('Header')}>
                <div className={cnContractCard('Id')}>#{id}</div>
                <div className={cnContractCard('Status')}>{i18n('statuses', status)}</div>
            </div>
            <div className={cnContractCard('Client')}>ПАО "РНКБ"</div>
        </Link>
    )
}