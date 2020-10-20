import { getFullName } from '@lib/helper';
import { request } from '@lib/request';
import { createReducer, createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { IClient } from '@typings/IClient';
import { IManager } from '@typings/IManager';
import { debounce } from 'lodash';

export const setSuggestManagers = createAction<IManager[]>('setSuggestManagers');
export const setSuggestClients = createAction<IClient[]>('setSuggestClients');

export const getSuggestManagers = createAsyncThunk<any, string>('getSuggestManagers', value => {
    return request
        .get('/managers', {
            params: {
                limit: 5,
                search: value || '',
            }
        })
        .then(({ data: { items } }) => items.map(getFullName));
})

export const getSuggestClients = createAsyncThunk<any, string>('getSuggestClients', value => {
    return request
        .get('/clients', {
            params: {
                limit: 5,
                search: value || '',
            }
        })
        .then(({ data: { items } }) => items.map(({ name }) => name));
});

export interface ISuggestState {
    suggestedManagers: IManager[];
    suggestedClients: IClient[];
    loading?: boolean;
}

const initialState: ISuggestState = {
    suggestedManagers: [],
    suggestedClients: [],
};

export const suggestReducer = createReducer(initialState, {
    [getSuggestManagers.pending.type]: (state) => {
        state.loading = true;
    },

    [getSuggestClients.pending.type]: (state) => {
        state.loading = true;
    },

    [getSuggestManagers.fulfilled.type]: (state) => {
        state.loading = false;
    },

    [getSuggestClients.fulfilled.type]: (state) => {
        state.loading = false;
    },

    [getSuggestManagers.rejected.type]: (state) => {
        state.loading = false;
    },

    [getSuggestClients.rejected.type]: (state) => {
        state.loading = false;
    },

    [setSuggestManagers.type]: (state, action) => {
        state.suggestedManagers = action.payload;
    },

    [setSuggestClients.type]: (state, action) => {
        state.suggestedClients = action.payload;
    }
});


export const suggestMiddleware = store => next => action => {
    switch (action.type) {
        case getSuggestManagers.fulfilled.type:
            store.dispatch(setSuggestManagers(action.payload));
            break;

        case getSuggestClients.fulfilled.type:
            store.dispatch(setSuggestClients(action.payload));
            break;
    }

    next(action);
};
