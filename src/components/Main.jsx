import React, { useState } from "react";
import styled from "styled-components";
import {
  VscFiles,
  VscSearch,
  VscSourceControl,
  VscDebugAlt,
  VscExtensions,
} from "react-icons/vsc";

export default function Main() {
  const listArr = [
    {
      icon: <VscFiles size={32} opacity={0.8} />,
      path: "post",
    },
    {
      icon: <VscSearch size={32} />,
      path: "test",
    },
    {
      icon: <VscSourceControl size={32} />,
      path: "test",
    },
    {
      icon: <VscDebugAlt size={32} />,
      path: "test",
    },
    {
      icon: <VscExtensions size={32} />,
      path: "test",
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
              setSelected(index);
            }}
          >
            {one.icon}
          </IconWrap>
        ))}
      </LeftBar>
      <LeftContent>
        <p>{listArr[selected]?.path}</p>
      </LeftContent>
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

  > svg {
    color: ${({ selected }) => (selected ? "white" : "#7a7a7a")};
  }
`;

const LeftContent = styled.div`
  width: 320px;
  height: 100%;
  background-color: #252526;
  > p {
    color: #7a7a7a;
  }
`;
