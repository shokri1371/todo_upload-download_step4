class Model {
    constructor() {
      this.todos=JSON.parse(localStorage.getItem('TODOS'));
      if(!this.todos) {
        this.todos = [];
        this.filter=0;
      }
    }
    bindTodoListChanged(callback) {
      this.onTodoListChanged = callback

    }
  
    _commit(todos = this.todos) {
      this.onTodoListChanged(todos.filter(todo => {
          if (this.filter === 0) return true;
          return this.filter === 1 ? !todo.complete : todo.complete;
      }));
  }

    addTodo(todoText) {
      const todo = {
        id: this.todos.length > 0 ? this.todos[this.todos.length - 1].id + 1 : 1,
        text: todoText,
        complete: false,
      }
      this.todos.push(todo)
      this._commit(this.todos)
      localStorage.setItem('TODOS', JSON.stringify(this.todos));
      //       window.addEventListener("load", function() {
      //   toDo = new ToDoClass();
      // });
    }

    editTodo(id, updatedText) {
      this.todos = this.todos.map(todo =>
      todo.id === id ? { id: todo.id, text: updatedText, complete: todo.complete } : todo)
      this._commit(this.todos)
      localStorage.setItem('TODOS', JSON.stringify(this.todos));

    }
  
    deleteTodo(id) {
      this.todos = this.todos.filter(todo => todo.id !== id)
      this._commit(this.todos)
      localStorage.setItem('TODOS', JSON.stringify(this.todos));

    }
  
    toggleTodo(id) {
      this.todos = this.todos.map(todo =>
        todo.id === id ? { 
          id: todo.id, 
          text: todo.text, 
          complete: !todo.complete } 
          : todo);
      this._commit(this.todos)
      localStorage.setItem('TODOS', JSON.stringify(this.todos));

    }
  
    filterTodo(filter) {
      this.filter = filter;
      this._commit();

  }
  completeTodo(id) {
    this.todos = this.todos.map(todo =>
      todo.id === id ? { id: todo.id, text: todo.text, complete: !todo.complete } : todo
    );

    this._commit(this.todos);
  }
  getLocalStorage() {
    return JSON.parse(localStorage.getItem('TODOS')) || [];
  }

  //save todolist's data in local storage
  setLocalStorage(todos) {
    localStorage.setItem('TODOS', JSON.stringify(todos));
    this._commit(this.todos);
  }
}
