import ReactDOM from 'react-dom';
import React, { FunctionComponent } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";

import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

import { Page } from '@features/Page/Page';
import { MainPage } from '@features/MainPage/MainPage';
import { ContractPage } from '@features/ContractPage/ContractPage';

const theme = createMuiTheme({
  palette: {
    primary: {
        main: '#0183F6'
    },
  },
});

import './Root.scss';

export const Root: FunctionComponent<{}> = ({ children }) => {
    return (
        <div className="Root">
            <Switch>
                <Route path="/" exact>
                    <Page type="main">
                        <MainPage />
                    </Page>
                </Route>
                <Route path="/settings">
                    <Page type="settings">
                        Settings
                    </Page>
                </Route>
                <Route path="/sprav">
                    <Page type="sprav">
                        sprav
                    </Page>
                </Route>
                <Route path="/contract/:id" component={ContractPage}>
                    <Page type="main">
                        <ContractPage />
                    </Page>
                </Route>
                <Route>
                    <Page type="404">
                        Не найдено
                    </Page>
                </Route>
            </Switch>
        </div>
    );
}

ReactDOM.render(
    <ThemeProvider theme={theme}>
        <Router>
            <Root />
        </Router>

    </ThemeProvider>,
    document.getElementById('react-root'),
);
