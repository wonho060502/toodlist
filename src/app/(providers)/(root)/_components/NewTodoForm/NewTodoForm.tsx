"use client";

import React from "react";
import useNewTodoForm from "./NewTodoForm.hooks";

function NewTodoForm() {
  const { inputRef, handleClickAdd, isCreateOnProcess } = useNewTodoForm();

  return (
    <div className="border-b py-2.5 px-5 flex">
      <input
        ref={inputRef}
        type="text"
        placeholder="새로운 할 일을 적어주세요"
        className="grow border p-2"
        autoFocus
      />
      <button
        onClick={handleClickAdd}
        className="bg-black text-white p-2 font-bold text-sm"
        disabled={isCreateOnProcess}
      >
        추가하기
      </button>
    </div>
  );
}

export default NewTodoForm;
