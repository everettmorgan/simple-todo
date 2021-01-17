/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
class TodoView {
  constructor() {
    // parents
    this.container = document.querySelector('#todo-container');
    this.todos = this.container.querySelector('#todos');

    // form
    this.form = document.querySelector('#new-todo');
    this.new_td_title = this.form.querySelector('input[name="title"]');
    this.new_td_date = this.form.querySelector('#date-time input[name="date"]');
    this.new_td_time = this.form.querySelector('#date-time input[name="time"]');
    this.new_td_desc = this.form.querySelector('textarea[name="desc"]');

    // to-be injected Controller methods
    this.addTodo;
    this.removeTodo;
    this.updateTodo;

    startListening.apply(this);
  }

  /**
   * injects the addTodo function from the Controller
   * @param {Function} cb
   */
  bindAddTodo(cb) {
    this.addTodo = cb;
  }

  /**
   * injects the removeTodo function from the Controller
   * @param {Function} cb
   */
  bindRemoveTodo(cb) {
    this.removeTodo = cb;
  }

  /**
   * injects the updateTodo function from the Controller
   * @param {Function} cb
   */
  bindUpdateTodo(cb) {
    this.updateTodo = cb;
  }

  /**
   * displays a list of Todos to the DOM
   * @param {TodoModel[]} todos array of Todos
   */
  displayTodos(todos) {
    if (!todos) return;
    this.todos.innerHTML = null;
    todos.forEach((td) => {
      this.todos.append(this.createTodoElement(td));
    })
  }

  /**
   * creates an HTMLElement from a Todo
   * @param {TodoModel} todo todo to convert
   */
  createTodoElement(todo) {
    let el = document.createElement("div");
    el.className = "todo";
    el.dataset.id = todo.id;

    el.appendChild((() => {
      let input = document.createElement("input");
      input.className = "todo-input";
      input.type = "checkbox";
      input.checked = todo.status;
      input.onclick = () => {
        this.updateTodo(todo.id, "status", input.checked);
      }
      return input;
    })())

    el.appendChild((() => {
      let p = document.createElement("p");
      p.className = "todo-title";
      p.innerText = todo.title ? todo.title : "Untitled";
      if (todo.status)
        p.classList.add("completed-todo");
      p.onclick = () => p.edit((newVal) => {
        this.updateTodo(todo.id, 'title', newVal);
      });
      return p;
    })())

    el.appendChild((() => {
      let p = document.createElement("p");
      p.className = "todo-desc";
      p.innerText = todo.desc ? todo.desc : "";
      if (todo.status)
        p.classList.add("completed-todo");
      p.onclick = () => p.edit((newVal) => {
        this.updateTodo(todo.id, "desc", newVal);
      });
      return p;
    })())

    el.appendChild((() => {
      let p = document.createElement("p");
      p.className = "todo-date";
      p.innerText = todo.due ? todo.due : "";
      if (todo.status)
        p.classList.add("completed-todo");
      p.onclick = () => p.edit((newVal) => {
        this.updateTodo(todo.id, "due", newVal);
      });
      return p;
    })())

    el.appendChild((() => {
      let h6 = document.createElement("h6");
      h6.innerText = "Delete";
      h6.className = "todo-del";
      h6.onclick = () => {
        this.removeTodo(todo.id);
      }
      return h6;
    })());

    return el;
  }
}

/**
 * starts listening for submits
 */
function startListening() {
  this.form.querySelector('#submit').onclick = () => {
    let title = this.new_td_title.value;
    let date = this.new_td_date.value;
    let desc = this.new_td_desc.value;

    if (!title || !date || !desc) {
      this.new_td_title.style.borderColor = "red";
      this.new_td_date.style.borderColor = "red";
      this.new_td_desc.style.borderColor = "red";
    }
    else {
      this.new_td_title.style.borderColor = "#f4f4f4";
      this.new_td_date.style.borderColor = "#f4f4f4";
      this.new_td_desc.style.borderColor = "#f4f4f4";
      this.addTodo(title, date, desc);
    }
  }
}

// edit : allows users to edit <p> tags in-place and provides a
// callback to push edits to a model.
HTMLParagraphElement.prototype.edit = function(cb) {
  if (!this._isEditing) {
    let tmp = this.innerText;
    this.innerHTML = null;
    this.appendChild((() => {
      let input = document.createElement("input");
      input.className = "p-editing";
      input.value = tmp;
      input.onclick = (e) => e.stopPropagation();
      input.onkeydown = (e) => {
        switch (e.key) {
          case 'Enter':
            let newVal = e.target.value;
            this.innerHTML = newVal;
            this._isEditing = false;
            cb(newVal);
            break;
          case 'Escape':
            this.innerHTML= tmp;
            this._isEditing = false;
            break;
        }
      }
      return input;
    })())
  }
}

module.exports = TodoView;