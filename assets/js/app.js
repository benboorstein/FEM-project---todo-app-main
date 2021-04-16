// My advice:
// - Worry about CSS last
// - Try starting the JS: displaying a list of items that come from a JS array, not hard-coded. Adding a created item to a list of existing items.
// - Adjust the HTML where necessary
//-----------------------------------------------------------------------------


// 1. user clicks in input window
    // no code needed

// 2. user types item description
    // no code needed

// 3. when user hits Enter...
function addListItem() {
    document.getElementById('create-todo').addEventListener('keypress', function(event) {
        if (event.key == 'Enter') {
            // ...add what has been typed (the input value) to the list
            let input = document.getElementById('create-todo') // getting the input
            let inputValue = input.value

            if (inputValue !== '') {
                let list = document.getElementById('list') // getting the list
                let newListItem = document.createElement('li'); // creating a <li> node
                let textNode = document.createTextNode(inputValue); // converting inputValue to a text node
                newListItem.appendChild(textNode); // appending the text node to the new list item
                list.appendChild(newListItem); // appending the new list item to the list

                inputValue = ''
            }   
        }
    })
}

addListItem()

// function deleteListItem() {

// }

// 4. "items left" number goes to 1

// 5. deal with rest at a later time