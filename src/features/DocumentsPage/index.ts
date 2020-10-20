import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "@reduxjs/toolkit";

import { changePage, getDocuments, onFiltersChange } from "@store/modules/documents";
import { IAppState } from "@store";

import { DocumentsPageBase } from "./DocumentsPage";

type IStateToProps = IAppState["documents"];

interface IDispatchToProps {
    getDocuments: typeof getDocuments;
    changePage: typeof changePage;
    onFiltersChange: typeof onFiltersChange;
}

export interface IDocumentsPageProps extends IStateToProps, IDispatchToProps {};

export function stateToProps({ documents }: IAppState): IStateToProps {
    return documents;
}


export function dispatchToProps(dispatch: Dispatch): IDispatchToProps {
    return bindActionCreators({ getDocuments, changePage, onFiltersChange }, dispatch);
}

export const DocumentsPage = connect(stateToProps, dispatchToProps)(DocumentsPageBase);