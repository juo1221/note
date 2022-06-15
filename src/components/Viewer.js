import React, { useRef, useEffect } from "react";
import { cus } from "../utils/customF";

const Viewer = ({ file, update }) => {
  const { id, title, contents } = file;
  const areaRef = useRef();

  const onSave = (e) => file.setContents(areaRef.current.value);

  useEffect(() => {
    areaRef.current.value = contents;
    // eslint-disable-next-line
  }, [id]);

  const breadcrumb = cus.recurJoin;

  return (
    <div className="viewer">
      <h1>{title}</h1>
      <span className="breadcrumb">
        {breadcrumb(
          (f) => f.title,
          (obj) => obj.parent,
          file,
          "-"
        )}
      </span>
      <hr />
      <textarea ref={areaRef} />
      <button onClick={onSave}>저장</button>
    </div>
  );
};

export default Viewer;
