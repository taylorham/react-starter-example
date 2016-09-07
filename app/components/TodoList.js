import React from 'react'
import { AddItemPanel } from './AddItemPanel'
import { TagPanel } from './TagPanel'
import { TodoItem } from './TodoItem'

export const TodoList = ({todos, activeTags, tagFilter, clearTagFilter, toggleCompleted, addItem, deleteItem}) => {
  const todoItemsToRender = []
  const todoItemProps = {
    toggleCompleted: toggleCompleted,
    deleteItem: deleteItem
  }

  if (!activeTags.length) {
    todos.map((todo, i) => {
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
    todos.map((todo, i) => {
      todo.tags.map(tag => {
        if (activeTags.indexOf(tag) !== -1) {
          todoItemsToRender.push(
            <TodoItem
              key={i}
              todo={todo}
              idx={i}
              activeTags={activeTags}
              {...todoItemProps}
            />
          )
        }
      })
    })
  }

  return (
    <div className="panel panel-default">
      <div className="panel-heading">
        <h3 className="panel-title">
          TodoList
        </h3>
      </div>
      <div className="panel-body">
        <div className="panel panel-default">
          <AddItemPanel addItem={addItem} />
        </div>
        <div className="list-group">
          <TagPanel todos={todos} activeTags={activeTags} tagFilter={tagFilter} clearTagFilter={clearTagFilter} />
          {todoItemsToRender}
        </div>
      </div>
    </div>
  )
}
