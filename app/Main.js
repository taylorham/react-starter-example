import React from 'react'
import ReactDOM from 'react-dom'
import update from 'react-addons-update'
import { TodoList } from './components/TodoList'

class Main extends React.Component {
  state = {
    activeTags: [],
    todos: [
      {title: 'Download react-starter-es6', completed: true, tags: ['github']},
      {title: 'Read the docs', completed: true, tags: ['docs', 'github']},
      {title: 'Make a component', completed: false, tags: ['react', 'jsx']},
      {title: 'Combine components to make an app', completed: false, tags: ['react', 'javascript', 'jsx']},
      {title: 'Build a social network empire', completed: false, tags: ['facebook']}
    ]
  }

  handleToggleCompleted = (idx) => {
    const updatedTodos = update(this.state.todos, {[idx]: {completed: { $set: !this.state.todos[idx].completed }}})

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
    const updatedTodos = update(this.state.todos, { $push: [newTodoItem] })

    title.value = ''
    newTags.value = ''

    this.setState({todos: updatedTodos})
  }

  handleDeleteItem = (idx) => {
    const updatedTodos = update(this.state.todos, { $splice: [[idx, 1]] })

    this.setState({todos: updatedTodos })
  }

  handleTagFilter = (tag, select = true) => {
    const updatedTags = update(this.state.activeTags, {})
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

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-xs-12">
            <TodoList
              todos={this.state.todos}
              activeTags={this.state.activeTags}
              tagFilter={this.handleTagFilter}
              clearTagFilter={this.handleClearTagFilter}
              toggleCompleted={this.handleToggleCompleted}
              addItem={this.handleAddItem}
              deleteItem={this.handleDeleteItem}
            />
          </div>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<Main />, document.getElementById('app'))
