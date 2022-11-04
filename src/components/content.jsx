import React from "react";
import Accordion from "../components/Accordion";
export default function Content({ type, title, children }) {
  return type === "directory" ? (
    <Accordion title={`📂${title}`}>
      {children?.map((one) => (
        <Content {...one} />
      ))}
    </Accordion>
  ) : (
    <div>&nbsp;&nbsp;&nbsp;&nbsp;📝{title}</div>
  );
}
