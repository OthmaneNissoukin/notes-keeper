
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
        oldNoteBox.querySelector("p").textContent = previousNotes.details
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
                flag = true
            }
        })

    if (taskName.value.trim() != "" && taskDetails.value.trim() != "" && flag) {
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


// Switch To Dark Mode
document.querySelector(".dark-mode-switcher").onclick = function() {
    this.classList.toggle("active")

    document.body.classList.toggle("night-mode")

    if (this.classList.contains("active")) {
        window.localStorage.setItem("darkMode", true)
    } else {
        window.localStorage.setItem("darkMode", false)
    }
    console.log(window.localStorage.getItem("darkMode"))
}

if (window.localStorage.getItem("darkMode") == "true") {
    document.body.classList.add("night-mode")
    document.querySelector(".dark-mode-switcher").classList.add("active")
}
