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



// Start this over
// Generally, MAKE SMALL FUNCTIONS, each one just doing one or a couple things, and then pass these functions into a main function.
// Remember WHEN IN TIME things are stored (e.g., the problem accessing newListItem)

// VERSION 3 (work in progress...)

// Q: Why is hitting Enter working with the program the way it is?
// A: The Enter key still works probably because pressing Enter within any form element triggers the submission of the form...equivalent to clicking the button. At least I think. Regardless, it works.

let input = document.getElementById('create-todo') // get the input
const list = document.getElementById('list')

document.getElementById('add-item-btn').addEventListener('click', function(event) {

    if (input.value !== '') {
        event.preventDefault() // this is saying: don't refresh the page each time a new item is submitted

        addTodo()
    }
})

// addTodo creates an 'li', sets its text, and adds it to the list
function addTodo() {
    // list item anatomy
    let newListItem = document.createElement('li')
    newListItem.id = toDos.length + 1 // Remember this matches what's getting pushed to the toDos array just below
    let textNode = document.createTextNode(input.value) // convert input.value to a text node
    newListItem.appendChild(textNode)

    // place the list item
    let refEl = document.getElementById("follows-new-items") // get the reference element (which comes AFTER the inserted element)
    list.insertBefore(newListItem, refEl) // insert the newListItem into the list before refEl

    toDos.push(
        {
            text: input.value,
            completed: false,
            id: toDos.length + 1
        }
    )

    // addTodo also invokes two other functions, 'addCloseBtn' and 'prepareUI'
    addCloseBtn(newListItem) // addCloseBtn accepts one argument - the newly created list item in addTodo. ***This is key so that the addCloseBtn function has access to newListItem.***
    addCheckbox(newListItem, textNode)
    prepareUI()
    
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
    })
}

function addCheckbox(newItem, tNode) {
    let checkbox = document.createElement('input')
    checkbox.type = 'checkbox'
    newItem.insertBefore(checkbox, tNode) // insert the checkbox into the newListItem before textNode

    checkbox.addEventListener('change', function(event) {
        if (event.target.checked) {
            newItem.style.textDecoration = 'line-through' // ************QQQ************: ONLY PROBLEM: the x is included in the line-through. What's wrong is that I'm using newListItem (appearing here as "newItem"). So I tried using textNode (appearing here as "tNode") instead, "input.value" instead, and "inputValue" (with input.value stored in it) instead, but all generate errors. How do I fix? // Possible solution but do anyway: add a class and address in CSS. Class could be something like ".completed"
        } else {
            newItem.style.textDecoration = 'none'
        }
    })
}

// prepareUI resets the input's value and focuses it
function prepareUI() {
    input.value = '' // clear input field
    input.focus() // set cursor back to beginning of input field
}



// STATES pseuocode:

// When a list item has been completed in real life, the options are...
// ...click the x that's part of that list item (to remove individual list items) - ALREADY CODED
// ...drag the list item into "Drag and drop to reorder list" (to remove individual list items)
// ...click/check the checkbox that's part of that item and then clear it by clicking the "clear completed" button (can remove several at one time) - ALREADY CODED
// However many items are left on the list (not including those whose checkboxes have been checked), the "items left" number should reflect this
// Clicking "All" presents all (checked and unchecked) list items 
// Clicking "Active" presents just unchecked list items
// Clicking "Completed" presents just checked list items

let toDos = []


document.getElementById('clear-completed-btn').addEventListener('click', function() {
    Array.from(list.children).forEach(listItem => { // 'list' (which is the variable name for my 'ul') is just one object, so we need to use 'list.children'. 'list.children', however, is an array-like object, not an array, so we need to make it an array with 'Array.from'
        if (listItem.firstElementChild.checked) {
            listItem.remove()
        }
    })
})