import React from "react";
import { useForm } from "../../customHook/form-hooks";

const FileForm = ({ creatFile }) => {
  const { inputState, onSubmitFile } = useForm({ creatFile });

  return (
    <form>
      <input type="text" {...inputState} />
      <button type="submit" onClick={onSubmitFile}>
        파일추가
      </button>
    </form>
  );
};

export default FileForm;
