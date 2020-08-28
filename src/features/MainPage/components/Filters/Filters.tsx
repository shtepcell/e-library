import React, { FunctionComponent } from 'react';
import { cn } from '@bem-react/classname';
import Link from '@material-ui/core/Link';
import statuses from '../../../../const/statuses';
import { i18n } from '@lib/i18n';
import { IContract } from '@typings/IContract';

import './Filters.scss';

const cnFilters = cn('Filters');

interface IFiltersProps {
    disabledStatuses: Record<IContract["status"], boolean> | {};

    onChange(id: string): void;
};


export const Filters: FunctionComponent<IFiltersProps> = (props) => {
    const { onChange, disabledStatuses = {} } = props;

    return (
        <div className={cnFilters()}>
            <div className={cnFilters('Name')}>Фильтры:</div>
            {statuses.map((item, id) => (
                <Link
                    key={id}
                    className={cnFilters('Link', { disabled: disabledStatuses[item] })}
                    onClick={() => onChange(item)}
                >
                    {i18n(item)}
                </Link>
            ))}
        </div>
    )
}