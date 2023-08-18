import { useState } from 'react';
import { Styles } from "./styles";
import { IItem } from "../../interfaces/IItem";

import { Button } from "../button";
import { Input } from "../input";

import { SaveIcon } from "../icons/save";
import { CloseIcon } from "../icons/close";

import { useContextHook } from '../../context/hook';
import { inputElements } from '../../utils/InputElements';
import { DropDown } from '../dropdown';
import { DateInput } from '../dateinput';
import { dropdownOptions } from '../../utils/Constants';
import { childConvertType, timestampToDate } from '../../utils/helpers';

interface IProps {
    updateForm: (key: any, value: any, nestedKey?: any, id?: any) => void;
    itemType: string;
    insuranceItem: IItem;
    item: any;
    position: number;
}

export const ItemForm = ({
    updateForm,
    itemType,
    insuranceItem,
    item,
    position
    }: IProps) => {
    const { toggleIsEditing, editChildItem } = useContextHook();

    const initializeValues = (): Object => {
       return Object.keys(inputElements[itemType.toLocaleLowerCase() as keyof typeof inputElements]).reduce((acc, key) => {
        return {...acc, [key]: item[key] || undefined} }, {}) as Object;
    }

    const [formState,] = useState(initializeValues());
    
    const updateDependentBirthday = (date:any) => {
        updateForm('birthDate', timestampToDate(date), childConvertType(itemType.toLowerCase()), item.id);
    }

    const updateCurrentType = (currentType: any) => {
        updateForm('type', currentType, childConvertType(itemType.toLowerCase()), item.id);

    }

    // const saveInnerRow = () => {
    //     validateFields();
    //     // if(validateFields()) editChildItem({parentItem: insuranceItem, childPayload: formState, childType: childConvertType(itemType.toLowerCase())});
    // }
    const validateFields = () => {
        for(const [key, value] of Object.entries(formState)){
            if(!value) {
                alert(`Enter a ${key} for your ${itemType}`);
                return false;
            }
        }
        return true;
    }

    return (
        <>
            <>
                {
                    Object.entries(inputElements[itemType.toLocaleLowerCase() as keyof typeof inputElements]).map((entry:any):any => {
                        if(entry[1] === "dropdown") {
                            return <DropDown 
                                options={dropdownOptions} 
                                inputType={itemType} updateOption={updateCurrentType} 
                                mainKey='type'
                                enteredSelection={item['type'] || null}
                                />
                        }
                        if(entry[1] === "date") {
                            return <DateInput
                            startDate={new Date(item['birthDate'])}
                            name={`${itemType}${position}birthday`} 
                            updatParentDate={updateDependentBirthday}/>
                        }
                        
                        return  <Input
                            name={entry[0]}
                            placeholder={entry[0]}
                            type={entry[1]}
                            onChangeText={(v) => updateForm(entry[0], v, childConvertType(itemType.toLowerCase()), item.id)}
                            value={item[entry[0]]}
                            autoFocus
                        />
                    })
                }
            </>
        </>
    )
}
