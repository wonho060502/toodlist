import api from "@/api/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";

function useNewTodoForm() {
  const queryClient = useQueryClient();

  const inputRef = useRef<HTMLInputElement>(null);
  const { mutate: createTodo, isPending: isCreateOnProcess } = useMutation({
    mutationFn: api.todos.createTodo,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["todos"] }),
  });

  const handleClickAdd = async () => {
    if (isCreateOnProcess) return;

    const content = inputRef.current?.value;
    if (!content) return alert("내용을 입력해 주세요");

    createTodo(content);
    inputRef.current.value = "";
  };

  return {
    inputRef,
    handleClickAdd,
    isCreateOnProcess,
  };
}

export default useNewTodoForm;
