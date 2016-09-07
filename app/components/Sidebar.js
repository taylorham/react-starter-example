import React from 'react'
import { TodoTag } from './TodoList'

export const Sidebar = ({todos, activeTags, tagFilter}) => {
  const allTags = new Set()

  todos.map(todo => todo.tags.map(tag => allTags.add(tag)))

  const availableTags = [...allTags]
  const tagsToRender = []

  availableTags.map((tag, i) => {
    let active = false
    activeTags.map(activeTag => tag === activeTag && (active = true))
    tagsToRender.push(<TodoTag key={i} tag={tag} active={active} tagFilter={tagFilter} />)
  })

  return (
    <div className="panel panel-default">
      <div className="panel-heading">
        <h3 className="panel-title">Tags to filter:</h3>
      </div>
      <div className="panel-body">
        {tagsToRender}
      </div>
    </div>
  )
}
