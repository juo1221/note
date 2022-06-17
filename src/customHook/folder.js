import { useState, useRef } from "react";
import { cus } from "../utils/customF";
import { v4 as uuidv4 } from "uuid";
import * as _ from "fxjs";

export const useFolder = (topF) => {
  /*최상위 폴더*/

  const File = class {
    _id = uuidv4();
    _type = "file";
    _parent = "";
    _contents = "";
    _date = cus.getDate("/");

    static get(title) {
      return new File(title);
    }
    constructor(title) {
      this._title = title;
    }
    set title(v) {
      this._title = v;
      update();
    }
    set contents(v) {
      this._contents = v;
      update();
    }
    set parent(v) {
      console.log("setParetn:", v);
      this._parent = v;
    }
    get id() {
      return this._id;
    }
    get title() {
      return this._title;
    }
    get type() {
      return this._type;
    }
    get contents() {
      return this._contents;
    }
    get date() {
      return this._date;
    }
  };

  const Folder = class {
    _id = uuidv4();
    _type = "folder";
    _parent = "";
    _children = [];

    static get(title) {
      return new Folder(title);
    }
    constructor(title) {
      this._title = title;
    }
    set parent(v) {
      this._parent = v;
    }
    set title(v) {
      this._title = v;
      update();
    }
    set children(newChild) {
      this._children = [...newChild];
    }
    get id() {
      return this._id;
    }
    get title() {
      return this._title;
    }
    get type() {
      return this._type;
    }
    get children() {
      return this._children;
    }
    removeChild(id) {
      remove((f) => f.id == id, this);
    }
  };

  const App = class {
    constructor() {
      this._folders = [];
    }
    addFolders(f) {
      if (!(f instanceof Folder)) throw new Error(`invalid f : ${f}`);
      this._folders.push(f);
    }
    get folders() {
      return this._folders;
    }
  };

  const app = new App();
  /* 최상위 폴더 등록 */
  const Upper = Folder.get("folders");
  app.addFolders(Upper);
  const [lists, setLists] = useState(app.folders);
  const currF = useRef(Upper.children);

  /* 리렌더링 */
  const update = () => setLists((prev) => [...prev]);

  //prettier-ignore
  const remove = (callback, parent) =>
    _.go(
      parent.children,
      cus.removeBy(callback),
      (remain) => {
        parent.children = remain;
        currF.current = parent.children;
        update()
      },
    );

  /*
  최상위폴더,폴더(파일)리스트, set함수, 현재폴더(파일), 폴더(파일)생성기
   */
  return { Upper, lists, update, currF, Folder, File };
};

localStorage["note"] = JSON.stringify();
