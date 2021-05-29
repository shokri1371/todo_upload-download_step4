class View {
    constructor() {
      this.app = this.getElement('#ro')
      this.form = this.createElement('form')
      this.input = this.createElement('input')
      this.input.type = 'text'
      //this.input.placeholder = 'Add todo'
      this.input.name = 'todo'
      this.filterBtns = document.getElementById("filterButtons")
      this.allBtn = document.querySelector(".all")
      this.activeBtn = document.querySelector(".active")
      this.completeBtn = document.querySelector(".complete")
      this.uploadBtn = document.querySelector(".Upload")
      this.downloadBtn = document.querySelector(".Download")
      this.submitButton = this.createElement('button')
      this.submitButton.textContent = 'ADD'
      this.form.append(this.input, this.submitButton)
      this.title = this.createElement('h1')
      this.title.textContent = 'Todo-List'
      this.todoList = this.createElement('ul', 'todo-list')
      this.app.append(this.title, this.form, this.todoList)
      this._temporaryTodoText = ''
      this._initLocalListeners()
    }
  
    get _todoText() {
      return this.input.value
    }
  
    _resetInput() {
      this.input.value = ''
    }
  
    createElement(tag, className) {
      const element = document.createElement(tag)
      if (className) element.classList.add(className)
      return element
    }
  
    getElement(selector) {
      const element = document.querySelector(selector)
      return element
    }
  
    displayTodos(todos) {
      // Delete all nodes
      while (this.todoList.firstChild) {
        this.todoList.removeChild(this.todoList.firstChild)
      }
      // Show default message
      if (todos.length === 0) {
        const p = this.createElement('p')
        //p.textContent = 'Nothing to do! Add a task?'
        this.todoList.append(p)
      } else {
        // Create nodes
        todos.forEach(todo => {
          const li = this.createElement('li')
          li.id = todo.id
  
          const checkbox = this.createElement('input')
          checkbox.type = 'checkbox'
          checkbox.checked = todo.complete
  
          const span = this.createElement('span')
          span.contentEditable = true
          span.classList.add('editable')
  
          if (todo.complete) {
            const strike = this.createElement('s')
            strike.textContent = todo.text
            span.append(strike)
          } else {
            span.textContent = todo.text
          }
          const deleteButton = this.createElement('button', 'delete')
          deleteButton.innerHTML='<i class= "fas fa-trash"></i>';
          li.append(checkbox, span, deleteButton)
  
          // Append nodes
          this.todoList.append(li)
        })
      }
      // Debugging
      console.log(todos)
    }

    _initLocalListeners() {
      this.todoList.addEventListener('input', event => {
        if (event.target.className === 'editable') {
          this._temporaryTodoText = event.target.innerText
        }
      })
    }
  
    bindAddTodo(handler) {
      this.form.addEventListener('submit', event => {
        event.preventDefault()
        if (this._todoText) {
          handler(this._todoText)
          this._resetInput()
        }
      })
    }
  
    bindDeleteTodo(handler) {
      this.todoList.addEventListener('click', event => {
        if (event.target.className === 'delete') {
          const id = parseInt(event.target.parentElement.id)
          handler(id)
        }
      })
    }
  
    bindEditTodo(handler) {
      this.todoList.addEventListener('focusout', event => {
        if (this._temporaryTodoText) {
          const id = parseInt(event.target.parentElement.id)
  
          handler(id, this._temporaryTodoText)
          this._temporaryTodoText = ''
        }
      })
    }
  
    bindToggleTodo(handler) {
      this.todoList.addEventListener('change', event => {
        if (event.target.type === 'checkbox') {
          const id = parseInt(event.target.parentElement.id)
          handler(id)
        }
      })
    }
  
    bindFilterTodo(handler) {
      this.filterBtns.addEventListener("click", e => {
          var filter = +e.target.getAttribute("value");
          handler(filter);
      });
  }

  bindUploadTodo(handler) {
    this.uploadBtn.addEventListener('click', e => {
      handler()
    })
  }

  bindDownloadTodo(handler) {
    this.downloadBtn.addEventListener('click', e => {
      handler();
    })
  }
  }