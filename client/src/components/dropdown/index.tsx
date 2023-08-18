import { useState } from "react";
import { Styles } from "./styles";

interface IProps {
    options: string[];
    inputType: string;
    updateOption: (currentUpate: any) => any;
    enteredSelection?: string;
    mainKey: string;
}

export const DropDown = ({ options, inputType, updateOption, enteredSelection = null as unknown as string, mainKey}: IProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(enteredSelection);
  
    const toggling = () => setIsOpen(!isOpen);
  
    const onOptionClicked = (value: any) => () => {
      setSelectedOption(value);
      updateOption(value);
      setIsOpen(false);
    };

    
    return (
        <Styles.DropDownContainer>
            <Styles.DropDownHeader onClick={toggling}>
                {selectedOption || `Select ${inputType} ${mainKey}`}
                </Styles.DropDownHeader>
                {isOpen && (
                <Styles.DropDownListContainer>
                    <Styles.DropDownList>
                    {options.map((option) => (
                        <Styles.ListItem onClick={onOptionClicked(option)} key={Math.random()}>
                        {option}
                        </Styles.ListItem>
                    ))}
                    </Styles.DropDownList>
                </Styles.DropDownListContainer>
                )}
        </Styles.DropDownContainer>
    )
}
