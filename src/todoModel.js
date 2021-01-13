/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

/**
 * @class TodoModel
 */
class TodoModel {
  constructor() {
    this.id = 0;
    this.todos = [];
  }

  /**
   * injects the onChange function from the Controller
   * @param {Function} cb
   */
  bindOnChange(cb) {
    this.onChange = cb;
  }

  /**
   * returns a Todo based on id
   * @param {Number} id
   */
  getTodo(id) {
    for (let i = 0; i < this.todos.length; i++)
      if (this.todos[i].id === parseInt(id))
        return { i: i, t: this.todos[i] }
  }

  /**
   * adds a Todo to the model
   * @param {String} title
   * @param {String} due
   * @param {String} desc
   */
  addTodo(title, due, desc) {
    this.todos.push({
      id: this.id++,
      title: title,
      due: due,
      desc: desc,
      status: false,
    });
    this.onChange(this.todos);
  }

  /**
   * updates a Todo based on id
   * @param {Number} id
   * @param {String} prop
   * @param {any} newVal
   */
  updateTodo(id, prop, newVal) {
    let todo = this.getTodo(id).t;
    if (Object.prototype.hasOwnProperty.call(todo, prop))
      todo[prop] = newVal;
    this.onChange(this.todos);
  }

  /**
   * removes a Todo based on id
   * @param {Number} id
   */
  removeTodo(id) {
    let todo = this.getTodo(id).i;
    let left = this.todos.splice(0, todo-1);
    let right = this.todos.splice(todo+1, this.todos.length);
    this.todos = [...left, ...right];
    this.onChange(this.todos);
  }
}

module.exports = TodoModel;