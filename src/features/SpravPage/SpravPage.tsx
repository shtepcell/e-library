import React, { PureComponent } from 'react';
import { cn } from '@bem-react/classname';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { ClientsSprav } from '@features/ClientsSprav/ClientsSprav';
import { ManagersSprav } from '@features/ManagersSprav/ManagersSprav';

import './SpravPage.scss';
import TabContext from '@material-ui/lab/TabContext/TabContext';

const cnSpravPage = cn('SpravPage');

interface IOwnProps {
};

interface IOwnState {
    tab?: number;
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
                    <div className={cnSpravPage('Title')}>Справочники</div>
                    <Tabs
                        className={cnSpravPage('Tabs')}
                        value={this.state.tab}
                        onChange={this.handleTabChange}
                        indicatorColor="primary"
                        textColor="primary"
                    >
                        <Tab label="Клиенты" />
                        <Tab label="Менеджеры" />
                    </Tabs>
                    <TabPanel value={this.state.tab} index={0}>
                        <ClientsSprav />
                    </TabPanel>
                    <TabPanel value={this.state.tab} index={1}>
                        <ManagersSprav />
                    </TabPanel>
                </div>
            </>
        )
    }
}