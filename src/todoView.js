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

    // To-be injected Controller methods
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
    if (todos) {
      this.todos.innerHTML = null;
      for (let i = 0; i < todos.length; i++) {
        if (!todos[i].status)
          this.todos.appendChild(this.createTodoElement(todos[i]));
      }
    }
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
      input.type = 'checkbox';
      input.value = todo.status;
      input.onclick = (e) => {
        (e.target.checked)
        ? el.classList.add("completed-todo")
        : el.classList.remove("completed-todo");
        this.updateTodo(input.parentNode.dataset.id, "status", true);
      }
      return input;
    })())

    el.appendChild((() => {
      let p = document.createElement("p");
      p.className = "todo-title";
      p.innerText = todo.title ? todo.title : "Untitled";
      p.onclick = (e) => e.target.edit(function (newVal) {
        todo.title = newVal;
      });
      return p;
    })())

    el.appendChild((() => {
      let p = document.createElement("p");
      p.className = "todo-desc";
      p.innerText = todo.desc ? todo.desc : "";
      p.onclick = (e) => e.target.edit(function (newVal) {
        todo.desc = newVal;
      });
      return p;
    })())

    return el;
  }
}

/**
 * starts listening for submits
 */
function startListening() {
  form = this.form;
  form.querySelector('#submit').onclick = () => {
    this.addTodo(
      this.new_td_title.value,
      this.new_td_date.value,
      this.new_td_desc.value,
    )
  }
}

// edit : allows users to edit <p> tags in-place and provides a
// callback to push edits to a model.
HTMLParagraphElement.prototype.edit = function(cb) {
  if (!this._isEditing) {
    let tmp = this.innerText;
    this.innerHTML = null;
    this.appendChild((() => {
      let input = document.createElement('input');
      input.className = 'p-editing';
      input.value = tmp;
      input.onclick = (e) => e.stopPropagation();
      input.onkeydown = (e) => {
        console.log(e);
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