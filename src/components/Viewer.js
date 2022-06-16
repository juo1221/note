import React, { useRef, useEffect } from "react";
import { cus } from "../utils/customF";
import "./viewer.css";

const Viewer = ({ file, update }) => {
  const { id, title, contents } = file;
  const areaRef = useRef();

  const onSave = (e) => file.setContents(areaRef.current.value);

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
    <div>
      <h1 className="file-title">{title}</h1>
      <span className="breadcrumb">{breadcrumb}</span>
      <div className="file-save">
        <button  onClick={onSave}>저장</button>
      </div>
      <hr />
      <textarea ref={areaRef} />
    </div>
  );
};

export default Viewer;
