let todoItemsContainer = document.getElementById("todoItemsContainer");
      let addTodoButton = document.getElementById("addTodoButton");
      let saveButton=document.getElementById("saveTodoButton");
      function grouping(){
        let retrive=localStorage.getItem("todolist");
        let parser=JSON.parse(retrive);
        if (parser===null){
          return []
        }
        else{
          return parser
        }
      }
      
      let todoList = grouping();
      
      
      saveButton.onclick=function(){
        let stringified=JSON.stringify(todoList);
        localStorage.setItem("todolist",stringified);
      }
      
      let todosCount = todoList.length;
      
      function onTodoStatusChange(checkboxId, labelId,todoId) {
        let checkboxElement = document.getElementById(checkboxId);
        let labelElement = document.getElementById(labelId);
      
        labelElement.classList.toggle('checked');
        let gottit=todoList.findIndex(function(eaching){
          let electing="todo"+eaching.uniqueNo;
          if (electing===todoId){
            return true
          }
          else{
            return false
          }
          
        })
        let valuePerhaps=todoList[gottit]
        if (valuePerhaps.isChecked===true){
          valuePerhaps.isChecked=false
        }        
        else{
          valuePerhaps.isChecked=true
        }
      }
      
      function onDeleteTodo(todoId) {
        let todoElement = document.getElementById(todoId);
      
        todoItemsContainer.removeChild(todoElement);
        let fetching=todoList.findIndex(function(each){
          let vall="todo"+each.uniqueNo;
          if (vall===todoId){
            return true
          }
          else{
            return false
          }
        })
        todoList.splice(fetching,1);


      }
      
      function createAndAppendTodo(todo) {
        let todoId = 'todo' + todo.uniqueNo;
        let checkboxId = 'checkbox' + todo.uniqueNo;
        let labelId = 'label' + todo.uniqueNo;
      
        let todoElement = document.createElement("li");
        todoElement.classList.add("todo-item-container", "d-flex", "flex-row");
        todoElement.id = todoId;
        todoItemsContainer.appendChild(todoElement);
      
        let inputElement = document.createElement("input");
        inputElement.type = "checkbox";
        inputElement.id = checkboxId;
        inputElement.checked=todo.isChecked;
      
        inputElement.onclick = function() {
          onTodoStatusChange(checkboxId, labelId,todoId);
        }
      
        inputElement.classList.add("checkbox-input");
        todoElement.appendChild(inputElement);
      
        let labelContainer = document.createElement("div");
        labelContainer.classList.add("label-container","p-1", "d-flex", "flex-row");
        todoElement.appendChild(labelContainer);
      
        let labelElement = document.createElement("label");
        labelElement.setAttribute("for", checkboxId);
        labelElement.id = labelId;
        labelElement.classList.add("checkbox-label");
        if (todo.isChecked===true){
          labelElement.classList.add("checked");
        }
        labelElement.textContent = todo.text;
        labelContainer.appendChild(labelElement);
      
        let deleteIconContainer = document.createElement("div");
        deleteIconContainer.classList.add("delete-icon-container");
        labelContainer.appendChild(deleteIconContainer);
      
        let deleteIcon = document.createElement("i");
        deleteIcon.classList.add("far", "fa-trash-alt", "delete-icon");
      
        deleteIcon.onclick = function () {
          onDeleteTodo(todoId);
        };
      
        deleteIconContainer.appendChild(deleteIcon);
      }
      
      for (let todo of todoList) {
        createAndAppendTodo(todo);
      }
      
      function onAddTodo() {
        let userInputElement = document.getElementById("todoUserInput");
        let userInputValue = userInputElement.value;
      
        if(userInputValue === ""){
          alert("Enter Valid Text");
          return;
        }
      
        todosCount = todosCount + 1;
      
        let newTodo = {
          text: userInputValue,
          uniqueNo: todosCount,
          isChecked:false
        };
        todoList.push(newTodo);
        createAndAppendTodo(newTodo);
        userInputElement.value = "";
      }
      
      addTodoButton.onclick = function(){
        onAddTodo();
      }
      
      
      