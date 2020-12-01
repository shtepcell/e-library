import { request } from '@lib/request';
import { createReducer, createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { IDocument } from '@typings/IDocument';

export const changePage = createAction<number>('changePageDocuments');
export const onFiltersChange = createAction<any>('onDocumentFiltersChange');

export const getDocuments = createAsyncThunk<any, any>('getDocuments', ({ page, filters = {} } = {}, { getState }) => {
    return request
        .get('/documents', {
            params: {
                limit: 25,
                page: page,
                type: filters.type,
                orig: filters.orig,
                contract: filters.contract,
                period: filters.period,
                trackNumber: filters.trackNumber,
                client: filters.client,
            }
        })
        .then(({ data }) => data);
})

export interface IDocumentsState {
    items: IDocument[];
    total: number;
    page: number;
    loading?: boolean;
    filters: {
        id?: string;
        contract?: string;
        period?: number;
        type?: string;
        orig?: string;
        trackNumber?: string;
        client?: string;
    };
}

const initialState: IDocumentsState = {
    items: [],
    total: 0,
    page: 1,
    filters: {},
};

export const documentssReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(getDocuments.fulfilled, (state, action) => {
            state.items = action.payload.items;
            state.total = action.payload.total;
        })

        .addCase(changePage, (state, action) => {
            state.page = action.payload;
        })

        .addCase(onFiltersChange, (state, action) => {
            state.filters = action.payload;
            state.page = 1;
        })
});


export const documentsMiddleware = store => next => action => {
    switch (action.type) {
        case changePage.type:
            store.dispatch(getDocuments({ page: action.payload }));
            break;

        case onFiltersChange.type:
            store.dispatch(getDocuments({ page: 1, filters: action.payload }));
            break;

        case getDocuments.rejected.type:
            console.error('Error', action.payload);
            break;
    }

    next(action);
};
