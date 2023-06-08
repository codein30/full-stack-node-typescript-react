import { ReactNode, useCallback, useReducer, useState, useEffect } from "react";
import { Context, INITIAL_STATE } from "./Context";
import { AppContextActions } from "../enums/AppContextActions";
import { IItem } from "../interfaces/IItem";
import { Reducer } from "./Reducer";
import HttpClient from './../utils/HttpClient';

interface IProps {
    children: ReactNode;
}

export const Provider = ({ children }: IProps) => {

    const [state, dispatch] = useReducer(Reducer, INITIAL_STATE)

    const toggleTheme = useCallback(() =>
        dispatch({ type: AppContextActions.ToggleTheme }), [dispatch]);

    const createNewItem = useCallback(() =>
        dispatch({ type: AppContextActions.CreateNewItem }), []);

    const deleteItem = useCallback((id: string) =>
        dispatch({ type: AppContextActions.DeleteItem, payload: { id } }), []);

    const toggleIsEditing = useCallback((id: string) =>
        dispatch({ type: AppContextActions.ToggleIsEditing, payload: { id } }), []);

    const editItem = useCallback((payload: IItem) =>
        dispatch({ type: AppContextActions.EditItem, payload }), []);

    const createNewInsurance = useCallback(async () => {

        await HttpClient
        .get('/rest/calendars')
        .then((calendars) => {
          console.log('calendars: ', calendars);
        });

        return dispatch({ type: AppContextActions.CreateNewItem })
    }, []);


    return (
        <Context.Provider
            value={{
                state,
                createNewItem,
                deleteItem,
                editItem,
                toggleIsEditing,
                toggleTheme,
                createNewInsurance
            }}>
            {children}
        </Context.Provider>
    )
}
