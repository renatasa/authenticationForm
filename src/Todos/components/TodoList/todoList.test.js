import { checkProps } from "../../../test/testUtils";
import TodoList from "./todoList.jsx";

const defaultProps = {
  inputChangedHandler: (event) => this.inputChangedHandler(event),
  todos: [
    { todo: "first todo", completed: true, delete: false },
    { todo: "second todo", completed: false, delete: false },
    { todo: "third todo", completed: false, delete: false },
  ],
  todoDelete: () => this.todoDelete(),
  todoCompleted: () => this.todoCompleted(),
};


test("TodoList component renders without error", () => {
  expect(TodoList.length).toBe(1);
});

test("When TodoList receives expected props, then is does not throw error", () => {
  checkProps(TodoList, defaultProps);
});
