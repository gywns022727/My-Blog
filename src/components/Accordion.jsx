import React, { useState } from "react";
import styled from "styled-components";
import { VscChevronRight } from "react-icons/vsc";

export default function Accordion({ title, children }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <>
      <AccordionWrap
        onClick={() => {
          setExpanded(!expanded);
        }}
      >
        <VscChevronRight />
        <span>{title}</span>
      </AccordionWrap>
      {expanded && <AccordionContentWrap>{children}</AccordionContentWrap>}
    </>
  );
}

const AccordionWrap = styled.div`
  display: flex;
  align-items: center;
  color: white;
  font-weight: bold;
  font-size: 0.8rem;
  padding-left: 5px;
  cursor: pointer;
  user-select: none;

  > span {
    padding-left: 5px;
  }
`;

const AccordionContentWrap = styled.div``;
