import React, { useRef, useState, useEffect } from "react";
import { cus } from "../utils/customF";
import "./file.css";

/* file은 타입에 따라 폴더 혹은 파일이 될 수 있다.*/
const File = ({ parent, file, setCurrentFolder, remove, getFile, update }) => {
  const { id, title, type, children } = file;
  const [focused, setFocused] = useState(false);
  const inputRef = useRef();
  const targetRef = useRef();
  const subRef = useRef();

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

  const fileToggle = () => {
    cus.toggle(targetRef.current, "focused");
    cus.toggle(subRef.current, "unfold");
  };

  const setOnClick = (e) => {
    e.stopPropagation();
    setFocused(!focused);
    fileToggle();
    if (type == "folder") setCurrentFolder(children);
    else getFile(file);
  };

  useEffect(() => {
    file.setParent(parent);
    setInput(title);
    unlock();
  }, []);

  return (
    <ul
      ref={targetRef}
      className={parent ? type : `${type} upper`}
      onClick={setOnClick}
    >
      <li>
        <div className="box">
          <img
            className="file-img"
            src={
              type == "folder"
                ? `/folder-${focused ? "open" : "close"}.svg`
                : "/file-solid.svg"
            }
            width="16px"
            height="16px"
            alt=""
          />
          <input
            className="title"
            ref={inputRef}
            onKeyUp={onKeyUp}
            onBlur={onBlur}
          />
          {parent ? (
            <button className="delBtn" type="button" onClick={setOnDelete}>
              x
            </button>
          ) : null}
        </div>
        <div ref={subRef} className="sub-files unfold">
          {type == "folder"
            ? children.map((f) => (
                <File
                  key={f.id}
                  parent={file}
                  file={f}
                  setCurrentFolder={setCurrentFolder}
                  remove={remove}
                  getFile={getFile}
                  update={update}
                />
              ))
            : null}
        </div>
      </li>
    </ul>
  );
};

export default File;
