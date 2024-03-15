let tasks = JSON.parse(localStorage.getItem('tasks')) || {};

function renderTasks() {
  const taskHistory = document.getElementById("taskHistory");
  taskHistory.innerHTML = "";

  for (const date in tasks) {
    const taskList = tasks[date];
    const taskListElement = document.createElement("div");
    taskListElement.innerHTML = `<h2>${date}</h2><ul>${renderTaskList(taskList)}</ul>`;
    taskHistory.appendChild(taskListElement);
  }
}

function renderTaskList(taskList) {
  return taskList.map(task => `<li><span class="${task.completed ? 'completed' : (task.delivered ? 'not-completed' : 'incomplete')}">${task.name}</span><span class="task-date">${task.date}</span><div class="task-actions">${renderTaskActions(task)}</div></li>`).join("");
}

function renderTaskActions(task) {
  let actions = "";
  if (!task.completed) {
    actions += `<button onclick="completeTask('${task.date}', ${task.index})">Completar</button>`;
  }
  actions += `<button onclick="deleteTask('${task.date}', ${task.index})">Eliminar</button>`;
  return actions;
}

function addTask(taskName, taskDate) {
  const dateKey = taskDate.toISOString().split("T")[0];
  if (!tasks[dateKey]) {
    tasks[dateKey] = [];
  }
  tasks[dateKey].push({ name: taskName, completed: false, delivered: false, date: taskDate.toLocaleDateString(), index: tasks[dateKey].length });
  localStorage.setItem('tasks', JSON.stringify(tasks));
  console.log("Tareas guardadas en el almacenamiento local:", tasks);
  renderTasks();
}

function completeTask(date, index) {
  tasks[date][index].completed = true;
  tasks[date][index].delivered = true;
  localStorage.setItem('tasks', JSON.stringify(tasks));
  renderTasks();
}

function deleteTask(date, index) {
  tasks[date].splice(index, 1);
  localStorage.setItem('tasks', JSON.stringify(tasks));
  renderTasks();
}

renderTasks();
