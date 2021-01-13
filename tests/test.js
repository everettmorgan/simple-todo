const expect = require('chai').expect;

const TodoModel = require('../src/todoModel');

describe('TodoModel', function() {
  var Model = new TodoModel;
  Model.onChange = () => {};

  describe('#addTodo', function() {
    it("should add a Todo to the model", function() {
      Model.addTodo("Test", "12/1/21", "Description");
      expect(Model.getTodo(0).t).to.equal(Model.todos[0]);
    })
  })

  describe('#updateTodo', function() {
    it("should update a Todo by id", function() {
      Model.updateTodo(0, 'status', true);
      Model.updateTodo(0, 'desc', 'Hello world');
      Model.updateTodo(0, 'title', '12345');

      expect(Model.todos[0].status).to.equal(true);
      expect(Model.todos[0].desc).to.equal('Hello world');
      expect(Model.todos[0].title).to.equal('12345');
    })
  })

  describe('#removeTodo', function() {
    it("should remove a Todo by id", function() {
      Model.removeTodo(0);
      expect(Model.getTodo(0)).to.equal(undefined);
    })
  })
})