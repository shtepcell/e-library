import React, { FunctionComponent } from 'react';
import { cn } from '@bem-react/classname';

import { Navigation } from '../Navigation/Navigation';
import { Header } from '../Header/Header';

import './Page.scss';

interface IPageProps {
    type: PageType;
}

const cnPage = cn('Page');

export const Page: FunctionComponent<IPageProps> = ({ children, type }) => {
    return (
        <>
            <Navigation page={type} />
            <div className={cnPage()}>
                <div className={cnPage('Content')}>
                    <Header />
                    {children}
                </div>
            </div>
        </>
    );
}