import React from "react";
import { TodoButton } from "./Clients";
import { TodoItemProps } from "@/custom";

export const TodoItem = ({ title, description, _id, isCompleted }: TodoItemProps) => {
  return (
    <div className="todo">
      <div>
        <h4>{title}</h4>
        <p>{description}</p>
      </div>

      <div>
        <TodoButton id={_id} completed={isCompleted} />
      </div>
    </div>
  );
};