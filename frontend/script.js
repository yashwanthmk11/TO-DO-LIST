const API_URL = 'http://localhost:5000/tasks';

// Function to fetch and display tasks
async function fetchTasks() {
    const response = await fetch(API_URL);
    const tasks = await response.json();
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.innerHTML = `
            ${task.description} 
            <button onclick="deleteTask('${task._id}')">Delete</button>
        `;
        taskList.appendChild(li);
    });
}

// Function to add a new task
async function addTask() {
    const taskInput = document.getElementById('taskInput').value;
    await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ description: taskInput })
    });
    document.getElementById('taskInput').value = '';
    fetchTasks();
}

// Function to delete a task
async function deleteTask(id) {
    await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
    });
    fetchTasks(); // Refresh the task list after deletion
}

// Fetch tasks when the page loads
fetchTasks();
