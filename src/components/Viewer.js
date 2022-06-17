import React, { useEffect } from "react";
import { cus } from "../utils/customF";
import "./viewer.css";

const Viewer = ({ file, update, areaRef, save }) => {
  const { id, title, contents, date } = file;

  useEffect(() => {
    areaRef.current.value = contents;
    // eslint-disable-next-line
  }, [id]);

  const breadcrumb = cus.recurJoin(
    (f) => f.title,
    (obj) => obj.parent,
    file,
    "-"
  );

  return (
    <div className="viewer-container">
      <div>
        <h1 className="file-title">{title}</h1>
        <p className="breadcrumb">{breadcrumb}</p>
        <p className="date">{date}</p>
        <div className="file-save">
          <button onClick={save}>저장</button>
        </div>
        <hr />
      </div>
      <textarea ref={areaRef} />
    </div>
  );
};

export default Viewer;
