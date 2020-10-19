import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "@reduxjs/toolkit";

import { getDocument, onSwitchDocumentDialog, onSelectFile } from "@store/modules/contractPage";
import { IAppState } from "@store";

import { ContractPageBase } from "./ContractPage";

type IStateToProps = IAppState["contractPage"];

interface IDispatchToProps {
    getDocument: typeof getDocument;
    onSwitchDocumentDialog: typeof onSwitchDocumentDialog;
}

export interface IContractPageProps extends IStateToProps, IDispatchToProps {
    contractId?: string;
};

export function stateToProps({ contractPage }: IAppState): IStateToProps {
    return contractPage;
}

export function dispatchToProps(dispatch: Dispatch): IDispatchToProps {
    return bindActionCreators({ getDocument, onSwitchDocumentDialog }, dispatch);
}

export const ContractPage = connect(stateToProps, dispatchToProps)(ContractPageBase);