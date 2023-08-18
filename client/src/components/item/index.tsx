import pluralize from 'pluralize';
import { Styles } from "./styles";
import { Button } from "../button";

import { PencilIcon } from "../icons/pencil";
import { TrashIcon } from "../icons/trash";
import { ItemForm } from "./form";
import { useContextHook } from '../../context/hook';
import { IItem } from "../../interfaces/IItem";
import { ADDRESSES, DEPENDENTS, VEHICLES } from '../../utils/Constants';
import { childConvertType } from '../../utils/helpers';

interface IProps {
    updateForm: (key: any, value: any, nestedKey?: any, id?: any) => void;
    position: number;
    itemType: string;
    insuranceItem: IItem;
    item: any;
}

export const Item = ({ 
    updateForm,
    position, 
    itemType,
    insuranceItem,
    item,
    }: IProps) => {

    const { deleteChildItem, toggleIsEditing } = useContextHook();
    return (
        <Styles.Container>
            <ItemForm
                updateForm={updateForm}
                itemType={itemType}
                insuranceItem={insuranceItem}
                item={item}
                position={position}
            />
            <Styles.GroupButtons>
                <Button onClick={() => deleteChildItem({parentItem: insuranceItem, childPayload: item, childType: childConvertType(itemType.toLowerCase())})}>
                    <TrashIcon />
                </Button>
        </Styles.GroupButtons>
        </Styles.Container>
    )
}
