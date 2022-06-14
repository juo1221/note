import { useState, useRef } from "react";
import { cus } from "../utils/customF";
import { v4 as uuidv4 } from "uuid";
import * as _ from "fxjs";

export const useFolder = (topF) => {
  /*최상위 폴더*/
  const Upper = {
    id: uuidv4(),
    type: "folder",
    title: "Folders",
    children: [],
    removeChild(id) {
      remove((f) => f.id == id, this);
    },
  };

  const [lists, setLists] = useState([topF || Upper]);
  const currF = useRef(lists[0].children);

  /* 리렌더링 */
  const update = () => setLists((prev) => [...prev]);

  //prettier-ignore
  const remove = (callback, parent) =>
    _.go(
      parent.children,
      cus.removeBy(callback),
      (remain) => {
        console.log(remain);
        currF.current = parent;
        currF.current.children = remain;
        update()
      },
    );

  const makeFolder = (title) => ({
    id: uuidv4(),
    title,
    type: "folder",
    children: [],
    removeChild(id) {
      remove((f) => f.id == id, this);
    },
    setTitle(v) {
      this.title = v;
      update();
    },
  });

  const makeFile = (title) => ({
    id: uuidv4(),
    title,
    type: "file",
    contents: "",
    setTitle(v) {
      this.title = v;
      update();
    },
    setContents(v) {
      this.contents = v;
      update();
    },
  });
  /*
  최상위폴더,폴더(파일)리스트, set함수, 현재폴더(파일), 폴더(파일)생성기
   */
  return { Upper, lists, update, currF, makeFolder, makeFile };
};
