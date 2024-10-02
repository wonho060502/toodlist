import { Tables } from "@/supabase/database.types";

export type Todo = Tables<"todos">;

type TodoData = Pick<Todo, "userId" | "content">;
