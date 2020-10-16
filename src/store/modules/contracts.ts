import { request } from '@lib/request';
import { createReducer, createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { IContract } from '@typings/IContract';
import { IDocument } from '@typings/IDocument';
import { IAppState } from '..';

export const changePage = createAction<number>('changePageContracts');
export const onSearch = createAction<string>('onSearchContracts');

// @ts-ignore
export const getContracts = createAsyncThunk<any, any | undefined>('getContracts', ({ page, search } = {}, { getState }) => {
    const { contracts } = getState() as IAppState;

    return request
        .get('/contracts', {
            params: {
                limit: 25,
                page: page || contracts.page,
                search: search || search === '' ? search : contracts.search,
            }
        })
        .then(({ data }) => data);
})


export interface IContractsState {
    items: IContract[];
    total: number;
    page: number;
    search?: string;
    loading?: boolean;
}

const initialState: IContractsState = {
    items: [],
    total: 0,
    page: 1,
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

        .addCase(onSearch, (state, action) => {
            state.page = 1;
            state.search = action.payload;
        })
});


export const contractsMiddleware = store => next => action => {
    switch (action.type) {
        case changePage.type:
            store.dispatch(getContracts({ page: action.payload }));
            break;

        case onSearch.type:
            store.dispatch(getContracts({ search: action.payload, page: 1 }));
            break;
    }

    next(action);
};
