import { request } from '@lib/request';
import { createReducer, createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { IDocument } from '@typings/IDocument';
import { IAppState } from '..';

export const onSwitchDocumentDialog = createAction<boolean>('onSwitchDocumentDialog');

export const getDocument = createAsyncThunk<number>('getDocument', (id) => {
    return request.get(`/document/${id}`).then(({ data }) => data);
});

export interface IContractPageState {
    draftDocument?: Partial<IDocument>;
    loadingDocument?: boolean;
    openDocumentDialog?: boolean;
}

const initialState: IContractPageState = {};

export const contractPageReducer = createReducer(initialState, {
    [getDocument.fulfilled.type]: (state, action) => {
        state.draftDocument = action.payload;
        state.openDocumentDialog = true;
    },

    [onSwitchDocumentDialog.type]: (state, action) => {
        state.openDocumentDialog = action.payload;
    }
});

export const contractPageMiddleware = store => next => action => {
    switch (action.type) {

    }

    next(action);
};
