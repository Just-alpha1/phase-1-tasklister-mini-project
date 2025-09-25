document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById('create-task-form');
  const input = document.getElementById('new-task-description');
  const tasksList = document.getElementById('tasks');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const taskDescription = input.value.trim();
    if (taskDescription) {
      const li = document.createElement('li');
      li.textContent = taskDescription;
      tasksList.appendChild(li);
      input.value = '';
    }
  });
});
