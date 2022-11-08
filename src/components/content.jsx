import React, { useContext } from "react";
import styled from "styled-components";
import Accordion from "./Accordion";
import AppContext from "../context/AppContext";

export default function Content({ type, title, children, path }) {
  const { selectedPost, setSelectedPost, openPost, setOpenPost } =
    useContext(AppContext);

  function selectedFunction() {
    setSelectedPost(path);

    if (!openPost.includes(path)) {
      setOpenPost([...openPost, path]);
    }
  }
  return type === "directory" ? (
    <Accordion title={`📂${title}`}>
      {children?.map((one, index) => (
        <Content {...one} key={index} />
      ))}
    </Accordion>
  ) : (
    <PostWrap
      onClick={selectedFunction}
      className={selectedPost === path ? "selected" : ""}
    >
      &nbsp;&nbsp;&nbsp;&nbsp;📝{title}
    </PostWrap>
  );
}

const PostWrap = styled.div`
  cursor: pointer;
  padding: 5px 0;
  &:not(.selected):hover {
    background-color: ${({ theme }) => theme.color.hover};
  }

  &.selected {
    background-color: ${({ theme }) => theme.color.selected};
  }
  &:hover {
    background-color: ${({ theme }) => theme.color.hover};
  }
  background-color: ${({ selected, theme }) =>
    selected ? `${theme.color.selected}` : ""};
`;
