import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "@reduxjs/toolkit";

import { changePage, getClients, onSearch, onDeleteClient } from "@store/modules/clients";
import { IAppState } from "@store";
import { ClientsSpravBase } from "./ClientsSprav";

type IStateToProps = IAppState["clients"];

interface IDispatchToProps {
    getClients: typeof getClients;
    changePage: typeof changePage;
    onDeleteClient: typeof onDeleteClient;
    onSearch: typeof onSearch;
}

export interface IClientsSpravProps extends IStateToProps, IDispatchToProps {};

export function stateToProps({ clients }: IAppState): IStateToProps {
    return clients;
}


export function dispatchToProps(dispatch: Dispatch): IDispatchToProps {
    return bindActionCreators({ getClients, changePage, onSearch, onDeleteClient }, dispatch);
}

export const ClientsSprav = connect(stateToProps, dispatchToProps)(ClientsSpravBase);