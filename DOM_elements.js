
// Task Box
let taskBox = document.createElement("div")

taskBox.classList.add("task-box", "p-3", "my-3", "text-white")

// Task Header
let taskHeader = document.createElement("div")
taskHeader.classList.add("box-header", "d-flex", "justify-content-between")

// Task Title
let taskTitle = document.createElement("h5")
taskTitle.classList.add("fs-4", "fst-italic")

// Task Button
let removeTask = document.createElement("button")
removeTask.classList.add("btn", "btn-danger", "rounded-0", "discard-task")
removeTask.textContent = "Remove"

// Task Update
let updateTask = document.createElement("button")
updateTask.classList.add("btn", "btn-warning", "rounded-0", "update-task")
updateTask.textContent = "Update"

// Buttons Wrapper
let buttonsWrapper = document.createElement("div")

// Task Divider
let taskDivider = document.createElement("hr")

// Task Description
let taskDescription = document.createElement("p")
taskDescription.classList.add("fs-5")

// Task Header Element Fusion
taskHeader.appendChild(taskTitle)
buttonsWrapper.appendChild(updateTask)
buttonsWrapper.appendChild(removeTask)
taskHeader.appendChild(buttonsWrapper)

// Task Box Element Fusion
taskBox.appendChild(taskHeader)
taskBox.appendChild(taskDivider)
taskBox.appendChild(taskDescription)

// console.log(taskBox)

//! Completed Note Box

export {taskBox}

// Create Update Form
let formWrapper = document.createElement("div")
formWrapper.classList.add("form-wrapper", "d-flex", "justify-content-center", "align-items-center")

let updateForm = document.createElement("form")
updateForm.classList.add("update-modal", "bg-white", "py-4", "px-md-5", "w-75", "m-auto", "border", "border-1")

let formHeading = document.createElement("h4")
formHeading.classList.add("text-center", "text-decoration-underline")
formHeading.textContent = "Update Note"

let colorFieldContainer = document.createElement("div")

// Title Section
let titleFieldContainer = document.createElement("div")
let titleLabel =  document.createElement("label")
titleLabel.setAttribute("for", "noteTitleUpdate")
titleLabel.className = "form-label"

let titleField = document.createElement("input")
titleField.setAttribute("type", "text")
titleField.setAttribute("id", "noteTitleUpdate")
titleField.classList.add("form-control", "fs-5", "fw-semibold")

// Description Section
let descFieldContainer = document.createElement("div")
descFieldContainer.classList.add("my-4")

let descLabel = document.createElement("label")
descLabel.setAttribute("for", "noteDescriptionUpdate")
descLabel.className = "form-label"

let descField = document.createElement("textarea")
descField.setAttribute("cols", 30)
descField.setAttribute("row", 2)
descField.setAttribute("id", "noteDescriptionUpdate")
descField.classList.add("form-control", "fs-5")

// Buttons
let btnWrapper = document.createElement("div")

let updateNoteBtn = document.createElement("button")
updateNoteBtn.classList.add("btn", "btn", "btn-success", "me-3")
updateNoteBtn.type = "button"
updateNoteBtn.id = "update"
updateNoteBtn.textContent = "Save Changes"

let cancelChanges = document.createElement("button")
cancelChanges.classList.add("btn", "btn", "btn-danger")
cancelChanges.type = "button"
cancelChanges.id = "cancel"
cancelChanges.textContent = "Cancel"


// Form Update Fusion
titleFieldContainer.appendChild(titleLabel)
titleFieldContainer.appendChild(titleField)

descFieldContainer.appendChild(descLabel)
descFieldContainer.appendChild(descField)

btnWrapper.appendChild(updateNoteBtn)
btnWrapper.appendChild(cancelChanges)

updateForm.appendChild(formHeading)
updateForm.appendChild(titleFieldContainer)
updateForm.appendChild(descFieldContainer)
updateForm.appendChild(btnWrapper)

formWrapper.appendChild(updateForm)

export {formWrapper, updateForm}