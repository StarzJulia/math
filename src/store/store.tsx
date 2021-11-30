import React, {useReducer, createContext} from "react";
import {reducer} from "./reducer";
import {GlobalStateInterface} from '../interfaces/interfaces';

const initialState: GlobalStateInterface = {
    lang: 'ru',
    type: '',
    vocabulary: {},
    formulas: {},
    fields: [],
    labels: {},
    startCalculationFlag: false,
    values: {}
}

interface StoreProps {
    children: React.ReactNode
}

export const Context = createContext<{
    state: GlobalStateInterface;
    dispatch: React.Dispatch<any>;
  }>({
    state: initialState,
    dispatch: () => null
});

export const Store = ({ children }: StoreProps) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <Context.Provider value={{state, dispatch}}>
            { children }
        </Context.Provider>
    )
};