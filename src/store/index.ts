import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { clientsReducer, IClientsState, clientsMiddleware } from "./modules/clients";
import { contractPageMiddleware, contractPageReducer, IContractPageState } from "./modules/contractPage";
import { contractsMiddleware, contractsReducer, IContractsState } from "./modules/contracts";
import { IManagersState, managersMiddleware, managersReducer } from "./modules/managers";
import { INavigationState, navigationReducer } from "./modules/navigation";
import { ISuggestState, suggestMiddleware, suggestReducer } from "./modules/suggest";

export interface IAppState {
    user: {},
    managers?: IManagersState;
    clients?: IClientsState;
    navigation: INavigationState;
    contracts?: IContractsState;
    contractPage?: IContractPageState;
    suggest?: ISuggestState;
}

const rootReducer = combineReducers<IAppState>({
    user: (user = null) => user,
    managers: managersReducer,
    clients: clientsReducer,
    contracts: contractsReducer,
    navigation: navigationReducer,
    contractPage: contractPageReducer,
    suggest: suggestReducer,
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([
        managersMiddleware,
        clientsMiddleware,
        contractsMiddleware,
        contractPageMiddleware,
        suggestMiddleware,
    ]),
    devTools: process.env.NODE_ENV !== 'production',
})