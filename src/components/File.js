import React from "react";
const File = ({ parent }) => {
  const { id, title, type, children } = parent;

  return (
    <ul className={type}>
      <li>
        <div className="box">
          <p className="title">{title}</p>
          <button type="button">삭제</button>
        </div>
        {type == "folder"
          ? children.map((f) => <File key={f.id} parent={f} />)
          : null}
      </li>
    </ul>
  );
};

export default File;
