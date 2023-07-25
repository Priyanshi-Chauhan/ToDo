// todolistapp is defined in global scope and access the variables in return block


var todolistapp = (function () {
let tasks = [];
const tasksList = document.getElementById("list");
const addTaskInput = document.getElementById("add");
const tasksCounter = document.getElementById("tasks-counter");

console.log("Working");
var a = 10;
async function fetchTodos() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/todos");
    const data = await response.json();
    tasks = data.slice(0, 10);
    renderList();
  } catch (error) {
    console.log(error);
  }
}
function addTaskToDOM(task) {
  // it will basically create a "li" tag and will append it to the unordered list
  const li = document.createElement("li");
  li.innerHTML = `
    <input type = "checkbox" id= "${task.id}" ${
    task.completed ? "checked" : ""
  } class="custom-checkbox">
    <label for ="${task.id}">${task.title} </label>   
    <img class ="delete" > <i class="fa-solid fa-trash-can" data-id="${
      task.id
    }"></i></img>
    `;

  tasksList.append(li);
}
function renderList() {
  tasksList.innerHTML = "";
  for (let i = 0; i < tasks.length; i++) {
    addTaskToDOM(tasks[i]);
  }
  tasksCounter.innerHTML = tasks.length;
}

function toggleTask(taskId) {
  const toggletask = tasks.filter(function (task) {
    return task.id === Number(taskId);
  });
  if (toggletask.length > 0) {
    const currenttask = toggletask[0];
    currenttask.completed = !currenttask.completed; // changing according to the api data
    renderList();
    showNotification("task toggled successfully");
    return;
  }
  showNotification("Could not toggle the task");
}

function deleteTask(taskId) {
  const newtasks = tasks.filter(function (task) {
    return task.id !== Number(taskId);
  });

  tasks = newtasks;
  renderList();
  showNotification("task deleted successfully");
}

function addTask(task) {
  // adding post request here
  // since our api is not supporting post request, it wont work
  // if (task) {
  //     fetch("https://jsonplaceholder.typicode.com/todos", {
  //         method: "POST",
  //         headers: {
  //             'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify(task)
  //     }).then(function (response) {
  //         return response.json();
  //     }).then(function (data) {
  //         console.log(data);
  //         tasks.push(task);
  //         renderList();
  //         showNotification("task added successfully");
  //     }).catch(function (error) {
  //         console.log('error', error);
  //     })
  // }
  if (task) {
    tasks.push(task);
    renderList();
    showNotification("Task Added Successfully");
    return;
  }
  showNotification("task cannot be added");
}

function showNotification(text) {
  alert(text);
}

function handleInputKeyPress(e) {
  if (e.key === "Enter") {
    // means user has done typing, we will get the text
    const text = e.target.value;
    console.log("text is ", text);
    if (!text) {
      // if user has not typed anything and just pressed enter
      showNotification("Task Text cannot be empty");
      return;
    }

    const task = {
      title: text,
      id: Date.now(), // Date.now() will give us the id and we will convert that to string
      completed: false,
    };
    // making the input box empty
    e.target.value = "";
    addTask(task);
  }
}

function handleClickListener(e) {
  const target = e.target;
  console.log(target);
  if (target.className === "fa-solid fa-trash-can") {
    // id , because data-id is there
    const taskid = target.dataset.id; // whatever data attribute we give to particular element ,those will be available in dataset.

    deleteTask(taskid);
    return;
  } else if (target.className === "custom-checkbox") {
    const taskid = target.id;
    toggleTask(taskid);
    return;
  }
}

function initializeApp() {
  fetchTodos();
  addTaskInput.addEventListener("keyup", handleInputKeyPress);
  document.addEventListener("click", handleClickListener);
}
     //making public over here
  
      return {
   
        initialize: initializeApp,
        a: a
}

 })()


