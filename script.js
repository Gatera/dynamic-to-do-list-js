document.addEventListener('DOMContentLoaded', () => {
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    //Function to Load tasks from Local Storage
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText, false));
    }

    //Function to create a task element
    function createTaskElement(taskText) {
        const taskItem = document.createElement('li');
        taskItem.textContent = taskText;

        const removeButton = document.createElement('button');
        removeButton.textContent = "Remove";
        removeButton.classList.add = "remove-btn";
        removeButton.onclick = () => {
            taskList.removeChild(taskItem);
            const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            const updatedTasks = storedTasks.filter(task => task !== taskText);
            localStorage.setItem('tasks', JSON.stringify(updatedTasks));
        };

        taskItem.appendChild(removeButton);
        taskList.appendChild(taskItem);
    }

    //Adjust 'addTask'  function to optionally save tasks
    function addTask(taskText, save = true) {
        if (taskText.trim() === "") {
            alert("Please enter a task.");
            return;
        }

        createTaskElement(taskText);

        if (save) {
            const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            storedTasks.push(taskText);
            localStorage.setItem('tasks', JSON.stringify(storedTasks));
        }

        taskInput.value = "";
    }


    //Attach event listeners
    addButton.addEventListener('click', () => addTask(taskInput.value));
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask(taskInput.value);
        }




    // //Select DOM Elements
    // const addButton = document.getElementById('add-task-btn');
    // const taskInput = document.getElementById('task-input');
    // const taskList = document.getElementById('task-list');

    // //Create the addTask function
    // function addTask() {
    //     const taskText = taskInput.value.trim();

    //     if (taskText === "") {
    //         alert('Please enter a task');
    //         return;
    //     } else {
    //         //Create new li element and set its contact to taskText
    //         const taskItem = document.createElement('li');
    //         taskItem.textContent = taskText;

    //         //Create button to remove task
    //         const removeButton = document.createElement('button');
    //         removeButton.textContent = 'Remove';
    //         removeButton.classList.add = 'remove-btn';

    //         //Assign onclick to remove button to remove li element from taskList
    //         removeButton.onclick = function() {
    //             taskList.removeChild(taskItem);
    //         }

    //         //append button
    //         taskItem.append(removeButton);
    //         //append task item
    //         taskList.appendChild(taskItem);

    //         //clear the task input
    //         taskInput.value = "";
    //     }
    // }

    // addButton.addEventListener('click', addTask);
    // taskInput.addEventListener('keypress', (event) => {
    //     if (event.key === 'Enter') {
    //         addTask();
    //     }
    });

    loadTasks();
});