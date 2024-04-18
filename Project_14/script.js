

// ---------------------------html element reference -------------------------
const taskForm = document.getElementById("task-form");
const openTaskFormBtn = document.getElementById("open-task-form-btn");
const closeTaskFormBtn = document.getElementById("close-task-form-btn");
const confirmCloseDialog = document.getElementById("confirm-close-dialog");
const addOrUpdateTaskBtn = document.getElementById("add-or-update-task-btn");
const cancelBtn = document.getElementById("cancel-btn");
const discardBtn = document.getElementById("discard-btn");
const tasksContainer = document.getElementById("tasks-container");
const titleInput = document.getElementById("title-input");
const dateInput = document.getElementById("date-input");
const descriptionInput  = document.getElementById("description-input");

// -----------------------data-------------------------
const taskData = [];
let currentTask = {};


// -------------------- event listeners ----------------------------
openTaskFormBtn.addEventListener("click", ()=>{
    taskForm.classList.toggle("hidden");
}) 

closeTaskFormBtn.addEventListener("click", () => {
    confirmCloseDialog.showModal();
})

