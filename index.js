const TodoModel = require("./src/todoModel");
const TodoController = require("./src/todoController");
const TodoView = require("./src/todoView");

new TodoController(new TodoModel(), new TodoView());