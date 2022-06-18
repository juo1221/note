import { useState, useRef } from "react";
import { cus } from "../utils/customF";
import { v4 as uuidv4 } from "uuid";
import * as _ from "fxjs";

export const useFolder = (topF) => {
  /*최상위 폴더*/

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
  const File = class {
    _id = uuidv4();
    _type = "file";
    _parent = "";
    toJSON() {
      return this.getInfo();
    }
    getInfo() {
      return {
        id: this.id,
        title: this.title,
        type: this.type,
        parent: this.parent,
        contents: this.contents,
        date: this.date,
      };
    }
    static get(title) {
      return new File(title);
    }
    static load(f) {
      return new File(f.title, f.contents, f.date);
    }
    constructor(title, contents = "", date = cus.getDate("/")) {
      this._title = title;
      this._contents = contents;
      this._date = date;
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
      this._parent = v;
    }
    get id() {
      return this._id;
    }
    get title() {
      return this._title;
    }
    get parent() {
      return this._parent;
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

    toJSON() {
      return this.getInfo();
    }
    getInfo() {
      return {
        id: this.id,
        title: this.title,
        type: this.type,
        parent: this.parent,
        children: this.children,
      };
    }
    static get(title) {
      return new Folder(title);
    }
    static load(f) {
      const folder = new Folder(f.title, f.children);
      if (f.type == "folder") {
        [...f.children].forEach((ff) => {
          if (ff.type == "folder") folder.addChild(Folder.load(ff));
          else folder.addChild(File.load(ff));
          folder.children.shift();
        });
      } else {
        folder.addChild(File.load(f));
      }
      return folder;
    }
    addChild(f) {
      this._children.push(f);
    }
    constructor(title, children = []) {
      this._title = title;
      this._children = children;
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
    get parent() {
      return this._parent;
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
    static load(json) {
      const app = new App();
      json.forEach((f) => {
        app.addFolders(Folder.load(f));
      });
      return app;
    }
    constructor() {
      this._folders = [];
    }
    addFolders(f) {
      this._folders.push(f);
    }
    get folders() {
      return this._folders;
    }
  };

  const data = localStorage["note"];
  let app;
  let Upper;
  /*로드 */
  if (data) {
    app = App.load(JSON.parse(data));
    Upper = app.folders[0];
  } else {
    app = new App();
    Upper = Folder.get("folders");
    app.addFolders(Upper);
  }

  /*세이브*/

  window.addEventListener("beforeunload", async (e) => {
    e.preventDefault();
    localStorage["note"] = JSON.stringify(
      lists,
      /* 순환참조 오류를 막기 위해 */
      (k, v) => (k == "parent" ? undefined : v),
      2
    );
  });

  /* 최상위 폴더 등록 */
  const [lists, setLists] = useState(app.folders);
  const currF = useRef(Upper.children);

  /* 리렌더링 */
  const update = () => setLists((prev) => [...prev]);

  /*
  최상위폴더,폴더(파일)리스트, set함수, 현재폴더(파일), 폴더(파일)생성기
   */
  return { Upper, lists, update, currF, Folder, File };
};
