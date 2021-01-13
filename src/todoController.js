/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

/**
 * @class TodoController
 */
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

  /**
   * handles Model updates -> View
   * @param {TodoModel[]} todos
   */
  handleOnChange(todos) {
    this.view.displayTodos(todos);
  }

  /**
   * handles new todo from View -> Model
   * @param {String} title
   * @param {String} due
   * @param {String} desc
   */
  handleAddTodo(title, due, desc) {
    this.model.addTodo(title, due, desc);
  }

  /**
   * handles removing todo from View -> Model
   * @param {Number} id
   */
  handleRemoveTodo(id) {
    this.model.removeTodo(id);
  }

  /**
   * handles updating todo from View -> Model
   * @param {Number} id
   * @param {String} prop
   * @param {any} newVal
   */
  handleUpdateTodo(id, prop, newVal) {
    this.model.updateTodo(id, prop, newVal);
  }
}

module.exports = TodoController;