// src/index.js

document.addEventListener('DOMContentLoaded', () => {
  // Get DOM elements
  const form = document.getElementById('create-task-form');
  if (!form) {
    console.error('Form with id "create-task-form" not found');
    return;
  }

  const taskInput = document.getElementById('new-task-description');
  if (!taskInput) {
    console.error('Input with id "new-task-description" not found');
    return;
  }

  const submitButton = form.querySelector('input[type="submit"]');
  if (!submitButton) {
    console.error('Submit button not found in form');
    return;
  }

  // Create task list
  const taskList = document.createElement('ul');
  taskList.id = 'tasks';
  document.body.appendChild(taskList);

  // Add priority dropdown
  const prioritySelect = document.createElement('select');
  prioritySelect.name = 'priority';
  prioritySelect.setAttribute('aria-label', 'Select task priority');
  ['High', 'Medium', 'Low'].forEach(level => {
    const option = document.createElement('option');
    option.value = level.toLowerCase();
    option.textContent = level;
    prioritySelect.appendChild(option);
  });
  form.insertBefore(prioritySelect, submitButton);

  // Add sort button
  const sortBtn = document.createElement('button');
  sortBtn.textContent = 'Sort by Priority';
  sortBtn.style.margin = '10px';
  sortBtn.setAttribute('aria-label', 'Sort tasks by priority');
  document.body.appendChild(sortBtn);

  let tasks = [];

  // Handle form submission
  form.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent default form submission
    const taskDescription = taskInput.value.trim();
    const priority = prioritySelect.value;

    if (taskDescription) {
      tasks.push({ description: taskDescription, priority });
      addTask(taskDescription, priority);
      taskInput.value = ''; // Clear input
    }
  });

  // Handle sorting
  sortBtn.addEventListener('click', () => {
    tasks.sort((a, b) => {
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    });
    renderTasks();
  });

  // Function to add a new task
  function addTask(description, priority) {
    const li = document.createElement('li');
    li.textContent = description;
    li.style.color = {
      high: 'red',
      medium: 'yellow',
      low: 'green'
    }[priority];

    // Add delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'X';
    deleteBtn.style.marginLeft = '10px';
    deleteBtn.setAttribute('aria-label', `Delete task: ${description}`);
    deleteBtn.addEventListener('click', () => {
      tasks = tasks.filter(task => task.description !== description);
      li.remove();
    });

    // Add edit button
    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.style.marginLeft = '10px';
    editBtn.setAttribute('aria-label', `Edit task: ${description}`);
    editBtn.addEventListener('click', () => {
      const newDescription = prompt('Edit task:', description);
      if (newDescription && newDescription.trim()) {
        tasks = tasks.map(task =>
          task.description === description
            ? { description: newDescription.trim(), priority }
            : task
        );
        renderTasks();
      }
    });

    li.appendChild(deleteBtn);
    li.appendChild(editBtn);
    taskList.appendChild(li);
  }

  // Function to render all tasks
  function renderTasks() {
    taskList.innerHTML = '';
    tasks.forEach(task => addTask(task.description, task.priority));
  }
});