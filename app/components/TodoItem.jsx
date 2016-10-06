import React from 'react'
import { TodoTag } from './TodoTag'

export const TodoItem = ({todo, idx, activeTags, toggleCompleted, deleteItem}) => {
  const todoTitle = todo.completed ? <del>{todo.title}</del> : todo.title
  const todoTags = []
  const todoTagProps = {}

  if (activeTags) {
    todo.tags.map((tag, i) => {
      const todoTagProps = {
        key: i,
        tag: tag
      }

      activeTags.indexOf(tag) > -1 && (todoTagProps.active = true)

      todoTags.push(<TodoTag {...todoTagProps} />)
    })
  } else {
    todo.tags.map((tag, i) => {
      todoTags.push(<TodoTag key={i} tag={tag} />)
    })
  }

  return (
    <div className={`list-group-item ${todo.completed ? 'list-group-item-warning' : ''}`}>
      <span className="label label-danger pull-right" role="button" onClick={() => deleteItem(idx)}>
        Delete
      </span>
      <div className="checkbox" style={{marginLeft: '8px'}}>
        <label style={{cursor: 'pointer'}}>
          <input type="checkbox" checked={todo.completed} onChange={() => toggleCompleted(idx)} style={{marginRight: '10px'}} />
          {todoTitle}
        </label>
      </div>
      <div>
        {todoTags}
      </div>
    </div>
  )
}
