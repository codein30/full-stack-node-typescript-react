import { AppContextActions } from '../enums/AppContextActions';
import { IDispatchAction } from '../interfaces/IDispatchAction';
import { InitialStateType, INITIAL_STATE } from './Context';
import { IItem } from '../interfaces/IItem';
import { v4 as uuidv4 } from 'uuid';

export const Reducer = (state = INITIAL_STATE, action: IDispatchAction): InitialStateType => {

    let tmpState = { ...state };
    switch (action.type) {
        case AppContextActions.ToggleTheme:
            tmpState.themeName = state.themeName === 'light' ? 'dark' : 'light';
            break;
        case AppContextActions.ToggleIsEditing:
            tmpState.parentItem = { ...state.parentItem, isEditing: !state.parentItem.isEditing }
            break;
        
        case AppContextActions.CreateParentItem:
            tmpState.parentItem = {
                id: uuidv4(),
                isEditing: true
            } as IItem;
            break;
        case AppContextActions.DeleteParentItem:
            tmpState.parentItem = null as unknown as IItem;
            break;
        case AppContextActions.EditParentItem:
            tmpState.parentItem = {...action.payload, isEditing: true };
            break;
        case AppContextActions.LoadParentItem:
            tmpState.parentItem = {...action.payload, isEditing: false };
            break;
        case AppContextActions.CreateChildItem:
            const childCreateItem: IItem = tmpState.parentItem;
            type ChildCreateKey =  keyof typeof childCreateItem;
            const editingChildType = action.payload.childType as ChildCreateKey;
            const newItem: any = {
                id: uuidv4(),
                isEditing: true
            }

            const children = state.parentItem[editingChildType] as any[] || [];
            tmpState.parentItem = {...state.parentItem, ...{[editingChildType]: [...children, newItem], isEditing: true }};
            break;
        case AppContextActions.DeleteChildItem:
            const childDeleteItem: IItem = tmpState.parentItem;
            type ChildDeleteKey =  keyof typeof childDeleteItem;
            const deletingchildType = action.payload.childType as ChildDeleteKey;
            const newChildren = state.parentItem[deletingchildType].filter((currItem: any) => currItem.id !== action.payload.childPayload.id)
            tmpState.parentItem = {...state.parentItem, ...{[deletingchildType]: newChildren, isEditing: true }};
            if(state.parentItem[deletingchildType].length === 0) {
                delete tmpState.parentItem[deletingchildType]
            }
            break;
        case AppContextActions.EditChildItem:
            const childEditItem: IItem = tmpState.parentItem;
            type ChildEditKey =  keyof typeof childEditItem;
            const editchildType = action.payload.childType as ChildEditKey;
            const newEditChildren = state.parentItem[editchildType].map(
                (item: any) => item.id === action.payload.childPayload.id
                    ? { ...item, isEditing: !item.isEditing }
                    : item
            )
            tmpState.parentItem = {...state.parentItem, ...{[editchildType]: newEditChildren, isEditing: true }};
            break;

        default:
            throw new Error();
    }
    return tmpState;
}