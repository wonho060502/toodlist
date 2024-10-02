import { Todo } from "@/schema/todos.schema";
import supabase from "@/supabase/supabase.client";

async function createTodo(content: string) {
  const { data } = await supabase.auth.getUser();
  const user = data.user!;

  await supabase.from("todos").insert({ content, userId: user.id });
}

async function getTodos() {
  const { data } = await supabase.auth.getUser();
  const user = data.user!;

  const response = await supabase
    .from("todos")
    .select("*")
    .eq("userId", user.id);
  const todos = response.data;

  if (!todos) return [];

  return todos;
}

async function toggleIsCompleted(todo: Todo) {
  await supabase
    .from("todos")
    .update({ isCompleted: !todo.isCompleted })
    .eq("id", todo.id);
}

async function deleteTodo(todo: Todo) {
  await supabase.from("todos").delete().eq("id", todo.id);
}

const todosAPI = {
  createTodo,
  getTodos,
  toggleIsCompleted,
  deleteTodo,
};

export default todosAPI;
