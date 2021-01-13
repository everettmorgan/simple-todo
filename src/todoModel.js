var id = -1;
var todos = [];

/**
 * @class TodoModel
 *
 * Title
 * Due Date
 * Status
 * Description
 */
class TodoModel {
  constructor(title, due, desc) {
    this.id = id++;
    this.title = title;
    this.due = due;
    this.desc = desc;
    this.status = false;
  }

  get todos() {
    return todos;
  }

  /**
   * injects the onChange function from the Controller
   * @param {Function} cb
   */
  bindOnChange(cb) {
    this.onChange = cb;
  }

  /**
   * flips a Todo's status
   * @param {Number} id
   */
  flipTodo(id) {
    let t = this.getTodo(id);
    t.status = !t.status;
    this.onChange(todo);
  }

  /**
   * returns a Todo based on id
   * @param {Number} id
   */
  getTodo(id) {
    let t = todos.find((t, i) => (t.id === parseInt(id)) ? {t,i} : null);
    if (!t) throw new Error(`did not find Todo.id(${t.id})`);
    return t;
  }

  /**
   * adds a Todo to the global array
   * @param {TodoModel} todo
   */
  addTodo(title, due, desc) {
    todos.push(new TodoModel(title, due, desc));
    this.onChange(todos);
  }

  /**
   * updates a Todo based on id
   * @param {Number} id
   * @param {String} prop
   * @param {any} newVal
   */
  updateTodo(id, prop, newVal) {
    let todo = this.getTodo(id);
    if (Object.prototype.hasOwnProperty.call(todo, prop))
      todo[prop] = newVal;
    this.onChange(todos);
  }

  /**
   * removes a Todo based on id
   * @param {Number} id
   */
  removeTodo(id) {
    let todo = this.getTodo(id);
    let left = todos.splice(0, todo-1);
    let right = todos.splice(todo+1, todos.length);
    todos = [...left, ...right];
    this.onChange(todos);
  }
}

module.exports = TodoModel;