import {combineReducers, configureStore} from "@reduxjs/toolkit";
import authReducer from "./reducers/authReducer";
import usersReducer from "./reducers/usersReducer";


export const RootReducer = combineReducers({
    authReducer,
    usersReducer,
})


export const Store = configureStore({
    reducer: RootReducer
})

// @ts-ignore
window.state = Store.getState();

export type RootState = ReturnType<typeof RootReducer>
export type AppStore = typeof Store
export type AppDispatch = AppStore['dispatch']
