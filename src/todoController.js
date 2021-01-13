class TodoController {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    this.model.bindOnChange(this.handleOnChange.bind(this));
    this.view.bindAddTodo(this.handleAddTodo.bind(this));
    this.view.bindRemoveTodo(this.handleRemoveTodo.bind(this));
    this.view.bindUpdateTodo(this.handleUpdateTodo.bind(this));

    this.handleOnChange(this.model.todos);
  }

  handleOnChange(todos) {
    this.view.displayTodos(todos);
  }

  handleAddTodo(title, due, desc) {
    this.model.addTodo(title, due, desc);
  }

  handleRemoveTodo(id) {
    this.model.removeTodo(id);
  }

  handleUpdateTodo(id, prop, newVal) {
    this.model.updateTodo(id, prop, newVal);
  }
}

module.exports = TodoController;