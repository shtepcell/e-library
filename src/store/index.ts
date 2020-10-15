import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { IManagersState, managersReducer } from "./modules/managers";
import { INavigationState, navigationReducer } from "./modules/navigation";

export interface IAppState {
    user: {},
    managers?: IManagersState;
    navigation: INavigationState;
}

const rootReducer = combineReducers<IAppState>({
    user: (user = null) => user,
    managers: managersReducer,
    navigation: navigationReducer,
});

export const store = configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== 'production',
})