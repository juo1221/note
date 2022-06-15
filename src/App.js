import * as _ from "fxjs";
import React, { useState } from "react";
import Lists from "./components/Lists";
import FileForm from "./components/form/FileForm";
import FolderForm from "./components/form/FolderForm";
import { useFolder } from "./customHook/folder";
import Viewer from "./components/Viewer";
import "./App.css";

function App() {
  const { Upper, lists, update, currF, makeFolder, makeFile } = useFolder();
  const [file, setFile] = useState("");

  const creatF = _.curry((f, title) => {
    /* 클릭한 폴더에 추가 후 재렌더링 */
    if (!Array.isArray(currF.current)) currF.current = Upper.children;
    currF.current.push(f(title));
    update();
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

  return (
    <div className="app">
      <h1>Note</h1>
      <div className="forms">
        <FolderForm creatFolder={creatF(makeFolder)} />
        <FileForm creatFile={creatF(makeFile)} />
      </div>
      <main className="main">
        <Lists
          lists={lists}
          remove={remove}
          setCurrentFolder={setCurrentFolder}
          getFile={getFile}
          update={update}
        />
        {file ? <Viewer file={file} update={update} /> : null}
      </main>
    </div>
  );
}

export default App;
