import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "@reduxjs/toolkit";

import {
    onSelectFile, createDocument, onChangeDate, onChangeNumber, onChangePeriod, onChangeTrack,
    onChangeType, onRemoveFile, saveDocument, onCloseDialog, onChangeComment,
 } from "@store/modules/contractPage";

import { IAppState } from "@store";

import { DocumentUploadBase } from "./DocumentUpload";

interface IStateToProps {
    draftDocument?: IAppState['contractPage']['draftDocument'];
    loading?: IAppState['contractPage']['loadingDocument'];
};

interface IDispatchToProps {
    onSelectFile: typeof onSelectFile;
    createDocument: typeof createDocument;
    onChangeType: typeof onChangeType;
    onChangeNumber: typeof onChangeNumber;
    onChangeTrack: typeof onChangeTrack;
    onChangePeriod: typeof onChangePeriod;
    onChangeDate: typeof onChangeDate;
    onChangeComment: typeof onChangeComment;
    onRemoveFile: typeof onRemoveFile;
    saveDocument: typeof saveDocument;
    onCloseDialog: typeof onCloseDialog;
}

export interface IDocumentUploadProps extends IStateToProps, IDispatchToProps {
    contractId?: string;
    open?: boolean;
    onClose(): void;
};

export function stateToProps({ contractPage }: IAppState): IStateToProps {
    return {
        draftDocument: contractPage.draftDocument,
        loading: contractPage.loadingDocument,
    };
}

export function dispatchToProps(dispatch: Dispatch): IDispatchToProps {
    return bindActionCreators({
        onSelectFile, createDocument, onChangeDate, onChangeNumber, onChangePeriod,
        onChangeTrack, onChangeType, onRemoveFile, saveDocument, onCloseDialog,
        onChangeComment,
    }, dispatch);
}

export const DocumentUpload = connect(stateToProps, dispatchToProps)(DocumentUploadBase);