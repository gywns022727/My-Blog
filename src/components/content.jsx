import React, { useContext } from "react";
import Accordion from "./Accordion";
import AppContext from "../context/AppContext";

export default function Content({ type, title, children }) {
  const { setSelectedPost, openPost, setOpenPost } = useContext(AppContext);

  function selectedFunction() {
    setSelectedPost(title);
    setOpenPost([...openPost, title]);
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
