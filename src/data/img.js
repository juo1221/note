/* bg img 변경을 위한 Img id 저장소 */

const ids = [1051, 178, 334, 1073, 1045, 129, 182, 1059, 240, 433, 103, 1081];

/* 원본 이미지 src */
export const getImgSrcO = (function* () {
  while (true) {
    for (const id of ids) yield `http://picsum.photos/id/${id}/3000/1900`;
  }
})();

/* placeholder 이미지 src */
export const getImgSrcP = (function* () {
  while (true) {
    for (const id of ids) yield `http://picsum.photos/id/${id}/1080/684`;
  }
})();

export const srcDefalut = `http://picsum.photos/id/1081/3000/1900`;

export const tmpSrcDefalut = `http://picsum.photos/id/1081/1080/684`;
