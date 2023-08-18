import { useState } from "react";
import { Styles } from "./styles";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { timestampToDate } from "../../utils/helpers";

interface IProps {
    updatParentDate: (date: any) => any;
    startDate?: Date;
    name: string;
    placeholder?: string;
}
export const DateInput = ({name, updatParentDate, startDate = null as unknown as Date, placeholder="Birthday"}: IProps) => {
    const [currentDate, setStartDate] = useState(new Date(startDate));
    const updateCurrentDate = (inputDate: any) => {
        setStartDate(inputDate);
        updatParentDate(timestampToDate(inputDate));
    }
    return (
        <Styles.Container>
            <DatePicker
                placeholderText={placeholder}
                name={name} 
                selected={currentDate} 
                onChange={(date: any) => updateCurrentDate(date)} 
            />
        </Styles.Container>
    )
}
