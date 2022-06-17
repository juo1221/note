import $ from "./Dom";
import * as _ from "fxjs";

const Ui = {};

const modalStr = (msg, btns) => /*html*/ `
<div class="confirm">
  <div class="body">
      <div class="msg">${msg}</div>
      <div class="buttons">
      ${_.strMap(
        (btn) =>
          `<button type="button" class="${btn.type}">${btn.name}</button>`,
        btns
      )}
      </div>
  </div>
</div>
`;

Ui.message = _.curry(
  (btns, msg) =>
    new Promise((res) =>
      _.go(
        modalStr(msg, btns),
        $.strToHtml,
        $.append($.qs("body")),
        ..._.map(
          (btn) =>
            _.tap(
              $.find(`.${btn.type}`),
              $.on("click", ({ currentTarget }) =>
                _.go(currentTarget, $.closest(".confirm"), $.remove, (_) =>
                  res(btn.value)
                )
              )
            ),
          btns
        )
      )
    )
);

Ui.confirm = Ui.message([
  { name: "취소", type: "cancel", value: false },
  { name: "확인", type: "ok", value: true },
]);

Ui.alert = Ui.message([{ name: "확인", type: "ok", value: true }]);

export default Ui;
