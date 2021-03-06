/* VERSION 1 (this version works but sucks, so don't use it for anything more than reference)

function addAndRemoveItems() {
    document.getElementById('create-todo').addEventListener('keypress', function(event) {
        if (event.key == 'Enter') {
            let input = document.getElementById('create-todo') // get the input
            let inputValue = input.value

            if (inputValue !== '') {
                // The new list item
                let list = document.getElementById('list')
                let newListItem = document.createElement('li')
                let textNode = document.createTextNode(inputValue) // convert inputValue to a text node
                newListItem.appendChild(textNode)
                let refEl = document.getElementById("follows-new-items") // get the reference element (which comes AFTER the inserted element)
                list.insertBefore(newListItem, refEl) // insert the newListItem into the list before refEl

                input.value = ''

                // The new close button of the new list item
                let closeBtn = document.createElement('span') // create a <span> node
                let txtNd = document.createTextNode('x') // convert x to a text node
                closeBtn.appendChild(txtNd) // append the text node to the <span>
                closeBtn.className = 'close'
                newListItem.appendChild(closeBtn) // append the close button to the new list item
                closeBtn.addEventListener('click', function() { // remove list item
                    newListItem.remove()
                })

            }   
        }
    })
}

addAndRemoveItems()

*/



/* VERSION 2 (this version also works but also sucks, so don't use it for anything more than reference)

let input = document.getElementById('create-todo') // get the input

function createAndDeleteListItem() {
    // list item anatomy
    let newListItem = document.createElement('li')
    let textNode = document.createTextNode(input.value) // convert input.value to a text node
    newListItem.appendChild(textNode)

    // place the list item
    let list = document.getElementById('list')
    let refEl = document.getElementById("follows-new-items") // get the reference element (which comes AFTER the inserted element)
    list.insertBefore(newListItem, refEl) // insert the newListItem into the list before refEl

    // The new close button (of the new list item) anatomy
    let closeBtn = document.createElement('span') // create a <span> node
    closeBtn.className = 'close' // need this line?
    let txtNd = document.createTextNode('x') // convert x to a text node

    // place the new close button
    closeBtn.appendChild(txtNd) // append the text node to the <span>
    newListItem.appendChild(closeBtn) // append the close button to the new list item

    input.value = '' // clear input field
    input.focus() // set cursor back to beginning of input field

    closeBtn.addEventListener('click', function(event) {
        event.target.parentElement.remove()
    })
}

document.getElementById('add-item-btn').addEventListener('click', manageListItem)

function manageListItem(event) {

    if (input.value !== '') {
        event.preventDefault() // this is saying: don't refresh the page each time a new item is submitted...

        createAndDeleteListItem()
    }
}

*/



/* VERSION 3 (this version works well, but Version 4 is different insofar as how list items are presented with the All, Active, and Completed buttons)

// Q: Why is hitting Enter working with the program the way it is?
// A: The Enter key still works probably because pressing Enter within any form element triggers the submission of the form...equivalent to clicking the button. At least I think. Regardless, it works.

let input = document.getElementById('create-todo') // get the input
const list = document.getElementById('list')
let numItemsLeft = document.getElementById('num-items-left')
numItemsLeft.textContent = 0 // sets 'items left' number to 0 upon loading

document.getElementById('add-item-btn').addEventListener('click', function(event) {

    if (input.value !== '') {
        event.preventDefault() // this is saying: don't refresh the page each time a new item is submitted

        addToDo()
    }
})

// addToDo creates an 'li', sets its text, and adds it to the list
function addToDo() {
    // list item anatomy
    let newListItem = document.createElement('li')
    newListItem.className = 'new-list-item is-hidden' // may not need to keep the 'new-list-item' class
    newListItem.id = toDos.length + 1 // Remember this matches what's getting pushed to the toDos array just below
    newListItem.draggable = true // KEEP??
    let textNode = document.createTextNode(input.value) // convert input.value to a text node
    let inputTextSpan = document.createElement('span') // create a <span> node
    inputTextSpan.className = 'item-completed'
    inputTextSpan.appendChild(textNode)
    newListItem.appendChild(inputTextSpan)

    // place the list item
    let refEl = document.getElementById("follows-new-items") // get the reference element (which comes AFTER the inserted element)
    list.insertBefore(newListItem, refEl) // insert the newListItem into the list before refEl

    inputTextSpan.classList.remove('item-completed') // this needs to be here because of inputTextSpan's 'item-completed' class being set (in the CSS) to 'text-decoration: line-through;'
    newListItem.classList.remove('is-hidden') // this needs to be here because of newListItem's 'is-hidden' class being set (in the CSS) to 'display: none;'

    toDos.push(
        {
            text: input.value,
            completed: false,
            id: toDos.length + 1
        }
    )

    // addToDo also invokes two other functions, 'addCloseBtn' and 'prepareUI'
    addCloseBtn(newListItem) // addCloseBtn accepts one argument - the newly created list item in addToDo. ***This is key so that the addCloseBtn function has access to newListItem.***
    addCheckbox(newListItem, inputTextSpan)
    prepareUI()
        
    updateItemsLeft(newListItem, false)
}

// addCloseBtn creates the 'x' span, appends it to the list item, and sets up its event listener (to remove the corresponding list item when clicked)
function addCloseBtn(newItem) {
    // The new close button (of the new list item) anatomy
    let closeBtn = document.createElement('span') // create a <span> node
    closeBtn.className = 'close'
    let txtNd = document.createTextNode('x') // convert x to a text node

    // place the new close button
    closeBtn.appendChild(txtNd) // append the text node to the <span>
    newItem.appendChild(closeBtn) // append the close button to the new list item

    closeBtn.addEventListener('click', function(event) {
        event.target.parentElement.remove()
        updateItemsLeft(newItem, true)
    })
}

function addCheckbox(newItem, textSpan) {
    let checkbox = document.createElement('input')
    checkbox.type = 'checkbox'
    newItem.insertBefore(checkbox, textSpan) // insert the checkbox into the newListItem before inputTextSpan

    checkbox.addEventListener('click', function(event) { // better to have event be 'click' or 'change' here? Seems to make no difference
        if (event.target.checked) {
            textSpan.classList.add('item-completed')
            updateItemsLeft(newItem, true)
        } else {
            textSpan.classList.remove('item-completed')
            updateItemsLeft(newItem, false) 
        }
    })
}

// prepareUI resets the input's value and focuses it
function prepareUI() {
    input.value = '' // clear input field
    input.focus() // set cursor back to beginning of input field
}

let toDos = []

function updateItemsLeft(item, bool) {
    toDos[item.id - 1].completed = bool // false means increasing 'items left' number, true means decreasing 'items left' number
    let newToDos = toDos.filter(toDosObj => toDosObj.completed == false)
    numItemsLeft.textContent = newToDos.length
}

// "Clear Completed" button - seems to be working properly
document.getElementById('clear-completed-btn').addEventListener('click', function() {
    Array.from(list.children).forEach(listItem => { // 'list' (which is the variable name for my 'ul') is just one object, so we need to use 'list.children'. 'list.children', however, is an array-like object, not an array, so we need to make it an array with 'Array.from'
        if (listItem.firstElementChild.checked) { // 'firstChild' or 'firstElementChild'? Doesn't seem to make a difference here
            listItem.remove()
        }
    })
})

// "All" button - seems to be working properly
document.getElementById('all-btn').addEventListener('click', function() {
    Array.from(list.children).forEach(listItem => {
        if (listItem.firstElementChild.checked) {
            listItem.classList.remove('is-hidden')
        } else {
            listItem.classList.remove('is-hidden')
        }
    })
})

// "Active" button - seems to be working properly
document.getElementById('active-btn').addEventListener('click', function() {
    Array.from(list.children).forEach(listItem => {
        if (listItem.firstElementChild.checked) {
            listItem.classList.add('is-hidden')
        } else {
            listItem.classList.remove('is-hidden')
        }
    })
})

// "Completed" button - seems to be working properly
document.getElementById('completed-btn').addEventListener('click', function() {
    Array.from(list.children).forEach(listItem => {
        if (listItem.firstElementChild.checked == false) {
            listItem.classList.add('is-hidden')
        } else {
            listItem.classList.remove('is-hidden')
        }
    })
})


//'drag and drop to reorder list' - what I have doesn't really work - table this for now
// might help: https://www.javascripttutorial.net/web-apis/javascript-drag-and-drop/

// Array.from(list.children).forEach(listItem => {
//     listItem.addEventListener('dragstart', function(event) { // note: I added the 'draggable' attribute to newListItem at the creation of it
//         event.preventDefault
        
//     })

//     listItem.addEventListener('drop', function(event) {
//         event.preventDefault
//         listItem.draggable = false
//         document.getElementById('drop-under-here').appendChild(listItem)
//     })
// })

*/



// VERSION 4 (not ideal, but much better than the previous versions)

// Q: Why is hitting Enter working with the program the way it is?
// A: The Enter key still works probably because pressing Enter within any form element triggers the submission of the form...equivalent to clicking the button. At least I think. Regardless, it works.

// Globally defined variables
let input = document.getElementById('create-todo') // get the input
const list = document.getElementById('list')
let numItemsLeft = document.getElementById('num-items-left')
numItemsLeft.textContent = '0' // sets 'items left' number to 0 upon loading

// 'Add it!' button
document.getElementById('add-item-btn').addEventListener('click', function(event) {

    if (input.value !== '') {
        event.preventDefault() // this is saying: don't refresh the page each time a new item is submitted

        toDos.push(
            {
                text: input.value,
                completed: false,
                id: toDos.length + 1
            }
        )

        addToDo()
    }
})

// addToDo creates an 'li', sets its text, and adds it to the list
function addToDo() {
    // list item anatomy
    let newListItem = document.createElement('li')
    newListItem.className = 'new-list-item' // may not need to keep the 'new-list-item' class
    newListItem.id = toDos.length // Remember this matches what's getting pushed to the toDos array just below
    // newListItem.draggable = true // KEEP??
    let textNode = document.createTextNode(input.value) // convert input.value to a text node
    let inputTextSpan = document.createElement('span') // create a <span> node
    inputTextSpan.className = 'item-completed'
    inputTextSpan.appendChild(textNode)
    newListItem.appendChild(inputTextSpan)

    // place the list item
    let refEl = document.getElementById('follows-new-items') // get the reference element (which comes AFTER the inserted element)
    list.insertBefore(newListItem, refEl) // insert the newListItem into the list before refEl

    inputTextSpan.classList.remove('item-completed') // this needs to be here because of inputTextSpan's 'item-completed' class being set (in the CSS) to 'text-decoration: line-through;'

    // addToDo also invokes two other functions, 'addCloseBtn' and 'addCheckbox' and 'prepareUI'
    addCloseBtn(newListItem) // addCloseBtn accepts one argument - the newly created list item in addToDo. ***This is key so that the addCloseBtn function has access to newListItem.***
    addCheckbox(newListItem, inputTextSpan)
    prepareUI()
        
    updateItemsLeft(newListItem, false)
}

// addCloseBtn creates the 'x' span, appends it to the list item, and sets up its event listener (to remove the corresponding list item when clicked)
function addCloseBtn(newItem) {
    // The new close button (of the new list item) anatomy
    let closeBtn = document.createElement('span') // create a <span> node
    closeBtn.className = 'close'
    let txtNd = document.createTextNode('x') // convert x to a text node

    // place the new close button
    closeBtn.appendChild(txtNd) // append the text node to the <span>
    newItem.appendChild(closeBtn) // append the close button to the new list item

    closeBtn.addEventListener('click', function(event) {
        event.target.parentElement.remove()
        updateItemsLeft(newItem, true)
    })
}

// addCheckBox creates the checkbox and sets up its functionality
function addCheckbox(newItem, textSpan) {
    let checkbox = document.createElement('input')
    checkbox.type = 'checkbox'
    newItem.insertBefore(checkbox, textSpan) // insert the checkbox into the newListItem before inputTextSpan

    // this is here so that the checkboxes, when checked, retain their blue color and checkmark
    if (toDos[newItem.id - 1].completed == true) {
        checkbox.setAttribute('checked', true)
    } else {
        checkbox.removeAttribute('checked')
    }

    checkbox.addEventListener('click', function(event) {
        if (event.target.checked) {
            textSpan.classList.add('item-completed')
            updateItemsLeft(newItem, true)
        } else {
            textSpan.classList.remove('item-completed')
            updateItemsLeft(newItem, false) 
        }
    })
}

// prepareUI resets the input's value and focuses it
function prepareUI() {
    input.value = '' // clear input field
    input.focus() // set cursor back to beginning of input field
}

// the toDos array allows the dynamic list items to be manipulated
let toDos = []

// updateItemsLeft sets the number for 'items left' in the UI
function updateItemsLeft(item, bool) {
    toDos[item.id - 1].completed = bool // false means increasing 'items left' number, true means decreasing 'items left' number
    let newToDos = toDos.filter(toDosObj => toDosObj.completed == false)
    numItemsLeft.textContent = newToDos.length
}

// 'Clear Completed' button
document.getElementById('clear-completed-btn').addEventListener('click', function() {
    Array.from(list.children).forEach(listItem => { // 'list' (which is the variable name for my 'ul') is just one object, so we need to use 'list.children'. 'list.children', however, is an array-like object, not an array, so we need to make it an array with 'Array.from'
        if (listItem.firstElementChild.checked) {
            listItem.remove()
        }
    })
})

// removeItems removes all dynamically-created list items from the UI and DOM...so that certain items can be added back in
function removeItems(ulList) {
    Array.from(ulList.children).forEach(listItem => {
        if (listItem.firstElementChild.checked || listItem.firstElementChild.checked == false) {
            listItem.remove()
        }
    })
}

// 'All' button
document.getElementById('all-btn').addEventListener('click', function() {
    removeItems(list)

    toDos.forEach(item => {
        newListItem = document.createElement('li')
        newListItem.className = 'new-list-item'
        newListItem.id = item.id
        let textNode = document.createTextNode(item.text)
        let inputTextSpan = document.createElement('span')
        inputTextSpan.className = 'item-completed'
        inputTextSpan.appendChild(textNode)
        newListItem.appendChild(inputTextSpan)

        let refEl = document.getElementById('follows-new-items')
        list.insertBefore(newListItem, refEl)

        if (item.completed == false) {
            inputTextSpan.classList.remove('item-completed')
        } else {
            inputTextSpan.classList.add('item-completed')
        }

        addCloseBtn(newListItem)
        addCheckbox(newListItem, inputTextSpan)
        prepareUI()
    })
})

// 'Active' button
// (Note that the comments here don't just apply to the Active button, but I didn't want to repeat in the other two event handlers.)
// Whenever one of the three buttons is clicked...
document.getElementById('active-btn').addEventListener('click', function() {
    // Erase the whiteboard so you start clean (the white board has no memory of what was just written on it)
    removeItems(list)

    // Refer to the database, containing all the items ever added to it [and] Filter it by the ones that should be displayed based on the button that was clicked 
    let newToDos = toDos.filter(toDosObj => toDosObj.completed == false)

    // And 'write' those items on the whiteboard, in the order they were added to the database...minus the part where you push to ToDos
    newToDos.forEach(item => {
        newListItem = document.createElement('li')
        newListItem.className = 'new-list-item'
        newListItem.id = item.id
        let textNode = document.createTextNode(item.text)
        let inputTextSpan = document.createElement('span')
        inputTextSpan.className = 'item-completed'
        inputTextSpan.appendChild(textNode)
        newListItem.appendChild(inputTextSpan)

        let refEl = document.getElementById('follows-new-items')
        list.insertBefore(newListItem, refEl)

        inputTextSpan.classList.remove('item-completed')

        addCloseBtn(newListItem)
        addCheckbox(newListItem, inputTextSpan)
        prepareUI()
    })
})

// 'Completed' button
document.getElementById('completed-btn').addEventListener('click', function() {
    removeItems(list)

    let newToDos = toDos.filter(toDosObj => toDosObj.completed == true)

    newToDos.forEach(item => {
        newListItem = document.createElement('li')
        newListItem.className = 'new-list-item'
        newListItem.id = item.id
        let textNode = document.createTextNode(item.text)
        let inputTextSpan = document.createElement('span')
        inputTextSpan.className = 'item-completed'
        inputTextSpan.appendChild(textNode)
        newListItem.appendChild(inputTextSpan)

        let refEl = document.getElementById('follows-new-items')
        list.insertBefore(newListItem, refEl)

        inputTextSpan.classList.add('item-completed')

        addCloseBtn(newListItem)
        addCheckbox(newListItem, inputTextSpan)
        prepareUI()
    })
})











//'drag and drop to reorder list' - what I have doesn't really work - table this for now
// might help: https://www.javascripttutorial.net/web-apis/javascript-drag-and-drop/

// Array.from(list.children).forEach(listItem => {
//     listItem.addEventListener('dragstart', function(event) { // note: I added the 'draggable' attribute to newListItem at the creation of it
//         event.preventDefault
        
//     })

//     listItem.addEventListener('drop', function(event) {
//         event.preventDefault
//         listItem.draggable = false
//         document.getElementById('drop-under-here').appendChild(listItem)
//     })
// })