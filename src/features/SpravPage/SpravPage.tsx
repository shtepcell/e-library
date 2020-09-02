import React, { PureComponent } from 'react';
import { cn } from '@bem-react/classname';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { ClientsSprav } from '@features/ClientsSprav/ClientsSprav';

import './SpravPage.scss';

const cnSpravPage = cn('SpravPage');

interface IOwnProps {
};

interface IOwnState {
    tab?: number;
};

export class SpravPage extends PureComponent<IOwnProps, IOwnState> {
    state = {
        tab: 0,
    }

    handleTabChange = (event, tab) => {
        this.setState({ tab });
    }

    render() {

        return (
            <>
                <div className={cnSpravPage()}>
                    <div className={cnSpravPage('Title')}>Спаровчники</div>
                    <Tabs
                        className={cnSpravPage('Tabs')}
                        value={this.state.tab}
                        onChange={this.handleTabChange}
                        indicatorColor="primary"
                        textColor="primary"
                    >
                        <Tab label="Клиенты" />
                        <Tab label="Менеджеры" />
                        <Tab label="Депертаменты" />
                    </Tabs>
                    <ClientsSprav />
                </div>
            </>
        )
    }
}