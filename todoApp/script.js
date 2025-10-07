const todoValue = document.querySelector(".input-todo");
const todoList = document.querySelector(".todoList");

window.addEventListener("load", () => {
  const saveTodos = JSON.parse(localStorage.getItem("todos")) || [];
  saveTodos.forEach((todo) => {
    createTodoElement(todo);
  });
});

const addTodo = (e) => {
  e.preventDefault();

  const newTodo = todoValue.value.trim();

  if (newTodo === "") return;

  const items = todoList.querySelectorAll("li");
  for (let item of items) {
    if (
      item.firstChild.nodeValue.trim().toLowerCase() === newTodo.toLowerCase()
    ) {
      alert("Deplicate value not allowed");
      todoValue.value = "";
      return;
    }
  }

  createTodoElement(newTodo);
  saveToLocalStorage(newTodo);
  todoValue.value = "";
};

function createTodoElement(todoText) {
  const liElement = document.createElement("li");
  liElement.textContent = todoText;

  const delBtn = document.createElement("button");
  delBtn.textContent = "Delete";
  delBtn.className = "delBtn";

  delBtn.addEventListener("click", () => {
    liElement.remove();
    removeFromLocalStorage(todoText);
  });

  liElement.appendChild(delBtn);
  todoList.append(liElement);
}

function saveToLocalStorage(todoText) {
  const todos = JSON.parse(localStorage.getItem("todos")) || [];
  todos.push(todoText);

  
  localStorage.setItem("todos", JSON.stringify(todos));
}

document.querySelector(".btn").addEventListener("click", addTodo);
