import React from "react";
import { useForm } from "../../customHook/form-hooks";
import { AiFillFileAdd } from "react-icons/ai";

const FileForm = ({ creatFile }) => {
  const { inputState, onSubmitFile } = useForm({ creatFile });

  return (
    <form className="file-form">
      <button type="submit" onClick={onSubmitFile}>
        <AiFillFileAdd />
      </button>
      <input type="text" {...inputState} placeholder="파일명" />
    </form>
  );
};

export default FileForm;
