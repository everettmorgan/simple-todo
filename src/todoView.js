class TodoView {
  constructor() {
    // parents
    this.container = document.querySelector('#todo-container');
    this.todos = this.container.querySelector('#todos');

    // form
    this.form = document.querySelector('#new-todo');
    this.new_td_title = this.form.querySelector('#new-todo input[name="title"]');
    this.new_td_date = this.form.querySelector('#new-todo input[name="date"]');
    this.new_td_time = this.form.querySelector('#new-todo input[name="time"]');
    this.new_td_desc = this.form.querySelector('#new-todo textarea[name="desc"]');

    startListening.apply(this);
  }

  bindAddTodo(cb) {
    this.addTodo = cb;
  }

  bindRemoveTodo(cb) {
    this.removeTodo = cb;
  }

  bindUpdateTodo(cb) {
    this.updateTodo = cb;
  }

  displayTodos(todos) {
    if (todos) {
      this.todos.innerHTML = null;
      todos.forEach(t => {
        this.todos.appendChild(this.createTodoElement(t));
      })
    }
  }

  createTodoElement(todo) {
    console.log("Creating todo:", todo);
    let el = document.createElement("div");
    el.className = "todo";
    el.dataset.id = todo.id;

    el.appendChild((() => {
      let input = document.createElement("input");
      input.className = "todo-input";
      input.type = 'checkbox';
      input.value = todo.status;
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

HTMLParagraphElement.prototype.edit = function(cb) {
  if (!this._isEditing) {
    let tmp = this.innerText;
    this.innerHTML = null;
    this.appendChild((() => {
      let input = document.createElement('input');
      input.className = 'p-editing';
      input.value = tmp;
      input.onclick = (e) => e.stopPropagation();
      input.onkeypress = (e) => {
        if (e.key === 'Enter') {
          let newVal = e.target.value;
          this.innerHTML = newVal;
          this._isEditing = false;
          cb(newVal);
        }
      }
      return input;
    })())
  }
}

module.exports = TodoView;