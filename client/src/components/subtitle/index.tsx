import { Container } from "../../styles/global"
import { Styles } from "./styles"

interface IProps {
    heading: string;
}

export const SubTitle = ({heading}: IProps) => {
    return (
        <Styles.Container>
            <Container>
                <h1>{heading}</h1>
            </Container>
        </Styles.Container>
    )
}
