// Get elements from the HTML
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const taskCount = document.getElementById("taskCount");
const clearAllBtn = document.getElementById("clearAllBtn");
const errorMessage = document.getElementById("errorMessage");

// Store tasks in an array
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Save tasks to local storage
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Display all tasks
function displayTasks() {
    taskList.innerHTML = "";

    tasks.forEach((task) => {
        const li = document.createElement("li");
        li.className = "task-item";

        li.innerHTML = `
            <span class="task-text ${task.completed ? "completed" : ""}">
                ${task.text}
            </span>

            <div class="task-buttons">
                <button class="complete-btn">
                    ${task.completed ? "Undo" : "Complete"}
                </button>

                <button class="delete-btn">
                    Delete
                </button>
            </div>
        `;

        // Complete / Undo task
        li.querySelector(".complete-btn").addEventListener("click", () => {
            task.completed = !task.completed;
            saveTasks();
            displayTasks();
        });

        // Delete task
        li.querySelector(".delete-btn").addEventListener("click", () => {
            tasks = tasks.filter((item) => item.id !== task.id);
            saveTasks();
            displayTasks();
        });

        taskList.appendChild(li);
    });

    updateTaskCount();
}

// Update task count
function updateTaskCount() {
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(
        (task) => task.completed
    ).length;

    taskCount.textContent =
        `${totalTasks} tasks | ${completedTasks} completed`;
}

// Add a new task
function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText === "") {
        errorMessage.textContent = "Please enter a task.";
        return;
    }

    errorMessage.textContent = "";

    const newTask = {
        id: Date.now(),
        text: taskText,
        completed: false
    };

    tasks.push(newTask);

    saveTasks();
    displayTasks();

    taskInput.value = "";
    taskInput.focus();
}

// Add task when button is clicked
addTaskBtn.addEventListener("click", addTask);

// Add task when Enter key is pressed
taskInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        addTask();
    }
});

// Clear all tasks
clearAllBtn.addEventListener("click", () => {
    if (tasks.length === 0) {
        return;
    }

    tasks = [];

    saveTasks();
    displayTasks();
});

// Display saved tasks when page loads
displayTasks();