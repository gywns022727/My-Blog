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
      &nbsp;&nbsp;
      <span className={isClose && selectedPost === path ? "visible" : ""}>
        <VscChromeClose />
      </span>
      &nbsp;&nbsp;📝{title}
    </PostWrapStyled>
  );
}

const PostWrapStyled = styled.div`
  cursor: pointer;
  padding: 5px 0;
  &:not(.selected):hover {
    background-color: #3c3c3c;
  }
  &.selected {
    background-color: #505050;
  }
  > span {
    display: none;
    &.visible {
      display: block;
    }
  }
  &:hover {
    background-color: #3c3c3c;
  }
  background-color: ${({ selected }) => (selected ? "#505050" : "")};
`;
