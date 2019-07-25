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

  // selecting the js-todo-list class into const list
  const list = document.querySelector('.js-todo-list');
  // insertAdjacentHTML using for parses the specified text as HTML or XML
  //insertAdjacentHTML(position, text);
  list.insertAdjacentHTML('beforeend',`
    <li class="todo-item" data-key="${todo.id}">
      <input id="${todo.id}" type="checkbox"/>
      <label for="${todo.id}" class="tick js-tick"></label>
      <span>${todo.text}</span>
      <button class="delete-todo js-delete-todo">
        &#10006;
      </button>
    </li>
  `);

  // Adding event listener
  list.addEventListener('click', event => {
    // if the target has checklist mark
    if (event.target.classList.contains('js-tick')) {
      const itemKey = event.target.parentElement.dataset.key;
      toggleDone(itemKey);
    }

    // deleting the array
    if (event.target.classList.contains('js-delete-todo')) {
      const itemKey = event.target.parentElement.dataset.key;
      deleteTodo(itemKey);
    }
  });
}

// this function used for deleting array with particular id
function deleteTodo(key){
  // filter() used for create new array with all array elements that pass a test.
  // so the object with key is eliminated in here or removed
  todoItems = todoItems.filter(item => item.id !== Number(key));
  // using for deleting the item on the DOM
  const item = document.querySelector(`[data-key='${key}']`);
  // remove() used for remove object from the tree it belongs to.
  item.remove();
}

// function for toggling the checkbox
// this function is confusing, but it used for removing and adding done class on the tag
function toggleDone(key){
  // selecting array with particular id
  const index = todoItems.findIndex(item => item.id === Number(key));
  // toggle the value of checked property to the opposite value
  // todoItems.checked = true = todoItems.checked = false
  todoItems[index].checked = !todoItems[index].checked;

  // Selecting a query with data-key=id
  const item = document.querySelector(`[data-key='${key}']`);
  if(todoItems[index].checked){
    // if to do item checked = true give it a line-throught
    item.classList.add('done');
  } else {
    // if not remove line-through
    item.classList.remove('done');
  }
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
