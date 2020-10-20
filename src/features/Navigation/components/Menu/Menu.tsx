import React, { FunctionComponent } from 'react';
import { cn } from '@bem-react/classname';
import { IClassNameProps } from '@bem-react/core';
import { Card } from '../Card';
import { Link } from '@components/Link';

import './Menu.scss';

const cnMenu = cn('Menu');

interface IMenuProps extends IClassNameProps {
    activePage: PageType;
}

const tabs = [
    { title: 'Контракты', url: '/', key: 'main' },
    { title: 'Документы', url: '/documents', key: 'documents' },
    { title: 'Справочники', url: '/sprav', key: 'sprav' },
    // { title: 'Настройки', url: '/settings', key: 'settings' },
];

export const Menu: FunctionComponent<IMenuProps> = ({ className, activePage }) => {
    return (
        <Card className={cnMenu(null, [className])}>
            {tabs.map(({ title, url, key }) => (
                <Link key={key} className={cnMenu('Tab', { active: key === activePage })} href={url}>
                    {title}
                </Link>
            ))}
        </Card>
    )
}