let tasks = [];

function renderTasks() {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.classList.add(task.completed ? "completed" : (task.delivered ? "not-completed" : "incomplete"));

    const statusCircle = document.createElement("div");
    statusCircle.className = "task-status";

    if (task.completed) {
      statusCircle.classList.add("completed");
    } else if (task.delivered) {
      statusCircle.classList.add("not-completed");
    } else {
      statusCircle.classList.add("incomplete");
    }

    li.appendChild(statusCircle);

    const taskName = document.createElement("span");
    taskName.textContent = task.name;
    taskName.className = "task-name";
    li.appendChild(taskName);

    const actions = document.createElement("div");
    actions.className = "task-actions";

    if (!task.completed) {
      const completeButton = document.createElement("button");
      completeButton.textContent = "Completar";
      completeButton.addEventListener("click", () => toggleTask(index));
      actions.appendChild(completeButton);
    }

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Eliminar";
    deleteButton.addEventListener("click", () => deleteTask(index));
    actions.appendChild(deleteButton);

    li.appendChild(actions);

    taskList.appendChild(li);
  });
}

function addTask(taskName) {
  tasks.push({ name: taskName, completed: false, delivered: false });
  renderTasks();
}

function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  tasks[index].delivered = tasks[index].completed;
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

document.getElementById("taskForm").addEventListener("submit", function(event) {
  event.preventDefault();
  const taskInput = document.getElementById("taskInput");
  const taskName = taskInput.value.trim();
  if (taskName !== "") {
    addTask(taskName);
    taskInput.value = "";
  }
});

renderTasks();
