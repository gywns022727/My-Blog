import React, { useContext } from "react";
import styled from "styled-components";
import AppContext from "../context/AppContext";
import { VscChromeClose } from "react-icons/vsc";

export default function PostWrap({ path, title, isClose }) {
  const { selectedPost, setSelectedPost, openPost, setOpenPost } =
    useContext(AppContext);

  function selectedFunction() {
    setSelectedPost(path);

    if (!openPost.includes(path)) {
      setOpenPost([...openPost, path]);
    }
  }

  return (
    <PostWrapStyled
      onClick={selectedFunction}
      className={selectedPost === path ? "selected" : ""}
    >
      <span
        className={isClose && selectedPost === path ? "visible" : ""}
        onClick={(e) => {
          e.stopPropagation();
          const openPostFilter = openPost.filter((one) => one !== path);
          setOpenPost(openPostFilter);
          setSelectedPost(
            openPostFilter.length !== 0 ? openPostFilter[0] : null
          );
        }}
      >
        <VscChromeClose />
      </span>
      &nbsp;&nbsp; &nbsp;&nbsp;📝{title}
    </PostWrapStyled>
  );
}

const PostWrapStyled = styled.div`
  cursor: pointer;
  padding: 5px 0;
  position: relative;
  &:not(.selected):hover {
    background-color: #3c3c3c;
  }
  &.selected {
    background-color: #505050;
  }
  &:hover > span {
    display: block;
  }
  > span {
    display: none;
    top: 8px;
    left: 3px;
    position: absolute;

    &.visible {
      display: block;
    }
  }
  &:hover {
    background-color: #3c3c3c;
  }
  background-color: ${({ selected }) => (selected ? "#505050" : "")};
`;
