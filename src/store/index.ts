import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { clientsReducer, IClientsState, clientsMiddleware } from "./modules/clients";
import { IManagersState, managersMiddleware, managersReducer } from "./modules/managers";
import { INavigationState, navigationReducer } from "./modules/navigation";

export interface IAppState {
    user: {},
    managers?: IManagersState;
    clients?: IClientsState;
    navigation: INavigationState;
}

const rootReducer = combineReducers<IAppState>({
    user: (user = null) => user,
    managers: managersReducer,
    clients: clientsReducer,
    navigation: navigationReducer,
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([
        managersMiddleware,
        clientsMiddleware,
    ]),
    devTools: process.env.NODE_ENV !== 'production',
})