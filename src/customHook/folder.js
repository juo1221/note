import { useState, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
/*최상위 폴더*/
export const Upper = {
  id: uuidv4(),
  type: "folder",
  title: "Folders",
  children: [],
};

export const useFolder = (topF = Upper) => {
  const [lists, setLists] = useState([topF]);
  const currF = useRef(lists[0].children);

  const makeFolder = (title) => ({
    id: uuidv4(),
    title,
    type: "folder",
    children: [],
  });

  const makeFile = (title) => ({
    id: uuidv4(),
    title,
    type: "file",
    content: "",
  });
  /*
  폴더(파일)리스트, set함수, 현재폴더(파일), 폴더(파일)생성기
   */
  return { lists, setLists, currF, makeFolder, makeFile };
};
