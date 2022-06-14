import React from "react";

const File = ({ parent, setCurrentFolder, remove, getFileInfo }) => {
  const { id, title, type, children } = parent;
  const setOnDelete = (e) => {
    e.stopPropagation();
    remove(id);
  };

  return (
    <ul
      className={type}
      onClick={(e) => {
        e.stopPropagation();
        if (type == "folder") setCurrentFolder(children);
        else getFileInfo(parent);
      }}
    >
      <li>
        <div className="box">
          <p className="title">{title}</p>
          <button type="button" onClick={setOnDelete}>
            삭제
          </button>
        </div>
        {type == "folder"
          ? children.map((f) => (
              <File
                key={f.id}
                parent={f}
                setCurrentFolder={setCurrentFolder}
                remove={remove}
                getFileInfo={getFileInfo}
              />
            ))
          : null}
      </li>
    </ul>
  );
};

export default File;
