import React from "react";
import File from "./File";
import "./lists.css";
const Lists = ({ lists, setCurrentFolder, getFile, update }) => {
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
        />
      ))}
    </div>
  );
};

export default Lists;
