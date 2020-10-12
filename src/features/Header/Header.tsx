import React, { PureComponent } from 'react';
import { cn } from '@bem-react/classname';
import TextField from '@material-ui/core/TextField';
import ErrorIcon from '@material-ui/icons/Error';
import WorkIcon from '@material-ui/icons/Work';

import './Header.scss';
import TooltipBase from '@material-ui/core/Tooltip';
import { withStyles } from '@material-ui/core/styles';

const cnHeader = cn('Header');

interface IHeaderProps {
    type: 'main' | 'contract' | 'documents';

    params?: any;
};

const Tooltip = withStyles((theme) => ({
    tooltip: {
      fontSize: 14,
    },
  }))(TooltipBase);

export class Header extends PureComponent<IHeaderProps> {
    renderMainHeader() {
        return (
            <div className={cnHeader()}>
                <div className={cnHeader('Left')}>
                    <div className={cnHeader('Name')}>Контракты</div>
                </div>
                <div className={cnHeader('Right')}>
                    {/* <TextField className={cnHeader('Search')} variant="outlined" size='small' label="Поиск" type="search" /> */}
                </div>
            </div>
        );
    }

    renderContractHeader() {
        const { params = {} } = this.props;

        return (
            <div className={cnHeader()}>
                <div className={cnHeader('Left')}>
                    <div className={cnHeader('Name')}>Контракт #{window.location.pathname.split('/')[2]}</div>
                    {/* <Tooltip className={cnHeader('Tooltip')} title="В работе" placement="bottom-start" arrow>
                        <WorkIcon color="primary" className={cnHeader('Icon')} />
                    </Tooltip>
                    <div className={cnHeader('Name')}>Контракт #321</div>
                    <div className={cnHeader('ContractStatus')}>
                        Активный
                    </div> */}
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