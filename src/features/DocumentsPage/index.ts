import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "@reduxjs/toolkit";

import { changePage, getDocuments, onFiltersChange, IDocumentsState } from "@store/modules/documents";
import { getSuggestClients, ISuggestState } from "@store/modules/suggest";

import { IAppState } from "@store";

import { DocumentsPageBase } from "./DocumentsPage";

interface IStateToProps extends IDocumentsState {
    suggestCliensts?: ISuggestState['suggestedClients'];
    suggestLoading?: ISuggestState['loading'];
}

interface IDispatchToProps {
    getDocuments: typeof getDocuments;
    changePage: typeof changePage;
    onFiltersChange: typeof onFiltersChange;
    getSuggestClients: typeof getSuggestClients;
}

export interface IDocumentsPageProps extends IStateToProps, IDispatchToProps {};

export function stateToProps({ documents, suggest }: IAppState): IStateToProps {
    return { ...documents, suggestCliensts: suggest.suggestedClients, suggestLoading: suggest.loading };
}

export function dispatchToProps(dispatch: Dispatch): IDispatchToProps {
    return bindActionCreators({ getDocuments, changePage, onFiltersChange, getSuggestClients }, dispatch);
}

export const DocumentsPage = connect(stateToProps, dispatchToProps)(DocumentsPageBase);