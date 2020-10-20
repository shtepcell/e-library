import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "@reduxjs/toolkit";

import { changePage, getManagers, onSearch } from "@store/modules/managers";
import { IAppState } from "@store";

import { ManagersSpravBase } from "./ManagersSprav";

type IStateToProps = IAppState["managers"];

interface IDispatchToProps {
    getManagers: typeof getManagers;
    changePage: typeof changePage;
    onSearch: typeof onSearch;
}

export interface IManagersSpravProps extends IStateToProps, IDispatchToProps {};

export function stateToProps({ managers }: IAppState): IStateToProps {
    return managers;
}


export function dispatchToProps(dispatch: Dispatch): IDispatchToProps {
    return bindActionCreators({ getManagers, changePage, onSearch }, dispatch);
}

export const ManagersSprav = connect(stateToProps, dispatchToProps)(ManagersSpravBase);