import api from "@/api/api";
import { Todo } from "@/schema/todos.schema";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

function useTodosList() {
  const queryClient = useQueryClient();

  const { data: todos } = useQuery({
    queryKey: ["todos"],
    queryFn: api.todos.getTodos,
    initialData: [],
  });

  const { mutate: toggleIsCompleted } = useMutation({
    mutationFn: api.todos.toggleIsCompleted,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["todos"] }),
  });

  const { mutate: deleteTodo } = useMutation({
    mutationFn: api.todos.deleteTodo,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["todos"] }),
  });

  const handleClickTodo = async (todo: Todo) => {
    toggleIsCompleted(todo);
  };

  const handleClickDeleteTodo = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    todo: Todo
  ) => {
    e.stopPropagation();
    deleteTodo(todo);
  };

  return {
    todos,
    handleClickTodo,
    handleClickDeleteTodo,
  };
}

export default useTodosList;
