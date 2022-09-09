/* Local storage to get To-Do's*/
window.addEventListener('load', () => { /* Button clicked upon to load */
	todos = JSON.parse(localStorage.getItem('todos')) || []; /* Gets Local storage to get To-Do's*/
	const nameInput = document.querySelector('#name'); /* Local storage to get name typed in */
	const newTodoForm = document.querySelector('#new-todo-form'); /* Local storage to get category form*/

	const username = localStorage.getItem('username') || ''; /* Gets name typed in from local storage*/

	nameInput.value = username;

	nameInput.addEventListener('change', (e) => {
		localStorage.setItem('username', e.target.value); /* Any changes that occurred will be saved to a folder in local storgae called "username"*/
	})

	newTodoForm.addEventListener('submit', e => { /* Retrieves any information when clicked upon and saved to JSON*/
		e.preventDefault();

		const todo = {
			content: e.target.elements.content.value, /* Gets local storage from "content"/"name" when submitted */
			category: e.target.elements.category.value, /* Gets local storage from "category" when submitted */
			done: false,
			createdAt: new Date().getTime() /* Gets actual time stamp when submitted and saved to local storage*/
		}

		todos.push(todo); /* Gets new To-Do when entered */

		localStorage.setItem('todos', JSON.stringify(todos)); /* Saves new To-Do when submitted to JSON Local Storage */

		
		e.target.reset(); // Resets the form when saved or submitted

		DisplayTodos() /* Displays all your new To-Do's */
	})

	DisplayTodos() /* Added a function to display the added To-Do's*/
})

function DisplayTodos () {
	const todoList = document.querySelector('#todo-list'); /* Pushes new To-Do's when submitted*/
	todoList.innerHTML = "";

	todos.sort(); forEach(todo => { /* Sorts the to-do's alphabetically */
		const todoItem = document.createElement('div'); /* Referencing to the html */
		todoItem.classList.add('todo-item');

		const label = document.createElement('label'); /* Labels */
		const input = document.createElement('input'); /* Checkboxes */
		const span = document.createElement('span'); /* spans the document  */
		const content = document.createElement('div'); /* Content */
		const actions = document.createElement('div'); /* Retrieves all our actions */
		const edit = document.createElement('button'); /* The edit button */
		const deleteButton = document.createElement('button'); /* The delete button */

		input.type = 'checkbox'; /* Checks if To-Do's are done */
		input.checked = todo.done; /* Tells me/you if the To-Do's are done */
		span.classList.add('bubble');
		if (todo.category == 'personal') { /* Tells the users whether or not you have chosen personal/ school or work  */
			span.classList.add('personal'); 
		} else {
			span.classList.add('business'); /* Tells the users whether or not you have chosen personal/ school or work  */
		}
		content.classList.add('todo-content'); /* Adds new To-Do if submitted */
		actions.classList.add('actions'); /* Action it takes */
		edit.classList.add('edit'); /* This will allow you to edit your To-Do */
		deleteButton.classList.add('delete'); /* This will allow you to delete your new To-Do */

		content.innerHTML = `<input type="text" value="${todo.content}" readonly>`; /* Changed the inner.html to make new changes and save them */
		edit.innerHTML = 'Edit'; /* The inner.html will therefore allow you to only edit your changes */
		deleteButton.innerHTML = 'Delete'; /* The inner.html will therefore allow you to delete your changes if you have done it or don't want it there anymore */

		label.appendChild(input); /* Saves your input from a user */
		label.appendChild(span);
		actions.appendChild(edit); /* Saves all your edited changes */
		actions.appendChild(deleteButton); /* Saves your deleted changes */
		todoItem.appendChild(label); 
		todoItem.appendChild(content); /* Saves your new content */
		todoItem.appendChild(actions); /* Saves any actions that has been made */

		todoList.appendChild(todoItem); /* Appends/ Saves any new To-Do items  */

		if (todo.done) {
			todoItem.classList.add('done'); /* Allows or shows you that a task and To-Do is done */
		}
		
		input.addEventListener('change', (e) => { /* Allows you to check your tasks */
			todo.done = e.target.checked;
			localStorage.setItem('todos', JSON.stringify(todos)); /* Saves a new task everytime we enter it to JSON Local Storage */

			if (todo.done) {
				todoItem.classList.add('done'); /* Adds a checked feature if task/ To-Do is done */
			} else {
				todoItem.classList.remove('done');
			}

			DisplayTodos() /* Displays our new Tasks as done or need to complete still */

		})

		edit.addEventListener('click', (e) => { /* Allows you to make new changes to an already added task */
			const input = content.querySelector('input');
			input.removeAttribute('readonly'); /* Removes the readonly attribute */
			input.focus();
			input.addEventListener('blur', (e) => {
				input.setAttribute('readonly', true); /* Makes sure that whatever you have typed returns true or a boolean value */
				todo.content = e.target.value;
				localStorage.setItem('todos', JSON.stringify(todos)); /* Saves all your new changes to a local storage in JSON */
				DisplayTodos() /* Displays all your new To-Do's */

			})
		})

		deleteButton.addEventListener('click', (e) => { /* Functionality for you to be able to delete a Task/ To-Do */
			todos = todos.filter(t => t != todo); /* If your values or whatever you typed in are not the same then it removes the one that isn't */
			localStorage.setItem('todos', JSON.stringify(todos)); /* Saves all your new changes and deletes to Local Storage in JSON */
			DisplayTodos() /* Allows you to display all your items or To-Do's */
		})

	})
}