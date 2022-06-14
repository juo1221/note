import React from "react";
import File from "./File";
const Lists = ({ lists }) => {
  return (
    <div className="lists">
      {lists.map((f) => (
        <File key={f.id} parent={f} />
      ))}
    </div>
  );
};

export default Lists;
