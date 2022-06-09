const toDoForm = document.getElementById("inputForm");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.getElementById("todo-List");

const TODOS_KEY = "doDo";

function savedToDo() {
  localStorage.setItem(TODOS_KEY, JSON.stringify(toDoArray));
}

function deleteFunction(event) {
  const deleteTarget = event.target.parentElement;

  deleteTarget.remove();
  toDoArray = toDoArray.filter(
    (toDoArr) => toDoArr.id != parseInt(deleteTarget.id)
  );
  savedToDo();
}

function paintToDo(newTodo) {
  const li = document.createElement("li");
  li.id = newTodo.id;
  const span = document.createElement("span");
  span.innerText = newTodo.text;
  const button = document.createElement("button");
  button.innerText = "X";
  button.addEventListener("click", deleteFunction);
  li.appendChild(span);
  li.appendChild(button);
  toDoList.append(li);
}

function toDoSubmit(event) {
  event.preventDefault();
  const inputContent = toDoInput.value;
  toDoInput.value = "";
  const newTodoObj = {
    text: inputContent,
    id: Date.now(),
  };
  toDoArray.push(newTodoObj);

  paintToDo(newTodoObj);
  savedToDo();
}

let toDoArray = [];
toDoForm.addEventListener("submit", toDoSubmit);

const savedToDos = localStorage.getItem(TODOS_KEY);

if (savedToDos) {
  const parsedToDos = JSON.parse(savedToDos);
  toDoArray = parsedToDos;
  parsedToDos.forEach(paintToDo);
}
