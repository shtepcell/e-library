import { request } from '@lib/request';
import { createReducer, createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { IManager } from '@typings/IManager';
import { IAppState } from '..';

export const changePage = createAction<number>('changeManagersPage');
export const onSearch = createAction<string>('onSearchManagers');

// @ts-ignore
export const getManagers = createAsyncThunk<any, any | undefined>('getManagers', ({ page, search } = {}, { getState }) => {
    const { managers } = getState() as IAppState;

    return request
        .get('/managers', {
            params: {
                limit: 25,
                page: page || managers.page,
                search: search || search === '' ? search : managers.search,
            }
        })
        .then(({ data }) => data);
})

export const onDeleteManager = createAsyncThunk<any, any>('onDeleteManager', (id: number) => {
    return request.delete(`/manager/${id}`);
})

export interface IManagersState {
    items: IManager[];
    total: number;
    page: number;
    search?: string;
    selectedManager?: IManager;
    showCreateDialog?: boolean;
    loading?: boolean;
}

const initialState: IManagersState = {
    items: [],
    total: 0,
    page: 1,
};

export const managersReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(getManagers.fulfilled, (state, action) => {
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


export const managersMiddleware = store => next => action => {
    switch (action.type) {
        case onDeleteManager.fulfilled.type:
            window.location.reload();
            break;

        case changePage.type:
            store.dispatch(getManagers({ page: action.payload }));
            break;

        case onSearch.type:
            store.dispatch(getManagers({ search: action.payload, page: 1 }));
            break;

        case onDeleteManager.rejected.type:
            console.error('Ошибка')
            break;

    }

    next(action);
};
