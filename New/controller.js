class Controller {
    constructor(model, view) {
      this.model = model
      this.view = view
      this.model.bindTodoListChanged(this.onTodoListChanged)
      this.view.bindAddTodo(this.handleAddTodo)
      this.view.bindEditTodo(this.handleEditTodo)
      this.view.bindDeleteTodo(this.handleDeleteTodo)
      this.view.bindToggleTodo(this.handleToggleTodo)
      this.view.bindFilterTodo(this.handleFilterTodo);
      this.view.bindUploadTodo(this.handleUpload);
      this.view.bindDownloadTodo(this.handleDownload);

      this.onTodoListChanged(this.model.todos)
    }
      
    onTodoListChanged = todos => {
      this.view.displayTodos(todos)
    }
  
    handleAddTodo = todoText => {
      this.model.addTodo(todoText)
    }
  
    handleEditTodo = (id, todoText) => {
      this.model.editTodo(id, todoText)
    }
  
    handleDeleteTodo = id => {
      this.model.deleteTodo(id)
    }
  
    handleToggleTodo = id => {
      this.model.toggleTodo(id)
    }
    handleFilterTodo = filter => {
      this.model.filterTodo(filter);
  };

  handleUpload = () => {
    if (!this.model.todos)
      return;
    var data = JSON.stringify(this.model.todos);
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
      if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
        alert('upload successful!')
      else if (xmlHttp.readyState === 4 && xmlHttp.status === 500) {
        alert(xmlHttp.responseText);
      }
    }
    xmlHttp.open('POST', 'write', true);
    xmlHttp.setRequestHeader('Content-Type', 'application/json');
    xmlHttp.send(data);
  }
 
  handleDownload = () => {
    var xmlHttp = new XMLHttpRequest();
    var self = this;
    xmlHttp.onreadystatechange = function () {
      if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
        var data = JSON.parse(xmlHttp.responseText);
        self.model.todos = data;
        //self.model.bindTodoListChanged();
        //self.onTodoListChanged(self.model.todos);
        self.model.setLocalStorage(self.model.todos);
        alert("replace Successfully!");
      }
    };
    xmlHttp.open('GET', 'read', true);
    xmlHttp.send();
  }
  }
  
  const app = new Controller(new Model(), new View())
  