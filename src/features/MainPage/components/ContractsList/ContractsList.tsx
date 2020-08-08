import React, { FunctionComponent } from 'react';
import { cn } from '@bem-react/classname';
import { IContract } from '@typings/IContract';

import { ContractCard } from '../../../ContractCard/ContractCard';

import './ContractsList.scss';

const cnContractsList = cn('ContractsList');

interface IContractsListProps {
    contracts: IContract[];
};

export const ContractsList: FunctionComponent<IContractsListProps> = ({ contracts }) => {
    if (!contracts.length) {
        return (
            <div className={cnContractsList()}>
                <div className={cnContractsList('NotFound')}>Ничего не найдено</div>
            </div>
        )
    }

    return (
        <div className={cnContractsList()}>
            <div className={cnContractsList('Period')}>
                Август 2020
            </div>
            <div className={cnContractsList('Grid')}>
                {contracts.map((item, index) => {
                    return (
                        <ContractCard key={item.id} contract={item} />
                    );
                })}
            </div>

            <div className={cnContractsList('Period')}>
                Июль 2020
            </div>
            <div className={cnContractsList('Grid')}>
                {contracts.map((item, index) => {
                    return (
                        <ContractCard key={item.id} contract={item} />
                    );
                })}
            </div>

            <div className={cnContractsList('Period')}>
                Июнь 2020
            </div>
            <div className={cnContractsList('Grid')}>
                {contracts.map((item, index) => {
                    return (
                        <ContractCard key={item.id} contract={item} />
                    );
                })}
            </div>
        </div>
    )
}