import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "@reduxjs/toolkit";

import { IAppState } from "@store";

import { FiltersBase } from "./Filters";
import { IClient } from "@typings/IClient";
import { IManager } from "@typings/IManager";
import { getSuggestClients, getSuggestManagers } from "@store/modules/suggest";

type IStateToProps = {
    suggestedManagers: IManager[];
    suggestedClients: IClient[];
    loading?: boolean;
};

interface IDispatchToProps {
    getSuggestManagers: typeof getSuggestManagers;
    getSuggestClients: typeof getSuggestClients;
}

export interface IFiltersProps extends IStateToProps, IDispatchToProps {
    filters: any;
    onChange(field: string, value: string): void;
};

export function stateToProps({ suggest }: IAppState): IStateToProps {
    const { suggestedManagers, suggestedClients, loading } = suggest;

    return { suggestedManagers, suggestedClients, loading };
}


export function dispatchToProps(dispatch: Dispatch): IDispatchToProps {
    return bindActionCreators({ getSuggestManagers, getSuggestClients }, dispatch);
}

export const Filters = connect(stateToProps, dispatchToProps)(FiltersBase);