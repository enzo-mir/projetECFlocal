import styled from "styled-components";

export const Cross = styled.span`
  position: relative;
  width: 30px;
  height: 30px;
  margin-left: calc(100% - 100px);

  &::after,
  &::before {
    content: "";
    position: absolute;
    background-color: black;
    height: 100%;
    width: 1px;
    left: 50%;
  }
  &::after {
    transform: rotate(45deg);
  }
  &::before {
    transform: rotate(-45deg);
  }
  &:hover {
    cursor: pointer;
  }
`;
