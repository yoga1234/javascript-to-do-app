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

  list.addEventListener('click', event => {
    if (event.target.classList.contains('js-tick')) {
      const itemKey = event.target.parentElement.dataset.key;
      toggleDone(itemKey);
    }
  });

  function toggleDone(key){
    const index = todoItems.findIndex(item => item.id === Number(key));
    todoItems[index].checked = !todoItems[index].checked;

    const item = document.querySelector(`[data-key='${key}']`);
    if(todoItems[index].checked){
      item.classList.add('done');
    } else {
      item.classList.remove('done');
    }
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
