import React from 'react'
import ReactDOM from 'react-dom'
import TodoList from './TodoList'
import { Sidebar } from './Sidebar'

class Main extends React.Component {
  state = {
    isAlertVisible: false,
    todos: [
      {id: 1, title: 'Download react-starter-es6', completed: true},
      {id: 2, title: 'Read the docs', completed: true},
      {id: 3, title: 'Make a component', completed: false},
      {id: 4, title: 'Combine components to make an app', completed: false},
      {id: 5, title: 'Build a social network empire', completed: false}
    ]
  }

  handleToggleAlert = (id, message) => {
    this.setState({isAlertVisible: !this.state.isAlertVisible})
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-8">
            <TodoList />
          </div>
          <div className="col-md-4">
            <Sidebar />
          </div>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<Main />, document.getElementById('app'))
