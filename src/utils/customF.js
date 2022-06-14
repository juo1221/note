import * as _ from "fxjs";
export const cus = {};

/* iter에서  특정 인덱스의 요소를 제거 */
cus.removeBy = _.curry((f, iter) =>
  _.go(_.findIndex(f, iter), (idx) => _.remove(idx, iter))
);
