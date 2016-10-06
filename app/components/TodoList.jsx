import React from 'react'
import { AddItemPanel } from './AddItemPanel'
import { TagPanel } from './TagPanel'
import { TodoItem } from './TodoItem'

export default class TodoList extends React.Component {
  state = {
    activeTags: [],
    todos: [
      {id: 0, title: 'Download react-starter-es6', completed: true, tags: ['github']},
      {id: 1, title: 'Read the docs', completed: true, tags: ['docs', 'github']},
      {id: 2, title: 'Make a component', completed: false, tags: ['react', 'jsx']},
      {id: 3, title: 'Combine components to make an app', completed: false, tags: ['react', 'javascript', 'jsx']},
      {id: 4, title: 'Build a social network empire', completed: false, tags: ['facebook']}
    ]
  }

  handleToggleCompleted = (idx) => {
    const updatedTodos = [
      ...this.state.todos.slice(0, idx),
      { ...this.state.todos[idx], completed: !this.state.todos[idx].completed },
      ...this.state.todos.slice(idx + 1)
    ]

    this.setState({todos: updatedTodos})
  }

  handleAddItem = (titleField, tagField) => {
    let title = document.getElementById(titleField)
    let newTags = document.getElementById(tagField)

    if (!title.value) {
      return alert('Title cannot be blank')
    }

    const removeDuplicateTags = new Set()
    newTags.value.split(', ').map(tag => removeDuplicateTags.add(tag))
    const noDuplicateTags = [...removeDuplicateTags]

    const newTodoItem = {title: title.value, completed: false, tags: noDuplicateTags}
    const updatedTodos = [...this.state.todos, newTodoItem]

    title.value = ''
    newTags.value = ''

    this.setState({todos: updatedTodos})
  }

  handleDeleteItem = (idx) => {
    const updatedTodos = [
      ...this.state.todos.slice(0, idx),
      ...this.state.todos.slice(idx + 1)
    ]

    this.setState({todos: updatedTodos })
  }

  handleTagFilter = (tag, select = true) => {
    const updatedTags = [...this.state.activeTags]
    const activeSet = new Set()

    this.state.activeTags.map(tag => activeSet.add(tag))

    if (select) {
      if (activeSet.has(tag)) {
        const index = updatedTags.indexOf(tag)
        updatedTags.splice(index, 1)
      } else {
        updatedTags.push(tag)
      }
    } else {
      const index = updatedTags.indexOf(tag)
      updatedTags.splice(index, 1)
    }

    this.setState({activeTags: updatedTags})
  }

  handleClearTagFilter = () => {
    this.setState({activeTags: []})
  }

  renderTodoItems = () => {
    const todoItemsToRender = []
    const todoItemProps = {
      toggleCompleted: this.handleToggleCompleted,
      deleteItem: this.handleDeleteItem
    }

    if (!this.state.activeTags.length) {
      this.state.todos.forEach((todo, i) => {
        todoItemsToRender.push(
          <TodoItem
            key={i}
            todo={todo}
            idx={i}
            {...todoItemProps}
          />
        )
      })
    } else {
      this.state.todos.forEach((todo, i) => {
        todo.tags.forEach(tag => {
          if (this.state.activeTags.indexOf(tag) !== -1) {
            todoItemsToRender.push(
              <TodoItem
                key={i}
                todo={todo}
                idx={i}
                activeTags={this.state.activeTags}
                {...todoItemProps}
              />
            )
          }
        })
      })
    }

    return todoItemsToRender
  }

  render() {
    return (
      <div className="container">
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">
              TodoList
            </h3>
          </div>
          <div className="panel-body">
            <AddItemPanel addItem={this.addItem} />
            <div className="list-group">
              <TagPanel todos={this.state.todos} activeTags={this.state.activeTags} tagFilter={this.handleTagFilter} clearTagFilter={this.handleClearTagFilter} />
              { this.renderTodoItems() }
            </div>
          </div>
        </div>
      </div>
    )
  }
}
