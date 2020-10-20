import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "@reduxjs/toolkit";

import { changePage, getContracts, onFiltersChange } from "@store/modules/contracts";
import { IAppState } from "@store";

import { MainPageBase } from "./MainPage";

type IStateToProps = IAppState["contracts"];

interface IDispatchToProps {
    getContracts: typeof getContracts;
    changePage: typeof changePage;
    onFiltersChange: typeof onFiltersChange;
}

export interface IContractsSpravProps extends IStateToProps, IDispatchToProps {};

export function stateToProps({ contracts }: IAppState): IStateToProps {
    return contracts;
}


export function dispatchToProps(dispatch: Dispatch): IDispatchToProps {
    return bindActionCreators({ getContracts, changePage, onFiltersChange }, dispatch);
}

export const MainPage = connect(stateToProps, dispatchToProps)(MainPageBase);