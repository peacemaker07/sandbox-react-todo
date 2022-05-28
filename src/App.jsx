import { useState } from "react";
import "./styles.css";
import { InputTodo } from "./components/InputTodo";
import { InCompleteTodsTodo } from "./components/InCompleteTodos";
import { CompleteTodsTodo } from "./components/CompleteTods";

export const App = () => {
  const [todoText, setTodoText] = useState("");
  const [incompleteTodos, setIncompleteTodos] = useState([]);
  const [completeTodos, setCompleteTodos] = useState([]);

  const onChangeTodoText = (event) => setTodoText(event.target.value);
  const onClickAdd = () => {
    if (todoText === "") return;

    const newTodos = [...incompleteTodos, todoText];
    setIncompleteTodos(newTodos);
    setTodoText("");
  };
  const onClickDelete = (index) => {
    const newTodos = [...incompleteTodos];
    newTodos.splice(index, 1);
    setIncompleteTodos(newTodos);
  };
  const onClickComplete = (index) => {
    const newInCompleteTodos = [...incompleteTodos];
    const newCompleteTodos = [...completeTodos, incompleteTodos[index]];

    newInCompleteTodos.splice(index, 1);
    setIncompleteTodos(newInCompleteTodos);

    setCompleteTodos(newCompleteTodos);
  };
  const onClickBack = (index) => {
    const newCompleteTodos = [...completeTodos];
    const newInCompleteTodos = [...incompleteTodos, completeTodos[index]];

    newCompleteTodos.splice(index, 1);
    setCompleteTodos(newCompleteTodos);

    setIncompleteTodos(newInCompleteTodos);
  };

  return (
    <>
      <InputTodo
        todoText={todoText}
        onChange={onChangeTodoText}
        onClick={onClickAdd}
        disabled={incompleteTodos.length >= 5}
      />
      {incompleteTodos.length >= 5 && (
        <p style={{ color: "red" }}>登録できるtodo5個までだよ〜。消化しろー</p>
      )}
      <InCompleteTodsTodo
        todos={incompleteTodos}
        onClickComplete={onClickComplete}
        onClickDelete={onClickDelete}
      />
      <CompleteTodsTodo todos={completeTodos} onClickBack={onClickBack} />
    </>
  );
};
