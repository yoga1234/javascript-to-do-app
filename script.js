//creating empty array for storing data
let todoItems = [];

//creating function for input data
function addTodo(text){
  //save temporary data in gere
  const todo = {
    text,
    checked: false,
    id: Date.now(),
  };

  //inserting data into todoItems array
  todoItems.push(todo);
  // print into console
  const list = document.querySelector('.js-todo-list');
  list.insertAdjacentHTML('beforeend',`
    <li class="todo-item" data-key="${todo.id}">
      <input id="${todo.id}" type="checkbox"/>
      <label for="${todo.id}" class="tick js-tick"></label>
      <span>${todo.text}</span>
      <button class="delete-todo js-delete-todo">

      </button>
    </li>
  `);
}

// selecting a form named js-form
const form = document.querySelector('.js-form');
// adding event listener if form has been sumbited
form.addEventListener('submit', event => {
  // prevent reload if user submit data
  event.preventDefault();

  // taking data from input named js-todo-input
  const input = document.querySelector('.js-todo-input');

  // removing whitespace from both ends of string(space, tab, no-break space, etc)
  // and save it in a new variable called text
  const text = input.value.trim();

  //check if user inserting data
  // if inserting data pass data to addTodo method
  // if not send an alert to UI
  if(text !== ''){
    addTodo(text);
    input.value = '';
    input.focus();
  } else {
    alert("Enter a todo item");
  }
});
