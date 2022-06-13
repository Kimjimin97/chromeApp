const todoForm = document.getElementById("todo-form");
const todoInput = todoForm.querySelector("input");
const todoList = document.getElementById("todo-list");

function deleteFunction(event) {
  const deleteli = event.target.parentNode;
  const deleteliId = deleteli.id;
  deleteli.remove();

  todoArray = todoArray.filter(
    (element) => element.id !== parseInt(deleteliId)
  );
  saveToDo(todoArray);
}

function saveToDo(todoArray) {
  localStorage.setItem("TodoKey", JSON.stringify(todoArray));
}

function paintToDo(newObj) {
  const li = document.createElement("li");
  li.id = newObj.id;
  const span = document.createElement("span");
  span.innerText = newObj.data;
  const button = document.createElement("button");
  button.addEventListener("click", deleteFunction);
  button.innerText = "delete";

  li.appendChild(span);
  li.appendChild(button);
  todoList.appendChild(li);
}

function addTodoList(event) {
  event.preventDefault();
  const inputTodoData = todoInput.value;
  /* todoinput을 초기화 하는 이유는? */
  const newObj = {
    id: Date.now(),
    data: inputTodoData,
  };

  todoInput.value = "";
  todoArray.push(newObj);

  // 그렇다면 무언가를 저장할 때마다 모든 배열을 다시 저장하는가?
  paintToDo(newObj);
  saveToDo(todoArray);
}

let todoArray = [];
todoForm.addEventListener("submit", addTodoList);

const savedTodo = localStorage.getItem("TodoKey");

if (savedTodo !== null) {
  savedTodo.forEach((element) => paintToDo(element));
}
