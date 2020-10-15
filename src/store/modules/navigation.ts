import { createReducer, createAction, createAsyncThunk } from '@reduxjs/toolkit';

export interface INavigationState {
    page: PageType;
    total: number;
    pageNumber: number;
}

const initialState: INavigationState = {
    page: 'main',
    total: 0,
    pageNumber: 1,
};

export const navigationReducer = createReducer(initialState, {});
