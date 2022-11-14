import React from "react";
import styled from "styled-components";
import Header from "../Header";
import Main from "../Main";
import Footer from "../Footer";

export default function Page() {
  return (
    <Wrap>
      <Header />
      <Main />
      <Footer />
    </Wrap>
  );
}

const Wrap = styled.div`
  width: 100vw;
  height: 97vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;
