import React, { useContext, useState } from "react";
import styled from "styled-components";
import {
  VscFiles,
  VscSearch,
  VscSourceControl,
  VscDebugAlt,
  VscExtensions,
  VscChromeClose,
} from "react-icons/vsc";
import Accordion from "./Accordion";
import Content from "./Content";
import AppContext from "../context/AppContext";
import { getPostOne } from "../common/common.function";

export default function Main() {
  const [selected, setSelected] = useState(null);
  const { setSelectedPost, setOpenPost, selectedPost, postData, openPost } =
    useContext(AppContext);

  const listArr = [
    {
      icon: <VscFiles size={32} opacity={0.8} />,
      path: "EXPLORER",
      content: (
        <>
          <Accordion title="OPEN POSTS" isBold={true}>
            {openPost.map((one) => (
              <div>{getPostOne(postData, one).title}</div>
            ))}
          </Accordion>
          <Accordion title="VSCODE" isBold={true}>
            {postData.map((one, index) => (
              <Content {...one} key={index} />
            ))}
          </Accordion>
        </>
      ),
    },
    {
      icon: <VscSearch size={32} />,
      path: "SEARCH",
      content: <Accordion title="Tags">text</Accordion>,
    },
    {
      icon: <VscSourceControl size={32} />,
      path: "POSTING LOG",
      content: <Accordion title="2022">text</Accordion>, // 아코디언 빼고 다른거 사용
    },
    {
      icon: <VscDebugAlt size={32} />,
      path: "RUN AND DEBUG",
      content: <Accordion title="RUN AND DEBUG">text</Accordion>,
    },
    {
      icon: <VscExtensions size={32} />,
      path: "EXTENSIONS",
      content: <Accordion title="EXTENSIONS">text</Accordion>,
    },
  ];

  return (
    <Wrap>
      <LeftBar>
        {listArr.map((one, index) => (
          <IconWrap
            selected={selected === index}
            onClick={() => {
              setSelected(selected === index ? null : index);
            }}
            key={index}
          >
            {one.icon}
          </IconWrap>
        ))}
      </LeftBar>
      {selected !== null && listArr[selected] && (
        <LeftContent>
          <p>{listArr[selected].path}</p>
          {listArr[selected].content}
        </LeftContent>
      )}
      <RightWrap selected={selected}>
        <RightHeader>
          {openPost.map((one, index) => {
            const pathArr = one.split("/").filter(Boolean);

            const data = pathArr.reduce((sum, current, index) => {
              const lastPath = pathArr.length - 1 === index;

              const target = sum.find(
                (one) =>
                  one.title === current &&
                  one.type === (lastPath ? "post" : "directory")
              );
              return lastPath ? target : target?.children;
            }, postData);
            return (
              <div
                className={selectedPost === one ? "selected" : ""}
                onClick={() => {
                  setSelectedPost(data.path);
                }}
                key={index}
              >
                📝{data.title}
                <span
                  onClick={(e) => {
                    e.stopPropagation();
                    const openPostFilter = openPost.filter(
                      (one) => one !== data.path
                    );
                    setOpenPost(openPostFilter);
                    setSelectedPost(
                      openPostFilter.length !== 0 ? openPostFilter[0] : null
                    );
                  }}
                >
                  <VscChromeClose />
                </span>
              </div>
            );
          })}
        </RightHeader>
        <RightContent>{selectedPost}</RightContent>
      </RightWrap>
    </Wrap>
  );
}

const Wrap = styled.div`
  display: flex;
  height: 100vh;
  background-color: #1e1e1e;
`;

const LeftBar = styled.div`
  min-width: 50px;
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
  width: 350px;
  height: 100%;
  background-color: #252526;
  padding: 10px;
  > p {
    user-select: none;
    padding-bottom: 10px;
    color: #7a7a7a;
  }
  @media (max-width: 540px) {
    width: 100%;
  }
`;

const RightWrap = styled.div`
  width: ${({ selected }) =>
    selected === null ? "calc(100% - 50px)" : "calc(100% - 320px - 50px)"};
  @media (max-width: 540px) {
    display: ${({ selected }) => (selected === null ? "block" : "none")};
  }
`;

const RightHeader = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  overflow-y: hidden;
  overflow-x: scroll;
  background-color: #252526;
  > div {
    width: 150px;
    min-width: 150px;
    height: 40px;
    font-size: 16px;
    text-align: center;
    /* text-overflow: ellipsis; */
    user-select: none;
    cursor: pointer;
    position: relative;
    padding: 10px;
    background-color: #333;
    border-right: 1px solid #252525;
    &.selected {
      font-weight: bold;
      background-color: #1e1e1e;
      border-right: 1px solid #1e1e1e;
    }
    &:not(.selected) {
      color: #1e1e1e;
      border-right: 1px solid #252526;
    }
    > span {
      position: absolute;
      top: 12px;
      right: 15px;
    }
  }
`;

const RightContent = styled.div`
  width: 100%;
  height: calc(100% - 50px);
  background-color: #1e1e1e;
`;
