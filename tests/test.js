const expect = require('chai').expect;

const TodoModel = require('../src/todoModel');

describe('TodoModel', function() {
  var Model = new TodoModel;
  Model.bindOnChange((todos) => {});

  describe('#addTodo', function() {
    it("should add a Todo to the model", function() {
      Model.addTodo("Test #1", "12/1/21", "Test todo");
      Model.addTodo("Test #2", "12/2/21", "Test todo 2");
      Model.addTodo("Test #3", "12/3/21", "Test todo 3");
      Model.addTodo("Test #4", "12/4/21", "Test todo 4");
      expect(Model.getTodo(0).t).to.equal(Model.todos[0]);
    })
  })

  describe('#updateTodo', function() {
    it("should update a Todo by id", function() {
      Model.updateTodo(0, 'status', true);
      Model.updateTodo(1, 'desc', 'Hello world');
      Model.updateTodo(2, 'title', '12345');
      Model.updateTodo(3, 'title', 'Oops!');

      expect(Model.todos[0].status).to.equal(true);
      expect(Model.todos[1].desc).to.equal('Hello world');
      expect(Model.todos[2].title).to.equal('12345');
      expect(Model.todos[3].title).to.equal('Oops!');
    })
  })

  describe('#removeTodo', function() {
    it("should remove a Todo by id", function() {
      Model.removeTodo(3); // end
      expect(Model.getTodo(0), 'Model.getTodo(0)').to.not.be.undefined;
      expect(Model.getTodo(1), 'Model.getTodo(1)').to.not.be.undefined;
      expect(Model.getTodo(2), 'Model.getTodo(2)').to.not.be.undefined;
      expect(Model.getTodo(3), 'Model.getTodo(2)').to.be.undefined;

      Model.removeTodo(1); // middle
      expect(Model.getTodo(0), 'Model.getTodo(0)').to.not.be.undefined;
      expect(Model.getTodo(1), 'Model.getTodo(1)').to.be.undefined;
      expect(Model.getTodo(2), 'Model.getTodo(2)').to.not.be.undefined;
      expect(Model.getTodo(3), 'Model.getTodo(2)').to.be.undefined;

      Model.removeTodo(0); // head
      expect(Model.getTodo(0), 'Model.getTodo(0)').to.be.undefined;
      expect(Model.getTodo(1), 'Model.getTodo(1)').to.be.undefined;
      expect(Model.getTodo(2), 'Model.getTodo(2)').to.not.be.undefined;
      expect(Model.getTodo(3), 'Model.getTodo(2)').to.be.undefined;
    })
  })
})