import React, { PureComponent } from 'react';
import { cn } from '@bem-react/classname';

import './Header.scss';
import { ExcelButton } from '@components/ExcelButton/ExcelButton';

const cnHeader = cn('Header');

interface IHeaderProps {
    type: 'main' | 'contract' | 'documents';

    params?: any;
};
export class Header extends PureComponent<IHeaderProps> {
    renderMainHeader() {
        return (
            <div className={cnHeader()}>
                <div className={cnHeader('Left')}>
                    <div className={cnHeader('Name')}>Контракты</div>
                    {/* <ExcelButton className={cnHeader('Excel')} /> */}
                </div>
                <div className={cnHeader('Right')}>
                    {/* <TextField className={cnHeader('Search')} variant="outlined" size='small' label="Поиск" type="search" /> */}
                </div>
            </div>
        );
    }

    renderContractHeader() {
        const { params = {} } = this.props;
        const contractId = window.location.pathname.split('/')[2];

        return (
            <div className={cnHeader()}>
                <div className={cnHeader('Left')}>
                    <div className={cnHeader('Name')}>Контракт #{contractId}</div>
                    <ExcelButton className={cnHeader('Excel')} href={`/export/contract/${contractId}`}/>
                </div>
                <div className={cnHeader('Right')}>
                </div>
            </div>
        );
    }

    renderDocumentsHeader() {
        return (
            <div className={cnHeader()}>
                <div className={cnHeader('Left')}>
                    <div className={cnHeader('Name')}>Документы</div>
                    {/* <ExcelButton className={cnHeader('Excel')} /> */}
                </div>
            </div>
        );
    }

    render() {
        const { type } = this.props;

        switch(type) {
            case 'main':
                return this.renderMainHeader();

            case 'contract':
                return this.renderContractHeader();

            case 'documents':
                return this.renderDocumentsHeader();
        }
    }
}