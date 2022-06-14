import React from "react";
import { useForm } from "../../customHook/form-hooks";

const FolderForm = ({ creatFolder }) => {
  const { inputState, onSubmitFolder } = useForm({ creatFolder });
  return (
    <form>
      <input type="text" {...inputState} />
      <button type="submit" onClick={onSubmitFolder}>
        폴더추가
      </button>
    </form>
  );
};

export default FolderForm;
