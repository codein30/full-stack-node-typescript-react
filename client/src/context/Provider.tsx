import { ReactNode, useCallback, useReducer } from "react";
import { Context, INITIAL_STATE } from "./Context";
import { AppContextActions } from "../enums/AppContextActions";
import { IItem } from "../interfaces/IItem";
import { Reducer } from "./Reducer";
import HttpClient from './../utils/HttpClient';
import { IPayload } from "../interfaces/IPayload";

interface IProps {
    children: ReactNode;
}

export const Provider = ({ children }: IProps) => {

    const [state, dispatch] = useReducer(Reducer, INITIAL_STATE)

    const toggleTheme = useCallback(() =>
        dispatch({ type: AppContextActions.ToggleTheme }), [dispatch]);

    const toggleIsEditing = useCallback((id: string) =>
        dispatch({ type: AppContextActions.ToggleIsEditing, payload: { id } }), []);

    const createParentItem = useCallback(() =>
        dispatch({ type: AppContextActions.CreateParentItem }), []);

    const deleteParentItem = useCallback((id: string) =>
        dispatch({ type: AppContextActions.DeleteParentItem, payload: { id } }), []);

    const editParentItem = useCallback((payload: IItem) =>
        dispatch({ type: AppContextActions.EditParentItem, payload }), []);

    const loadParentItem = useCallback((payload: IItem) =>
    dispatch({ type: AppContextActions.LoadParentItem, payload }), []);

    const createChildItem = useCallback((payload: IPayload) =>
        dispatch({ type: AppContextActions.CreateChildItem, payload }), []);

    const deleteChildItem = useCallback((payload: IPayload) =>
        dispatch({ type: AppContextActions.DeleteChildItem, payload }), []);

    const editChildItem = useCallback((payload: IPayload) =>
        dispatch({ type: AppContextActions.EditChildItem, payload }), []);

    const getInsurance = useCallback((id: string) =>
     dispatch({ type: AppContextActions.GetInsurance, payload: { id } }), []);

    const createInsurance = useCallback((payload: IItem) =>
     dispatch({ type: AppContextActions.CreateInsurance, payload }), []);

    const updateInsurance = useCallback((payload: IItem) =>
     dispatch({ type: AppContextActions.UpdateInsurance, payload }), []);

    const validateInsurance = useCallback((payload: IItem) =>
     dispatch({ type: AppContextActions.ValidateInsurance, payload }), []);
    
    const deleteInsurance = useCallback((id: string) =>
     dispatch({ type: AppContextActions.DeleteInsurance, payload: { id } }), []);

return (
    <Context.Provider
        value={{
            state,
            toggleIsEditing,
            toggleTheme,
            createParentItem,
            deleteParentItem,
            editParentItem,
            loadParentItem,
            createChildItem,
            deleteChildItem,
            editChildItem,
            getInsurance,
            createInsurance,
            updateInsurance,
            validateInsurance,
            deleteInsurance,
        }}>
        {children}
    </Context.Provider>
)
}
