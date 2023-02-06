
// Task Box
let taskBox = document.createElement("div")

taskBox.classList.add("p-3", "my-3", "text-white")

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


// Task Divider
let taskDivider = document.createElement("hr")

// Task Description
let taskDescription = document.createElement("p")
taskDescription.classList.add("fs-5")

// Task Header Element Fusion
taskHeader.appendChild(taskTitle)
taskHeader.appendChild(removeTask)

// Task Box Element Fusion
taskBox.appendChild(taskHeader)
taskBox.appendChild(taskDivider)
taskBox.appendChild(taskDescription)

console.log(taskBox)

var x = 1

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
        let taskPrototype = taskBox.cloneNode(true)
        taskPrototype.querySelector("h5").textContent = taskName.value.trim()
        
        //? Making The Ability To Insert Line Breaks Without Using innerHTML Method
        let taskDetailsStyled = taskDetails.value.split("//")

        for (let i = 0; i < taskDetailsStyled.length; i++) {
            taskPrototype.querySelector("p").appendChild(document.createTextNode(taskDetailsStyled[i]))
            taskPrototype.querySelector("p").appendChild(document.createElement("br"))
        }

        // Clear Input Fields When Creating The Note
        taskName.value = ""
        taskDetails.value = ""
    
        //! taskPrototype.className = `task-${x}` will override all classes values 
        
        taskPrototype.classList.add(`task-${x}`)
        taskPrototype.style.setProperty("background-color", color)
        
        document.querySelector("section").appendChild(taskPrototype)
        x++
    }
}

addEventListener("click", function(evt) {
    if (evt.target.classList.contains("discard-task")) {
        evt.target.parentElement.parentElement.remove()
    }
})

// Switch To Dark Mode
document.querySelector(".dark-mode-switcher").onclick = function() {
    this.classList.toggle("active")

    document.body.classList.toggle("night-mode")
}

