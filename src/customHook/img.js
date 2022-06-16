import { useState, useRef } from "react";
import { getImgSrcO, getImgSrcP } from "../data/img";

export const useImg = ([srcD, tmpSrcD]) => {
  const imgRef = useRef();
  const [src, setSrc] = useState(srcD);
  const [tmpSrc, setTmpSrc] = useState(tmpSrcD);

  /* 배경 변경 */
  const changeImg = () => {
    setSrc(getImgSrcO.next().value);
    setTmpSrc(getImgSrcP.next().value);
  };

  return { src, tmpSrc, imgRef, changeImg };
};
