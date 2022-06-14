import React from "react";
import File from "./File";
const Lists = ({ lists, setCurrentFolder, remove, getFileInfo, update }) => {
  return (
    <div className="lists">
      {lists.map((f) => (
        <File
          key={f.id}
          file={f}
          setCurrentFolder={setCurrentFolder}
          remove={remove}
          getFileInfo={getFileInfo}
          update={update}
        />
      ))}
    </div>
  );
};

export default Lists;
