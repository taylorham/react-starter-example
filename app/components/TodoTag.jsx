import React from 'react'

export const TodoTag = ({tag, active, tagFilter}) => {
  const extraProps = {style: {display: 'inline-block', marginRight: '5px'}}
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
