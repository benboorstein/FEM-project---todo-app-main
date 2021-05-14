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
let numItemsLeft = document.getElementById('num-items-left') // NEW LINE - self-explanatory
numItemsLeft.textContent = 0 // NEW LINE - sets 'items left' number to 0 upon loading

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
    newListItem.className = 'new-list-item is-hidden' // may not need to keep the 'new-list-item' class
    newListItem.id = toDos.length + 1 // Remember this matches what's getting pushed to the toDos array just below
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
    // newListItem.style.display = 'block' // works but not what I want
    // document.getElementsByClassName('new-list-item').classList.remove('is-hidden') // doesn't work and I'm not sure why

    toDos.push(
        {
            text: input.value,
            completed: false,
            id: toDos.length + 1
        }
    )

    // addTodo also invokes two other functions, 'addCloseBtn' and 'prepareUI'
    addCloseBtn(newListItem) // addCloseBtn accepts one argument - the newly created list item in addTodo. ***This is key so that the addCloseBtn function has access to newListItem.***
    addCheckbox(newListItem, inputTextSpan)
    prepareUI()

    numItemsLeft.textContent = toDos.length // NEW LINE - increments the 'items left' number every time a list item is added 
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
        event.target.parentElement.remove() // this just removes the list item from the UI
        toDos.splice(toDos[newItem.id - 1], 1) // NEW LINE - removes from the toDos array the item on which the 'x' is clicked - QQQ: this seems to work, but see in console how the IDs reorder...Is this what we want?
        numItemsLeft.textContent = toDos.length // NEW LINE - resets the 'items-left' number, given the change in the toDos array length
    })
}

function addCheckbox(newItem, textSpan) {
    let checkbox = document.createElement('input')
    checkbox.type = 'checkbox'
    newItem.insertBefore(checkbox, textSpan) // insert the checkbox into the newListItem before inputTextSpan

    checkbox.addEventListener('click', function(event) { // better to have event be 'click' or 'change' here? Seems to make no difference
        if (event.target.checked) {
            textSpan.classList.add('item-completed')
            toDos.splice(toDos[newItem.id - 1], 1) // NEW LINE - QQQ: this works here, but because it needs to be able to be undone, I'm not sure it's the correct way to do it in this particular case 
            numItemsLeft.textContent = toDos.length // NEW LINE - QQQ: same as line just above
        } else {
            textSpan.classList.remove('item-completed')
            // QQQ: Assuming the user has checked the box (and therefore the 'items left' number goes down 1) but then decides to uncheck the box (and therefore the 'items left' number needs to go back up 1, i.e., the previous action from the 'if' clause needs to be UNDONE), where/how do I handle this?
        }
    })
}

// prepareUI resets the input's value and focuses it
function prepareUI() {
    input.value = '' // clear input field
    input.focus() // set cursor back to beginning of input field
}

let toDos = []

// "Clear Completed" button - seems to be working properly
document.getElementById('clear-completed-btn').addEventListener('click', function() {
    Array.from(list.children).forEach(listItem => { // 'list' (which is the variable name for my 'ul') is just one object, so we need to use 'list.children'. 'list.children', however, is an array-like object, not an array, so we need to make it an array with 'Array.from'
        if (listItem.firstElementChild.checked) { // 'firstChild' or 'firstElementChild'? Doesn't seem to make a difference here
            listItem.remove()
            toDos.splice(toDos[listItem.id - 1], 1) // NEW LINE - seems to work properly here
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

/* LEFT OFF HERE
OoO:
- updating "items left"
- drag and drop
*/