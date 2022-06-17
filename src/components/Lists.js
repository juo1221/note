import React from "react";
import File from "./File";
import "./lists.css";
const Lists = ({ lists, setCurrentFolder, getFile, update, initFile }) => {
  return (
    <div className="lists">
      {lists.map((f) => (
        <File
          key={f.id}
          parent={null}
          file={f}
          setCurrentFolder={setCurrentFolder}
          getFile={getFile}
          update={update}
          initFile={initFile}
        />
      ))}
    </div>
  );
};

export default Lists;
