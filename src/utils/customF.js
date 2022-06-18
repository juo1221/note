import * as _ from "fxjs";
export const cus = {};

/* iter에서  특정 인덱스의 요소를 제거 */
cus.removeBy = _.curry((f, iter) =>
  _.go(_.findIndex(f, iter), (idx) => _.remove(idx, iter))
);

/*추출함수,조건함수,최상위객체,분리자 */
cus.recurJoin = (f, cond, obj, sep = ",") =>
  cond(obj)
    ? _.go(
        _.map(f, [obj]),
        (v) => cus.recurJoin(f, cond, cond(obj), sep) + `${sep}` + v
      )
    : f(obj);
/*추출함수,조건함수,최상위객체,분리자 */
cus.recurMap = (f, cond, obj) =>
  cus.recurJoin(f, cond, obj).split(",").slice(0, -1);

cus.toggle = (target, className) => target.classList.toggle(className);

cus.getDate = (sep) => {
  const date = new Date();
  const y = date.getFullYear();
  const m = date.getMonth() + 1;
  const d = date.getDate();
  const H = String(date.getHours()).padStart(2, "0");
  const M = String(date.getMinutes()).padStart(2, "0");
  return `${y}${sep}${m}${sep}${d} ${H}시 ${M}분`;
};
