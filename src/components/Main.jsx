import React, { useState } from "react";
import styled from "styled-components";
import {
  VscFiles,
  VscSearch,
  VscSourceControl,
  VscDebugAlt,
  VscExtensions,
} from "react-icons/vsc";
import Accordion from "./Accordion";

export default function Main() {
  const listArr = [
    {
      icon: <VscFiles size={32} opacity={0.8} />,
      path: "EXPLORER",
    },
    {
      icon: <VscSearch size={32} />,
      path: "SEARCH",
    },
    {
      icon: <VscSourceControl size={32} />,
      path: "POSTING LOG",
    },
    {
      icon: <VscDebugAlt size={32} />,
      path: "RUN AND DEBUG",
    },
    {
      icon: <VscExtensions size={32} />,
      path: "EXTENSIONS",
    },
  ];
  const [selected, setSelected] = useState(null);

  return (
    <Wrap>
      <LeftBar>
        {listArr.map((one, index) => (
          <IconWrap
            selected={selected === index}
            onClick={() => {
              setSelected(selected === index ? null : index);
            }}
          >
            {one.icon}
          </IconWrap>
        ))}
      </LeftBar>
      {selected != null && listArr[selected] && (
        <LeftContent>
          <p>{listArr[selected]?.path}</p>
          <Accordion title="OPEN POSTS">text</Accordion>
        </LeftContent>
      )}
    </Wrap>
  );
}

const Wrap = styled.div`
  display: flex;
  height: 100vh;
  background-color: #1e1e1e;
`;

const LeftBar = styled.div`
  width: 50px;
  height: 100%;
  background-color: rgb(51 51 51);
`;

const IconWrap = styled.div`
  padding: 10px 0;
  display: flex;
  justify-content: center;
  cursor: pointer;

  border-left: ${({ selected }) => (selected ? 2 : 0)}px solid white;

  > svg {
    color: ${({ selected }) => (selected ? "white" : "#7a7a7a")};
  }
`;

const LeftContent = styled.div`
  width: 320px;
  height: 100%;
  background-color: #252526;
  > p {
    user-select: none;
    padding: 10px;
    color: #7a7a7a;
  }
`;
