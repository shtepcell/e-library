import ReactDOM from 'react-dom';
import React, { FunctionComponent } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { Provider } from 'react-redux'
import DayJsUtils from '@date-io/dayjs';
import ru from 'dayjs/locale/ru';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

import { Page } from '@features/Page/Page';
import { MainPage } from '@features/MainPage';
import { ContractPage } from '@features/ContractPage';
import { SpravPage, SpravTabs } from '@features/SpravPage/SpravPage';
import { DocumentsPage } from '@features/DocumentsPage';
import { store } from './store';

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
                <Route path="/sprav/clients">
                    <Page type="sprav">
                        <SpravPage tab={SpravTabs.Clients} />
                    </Page>
                </Route>
                <Route path="/sprav/managers">
                    <Page type="sprav">
                        <SpravPage tab={SpravTabs.Managers} />
                    </Page>
                </Route>
                <Route path="/sprav">
                    <Page type="sprav">
                        <SpravPage tab={SpravTabs.Clients} />
                    </Page>
                </Route>
                <Route path="/documents">
                    <Page type="documents">
                        <DocumentsPage />
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
    <Provider store={store}>
        <ThemeProvider theme={theme}>
            <MuiPickersUtilsProvider utils={DayJsUtils} locale={ru}>
                <Router>
                    <Root />
                </Router>
            </MuiPickersUtilsProvider>
        </ThemeProvider>
    </Provider>,
    document.getElementById('react-root'),
);
