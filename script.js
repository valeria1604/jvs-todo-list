function saveTasksToLocalStorage(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function getTasksFromLocalStorage() {
    const tasks = localStorage.getItem('tasks');
    return tasks ? JSON.parse(tasks) : [];
}

function addTask() {
    const taskInput = document.getElementById('task-input');
    const taskText = taskInput.value.trim();

    if (taskText === '') return;

    const taskList = document.getElementById('task-list');
    const taskItem = document.createElement('li');
    taskItem.className = 'todo-item';

    const taskTextElement = document.createElement('span');
    taskTextElement.textContent = taskText;

    const completeButton = document.createElement('button');
    completeButton.textContent = 'Done';
    completeButton.className = 'complete-btn';
    completeButton.onclick = () => {
        taskItem.classList.toggle('completed');
        toggleTaskCompletion(taskText);
    };

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.onclick = () => {
        taskList.removeChild(taskItem);
        deleteTaskFromLocalStorage(taskText);
    };

    taskItem.appendChild(taskTextElement);
    taskItem.appendChild(completeButton);
    taskItem.appendChild(deleteButton);
    taskList.appendChild(taskItem);

    const tasks = getTasksFromLocalStorage();
    tasks.push({ text: taskText, completed: false, createdAt: new Date() });
    saveTasksToLocalStorage(tasks);

    taskInput.value = '';
}

function loadTasks() {
    const tasks = getTasksFromLocalStorage();
    const taskList = document.getElementById('task-list');

    tasks.forEach(task => {
        const taskItem = document.createElement('li');
        taskItem.className = 'todo-item';
        if (task.completed) {
            taskItem.classList.add('completed');
        }

        const taskTextElement = document.createElement('span');
        taskTextElement.textContent = task.text;

        const completeButton = document.createElement('button');
        completeButton.textContent = 'Done';
        completeButton.className = 'complete-btn';
        completeButton.onclick = () => {
            taskItem.classList.toggle('completed');
            toggleTaskCompletion(task.text);
        };

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => {
            taskList.removeChild(taskItem);
            deleteTaskFromLocalStorage(task.text);
        };

        taskItem.appendChild(taskTextElement);
        taskItem.appendChild(completeButton);
        taskItem.appendChild(deleteButton);
        taskList.appendChild(taskItem);
    });
}

function toggleTaskCompletion(taskText) {
    let tasks = getTasksFromLocalStorage();
    tasks = tasks.map(task => {
        if (task.text === taskText) {
            task.completed = !task.completed;
        }
        return task;
    });
    saveTasksToLocalStorage(tasks);
}

function deleteTaskFromLocalStorage(taskText) {
    let tasks = getTasksFromLocalStorage();
    tasks = tasks.filter(task => task.text !== taskText);
    saveTasksToLocalStorage(tasks);
}

function clearAllTasks() {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = '';
    localStorage.removeItem('tasks');
}

function sortTasksAlphabetically() {
    const tasks = getTasksFromLocalStorage();
    tasks.sort((a, b) => a.text.localeCompare(b.text));
    saveTasksToLocalStorage(tasks);
    renderTasks();
}

function sortTasksByDate() {
    const tasks = getTasksFromLocalStorage();
    tasks.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    saveTasksToLocalStorage(tasks);
    renderTasks();
}

function renderTasks() {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = '';
    loadTasks();
}

window.onload = loadTasks;

document.getElementById('task-input').addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        addTask();
    }
});
