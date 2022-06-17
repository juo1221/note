import React, { useRef, useEffect } from "react";
import { cus } from "../utils/customF";
import Ui from "../utils/UI";
import "./viewer.css";

const Viewer = ({ file, update }) => {
  const { id, title, contents, date } = file;
  const areaRef = useRef();

  const onSave = async () => {
    Ui.alert("저장완료!");
    file.setContents(areaRef.current.value);
  };

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
          <button onClick={onSave}>저장</button>
        </div>
        <hr />
      </div>
      <textarea ref={areaRef} />
    </div>
  );
};

export default Viewer;
