import { Styles } from "./styles";
import { Button } from "../button";
import { Item } from "../item";
import { useContextHook } from '../../context/hook';
import { IItem } from "../../interfaces/IItem";
import { ADDRESSES, DEPENDENTS, VEHICLES } from "../../utils/Constants";
import { childConvertType } from "../../utils/helpers";

interface IProps {
    updateForm: (key: any, value: any) => void;
    itemType: string;
    insuranceItem: IItem;
    items: any[];
}

export const ListItems = ({updateForm, insuranceItem, itemType, items}: IProps) => {

    const { state, createChildItem } = useContextHook()
    const customStyle = items.length === 0? {margin: "auto"}: {};
    return (
        <Styles.Container style={customStyle}>
            <Button
                onClick={() => 
                { 
                    return createChildItem({parentItem: insuranceItem, childPayload: {}, childType: childConvertType(itemType)})}
                }>Click to Add {itemType}</Button>
            {
                items.map((item, index) => (
                    <Item  
                        key={item.id}
                        position={index} 
                        itemType={itemType}
                        insuranceItem={insuranceItem}
                        item={item}
                        updateForm={updateForm}
                    />
                ))
            }
        </Styles.Container>
    )
}
