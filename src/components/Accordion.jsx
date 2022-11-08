import React, { useState } from "react";
import styled from "styled-components";
import { VscChevronRight, VscChevronDown } from "react-icons/vsc";

export default function Accordion({ title, children, initialExpanded }) {
  const [expanded, setExpanded] = useState(initialExpanded || false);
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
      {
        <AccordionContentWrap expanded={expanded}>
          {children}
        </AccordionContentWrap>
      }
    </>
  );
}

const AccordionWrap = styled.div`
  display: flex;
  align-items: center;
  font-weight: bold;
  font-size: 1rem;
  padding-left: 5px;
  cursor: pointer;
  user-select: none;
  padding: 5px 0;
  &:hover {
    background-color: ${({ theme }) => theme.color.hover};
  }
  > span {
    padding-left: 5px;
  }
`;

const AccordionContentWrap = styled.div`
  max-height: ${({ expanded }) => (expanded ? "500px" : "0")};
  overflow: hidden;
  transition: ${({ expanded }) =>
    expanded ? "max-height 0.25s ease-in" : "max-height 0.15s ease-out"};

  user-select: none;
  cursor: pointer;
  margin: 0 0 5px 15px;
`;
