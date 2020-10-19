import { request } from '@lib/request';
import { createReducer, createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { IContract } from '@typings/IContract';
import { IDocument } from '@typings/IDocument';
import { IAppState } from '..';

export const changePage = createAction<number>('changePageContracts');
export const onFiltersChange = createAction<any>('onFiltersChange');

// @ts-ignore
export const getContracts = createAsyncThunk<any, any | undefined>('getContracts', ({ page, filters } = {}, { getState }) => {
    const { contracts } = getState() as IAppState;
    const { id, type, status, client, manager, orig } = filters || contracts.filters || {};

    return request
        .get('/contracts', {
            params: {
                limit: 25,
                page: page || contracts.page,
                id, type, status, client, serviceManager: manager, orig
            }
        })
        .then(({ data }) => data);
})


export interface IContractsState {
    items: IContract[];
    total: number;
    page: number;
    loading?: boolean;
    filters: {
        id?: string;
        status?: string;
        type?: string;
        client?: string;
        serviceManager?: string;
        orig?: string;
    }
}

const initialState: IContractsState = {
    items: [],
    total: 0,
    page: 1,
    filters: {},
};

export const contractsReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(getContracts.fulfilled, (state, action) => {
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


export const contractsMiddleware = store => next => action => {
    switch (action.type) {
        case changePage.type:
            store.dispatch(getContracts({ page: action.payload }));
            break;

        case onFiltersChange.type:
            store.dispatch(getContracts({ page: 1, filters: action.payload }));
            break;

        case getContracts.rejected.type:
            console.error('Error', action.payload);
            break;
    }

    next(action);
};
