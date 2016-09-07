import React from 'react'
import { TodoTag } from './TodoTag'

export const TagPanel = ({todos, activeTags, tagFilter}) => {
  const allTags = new Set()

  todos.map(todo => todo.tags.map(tag => allTags.add(tag)))

  const availableTags = [...allTags]
  const tagsToRender = []

  availableTags.map((tag, i) => {
    let active = false
    activeTags.indexOf(tag) > -1 && (active = true)
    tagsToRender.push(<TodoTag key={i} tag={tag} active={active} tagFilter={tagFilter} />)
  })

  let panelTitle = 'Tags to filter'
  if (activeTags.length) {
    panelTitle =
      <div>
        Filtering by tag{activeTags.length > 1 && 's'}: {activeTags.join(', ')}
        <button className="btn btn-xs btn-primary pull-right" style={{marginTop: '-2px'}} onClick={() => clearTagFilter()}>
          Clear Filter
        </button>
      </div>
  }

  return (
    <div className="panel panel-default">
      <div className="panel-heading">
        <h3 className="panel-title">
          {panelTitle}
        </h3>
      </div>
      <div className="panel-body">
        {tagsToRender}
      </div>
    </div>
  )
}
