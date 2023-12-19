document.addEventListener('DOMContentLoaded', () => {
    window.addEventListener('load', () => {
        todos = JSON.parse(localStorage.getItem('todos')) || [];
        const name = document.querySelector('#name');
        const newTodoForm = document.querySelector('#new-todo-form');

        const username = localStorage.getItem('username') || '';
        name.value = username;
        name.addEventListener('change', (e) => {
            localStorage.setItem('username', e.target.value);
        });

        newTodoForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const todoContent = e.target.elements.content.value.trim();

            if (todoContent === '') {
                alert('Todo content cannot be empty!');
                return;
            }

            const todo = {
                content: todoContent,
                done: false,
                createdAt: Date.now()
            };

            todos.push(todo);
            localStorage.setItem('todos', JSON.stringify(todos));
            e.target.reset();

            displayToDo();
        });

        displayToDo();
    });
});

function displayToDo() {
    const taskList = document.querySelector('.tasks');
    taskList.innerHTML = '';


    const sortedTodos = todos.slice().sort((a, b) => b.createdAt - a.createdAt);


    sortedTodos.forEach((todo) => {
        const toDoItem = document.createElement('div');
        toDoItem.classList.add('task');

        const label = document.createElement('label');
        const inputCheck = document.createElement('input');
        const content = document.createElement('div');
        const actions = document.createElement('div');
        const edit = document.createElement('button');
        const deleteButton = document.createElement('button');

        inputCheck.type = 'checkbox';
        inputCheck.checked = todo.done;

        content.classList.add('todo-content');
        content.innerHTML = `<input type="text" value="${todo.content}" readonly>`;

        actions.classList.add('actions');
        edit.classList.add('Edit');
        deleteButton.classList.add('Delete');

        edit.innerHTML = 'Edit';
        deleteButton.innerHTML = 'Delete';

        label.appendChild(inputCheck);
        toDoItem.appendChild(label);
        toDoItem.appendChild(content);

        actions.appendChild(edit);
        actions.appendChild(deleteButton);

        toDoItem.appendChild(actions);

        taskList.appendChild(toDoItem);
        
        inputCheck.addEventListener('click', (e) => {
            todo.done = e.target.checked;
            localStorage.setItem('todos', JSON.stringify(todos));

            if (todo.done) {
                toDoItem.classList.add('done');
            } else {
                toDoItem.classList.remove('done');
            }
        })
        edit.addEventListener('click', (e) => {
            const input = content.querySelector('input');
            
            if (e.target.textContent.toLowerCase() == 'edit'){
                input.removeAttribute('readonly');
                input.focus();
                e.target.textContent = 'Save';
            } else {
                input.setAttribute('readonly', 'readonly');
                e.target.textContent = 'Edit';
            }
        })
        deleteButton.addEventListener('click', (e) => {
            const index = todos.indexOf(todo);
            if (index !== -1){
                todos.splice(index, 1);
                localStorage.setItem('todos', JSON.stringify(todos));
                taskList.removeChild(toDoItem);
            }
        })
    });
}
