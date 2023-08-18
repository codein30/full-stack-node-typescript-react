import { ReactNode } from "react";
import { Styles } from "./styles";

interface IProps {
    children:ReactNode;
}

export const Grid = ({children}: IProps) => {
    return (
        <Styles.GridWrapper>
          {children}
        </Styles.GridWrapper>
      ) 
}
    