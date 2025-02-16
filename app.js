const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');
const allBtn = document.getElementById('allBtn');
const completedBtn = document.getElementById('completedBtn');
const pendingBtn = document.getElementById('pendingBtn');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Load tasks from local storage
function loadTasks() {
  taskList.innerHTML = '';
  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.classList.add(task.completed ? 'completed' : 'pending');

    li.innerHTML = `
      <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''} data-index="${index}">
      <span class="task-text">${task.text}</span>
      <span class="delete-btn" data-index="${index}">Delete</span>
    `;

    taskList.appendChild(li);
  });
}

// Save tasks to local storage
function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Add new task
addTaskBtn.addEventListener('click', () => {
  const taskText = taskInput.value.trim();
  if (taskText !== '') {
    tasks.push({ text: taskText, completed: false });
    taskInput.value = '';
    saveTasks();
    loadTasks();
  }
});

// Toggle task completion
taskList.addEventListener('change', (e) => {
  if (e.target.classList.contains('task-checkbox')) {
    const index = e.target.dataset.index;
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    loadTasks();
  }
});

// Delete task
taskList.addEventListener('click', (e) => {
  if (e.target.classList.contains('delete-btn')) {
    const index = e.target.dataset.index;
    tasks.splice(index, 1);
    saveTasks();
    loadTasks();
  }
});

// Filter tasks
allBtn.addEventListener('click', () => {
  loadTasks();
});

completedBtn.addEventListener('click', () => {
  const completedTasks = tasks.filter(task => task.completed);
  displayFilteredTasks(completedTasks);
});

pendingBtn.addEventListener('click', () => {
  const pendingTasks = tasks.filter(task => !task.completed);
  displayFilteredTasks(pendingTasks);
});

function displayFilteredTasks(filteredTasks) {
  taskList.innerHTML = '';
  filteredTasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.classList.add(task.completed ? 'completed' : 'pending');

    li.innerHTML = `
      <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''} data-index="${index}">
      <span class="task-text">${task.text}</span>
      <span class="delete-btn" data-index="${index}">Delete</span>
    `;

    taskList.appendChild(li);
  });
}

// Initialize
loadTasks();
