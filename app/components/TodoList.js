import React from 'react'

export const TodoList = ({todos, activeTags, toggleCompleted, addItem, deleteItem}) => {
  const todoItemsToIterate = []
  const todoItemProps = {
    toggleCompleted: toggleCompleted,
    deleteItem: deleteItem
  }

  if (!activeTags.length) {
    todos.map((todo, i) => {
      todoItemsToIterate.push(
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
          todoItemsToIterate.push(
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
          {activeTags.length ? <h4>Filter by tag: {activeTags.join(', ')}</h4> : ''}
          {todoItemsToIterate}
        </div>
      </div>
    </div>
  )
}

const AddItemPanel = ({addItem}) => {
  return (
    <div className="panel-body">
      <div className="form-horizontal">
        <div className="form-group">
          <label htmlFor="addItemField" className="col-xs-2">Title</label>
          <div className="col-xs-10">
            <input id="addItemField" type="text" className="form-control" />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="addTagsField" className="col-xs-2">Tags</label>
          <div className="col-xs-10">
            <input id="addTagsField" type="text" className="form-control" />
            <p className="help-block small">Tags should be separated with a comma and a space</p>
          </div>
        </div>
      </div>
      <button type="button" className="btn btn-success pull-right" onClick={() => addItem('addItemField', 'addTagsField')}>Add Item</button>
    </div>
  )
}

const TodoItem = ({todo, idx, activeTags, toggleCompleted, deleteItem}) => {
  const todoTitle = todo.completed ? <del>{todo.title}</del> : todo.title
  const todoTags = []

  if (activeTags) {
    todo.tags.map((tag, i) => {
      activeTags.map(active => {
        if (active === tag) {
          todoTags.push(<TodoTag key={i} tag={tag} active />)
        } else {
          todoTags.push(<TodoTag key={i} tag={tag} />)
        }
      })
    })
  } else {
    todo.tags.map((tag, i) => {
      todoTags.push(<TodoTag key={i} tag={tag} />)
    })
  }

  return (
    <div className={`list-group-item ${todo.completed ? 'list-group-item-warning' : ''}`}>
      <span className="label label-danger pull-right" role="button" title="Delete this item" onClick={() => deleteItem(idx)}>
        X
      </span>
      <div className="checkbox" style={{marginLeft: '8px'}}>
        <label onClick={(e) => toggleCompleted(idx, e)} style={{cursor: 'pointer'}}>
          <input type="checkbox" value={todo.completed} style={{marginRight: '10px'}} />
          {todoTitle}
        </label>
      </div>
      <div>
        {todoTags}
      </div>
    </div>
  )
}

export const TodoTag = ({tag, active, tagFilter}) => {
  const extraProps = {style: {display: 'inline-block', marginRight: '8px'}}
  if (tagFilter) {
    extraProps.onClick = () => tagFilter(tag)
    extraProps.style.cursor = 'pointer'
  }

  return (
    <div className={`label ${active ? 'label-primary' : 'label-default'}`} {...extraProps}>
      {tag}
    </div>
  )
}
