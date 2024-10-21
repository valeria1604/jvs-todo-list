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
    };

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.onclick = () => {
        taskList.removeChild(taskItem);
    };

    taskItem.appendChild(taskTextElement);
    taskItem.appendChild(completeButton);
    taskItem.appendChild(deleteButton);
    taskList.appendChild(taskItem);

    taskInput.value = '';
}

document.getElementById('task-input').addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        addTask();
    }
});
