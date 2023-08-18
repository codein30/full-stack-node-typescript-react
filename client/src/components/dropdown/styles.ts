import styled from "styled-components";

const DropDownContainer = styled("div")`
  display: flex;
  flex-direction: column;
  margin-right: 30px;

`;

const DropDownHeader = styled("div")`
  border: 1px solid ${({ theme }) => theme.borderColor};
  padding: 13px 10px;
  border-radius: 5px;
  background: ${({ theme }) => theme.background};

  :focus {
    border: 1px solid ${({ theme }) => theme.color};
  }

`;

const DropDownListContainer = styled("div")`
  position: absolute;
  z-index: 100;
`;

const DropDownList = styled("ul")`
  padding: 0;
  margin: 0;
  background: #ffffff;
  border: 1px solid ${({ theme }) => theme.color};
  box-sizing: border-box;
  font-size: 1.3rem;
  font-weight: 500;
  &:first-child {
    padding-top: 0.8em;
  }
`;

const ListItem = styled("li")`
  list-style: none;
  margin: 0.4em;
  &:hover {
    color: #fd9e46;
  }
`;

export const Styles = {
    DropDownContainer,
    DropDownHeader,
    DropDownListContainer,
    DropDownList,
    ListItem
};