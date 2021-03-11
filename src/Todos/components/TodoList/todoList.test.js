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

test("TodoList does not throw warning with expected props", () => {
  checkProps(TodoList, defaultProps);
});
