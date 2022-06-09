const toDoForm = document.getElementById("inputForm");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.getElementById("todo-List");

function savedToDo() {
  localStorage.setItem("doDo", JSON.stringify(toDoArray));
}

function deleteFunction(event) {
  const deleteTarget = event.target.parentElement;
  deleteTarget.remove();
}

function paintToDo(inputContent) {
  const li = document.createElement("li");
  const span = document.createElement("span");
  span.innerText = inputContent;
  const button = document.createElement("button");
  button.innerText = "X";
  button.addEventListener("click", deleteFunction);
  li.appendChild(span);
  li.appendChild(button);
  toDoList.append(li);
}

toDoArray = [];

function toDoSubmit(event) {
  event.preventDefault();
  const inputContent = toDoInput.value;
  toDoArray.push(inputContent);
  toDoInput.value = "";
  paintToDo(inputContent);
  savedToDo();
}

toDoForm.addEventListener("submit", toDoSubmit);
