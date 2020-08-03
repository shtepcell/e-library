import React, { FunctionComponent } from 'react';
import { cn } from '@bem-react/classname';
import { IClassNameProps } from '@bem-react/core';

import { Card } from '../Card';
import { Link } from '../../../../components/Link';

import './Menu.scss';

const cnMenu = cn('Menu');

interface IMenuProps extends IClassNameProps {}

const tabs = [
    { title: 'Контракты', url: '/', key: 'contracts' },
    { title: 'Настройки', url: '/settings', key: 'settings' },
];

export const Menu: FunctionComponent<IMenuProps> = ({ className }) => {
    return (
        <Card className={cnMenu(null, [className])}>
            {tabs.map(({ title, url, key }) => (
                <Link key={key} className={cnMenu('Tab', { active: key === 'contracts' })} href={url}>
                    {title}
                </Link>
            ))}
        </Card>
    )
}