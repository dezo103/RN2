import {combineReducers, configureStore} from '@reduxjs/toolkit'
import {reducer} from "./slice"
import {useDispatch, TypedUseSelectorHook, useSelector} from "react-redux";

const rootReducer = combineReducers({
    reducer: reducer
})

export const store = configureStore({
    reducer: rootReducer
})

export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export type RootState = ReturnType<typeof store.getState>