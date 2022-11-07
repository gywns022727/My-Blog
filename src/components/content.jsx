import React, { useContext } from "react";
import Accordion from "./Accordion";
import AppContext from "../context/AppContext";

export default function Content({ type, title, children, path }) {
  const { setSelectedPost, openPost, setOpenPost } = useContext(AppContext);

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
    <div onClick={selectedFunction}>&nbsp;&nbsp;&nbsp;&nbsp;📝{title}</div>
  );
}
