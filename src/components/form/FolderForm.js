import React from "react";
import { useForm } from "../../customHook/form-hooks";
import { AiFillFolderAdd } from "react-icons/ai";
const FolderForm = ({ creatFolder }) => {
  const { inputState, onSubmitFolder } = useForm({ creatFolder });
  return (
    <form className="folder-form">
      <button type="submit" onClick={onSubmitFolder}>
        <AiFillFolderAdd />
      </button>
      <input type="text" {...inputState} placeholder="폴더명" />
    </form>
  );
};

export default FolderForm;
