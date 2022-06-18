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
import Ui from "./utils/UI";
import "./App.css";

function App() {
  const { Upper, lists, update, currF, Folder, File } = useFolder();
  const [file, setFile] = useState("");
  const imgBtnRef = useRef();
  const areaRef = useRef();

  //prettier-ignore
  const { src, tmpSrc, imgRef, changeImg } = useImg([srcDefalut,tmpSrcDefalut]);
  const creatF = _.curry((f, title) => {
    if (!Array.isArray(currF.current)) setCurrentFolder(Upper.children);
    //prettier-ignore
    if (currF.current.some((file) => file.title == title)) Ui.alert("파일명이 이미 존재합니다.");
    else {
      currF.current.push(f.get(title));
      update();
    }
  });

  /* 클릭했을 때 현재 폴더 지정 */
  const setCurrentFolder = (f) => {
    currF.current = f;
  };

  const save = () => {
    Ui.alert("저장완료!");
    file.contents = areaRef.current.value;
  };

  /* 클릭 파일 정보  */
  const getFile = async (f) => {
    /* 모든 조건이 true이면 confrim 창 적용 */
    const conds = [
      () => file,
      () => file.id != f.id,
      () => file.contents !== areaRef.current.value,
    ];
    _.go(
      conds,
      _.every((f) => f()),
      async (b) => {
        if (b) if (await Ui.confirm("기록을 저장할까요?")) save();
      },
      () => setFile(f)
    );
  };

  /* 화면에 보여주고 있는 파일과 지우려는 파일이 같다면 초기화 */
  const initFile = (f) => {
    if (file.id == f.id) setFile();
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
              setCurrentFolder={setCurrentFolder}
              getFile={getFile}
              initFile={initFile}
              update={update}
            />
          </div>
          <div className="forms">
            <FolderForm creatFolder={creatF(Folder)} />
            <FileForm creatFile={creatF(File)} />
          </div>
        </aside>
        <div className="viewer">
          <div className="img-box">
            <img ref={imgRef} className="bg-img" src={tmpSrc} alt="bg" />
          </div>
          {file ? (
            <Viewer file={file} update={update} areaRef={areaRef} save={save} />
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default App;
