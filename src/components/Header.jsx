import React from "react";
import styled from "styled-components";

export default function Header() {
  return <HeaderWrap></HeaderWrap>;
}

const HeaderWrap = styled.div`
  width: 100vw;
  height: 3vh;
  min-height: 3vh;
  background-color: ${({ theme }) => theme.color.header};
`;
