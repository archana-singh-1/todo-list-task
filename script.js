let taskInput = document.getElementById("taskInput");
let taskList = document.getElementById("taskList");
let completedTasks = document.getElementById("completedTasks");
let allTasks = document.getElementById("allTasks");
let allTaskBtn = document.getElementById("allTaskBtn");
let completeTaskBtn = document.getElementById("completeTaskBtn");

completedTasks.style.display = "none";
allTasks.style.display = "none";

document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
    let taskText = taskInput.value.trim();
    if (!taskText) return;

    const li = document.createElement("li");
    li.innerText = taskText;

    const completeBtn = document.createElement("button");
    completeBtn.textContent = "Complete";
    completeBtn.style.marginLeft = "10px";
    completeBtn.onclick = function () {
        li.style.textDecoration = "line-through";
        li.classList.add("completed");

        if (taskList.contains(li)) taskList.removeChild(li);
        if (allTasks.contains(allLi)) allTasks.removeChild(allLi);

        completedTasks.appendChild(li);
        completeBtn.remove();

        updateTaskStatus(taskText, true);
    };

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("delete-btn");
    deleteBtn.style.marginLeft = "5px";
    deleteBtn.onclick = function () {
        if (li.parentNode) li.parentNode.removeChild(li);
        if (allLi.parentNode) allLi.parentNode.removeChild(allLi);

        deleteTask(taskText);
    };

    li.appendChild(completeBtn);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);

    const allLi = document.createElement("li");
    allLi.innerText = taskText;
    allTasks.appendChild(allLi);

    saveTask({ text: taskText, completed: false });

    taskInput.value = "";
}

function saveTask(task) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}


function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => {
        const li = document.createElement("li");
        li.innerText = task.text;

        if (task.completed) {
            li.style.textDecoration = "line-through";
            completedTasks.appendChild(li);
        } else {
            const completeBtn = document.createElement("button");
            completeBtn.textContent = "Complete";
            completeBtn.style.marginLeft = "10px";
            completeBtn.onclick = function () {
                li.style.textDecoration = "line-through";
                li.classList.add("completed");

                if (taskList.contains(li)) taskList.removeChild(li);
                if (allTasks.contains(allLi)) allTasks.removeChild(allLi);

                completedTasks.appendChild(li);
                completeBtn.remove();

                updateTaskStatus(task.text, true);
            };

            const deleteBtn = document.createElement("button");
            deleteBtn.textContent = "Delete";
            deleteBtn.classList.add("delete-btn");
            deleteBtn.style.marginLeft = "5px";
            deleteBtn.onclick = function () {
                if (li.parentNode) li.parentNode.removeChild(li);
                if (allLi.parentNode) allLi.parentNode.removeChild(allLi);

                deleteTask(task.text);
            };

            li.appendChild(completeBtn);
            li.appendChild(deleteBtn);
            taskList.appendChild(li);
        }

        const allLi = document.createElement("li");
        allLi.innerText = task.text;
        allTasks.appendChild(allLi);
    });
}


function updateTaskStatus(taskText, isCompleted) {
    let tasks = JSON.parse(localStorage.getItem("tasks"))

    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].text === taskText) {
            tasks[i].completed = isCompleted; 
            break; 
        }
    }

    localStorage.setItem("tasks", JSON.stringify(tasks));
}


function deleteTask(taskText) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.filter(task => task.text !== taskText);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

allTaskBtn.onclick = function () {
    allTasks.style.display = "block";
    completedTasks.style.display = "block";
    taskList.style.display='block'
};

completeTaskBtn.onclick = function () {
    completedTasks.style.display = "block";
    allTasks.style.display = "none";
    taskList.style.display = "none";
};
