let inputbox = document.getElementById("inputs");
let submit = document.getElementById("todo");

// Load saved todos when the page loads
document.addEventListener("DOMContentLoaded", renderTodos);

// Add todo on button click or Enter key
submit.onclick = addTodo;
document.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    addTodo();
  }
});

function getTodos() {
  return JSON.parse(localStorage.getItem("todos")) || [];
}

function saveTodos(todos) {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function addTodo() {
  let value = inputbox.value.trim();
  if (value === "") {
    alert("Write some task inside the input box");
    return;
  }

  let todos = getTodos();
  todos.push(value);
  saveTodos(todos);
  inputbox.value = "";
  renderTodos();
}

function renderTodos() {
  const list = document.querySelector("ol");
  list.innerHTML = "";

  const todos = getTodos();

  todos.forEach((todo, index) => {
    let element = document.createElement("li");
    element.textContent = todo + " ";

    // Edit button
    let editbut = document.createElement("button");
    editbut.innerHTML =
      '<i class="fa-solid fa-feather"></i><span class="tooltiptext">Edit</span>';
    editbut.classList.add("tooltip");
    editbut.onclick = function () {
      let edit = prompt("Edit todo", todo);
      if (edit !== null && edit.trim() !== "") {
        todos[index] = edit.trim();
        saveTodos(todos);
        renderTodos();
      }
    };

    // Delete button
    let delbut = document.createElement("button");
    delbut.innerHTML =
      '<i class="fa-solid fa-x"></i><span class="tooltiptext">Delete</span>';
    delbut.classList.add("tooltip");
    delbut.onclick = function () {
      todos.splice(index, 1);
      saveTodos(todos);
      renderTodos();
    };

    element.appendChild(editbut);
    element.appendChild(delbut);
    list.appendChild(element);
  });
}
