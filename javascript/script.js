const waitForGetToDoList = async (toDoId) => {
  parent = document.getElementById("list-of-todos");
  //clear all items in the unsorted list of todos
  Array.from(parent.getElementsByTagName("li")).forEach((toDo) =>
    toDo.remove()
  );
  const toDoList = await getToDoList();
  //build/refresh html
  toDoList.forEach((todo) => {
    const input = document.createElement("input");
    input.type = "checkbox";
    input.checked = todo.done;
    //create an attribute for the element and store the _id number in it
    input.setAttribute("data", todo._id);
    input.classList.add("todo-check-box");

    const textInput = document.createElement("input");
    textInput.value = todo.description;
    textInput.setAttribute("data", todo._id);
    textInput.classList.add("todo-text-input");
    if (todo.done === true) textInput.classList.add("line-through");

    const span = document.createElement("span");
    span.value = todo._id;
    span.classList.add("fa");
    span.classList.add("fa-trash-o");

    const li = document.createElement("li");
    li.appendChild(input);
    li.appendChild(textInput);
    li.appendChild(span);

    parent.appendChild(li);
  });
  //add eventlisteners to added html elements
  toDoEventListeners();
};

const addNewTask = function () {
  const inputString = document.getElementById("add-todo-text").value;
  //check if  the New Task value has at least one character, else do nothing
  if (inputString.length != 0) {
    const todo = { description: inputString, done: false };
    postToDo(todo);
    document.getElementById("add-todo-text").value = "";
  }
  waitForGetToDoList();
};

const waitForUpdateToDo = async function (id, elementValue) {
  await updateToDo(id, elementValue);
  waitForGetToDoList();
};

const waitForDeleteToDo = async function (id) {
  await deleteToDo(id);
  waitForGetToDoList();
};

const toDoEventListeners = function () {
  Array.from(
    document.getElementById("list-of-todos").getElementsByTagName("li")
  ).forEach((toDo) => {
    toDo.childNodes[0].addEventListener("change", (e) => {
      //call function with parameters: id and the body {...}
      waitForUpdateToDo(e.target.getAttribute("data"), {
        done: e.target.checked,
      });
    });
    toDo.childNodes[1].addEventListener("change", (e) => {
      waitForUpdateToDo(e.target.getAttribute("data"), {
        description: e.target.value,
        done: false,
      });
    });
    toDo.childNodes[2].addEventListener("click", (e) => {
      waitForDeleteToDo(e.target.value);
    });
  });
};

document.getElementById("add-todo-btn").addEventListener("click", addNewTask);
//load html for existing todos
waitForGetToDoList();
