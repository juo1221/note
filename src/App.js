import * as _ from "fxjs";
import React, { useState, useEffect, useRef } from "react";
import Lists from "./components/Lists";
import FileForm from "./components/form/FileForm";
import FolderForm from "./components/form/FolderForm";
import { useFolder } from "./customHook/folder";
import Viewer from "./components/Viewer";
import { FiRotateCcw } from "react-icons/fi";
import { srcDefalut, tmpSrcDefalut } from "./data/img";
import { useImg } from "./customHook/img";
import "./App.css";

function App() {
  const { Upper, lists, update, currF, makeFolder, makeFile } = useFolder();
  const [file, setFile] = useState("");
  const imgBtnRef = useRef();
  const { src, tmpSrc, imgRef, changeImg } = useImg([
    srcDefalut,
    tmpSrcDefalut,
  ]);

  const creatF = _.curry((f, title) => {
    //prettier-ignore
    if (currF.current.some((file) => file.title == title)) alert("파일명이 이미 존재합니다.");
    else {
      if (!Array.isArray(currF.current)) currF.current = Upper.children;
      currF.current.push(f(title));
      update();
    }
  });

  /* 클릭했을 때 현재 폴더 지정 */
  const setCurrentFolder = (f) => {
    currF.current = f;
  };

  /* 클릭 폴더 삭제  */
  const remove = (tId) => {
    lists[0].remove(tId);
  };

  /* 클릭 파일 정보  */
  const getFile = (f) => {
    setFile(f);
  };

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      imgRef.current.src = src;
      imgBtnRef.current.blur();
    };
  }, [src, tmpSrc, imgRef]);

  return (
    <div className="app">
      <button ref={imgBtnRef} className="image-btn" onClick={changeImg}>
        <FiRotateCcw />
      </button>
      <div className="container">
        <aside className="aside">
          <div className="lists-container">
            <div className="app-title">BLUE</div>
            <Lists
              lists={lists}
              remove={remove}
              setCurrentFolder={setCurrentFolder}
              getFile={getFile}
              update={update}
            />
          </div>
          <div className="forms">
            <FolderForm creatFolder={creatF(makeFolder)} />
            <FileForm creatFile={creatF(makeFile)} />
          </div>
        </aside>
        <div className="viewer">
          <img ref={imgRef} className="bg-img" src={tmpSrc} alt="bg" />
          {file ? <Viewer file={file} update={update} /> : null}
        </div>
      </div>
    </div>
  );
}

export default App;
