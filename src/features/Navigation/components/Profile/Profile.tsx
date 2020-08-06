import React, { FunctionComponent } from 'react';
import { cn } from '@bem-react/classname';
import { IClassNameProps } from '@bem-react/core';

import { Card } from '../Card';
import { Icon } from '@components/Icon';

import './Profile.scss';

const cnProfile = cn('Profile');

interface IProfileProps extends IClassNameProps {}

export const Profile: FunctionComponent<IProfileProps> = ({ children, className }) => {
    return (
        <Card className={cnProfile(null, [className])}>
            <div className={cnProfile('Info')}>
                <div className={cnProfile('Name')}>
                    Андрей Викторович Попович
                </div>
                <div className={cnProfile('Department')}>
                    B2B отдел
                </div>
            </div>
            <div className={cnProfile('Logout')}>
                <Icon size="m" view="logout" />
            </div>
        </Card>
    )
}