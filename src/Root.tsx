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
import { ContractsPage } from '@features/ContractsPage/ContractsPage';

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
                    <Page type="contracts">
                        <ContractsPage />
                    </Page>
                </Route>
                <Route path="/settings">
                    <Page type="settings">
                        Settings
                    </Page>
                </Route>
                <Route>
                    <Page type="settings">
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
