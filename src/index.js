document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#create-task-form");
  const taskList = document.querySelector("#tasks");
  const sortAscBtn = document.querySelector("#sort-asc");
  const sortDescBtn = document.querySelector("#sort-desc");

  let tasks = [];
  const priorityOrder = { low: 1, medium: 2, high: 3 };

  // Handle form submission
  form.addEventListener("submit", (event) => {
    event.preventDefault(); // stop page reload

    const input = document.querySelector("#new-task-description");
    const prioritySelect = document.querySelector("#priority");
    const userInput = document.querySelector("#user");
    const dateInput = document.querySelector("#date-due");

    const taskText = input.value.trim();
    const priority = prioritySelect.value;
    const user = userInput.value.trim();
    const date = dateInput.value;

    if (taskText === "") return; // ignore empty input

    // Create task object
    const task = { text: taskText, priority, user, date };
    tasks.push(task);

    renderTask(task);

    // Clear inputs
    input.value = "";
    prioritySelect.value = "low";
    userInput.value = "";
    dateInput.value = "";
  });

  function renderTask(task) {
    // Create a new list item
    const li = document.createElement("li");
    li.textContent = `${task.text} - ${task.user} - ${task.date}`;

    // Set color based on priority
    if (task.priority === "high") li.style.color = "red";
    else if (task.priority === "medium") li.style.color = "orange";
    else li.style.color = "green";

    // Add buttons
    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.style.marginLeft = "10px";
    editBtn.addEventListener("click", () => editTask(task, li));

    const doneBtn = document.createElement("button");
    doneBtn.textContent = "Done";
    doneBtn.style.marginLeft = "10px";
    doneBtn.addEventListener("click", () => li.style.textDecoration = "line-through");

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "x";
    deleteBtn.style.marginLeft = "10px";
    deleteBtn.addEventListener("click", () => {
      taskList.removeChild(li);
      tasks = tasks.filter(t => t !== task);
    });

    // Attach buttons to task
    li.appendChild(editBtn);
    li.appendChild(doneBtn);
    li.appendChild(deleteBtn);

    // Add task to list
    taskList.appendChild(li);
    task.li = li; // store reference
  }

  function editTask(task, li) {
    li.innerHTML = "";
    const editInput = document.createElement("input");
    editInput.type = "text";
    editInput.value = task.text;

    const editPriority = document.createElement("select");
    ["low", "medium", "high"].forEach(p => {
      const opt = document.createElement("option");
      opt.value = p;
      opt.textContent = p.charAt(0).toUpperCase() + p.slice(1);
      if (p === task.priority) opt.selected = true;
      editPriority.appendChild(opt);
    });

    const editUser = document.createElement("input");
    editUser.type = "text";
    editUser.value = task.user;

    const editDate = document.createElement("input");
    editDate.type = "date";
    editDate.value = task.date;

    const saveBtn = document.createElement("button");
    saveBtn.textContent = "Save";
    saveBtn.addEventListener("click", () => {
      task.text = editInput.value.trim();
      task.priority = editPriority.value;
      task.user = editUser.value.trim();
      task.date = editDate.value;
      // Re-render
      taskList.removeChild(li);
      renderTask(task);
    });

    li.append(editInput, editPriority, editUser, editDate, saveBtn);
  }

  // Sort handlers
  sortAscBtn.addEventListener("click", () => {
    tasks.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
    reorderTasks();
  });

  sortDescBtn.addEventListener("click", () => {
    tasks.sort((a, b) => priorityOrder[b.priority] - priorityOrder[a.priority]);
    reorderTasks();
  });

  function reorderTasks() {
    taskList.innerHTML = "";
    tasks.forEach(task => renderTask(task));
  }
});
