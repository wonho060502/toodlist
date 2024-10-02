"use client";

import { cx } from "class-variance-authority";
import React from "react";
import useTodosList from "./TodosList.hooks";

function TodosList() {
  const { todos, handleClickTodo, handleClickDeleteTodo } = useTodosList();

  return (
    <ul className="grid grid-cols-1 gap-y-1 bg-gray-100">
      {todos.map((todo) => (
        <li key={todo.id}>
          <div
            onClick={() => handleClickTodo(todo)}
            className={cx(
              todo.isCompleted && "text-gray-400 line-through",
              "cursor-pointer px-5 py-2 bg-white w-full hover:brightness-90 active:brightness-75 flex justify-between"
            )}
          >
            <span>{todo.content}</span>
            <button onClick={(e) => handleClickDeleteTodo(e, todo)}>
              삭제
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default TodosList;
