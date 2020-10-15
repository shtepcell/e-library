import { createReducer, createAction, createAsyncThunk } from '@reduxjs/toolkit';

export interface IManagersState {
    items: any[];
    total: number;
    page: number;
}

const initialState: IManagersState = {
    items: [],
    total: 0,
    page: 1,
};

export const managersReducer = createReducer(initialState, {});
