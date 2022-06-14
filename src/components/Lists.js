import React from "react";
import File from "./File";
const Lists = ({ lists, setCurrentFolder }) => {
  return (
    <div className="lists">
      {lists.map((f) => (
        <File key={f.id} parent={f} setCurrentFolder={setCurrentFolder} />
      ))}
    </div>
  );
};

export default Lists;
