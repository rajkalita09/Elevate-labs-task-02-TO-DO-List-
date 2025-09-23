const taskInput = document.getElementById("task-input");
const addBtn = document.getElementById("add-btn");
const taskList = document.getElementById("task-list");

//  startup
window.addEventListener("DOMContentLoaded", loadTasks);

function addTask(taskText, completed = false) {
  if (taskText === "") return;

  // task item
  const li = document.createElement("li");
  li.className = "task-item";
  if (completed) li.classList.add("completed");

  const circle = document.createElement("div");
  circle.className = "circle";
  if (completed) circle.classList.add("checked");

  const span = document.createElement("span");
  span.textContent = taskText;

  const removeBtn = document.createElement("button");
  removeBtn.className = "remove-btn";
  removeBtn.textContent = "✖";

  li.appendChild(circle);
  li.appendChild(span);
  li.appendChild(removeBtn);
  taskList.appendChild(li);

  //  localStorage
  saveTasks();

  // Toggle 
  circle.addEventListener("click", () => {
    circle.classList.toggle("checked");
    li.classList.toggle("completed");
    saveTasks();
  });

  // Remove task
  removeBtn.addEventListener("click", () => {
    taskList.removeChild(li);
    saveTasks();
  });
}

// Add new task button click
addBtn.addEventListener("click", () => {
  const taskText = taskInput.value.trim();
  if (taskText) {
    addTask(taskText);
    taskInput.value = "";
  }
});

// Add new task (key)
taskInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    const taskText = taskInput.value.trim();
    if (taskText) {
      addTask(taskText);
      taskInput.value = "";
    }
  }
});

// Save tasks in localStorage
function saveTasks() {
  const tasks = [];
  document.querySelectorAll(".task-item").forEach((li) => {
    tasks.push({
      text: li.querySelector("span").textContent,
      completed: li.classList.contains("completed"),
    });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Load tasks from localStorage
function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach((task) => addTask(task.text, task.completed));
}
