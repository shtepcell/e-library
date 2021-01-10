import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "@reduxjs/toolkit";

import { getDocument, onSwitchDocumentDialog, onPresetPeriod } from "@store/modules/contractPage";
import { IAppState } from "@store";

import { ContractPageBase } from "./ContractPage";

type IStateToProps = IAppState["contractPage"];

interface IDispatchToProps {
    getDocument: typeof getDocument;
    onSwitchDocumentDialog: typeof onSwitchDocumentDialog;
    onPresetPeriod: typeof onPresetPeriod;
}

export interface IContractPageProps extends IStateToProps, IDispatchToProps {
    contractId?: string;
};

export function stateToProps({ contractPage }: IAppState): IStateToProps {
    return contractPage;
}

export function dispatchToProps(dispatch: Dispatch): IDispatchToProps {
    return bindActionCreators({ getDocument, onSwitchDocumentDialog, onPresetPeriod }, dispatch);
}

export const ContractPage = connect(stateToProps, dispatchToProps)(ContractPageBase);