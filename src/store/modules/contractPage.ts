import { DOCUMENT_TYPES } from '@const/documents';
import { request } from '@lib/request';
import { createReducer, createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { IDocument } from '@typings/IDocument';

export const onSwitchDocumentDialog = createAction<boolean>('onSwitchDocumentDialog');
export const onSelectFile = createAction<string>('onSelectFileDocument');
export const onCloseDialog = createAction('onCloseDialogDocument');
export const onRemoveFile = createAction<string>('onRemoveFileDocument');
export const onChangeNumber = createAction<string>('onChangeNumberDocument');
export const onChangeType = createAction<string>('onChangeTypeDocument');
export const onChangePeriod = createAction<number>('onChangePeriodDocument');
export const onChangeDate = createAction<number>('onChangeDateDocument');
export const onChangeTrack = createAction<string>('onChangeTrackDocument');
export const onChangeOrig = createAction<boolean>('onChangeOrigDocument');

export const getDocument = createAsyncThunk<number>('getDoPartial<cument', (id) => {
    return request.get(`/document/${id}`).then(({ data }) => data);
});

export const createDocument = createAsyncThunk<void, FormData>('createDocument', (formData) => {
    return request.post('/document', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
});

export const saveDocument = createAsyncThunk<void, FormData>('saveDocument', (formData) => {
    return request.put(`/document/${formData.get('id')}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
});

export interface IContractPageState {
    draftDocument: Partial<IDocument>;
    loadingDocument?: boolean;
    openDocumentDialog?: boolean;
}

const initialState: IContractPageState = {
    draftDocument: {
        type: DOCUMENT_TYPES[0],
        period: new Date().valueOf(),
        date: new Date().valueOf(),
    }
};

export const contractPageReducer = createReducer(initialState, {
    [getDocument.fulfilled.type]: (state, action) => {
        let { date, period, ...documentData } = action.payload;

        date = new Date(date).valueOf();
        period = new Date(period).valueOf();
        state.draftDocument = {
            date,
            period,
            ...documentData,
        };

        state.openDocumentDialog = true;
    },

    [onSwitchDocumentDialog.type]: (state, action) => {
        state.openDocumentDialog = action.payload;
    },

    [onSelectFile.type]: (state, action) => {
        state.draftDocument.fileName = action.payload;
    },

    [onChangeDate.type]: (state, action) => {
        state.draftDocument.date = action.payload.valueOf();
    },

    [onChangePeriod.type]: (state, action) => {
        state.draftDocument.period = action.payload.valueOf();
    },

    [onChangeTrack.type]: (state, action) => {
        state.draftDocument.trackNumber = action.payload;
    },

    [onChangeType.type]: (state, action) => {
        state.draftDocument.type = action.payload;
    },

    [onChangeNumber.type]: (state, action) => {
        state.draftDocument.number = action.payload;
    },

    [createDocument.pending.type]: (state) => {
        state.loadingDocument = true;
    },

    [saveDocument.pending.type]: (state) => {
        state.loadingDocument = true;
    },

    [createDocument.rejected.type]: (state) => {
        state.loadingDocument = false;
    },

    [saveDocument.rejected.type]: (state) => {
        state.loadingDocument = false;
    },

    [onRemoveFile.type]: (state) => {
        state.draftDocument.fileName = undefined;
    },

    [onCloseDialog.type]: (state) => {
        state.draftDocument = initialState.draftDocument;
    }
});

export const contractPageMiddleware = store => next => action => {
    switch (action.type) {
        case createDocument.rejected.type:
        case saveDocument.rejected.type:
            window.alert('Ошибка')
            break;

        case createDocument.fulfilled.type:
        case saveDocument.fulfilled.type:
            window.location.reload();
            break;
    }

    next(action);
};
