/* bg img 변경을 위한 Img id 저장소 */

const ids = [1051, 178, 334, 1073, 256, 1045, 129, 210, 1059, 240, 433, 103];

/* 원본 이미지 src */
export const getImgSrcO = (function* () {
  while (true) {
    for (const id of ids) yield `http://picsum.photos/id/${id}/2700/1900`;
  }
})();

/* placeholder 이미지 src */
export const getImgSrcP = (function* () {
  while (true) {
    for (const id of ids) yield `http://picsum.photos/id/${id}/810/570`;
  }
})();

export const srcDefalut = `http://picsum.photos/id/103/2700/1900`;

export const tmpSrcDefalut = `http://picsum.photos/id/103/810/570`;
