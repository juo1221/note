import { useState } from "react";
import * as _ from "fxjs";

export const useInput = (defaultValue) => {
  const [state, setState] = useState(defaultValue);
  return {
    state,
    onChange: (e) => setState(e.target.value),
    reset: () => setState(defaultValue),
  };
};

export const useForm = (prop) => {
  const { creatFolder, creatFile } = prop;
  const { state: title, reset, onChange } = useInput("");
  const inputState = { value: title, onChange };

  const onSubmitF = (f) => (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    _.go(title, f, (_) => reset());
  };
  return {
    inputState,
    onSubmitFolder: onSubmitF(creatFolder),
    onSubmitFile: onSubmitF(creatFile),
  };
};
