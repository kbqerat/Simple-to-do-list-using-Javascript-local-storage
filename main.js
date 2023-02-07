"use strict";

let inputField = document.querySelector(".input");
let addButton = document.querySelector(".add");
let myTasks = document.querySelector(".tasks");

// empty array to store different tasks
let tasksArray = [];

// check if there's any data in the local storage
if (window.localStorage.getItem("tasks")) {
  tasksArray = JSON.parse(window.localStorage.getItem("tasks"));
  addTasksToDocument(tasksArray);
}

// submit the task event
addButton.onclick = function () {
  if (inputField.value !== "") {
    addTaskToTasksArray(inputField.value);
    inputField.value = "";
  }
};

// delete button
myTasks.addEventListener("click", function (e) {
  if (e.target.classList.contains("delete")) {
    // remove task from the document and local storage
    e.target.parentElement.remove();
    deleteTask(e.target.parentElement.getAttribute("data-id"));
  }

  if (e.target.classList.contains("task")) {
    e.target.classList.toggle("done");
    taskStatus(e.target.getAttribute("data-id"));
  }
});

// function that takes a task as a parameter
function addTaskToTasksArray(taskText) {
  // task data
  const task = {
    id: Date.now(),
    text: taskText,
    completed: false,
  };
  // push the task data to the array
  tasksArray.push(task);
  // add tasks to the document
  addTasksToDocument(tasksArray);
  // add tasks to the local storage
  addTasksToLocalStorage(tasksArray);
}

function addTasksToDocument(tasksArray) {
  // empty the tasks div
  myTasks.innerHTML = "";
  // looping on the array of the tasks
  tasksArray.forEach((task) => {
    // create the main div
    let div = document.createElement("div");
    div.className = "task";
    // check if a task is done
    if (task.completed) div.className = "task done";
    // adding a the id unique as an attribute custome to the created div
    div.setAttribute("data-id", task.id);
    div.appendChild(document.createTextNode(task.text));
    // create the delete button
    let span = document.createElement("span");
    span.className = "delete";
    span.appendChild(document.createTextNode("X"));
    div.appendChild(span);
    // add task to tasks div
    myTasks.appendChild(div);
  });
}

function addTasksToLocalStorage(tasksArray) {
  window.localStorage.setItem("tasks", JSON.stringify(tasksArray));
}

function deleteTask(taskId) {
  tasksArray = tasksArray.filter((task) => task.id != taskId);
  addTasksToLocalStorage(tasksArray);
}

function taskStatus(taskId) {
  for (let i = 0; i < tasksArray.length; i++) {
    if (tasksArray[i].id == taskId) {
      tasksArray[i].completed == false
        ? (tasksArray[i].completed = true)
        : (tasksArray[i].completed = false);
    }
  }
  addTasksToLocalStorage(tasksArray);
}
