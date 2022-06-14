import * as _ from "fxjs";
import React, { useRef, useEffect } from "react";

/* file은 타입에 따라 폴더 혹은 파일이 될 수 있다.*/
const File = ({
  parent,
  file,
  setCurrentFolder,
  remove,
  getFileInfo,
  update,
}) => {
  const { id, title, type, children } = file;
  const inputRef = useRef();
  const setOnDelete = (e) => {
    e.stopPropagation();
    parent && parent.removeChild(id);
  };
  const lock = () => {
    inputRef.current.readOnly = false;
  };
  const unlock = () => {
    inputRef.current.readOnly = true;
  };
  const onKeyUp = (e) => {
    if (e.keyCode != 13) return;
    lock();
  };

  const setInput = (v) => {
    inputRef.current.value = v;
  };
  const cancel = () => setInput(title);

  const onBlur = (e) => {
    unlock();
    const value = inputRef.current.value.trim();
    if (file.title == value) return cancel();
    if (!value) {
      window.alert("제목을 입력해주세요");
      return cancel();
    }
    if (window.confirm("저장하시겠습니까?")) file.setTitle(value);
    else cancel();
  };
  useEffect(() => {
    setInput(title);
    unlock();
  }, []);

  return (
    <ul
      className={type}
      onClick={(e) => {
        e.stopPropagation();
        if (type == "folder") setCurrentFolder(children);
        else getFileInfo(file);
      }}
    >
      <li>
        <div className="box">
          <input
            className="title"
            ref={inputRef}
            onKeyUp={onKeyUp}
            onBlur={onBlur}
          />
          {parent ? (
            <button type="button" onClick={setOnDelete}>
              삭제
            </button>
          ) : null}
        </div>
        {type == "folder"
          ? children.map((f) => (
              <File
                key={f.id}
                parent={file}
                file={f}
                setCurrentFolder={setCurrentFolder}
                remove={remove}
                getFileInfo={getFileInfo}
                update={update}
              />
            ))
          : null}
      </li>
    </ul>
  );
};

export default File;
