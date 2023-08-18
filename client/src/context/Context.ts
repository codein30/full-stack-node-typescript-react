import { createContext } from "react";
import { IItem } from "../interfaces/IItem";
import { IPayload } from "../interfaces/IPayload";

export const INITIAL_STATE = {
    themeName: 'light',
    parentItem: JSON.parse(localStorage.getItem("userInsuranceApplication") || "{}") || {} as IItem,
};

export type InitialStateType = typeof INITIAL_STATE;

export const Context = createContext({
    state: INITIAL_STATE,
    toggleTheme: () => { },
    toggleIsEditing: (id: string) => { },
    createParentItem: () => { },
    deleteParentItem: (id: string) => { },
    editParentItem: (payload: IItem) => { },
    loadParentItem: (payload: IItem) => { },
    createChildItem: (payload: IPayload) => { },
    deleteChildItem: (payload: IPayload) => { },
    editChildItem: (payload: IPayload) => { },
    getInsurance: (id: string) => { },
    createInsurance: (payload: IItem) => { },
    updateInsurance: (payload: IItem) => { },
    validateInsurance: (payload: IItem) => { },
    deleteInsurance: (id: string) => { },
})