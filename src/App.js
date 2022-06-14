import * as _ from "fxjs";
import FileForm from "./components/form/FileForm";
import FolderForm from "./components/form/FolderForm";
import Lists from "./components/Lists";
import { Upper, useFolder } from "./customHook/folder";

import "./App.css";

function App() {
  const { lists, setLists, currF, makeFolder, makeFile } = useFolder();

  const creatF = _.curry((f, title) => {
    /* 클릭한 폴더에 추가 후 재렌더링 */
    if (!Array.isArray(currF.current)) currF.current = Upper.children;
    currF.current.push(f(title));
    setLists((prev) => [...prev]);
  });

  /* 클릭했을 때 현재 폴더 지정 */
  const setCurrentFolder = (f) => {
    currF.current = f;
  };
  return (
    <div className="app">
      <h1>Note</h1>
      <div className="forms">
        <FolderForm creatFolder={creatF(makeFolder)} />
        <FileForm creatFile={creatF(makeFile)} />
      </div>
      <main className="main">
        <Lists lists={lists} setCurrentFolder={setCurrentFolder} />
      </main>
    </div>
  );
}

export default App;
