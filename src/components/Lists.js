import React from "react";
import File from "./File";
const Lists = ({ lists, setCurrentFolder, remove, getFile, update }) => {
  return (
    <div className="lists">
      {lists.map((f) => (
        <File
          key={f.id}
          parent={null}
          file={f}
          setCurrentFolder={setCurrentFolder}
          remove={remove}
          getFile={getFile}
          update={update}
        />
      ))}
    </div>
  );
};

export default Lists;
