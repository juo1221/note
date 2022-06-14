import React from "react";
import File from "./File";
const Lists = ({ lists, setCurrentFolder, remove }) => {
  return (
    <div className="lists">
      {lists.map((f) => (
        <File
          key={f.id}
          parent={f}
          setCurrentFolder={setCurrentFolder}
          remove={remove}
        />
      ))}
    </div>
  );
};

export default Lists;
