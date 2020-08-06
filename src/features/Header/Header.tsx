import React, { FunctionComponent } from 'react';
import { cn } from '@bem-react/classname';
import TextField from '@material-ui/core/TextField';

import './Header.scss';

const cnHeader = cn('Header');

interface IHeaderProps {};

export const Header: FunctionComponent<IHeaderProps> = (props) => {
    return (
        <div className={cnHeader()}>
            <div className={cnHeader('Left')}>
                <div className={cnHeader('Name')}>Контракты</div>
            </div>
            <div className={cnHeader('Right')}>
                <TextField className={cnHeader('Search')} variant="outlined" size='small' label="Поиск" type="search" />
            </div>
        </div>
    )
}