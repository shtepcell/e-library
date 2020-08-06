import React, { FunctionComponent } from 'react';
import { cn } from '@bem-react/classname';
import { IClassNameProps } from '@bem-react/core';
import { version } from '../../../../../package.json';

import { Card } from '../Card';
import { Icon } from '@components/Icon';

import './About.scss';

const cnAbout = cn('About');

interface IAboutProps extends IClassNameProps {}

export const About: FunctionComponent<IAboutProps> = ({ children, className }) => {
    return (
        <>
            <Card className={cnAbout(null, [className])}>
                <div className={cnAbout('Logo')}>
                    <Icon size="l" view="logo-white" />
                </div>
                <div className={cnAbout('Info')}>
                    <div className={cnAbout('Name')}>
                        Электронный архив
                    </div>
                    <div className={cnAbout('Corp')}>
                        ООО "Миранда-Медиа"
                    </div>
                </div>
            </Card>
            <div className={cnAbout('Version')}>
                Версия приложения: v{version}
            </div>
        </>
    )
}