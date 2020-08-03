import React, { PureComponent } from 'react';
import { cn } from '@bem-react/classname';

import { Profile } from './components/Profile';
import { About } from './components/About';
import { Menu } from './components/Menu/Menu';

import './Navigation.scss';

const cnNavigation = cn('Navigation');

export class Navigation extends PureComponent {
    render() {
        return (
            <div className={cnNavigation()}>
                <div className={cnNavigation('Top')}>
                    <Profile className={cnNavigation('Card')} />
                    <Menu className={cnNavigation('Card')} />
                </div>
                <div className={cnNavigation('Bottom')}>
                    <About className={cnNavigation('Card')} />
                </div>
            </div>
        );
    }
}