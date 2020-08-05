import ReactDOM from 'react-dom';
import React from 'react';

import { Navigation } from './features/Navigation/Navigation';
import { Header } from './features/Header/Header';

import './Root.scss';

ReactDOM.render(
    <div className="Root">
        <Navigation />
        <div className="Right">
            <Header />
            <div className="Foot"></div>
        </div>
    </div>,
    document.getElementById('react-root'),
);
