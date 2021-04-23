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



// VERSION 2 (this version also works but also sucks, so don't use it for anything more than reference)

// QQQ: Why in the world is hitting the enter key working with the program the way it is right now?

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
        // QQQ: When the above line is commented out, "please fill out this field." shows when input field is empty and button is clicked AND when input field is empty after a list item has been created. Why is this?
        // QQQ: When the above line is NOT commented out, "please fill out this field." shows only when input field is empty and button is clicked BUT NOT when input field is empty after a list item has been created. This is how I want it. But still, why is this?

        createAndDeleteListItem()
    }
}





// Start this over
// Generally, MAKE SMALL FUNCTIONS, each one just doing one thing, and then pass these functions into a main function.
// Remember WHEN things are stored (e.g., the problem with using inputValue instead of input.value)
// Maybe once I have a solid program, then add back in using 'Enter' instead of or in addition to the add-item-btn