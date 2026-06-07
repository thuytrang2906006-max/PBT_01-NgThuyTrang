const todoForm = document.querySelector("#todoForm");
const todoInput = document.querySelector("#todoInput");
const todoList = document.querySelector("#todoList");
const countText = document.querySelector("#countText");
const clearCompletedBtn = document.querySelector("#clearCompleted");
const filterBtns = document.querySelectorAll(".filter-btn");

let todos = JSON.parse(localStorage.getItem("todos")) || [];
let currentFilter = "all";

function saveTodos() {
    localStorage.setItem("todos", JSON.stringify(todos));
}

function renderTodos() {
    todoList.innerHTML = "";

    let filteredTodos = todos;

    if (currentFilter === "active") {
        filteredTodos = todos.filter(todo => !todo.completed);
    }

    if (currentFilter === "completed") {
        filteredTodos = todos.filter(todo => todo.completed);
    }

    filteredTodos.forEach(todo => {
        const li = document.createElement("li");
        li.className = "todo-item";
        li.dataset.id = todo.id;

        if (todo.completed) {
            li.classList.add("completed");
        }

        const span = document.createElement("span");
        span.className = "todo-text";
        span.textContent = todo.text;

        const deleteBtn = document.createElement("button");
        deleteBtn.className = "delete-btn";
        deleteBtn.textContent = "❌";

        li.appendChild(span);
        li.appendChild(deleteBtn);
        todoList.appendChild(li);
    });

    updateCount();
}

function updateCount() {
    const left = todos.filter(todo => !todo.completed).length;
    countText.textContent = `${left} items left`;
}

todoForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const text = todoInput.value.trim();

    if (text === "") return;

    const newTodo = {
        id: Date.now(),
        text: text,
        completed: false
    };

    todos.push(newTodo);
    todoInput.value = "";

    saveTodos();
    renderTodos();
});

todoList.addEventListener("click", (e) => {
    const li = e.target.closest(".todo-item");
    if (!li) return;

    const id = Number(li.dataset.id);

    if (e.target.classList.contains("delete-btn")) {
        todos = todos.filter(todo => todo.id !== id);
    } else if (e.target.classList.contains("todo-text")) {
        todos = todos.map(todo => {
            if (todo.id === id) {
                return { ...todo, completed: !todo.completed };
            }
            return todo;
        });
    }

    saveTodos();
    renderTodos();
});

todoList.addEventListener("dblclick", (e) => {
    if (!e.target.classList.contains("todo-text")) return;

    const li = e.target.closest(".todo-item");
    const id = Number(li.dataset.id);
    const todo = todos.find(todo => todo.id === id);

    const input = document.createElement("input");
    input.className = "edit-input";
    input.value = todo.text;

    li.replaceChild(input, e.target);
    input.focus();

    input.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            const newText = input.value.trim();

            if (newText !== "") {
                todos = todos.map(todo => {
                    if (todo.id === id) {
                        return { ...todo, text: newText };
                    }
                    return todo;
                });
            }

            saveTodos();
            renderTodos();
        }
    });
});

filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        filterBtns.forEach(item => item.classList.remove("active"));
        btn.classList.add("active");

        currentFilter = btn.dataset.filter;
        renderTodos();
    });
});

clearCompletedBtn.addEventListener("click", () => {
    todos = todos.filter(todo => !todo.completed);

    saveTodos();
    renderTodos();
});

renderTodos();