import React, { useRef, useState, useEffect } from "react";
import { cus } from "../utils/customF";
import Ui from "../utils/UI";
import "./file.css";

/* file은 타입에 따라 폴더 혹은 파일이 될 수 있다.*/
const File = ({
  parent,
  file,
  setCurrentFolder,
  getFile,
  update,
  initFile,
}) => {
  const { id, title, type, children } = file;
  const [focused, setFocused] = useState(false);
  const inputRef = useRef();
  const targetRef = useRef();
  const subRef = useRef();

  const setOnDelete = async (e) => {
    e.stopPropagation();
    if (await Ui.confirm("정말 삭제할까요?")) {
      parent && parent.removeChild(id);
      initFile(file);
    }
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

  const onBlur = async (e) => {
    unlock();
    const value = inputRef.current.value.trim();
    if (file.title == value) return cancel();
    if (!value) {
      Ui.alert("제목을 입력해주세요");
      return cancel();
    }
    if (await Ui.confirm("저장하시겠습니까?")) file.title = value;
    else cancel();
  };

  const fileToggle = () => {
    cus.toggle(targetRef.current, "focused");
    cus.toggle(subRef.current, "hide");
    /* 파일이 열릴때 애니메이션 효과를 주기 위해 show를 적용하고 해제한다. */
    if (!subRef.current.classList.contains("hide")) {
      cus.toggle(subRef.current, "show");
      setTimeout(() => cus.toggle(subRef.current, "show"), 0);
    }
  };

  const setOnClick = (e) => {
    e.stopPropagation();
    setFocused(!focused);
    fileToggle();
    if (type == "folder") setCurrentFolder(children);
    else getFile(file);
  };

  useEffect(() => {
    file.parent = parent;
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
        <div className="sub-container">
          <div ref={subRef} className="sub-files hide">
            {type == "folder"
              ? children.map((f) => (
                  <File
                    key={f.id}
                    parent={file}
                    file={f}
                    setCurrentFolder={setCurrentFolder}
                    getFile={getFile}
                    update={update}
                    initFile={initFile}
                  />
                ))
              : null}
          </div>
        </div>
      </li>
    </ul>
  );
};

export default File;
