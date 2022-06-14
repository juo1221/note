import FileForm from "./components/form/FileForm";
import FolderForm from "./components/form/FolderForm";

import "./App.css";

function App() {
  return (
    <div className="app">
      <h1>Note</h1>
      <div className="forms">
        <FolderForm />
        <FileForm />
      </div>
      <main className="main"></main>
    </div>
  );
}

export default App;
