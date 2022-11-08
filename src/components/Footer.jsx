import React from "react";
import styled from "styled-components";

export default function Footer() {
  return <FooterWrap></FooterWrap>;
}

const FooterWrap = styled.div`
  position: fixed;
  bottom: 0;
  width: 100vw;
  height: 3vh;
  background-color: ${({ theme }) => theme.color.footer};
`;
