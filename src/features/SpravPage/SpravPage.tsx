import React, { PureComponent } from 'react';
import { cn } from '@bem-react/classname';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { ClientsSprav } from '@features/ClientsSprav/ClientsSprav';
import { ManagersSprav } from '@features/ManagersSprav/ManagersSprav';

import './SpravPage.scss';

const cnSpravPage = cn('SpravPage');

interface IOwnProps {
    tab: string;
};

interface IOwnState {
    tab?: string;
};

interface TabPanelProps {
    children?: React.ReactNode;
    index: any;
    value: any;
  }

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`nav-tabpanel-${index}`}
        aria-labelledby={`nav-tab-${index}`}
        {...other}
      >
        {value === index && (
          children
        )}
      </div>
    );
}

export enum SpravTabs { Clients = 'clients', Managers = 'managers' };

export class SpravPage extends PureComponent<IOwnProps, IOwnState> {
    state = {
        tab: this.props.tab,
    }

    handleTabChange = (event, tab) => {
        this.setState({ tab });
        window.history.replaceState(null, null, `/sprav/${tab}`);
    }

    render() {

        return (
            <>
                <div className={cnSpravPage()}>
                    <div className={cnSpravPage('Title')}>Справочники</div>
                    <Tabs
                        className={cnSpravPage('Tabs')}
                        value={this.state.tab}
                        onChange={this.handleTabChange}
                        indicatorColor="primary"
                        textColor="primary"
                    >
                        <Tab label="Клиенты" value={SpravTabs.Clients} />
                        <Tab label="Менеджеры" value={SpravTabs.Managers} />
                    </Tabs>
                    <TabPanel value={this.state.tab} index={SpravTabs.Clients}>
                        <ClientsSprav />
                    </TabPanel>
                    <TabPanel value={this.state.tab} index={SpravTabs.Managers}>
                        <ManagersSprav />
                    </TabPanel>
                </div>
            </>
        )
    }
}