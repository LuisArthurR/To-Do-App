//Seletores HTML
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo")

//Event Listeners
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);

document.addEventListener("DOMContentLoaded", getTodos);

//Functions

function addTodo(event) {
    //Prevent form from submitting
    event.preventDefault();
    
    if(!todoInput.value == "")
    {
        //to Do div
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");

        //Cria o item da lista
        const newTodo = document.createElement("li");
        newTodo.innerText = todoInput.value;
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);

        //Cria o botão de marcar
        const completedButton = document.createElement("button");
        completedButton.innerHTML = '<i class="fas fa-check"></i>';
        completedButton.classList.add('complete-btn');
        todoDiv.appendChild(completedButton);

        //Cria o botão de lixeira
        const trashButton = document.createElement("button");
        trashButton.innerHTML = '<i class="fas fa-trash"></i>';
        trashButton.classList.add('trash-btn');
        todoDiv.appendChild(trashButton);

        //add to Do to localStorage
        saveLocalTodos(todoInput.value);

        //append to list
        todoList.appendChild(todoDiv);

        //Limpa o input depois de enviar
        todoInput.value = "";
    }
}

//Deleta o item
function deleteCheck(e){
    const item = e.target;

    //delete to Do
    if(item.classList[0] === "trash-btn"){
        const todo = item.parentElement;
        removeLocalStorage(todo);
        todo.remove();
    }

    if(item.classList[0] === "complete-btn"){
        const todo = item.parentElement;
        todo.classList.toggle("completed")
    }
}

//Filta as opções de to Do
function filterTodo(e){
    const todos = todoList.childNodes;

    todos.forEach(function(todo){
        const mStyle = todo.style;
        if(mStyle != undefined && mStyle != null){
            switch (e.target.value){
                case "all":
                    mStyle.display = "flex";
                    break;

                case "completed":
                    if (todo.classList.contains('completed')) {
                        mStyle.display = 'flex';
                    } else {
                        mStyle.display = "none";
                    }
                    break;

                case "uncompleted":
                    if (todo.classList.contains('completed')){
                        mStyle.display = 'none';
                    }
                    else{
                        mStyle.display = "flex";
                    }
                    break;
            }
        }
    })
}

//Salva no local Storage
function saveLocalTodos(todo){
    let todos;

    if(localStorage.getItem('todos') === null){
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

//Printa os itens salvos no localStorage
function getTodos(){
    let todos;

    if(localStorage.getItem('todos') === null){
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(function(todo){
        //toDo div
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");

        //create Li
        const newTodo = document.createElement("li");
        newTodo.innerText = todo;
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);

        //check Mark button
        const completedButton = document.createElement("button");
        completedButton.innerHTML = '<i class="fas fa-check"></i>';
        completedButton.classList.add('complete-btn');
        todoDiv.appendChild(completedButton);

        //check trash button
        const trashButton = document.createElement("button");
        trashButton.innerHTML = '<i class="fas fa-trash"></i>';
        trashButton.classList.add('trash-btn');
        todoDiv.appendChild(trashButton);

        //append to list
        todoList.appendChild(todoDiv);
    })
}

//Deleta os itens do localStorage
function removeLocalStorage(todo){
    let todos;
    
    if(localStorage.getItem('todos') === null){
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}