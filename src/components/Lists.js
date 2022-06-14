import React from "react";
import File from "./File";
const Lists = ({ lists, setCurrentFolder, remove, getFileInfo }) => {
  return (
    <div className="lists">
      {lists.map((f) => (
        <File
          key={f.id}
          parent={f}
          setCurrentFolder={setCurrentFolder}
          remove={remove}
          getFileInfo={getFileInfo}
        />
      ))}
    </div>
  );
};

export default Lists;
