import React, { useRef, useEffect } from "react";
const Viewer = ({ fileInfo, update }) => {
  const { id, title, contents } = fileInfo;
  const areaRef = useRef();

  const onSave = (e) => fileInfo.setContents(areaRef.current.value);

  useEffect(() => {
    areaRef.current.value = contents;
    // eslint-disable-next-line
  }, [id]);

  return (
    <div className="viewer">
      <h1>{title}</h1>
      <hr />
      <textarea ref={areaRef} />
      <button onClick={onSave}>저장</button>
    </div>
  );
};

export default Viewer;
