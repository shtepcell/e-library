import { request } from '@lib/request';
import { createReducer, createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { IClient } from '@typings/IClient';
import { IAppState } from '..';

export const changePage = createAction<number>('changeClientsPage');
export const onSearch = createAction<string>('onSearchClient');

// @ts-ignore
export const getClients = createAsyncThunk<any, any | undefined>('getClients', ({ page, search } = {}, { getState }) => {
    const { clients } = getState() as IAppState;

    return request
        .get('/clients', {
            params: {
                limit: 25,
                page: page || clients.page,
                search: search || search === '' ? search : clients.search,
            }
        })
        .then(({ data }) => data);
})

export interface IClientsState {
    items: IClient[];
    total: number;
    page: number;
    search?: string;
}

const initialState: IClientsState = {
    items: [],
    total: 0,
    page: 1,
};

export const clientsReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(getClients.fulfilled, (state, action) => {
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


export const clientsMiddleware = store => next => action => {
    switch (action.type) {
        case changePage.type:
            store.dispatch(getClients({ page: action.payload }));
            break;

        case onSearch.type:
            store.dispatch(getClients({ search: action.payload, page: 1 }));
            break;
    }

    next(action);
};
