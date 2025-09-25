document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#create-task-form");
  const taskList = document.querySelector("#tasks");

  // Handle form submission
  form.addEventListener("submit", (event) => {
    event.preventDefault(); // stop page reload

    const input = document.querySelector("#new-task-description");
    const taskText = input.value.trim();

    if (taskText === "") return; // ignore empty input

    // Create a new list item
    const li = document.createElement("li");
    li.textContent = taskText;

    // Add a delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "x";
    deleteBtn.style.marginLeft = "10px";
    deleteBtn.addEventListener("click", () => li.remove());

    // Attach delete button to task
    li.appendChild(deleteBtn);

    // Add task to list
    taskList.appendChild(li);

    // Clear input
    input.value = "";
  });
});
