document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("create-task-form");
  const taskList = document.getElementById("tasks");

  form.addEventListener("submit", function (e) {
    e.preventDefault(); // stop refresh

    const input = document.getElementById("new-task-description").value;
    const priority = document.getElementById("priority").value;

    if (input.trim() !== "") {
      const li = document.createElement("li");
      li.textContent = input;

      // 🎨 Color based on priority
      if (priority === "high") li.style.color = "red";
      if (priority === "medium") li.style.color = "orange";
      if (priority === "low") li.style.color = "green";

      // ❌ Delete button
      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "x";
      deleteBtn.style.marginLeft = "10px";
      deleteBtn.addEventListener("click", () => {
        li.remove();
      });

      li.appendChild(deleteBtn);
      taskList.appendChild(li);

      form.reset(); // clear input
    }
  });
});
