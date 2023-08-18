import styled from "styled-components";

const Container = styled.button`
    display: flex;
    align-items: center;
    color: ${({ theme }) => theme.color};
    background: ${({ theme }) => theme.borderColor};
`;

const GridWrapper = styled.section`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 20px 0px;
`

export const Styles = {
    Container,
    GridWrapper
};
