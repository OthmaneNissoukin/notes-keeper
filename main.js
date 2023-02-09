
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

var x = window.localStorage.length + 1

if (x > 1) {

    // Array Of Local Storage Keys
    let mySavedNotes = Object.keys(window.localStorage)
    mySavedNotes = mySavedNotes.filter(ele => ele != "darkMode")

    // Insert Elements Into The Page
    for(let i = 0; i < mySavedNotes.length; i++) {
        let previousNotes = JSON.parse(window.localStorage.getItem(mySavedNotes[i]))

        let oldNoteBox = taskBox.cloneNode(true)
        oldNoteBox.querySelector("h5").textContent = previousNotes.title
        // oldNoteBox.querySelector("p").textContent = previousNotes.details

        let taskDetailsStyled = previousNotes.details.split("//")
        for (let i = 0; i < taskDetailsStyled.length; i++) {
            oldNoteBox.querySelector("p").appendChild(document.createTextNode(taskDetailsStyled[i]))
            oldNoteBox.querySelector("p").appendChild(document.createElement("br"))
        }

        oldNoteBox.style.backgroundColor = previousNotes.color
        oldNoteBox.setAttribute("data-order", i + 1)
        document.querySelector("section").appendChild(oldNoteBox)
    }
}

// Get Task Infos
let taskName = document.getElementById("title")
let taskDetails = document.getElementById("description")

document.getElementById("add").onclick = function() {

    // Generate Note Backgound Color
    let colorScheme = document.querySelectorAll("input[type='radio']")
        var color = "#000"
        var flag = false

        colorScheme.forEach(function(ele) {
            if (ele.checked) {
                color = ele.value
            }
        })

    if (taskName.value.trim() != "" && taskDetails.value.trim() != "") {
        // Create New Box
        let taskPrototype = taskBox.cloneNode(true) 

        // Set Note Title
        taskPrototype.querySelector("h5").textContent = taskName.value.trim()
        
        // Set Note Details
        //? Making The Ability To Insert Line Breaks Without Using innerHTML Method
        let taskDetailsStyled = taskDetails.value.split("//")

        // Add Note Title, Details & Color To Local Storage
        let newNote = {
            title: taskName.value.trim(),
            details: taskDetails.value,
            color: color
        } 

        localStorage.setItem(`${newNote.title.replaceAll(" ", "_")}`, JSON.stringify(newNote))

        for (let i = 0; i < taskDetailsStyled.length; i++) {
            taskPrototype.querySelector("p").appendChild(document.createTextNode(taskDetailsStyled[i]))
            taskPrototype.querySelector("p").appendChild(document.createElement("br"))
        }

        // Clear Input Fields When Creating The Note
        taskName.value = ""
        taskDetails.value = ""
    
        //! taskPrototype.className = `task-${x}` will override all classes values 
        
        taskPrototype.classList.add(`task-${x}`)
        taskPrototype.setAttribute("data-order", x)
        taskPrototype.style.setProperty("background-color", color)
        
        document.querySelector("section").appendChild(taskPrototype)
        x++
    }
}

addEventListener("click", function(evt) {
    if (evt.target.classList.contains("discard-task")) {
        let targetBox = evt.target.parentElement.parentElement.parentElement

        // Discard The Target Element From The Local Storage
        window.localStorage.removeItem(`${targetBox.querySelector("h5").textContent.replaceAll(" ", "_")}`)

        // Remove Element From The HTML Page
        targetBox.remove()

        // Sort Notes Order After Deleting An Element
        document.querySelectorAll(".task-box").forEach(function(note, order) {
            note.setAttribute("data-order", order + 1)
        })
    }
})

// Update Note
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

// console.log(updateForm)
// ! Completed Update Form

addEventListener("click", function(evt) {
    if (evt.target.textContent == "Update") {

        let noteBox = evt.target.parentElement.parentElement.parentElement

        let previousNoteTitle = noteBox.querySelector("h5").textContent
        let previousNoteDesc = noteBox.querySelector("p").textContent
        let previousNoteBg = noteBox.style.backgroundColor

        // console.log(previousNoteTitle)
        // console.log(previousNoteDesc)

        updateForm.querySelector("#noteTitleUpdate").value = previousNoteTitle
        updateForm.querySelector("#noteDescriptionUpdate").value = previousNoteDesc
        document.body.appendChild(formWrapper)

        // Update
        formWrapper.querySelector("#update").onclick = function() {
            let newData = {
                title: formWrapper.querySelector("#noteTitleUpdate").value.trim(),
                details: formWrapper.querySelector("#noteDescriptionUpdate").value.trim(),
                color: previousNoteBg
            }

            if (previousNoteTitle === newData.title) {
                window.localStorage.setItem(previousNoteTitle.replaceAll(" ", "_"), JSON.stringify(newData))
            } else {
                window.localStorage.setItem(newData.title.replaceAll(" ", "_"), JSON.stringify(newData))
                window.localStorage.removeItem(previousNoteTitle.replaceAll(" ", "_"))
            }

            noteBox.remove()
            formWrapper.remove()
            window.location.reload()
        }

        // Cancel
        formWrapper.querySelector("#cancel").onclick = function() {
            formWrapper.remove()
        }
    }
})

// Switch To Dark Mode
document.querySelector(".dark-mode-switcher").onclick = function() {
    this.classList.toggle("active")

    document.body.classList.toggle("night-mode")

    if (this.classList.contains("active")) {
        window.localStorage.setItem("darkMode", true)
    } else {
        window.localStorage.setItem("darkMode", false)
    }
}

if (window.localStorage.getItem("darkMode") == "true") {
    document.body.classList.add("night-mode")
    document.querySelector(".dark-mode-switcher").classList.add("active")
}
