# simple-todo-mvc

a simple Todo application using the Model-View-Controller pattern.

## TodoModel

represents the data model, and supporting methods, for the application.

## TodoView

represents and manages the Todo user interface via the DOM.

## TodoController

intakes user input from the View and facilitates the dance between the View and Model.

---

## How to use

1. Clone this reposity on your local machine
2. Run `npm install && npm run build`
3. Open index.html in any major browser
4. Add, edit, and delete todos!

### Tips

- You can edit any Todo's title or description by clicking directing on the field you wish to edit. The application will replace the \<p> with an \<input> to intake the new value.

  - Press 'Enter' after making your updates to apply the changes to the model.

  - Press 'Escape' to cancel your edits after focusing on an input.
