import ReactDOM from 'react-dom';
import React from 'react';

import { Person } from './features/Person';

ReactDOM.render(
    <div className="Root">
        <Person />
    </div>,
    document.getElementById('react-root'),
);
