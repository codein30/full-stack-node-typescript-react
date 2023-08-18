import styled from "styled-components";

import { Styles as InputStyles } from "../input/styles";

const WrapperContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 30px;

    > button {
        margin: auto;
        margin-bottom: 15px;
    }
`;

const Container = styled.div`
    display: flex;
    align-items: center;
    padding: 15px 10px;
    border-bottom: 1px solid ${({ theme }) => theme.borderColor};

    > strong {
        width: 40px;
        color: ${({ theme }) => theme.color};
    }

    > p {
        flex: 1;
        color: ${({ theme }) => theme.color};
    }

    > ${InputStyles.Container} {
        flex: 1;

        :not(:last-child) {
            margin-right: 30px;
        }
    }
`;

const SecondaryContainer = styled.div`
`;

const Title = styled.h2`
    font-size: 18px;
    font-weight: bold;
` 

const ContentTitle = styled.h6`
    color: black;
`

const ContentItem = styled.p`
    font-size: 16px;
    margin-top: 10px;
    color: grey;
` 

const SubTitle = styled.h4`
    margin-bottom: 20px;
    color: black;
` 

const GroupButtons = styled.div`
    display: flex;

    > button {
        :not(:last-child) {
            margin-right: 10px;
        }
    }
`;

const ColumnWrapper = styled.div`
  display: flex;
  flex-direction: column;
` 

export const Styles = {
    Container,
    GroupButtons,
    WrapperContainer,
    ColumnWrapper,
    Title,
    SubTitle,
    ContentTitle,
    ContentItem,
    SecondaryContainer
};
