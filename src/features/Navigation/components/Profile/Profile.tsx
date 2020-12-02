import React, { FunctionComponent } from 'react';
import { cn } from '@bem-react/classname';
import { IClassNameProps } from '@bem-react/core';

import { Card } from '../Card';
import { Icon } from '@components/Icon';

import './Profile.scss';

const cnProfile = cn('Profile');

interface IProfileProps extends IClassNameProps {
    name?: string;
    department?: string;
}

export const Profile: FunctionComponent<IProfileProps> = ({ children, className, name, department }) => {
    return (
        <Card className={cnProfile(null, [className])}>
            <div className={cnProfile('Info')}>
                <div className={cnProfile('Name')}>
                    {name}
                </div>
                <div className={cnProfile('Department')}>
                    {department}
                </div>
            </div>
            <a className={cnProfile('Logout')} href="/logout">
                <Icon size="m" view="logout" />
            </a>
        </Card>
    )
}