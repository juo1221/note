import * as _ from "fxjs";
const $ = {};

$.el = (v) => document.createElement(v);
$.strToHtml = (html) => {
  const divEl = $.el("div");
  divEl.innerHTML = html;
  return divEl.children[0];
};
$.on = (event, f) => (els) =>
  _.each(
    (el) => el.addEventListener(event, f),
    _.isIterable(els) ? els : [els]
  );
$.append = _.curry((parent, child) => parent.appendChild(child));
$.qs = (sel, parent = document) => parent.querySelector(sel);
$.find = _.curry($.qs);
$.closest = _.curry((sel, el) => el.closest(sel));
$.remove = (el) => el.parentNode.removeChild(el);

export default $;
