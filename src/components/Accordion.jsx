import React, { useState } from "react";
import styled from "styled-components";
import { VscChevronRight, VscChevronDown } from "react-icons/vsc";

export default function Accordion({ title, children }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <>
      <AccordionWrap
        onClick={() => {
          setExpanded(!expanded);
        }}
      >
        {expanded ? <VscChevronDown /> : <VscChevronRight />}
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
  font-size: 1rem;
  padding-left: 5px;
  cursor: pointer;
  user-select: none;
  padding: 5px 0;

  > span {
    padding-left: 5px;
  }
`;

const AccordionContentWrap = styled.div`
  user-select: none;
  cursor: pointer;
  padding: 0 0 5px 15px;
`;
