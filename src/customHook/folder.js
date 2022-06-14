import { useState, useRef } from "react";
import { cus } from "../utils/customF";
import { v4 as uuidv4 } from "uuid";
import * as _ from "fxjs";

/*최상위 폴더*/
export const Upper = {
  id: uuidv4(),
  type: "folder",
  title: "Folders",
  children: [],
  remove(id) {
    this.children.map((v) => v.remove(this, id));
  },
};

export const useFolder = (topF = Upper) => {
  const [lists, setLists] = useState([topF]);
  const currF = useRef(lists[0].children);

  //prettier-ignore
  const remove = (callback, parent) =>
    _.go(
      parent.children,
      cus.removeBy(callback),
      (remain) => {
        currF.current = parent;
        currF.current.children = remain;
        setLists((prev) => [...prev]);
      },
    );

  const makeFolder = (title) => ({
    id: uuidv4(),
    title,
    type: "folder",
    children: [],
    remove(parent, id) {
      if (id == this.id) remove((f) => f.id == id, parent);
      else this.children.map((v) => v.remove(this, id));
    },
  });

  const makeFile = (title) => ({
    id: uuidv4(),
    title,
    type: "file",
    content: "",
    remove(parent, id) {
      if (id == this.id) remove((f) => f.id == id, parent);
    },
  });
  /*
  폴더(파일)리스트, set함수, 현재폴더(파일), 폴더(파일)생성기
   */
  return { lists, setLists, currF, makeFolder, makeFile };
};
