import React from 'react'

export const AddItemPanel = ({addItem}) => {
  return (
    <div className="panel panel-default">
      <div className="panel-heading">
        <h3 className="panel-title">Add Todo Item</h3>
      </div>
      <div className="panel-body">
        <form className="form-horizontal">
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
          <submit type="button" className="btn btn-success pull-right" onClick={() => addItem('addItemField', 'addTagsField')}>Add Item</submit>
        </form>
      </div>
    </div>
  )
}
