import { IItem } from "../../interfaces/IItem";
import { Input } from "../input";
import { DropDown } from '../dropdown';
import { DateInput } from '../dateinput';
import { insuranceDropdown } from '../../utils/Constants';
import { timestampToDate } from "../../utils/helpers";

interface IProps {
    updateForm: (key: any, value: any, nestedKey?: any, id?: any) => void;
    item: IItem;
}
export const ItemForm = ({
    item, 
    updateForm
    }: IProps) => {

    const {
        type,
        firstName,
        lastName,
        birthDate
    } =  item || {};
    const updatePrimaryType= (currentType: any) => {
        updateForm('type', currentType);
    }

    const updatePrimaryBirthday = (date: any) => {
        updateForm('birthDate', timestampToDate(date));
    }
    return (
        <>
            <>
                <DropDown 
                    options={insuranceDropdown} 
                    inputType={"Insurance"} 
                    updateOption={updatePrimaryType}
                    enteredSelection={type}
                    mainKey={'type'}
                />
                <Input
                    name="firstName"
                    placeholder="FIRST NAME"
                    type="string"
                    onChangeText={(v) => updateForm('firstName', v)}
                    value={firstName}
                    autoFocus
                />
                <Input
                    name="lastName"
                    placeholder="LAST NAME"
                    type="string"
                    onChangeText={(v) => updateForm('lastName', v)}
                    value={lastName}
                    autoFocus
                />
                <DateInput 
                    name="mainBirthday"
                    startDate={birthDate}
                    updatParentDate={updatePrimaryBirthday} />
            </>
        </>
    )
}