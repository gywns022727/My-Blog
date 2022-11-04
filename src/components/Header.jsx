import React from "react";
import styled from "styled-components";

export default function Header() {
  return <HeaderWrap></HeaderWrap>;
}

const HeaderWrap = styled.div`
  height: 25px;
  z-index: 10;
  background-color: #3c3c3c;
`;
