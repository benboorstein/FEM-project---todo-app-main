// My advice:
// - Worry about CSS last
// - Try starting the JS: displaying a list of items that come from a JS array, not hard-coded. Adding a created item to a list of existing items.
// - Adjust the HTML where necessary
//-----------------------------------------------------------------------------


// 1. user clicks in input window
    // no code needed

// 2. user types item description
    // no code needed

// 3. when user hits Enter, add what has been typed (the input value) to the list...and then remove
function addAndRemoveItems() {
    document.getElementById('create-todo').addEventListener('keypress', function(event) {
        if (event.key == 'Enter') {
            let input = document.getElementById('create-todo') // getting the input
            let inputValue = input.value

            if (inputValue !== '') {
                // The new list item
                let list = document.getElementById('list')
                let newListItem = document.createElement('li')
                let textNode = document.createTextNode(inputValue) // convert inputValue to a text node
                newListItem.appendChild(textNode)
                let refEl = document.getElementById("follows-new-items") // get the reference element (which comes AFTER the inserted element)
                list.insertBefore(newListItem, refEl) // insert the newListItem into the list before refEl

                // The new close button of the new list item
                let closeBtn = document.createElement('span') // create a <span> node
                let txtNd = document.createTextNode('x') // convert x to a text node
                closeBtn.appendChild(txtNd) // append the text node to the <span>
                closeBtn.className = 'close'
                newListItem.appendChild(closeBtn) // append the close button to the new list item
                closeBtn.addEventListener('click', function() { // remove list item
                    newListItem.remove()
                })

                input.value = ''
            }   
        }
    })
}

addAndRemoveItems()


// 4. "items left" number goes up with each item added and down with each item removed

// 5. deal with rest at a later time












// DOESN'T WORK
// let input = document.getElementById('create-todo')
// let inputValue = input.value

// const todos = [
//     inputValue // no idea how I'd get items in the array
// ]


// document.getElementById('create-todo').addEventListener('keypress', function(event, todos) {
//     for (let i = 0; i < todos.length; i++) {
//         if (event.key == 'Enter') {
//             // ...add what has been typed (the input value) to the list    
//             if (todos[i] !== '') {
//                 let list = document.getElementById('list') // getting the list
//                 let newListItem = document.createElement('li') // creating a <li> node
//                 let textNode = document.createTextNode(todos[i]) // converting inputValue to a text node
//                 newListItem.appendChild(textNode) // appending the text node to the new list item
//                 list.appendChild(newListItem) // appending the new list item to the list

//                 input.value = ''
//             }   
//         }
//     }
// }