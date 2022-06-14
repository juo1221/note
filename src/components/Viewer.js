import React from "react";
const Viewer = ({ fileInfo }) => {
  const { title, content } = fileInfo;
  return (
    <div className="viewer">
      <h1>{title}</h1>
      <hr />
      <textArea>{content}</textArea>
      <button>저장</button>
    </div>
  );
};

export default Viewer;
