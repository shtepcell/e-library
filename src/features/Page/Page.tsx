import React, { FunctionComponent } from 'react';

import { Navigation } from '../Navigation/Navigation';
import { Header } from '../Header/Header';

interface IPageProps {
    type: PageType;
}

export const Page: FunctionComponent<IPageProps> = ({ children, type }) => {
    return (
        <>
            <Navigation page={type} />
            <div className="Right">
                <Header />
                {children}
                <div className="Foot"></div>
            </div>
        </>
    );
}