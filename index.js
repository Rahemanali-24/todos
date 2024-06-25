let todoDataList = document.getElementById("todo-data-list");
let saveButton = document.getElementById("save-todo");
let todoInputBar = document.getElementById("todo-input-bar");
let getPendingTodosButton = document.getElementById("get-todos");



let todos = [];

getPendingTodosButton.addEventListener("click", ()=> {
    todos = todos.filter(todo => todo.status !== "Finished");
    reRenderTodos();
});

todoInputBar.addEventListener("keyup", function toggleSaveButton() {
  let todoText = todoInputBar.value;
  if (todoText.length == 0) {
    if (saveButton.classList.contains("disabled")) {
      return;
    }
    saveButton.classList.add("disabled");
  } else if (saveButton.classList.contains("disabled")) {
    saveButton.classList.remove("disabled");
  }
});
saveButton.addEventListener("click", function getTextAndAddTodo() {
  let todoText = todoInputBar.value;
  if (todoText.length == 0) {
    return;
  }
  let todo = {
    text: todoText,
    status: "In progress",
    finishButtonText: "Finished",
  };
  todos.push(todo);
  addTodo(todo, todos.length);
  todoInputBar.value = "";
});

function reRenderTodos() {
  todoDataList.innerHTML = "";
  todos.forEach((element, index) => {
    addTodo(element, index + 1);
  });
}

function removeTodo(event) {
  // event.target.parentElement.parentElement.parentElement.remove();
  let deleteButtonPressed = event.target;
  let indexTobeRemoved = Number(deleteButtonPressed.getAttribute("todo-idx"));
  todos.splice(indexTobeRemoved, 1);

  reRenderTodos();
}

function finishTodo(event) {
  let finishButtonPressed = event.target;
  let indexTobeFinished = Number(finishButtonPressed.getAttribute("todo-idx"));
  if (todos[indexTobeFinished].status === "Finished") {
    todos[indexTobeFinished].status = "In progress";
    todos[indexTobeFinished].finishButtonText = "Finished";
  } else {
    todos[indexTobeFinished].status = "Finished";
    todos[indexTobeFinished].finishButtonText = "Undo";
  }

  todos.sort((a, b) => {
    if (a.status === "Finished") {
      return 1;
    }

    return -1; // default to a being less than b
  });

  reRenderTodos();
}

function editTodo(event) {
    let editButtonPressed = event.target;
    let indexTobeEdited = Number(editButtonPressed.getAttribute("todo-idx"));
    let detailDiv = document.querySelector(`div[todo-idx="${indexTobeEdited}"]`);
    let input = document.querySelector(`input[todo-idx="${indexTobeEdited}"]`);

    detailDiv.style.display = "none";
    input.type="text";
    input.value = detailDiv.textContent;
}


function saveEditedTodo(event) {
    
    let input = event.target;
    let indexTobeEdited = Number(input.getAttribute("todo-idx"));
    let detailDiv = document.querySelector(`div[todo-idx="${indexTobeEdited}"]`);

    if(event.keyCode === 13) {
        detailDiv.textContent = input.value;    
        detailDiv.style.display = "block";
        input.value="";
        input.type="hidden";        
    }
}


function addTodo(todo, todoCount) {
  let rowDiv = document.createElement("div");
  let todoItem = document.createElement("div");
  let todoNumber = document.createElement("div");
  let todoDetail = document.createElement("div");
  let todoStatus = document.createElement("div");
  let todoActions = document.createElement("div");
  let deleteButton = document.createElement("button");
  let finishedButton = document.createElement("button");
  let editButton = document.createElement("button");
  let hiddenInput = document.createElement("input");
  let hr = document.createElement("hr");

  //adding classes
  rowDiv.classList.add("row");
  todoItem.classList.add(
    "todo-item",
    "d-flex",
    "flex-row",
    "justify-content-between",
    "align-items-center"
  );
  todoNumber.classList.add("todo-no");
  todoDetail.classList.add("todo-detail", "text-muted");
  todoStatus.classList.add("todo-status", "text-muted");

  todoActions.classList.add(
    "todo-actions",
    "d-flex",
    "justify-content-start",
    "gap-2"
  );
  deleteButton.classList.add("btn", "btn-danger", "delete-todo");
  finishedButton.classList.add("btn", "btn-success", "finish-todo");
  editButton.classList.add("btn", "btn-warning", "edit-todo");
  hiddenInput.classList.add("form-control", "todo-detail");

  finishedButton.setAttribute("todo-idx", todoCount - 1);
  deleteButton.setAttribute("todo-idx", todoCount - 1);
  editButton.setAttribute("todo-idx", todoCount - 1);
  todoDetail.setAttribute("todo-idx",todoCount-1);
  hiddenInput.setAttribute("todo-idx",todoCount-1);
  hiddenInput.addEventListener("keypress", saveEditedTodo);;
  deleteButton.onclick = removeTodo;
  finishedButton.onclick = finishTodo;
  editButton.onclick = editTodo; 
  hiddenInput.type = "hidden";
  todoNumber.textContent = `${todoCount}.`; //sets the todo number text
  todoDetail.textContent = todo.text; //sets the todo text input text
  todoStatus.textContent = todo.status; //sets the todo status text
  deleteButton.textContent = "Delete"; //sets the delete button text
  finishedButton.textContent = todo.finishButtonText; //sets the finished button text
  editButton.textContent = "Edit"; //sets the edit button text

  todoActions.appendChild(deleteButton);
  todoActions.appendChild(finishedButton);
  todoActions.appendChild(editButton);

  todoItem.appendChild(todoNumber);
  todoItem.appendChild(todoDetail);
  todoItem.appendChild(hiddenInput);
  todoItem.appendChild(todoStatus);
  todoItem.appendChild(todoActions);

  rowDiv.appendChild(todoItem);
  rowDiv.appendChild(hr);

  todoDataList.appendChild(rowDiv);
}










































// let getTodosButton = document.getElementById('get-todos');

// getTodosButton.addEventListener('click',()=>{
//     console.log('Fetching todos...');
// });

//other way to add event listener
// getTodosButton.onclick = function() {
//     console.log('Fetching todo1111111111111111111s...');
// }
