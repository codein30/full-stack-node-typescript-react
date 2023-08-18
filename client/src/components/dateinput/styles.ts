import styled from "styled-components";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    margin-right: 30px;
    input {
        border: 1px solid ${({ theme }) => theme.borderColor};
        padding: 13px 10px;
        border-radius: 5px;
        background: ${({ theme }) => theme.background};
    
        :focus {
            border: 1px solid ${({ theme }) => theme.color};
        }
    }
`;

export const Styles = {
    Container,
};