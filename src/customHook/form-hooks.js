import { useState } from "react";

export const useInput = (defaultValue) => {
  const [state, setState] = useState(defaultValue);
  return {
    state,
    onChange: (e) => setState(e.target.value),
    reset: () => setState(defaultValue),
  };
};
