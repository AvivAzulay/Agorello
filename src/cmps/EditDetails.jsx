
export function EditDetails() {
  return (
    <div className="edit">
    <div className="edit-details-header">
        <p className="edit-details-header-logo"></p>
        <textarea className="edit-details-textarea-header" type="text" value='Action Title' />
        <button className="close-save-edit"></button>
      </div>
    <div className="edit-body">
    <div className="edit-details">
      
      <span className="list-pages">In list pages</span>
      <div className="edit-details-description">

        <div className="edit-details-description-header">
          <p className="edit-details-description-logo"></p>
          <h1>Description</h1>
        </div>
        <textarea className="adit-details-description-textarea" type="text" value='Add a more detailed description...' />
      </div>

      <div>
        <div className="edit-details-activity-header">
          <span>
            <p className="edit-details-activity-logo"></p>
            <h1>Activity</h1>
          </span>
          <button>Show details</button>
        </div>
        <div className="edit-activity-description">
          <div className='user-img-chat-add'>G</div>
          <textarea className="edit-activity-description-textarea" type="text" value='Add a more detailed description...' />
        </div>
      </div>

    </div >
    <div className="edit-add-to-card">
      <h1> ADD TO CARD </h1>
      <button className="edit-add-to-card-members"> Members</button>
      <button className="edit-add-to-card-labels"> Labels</button>
      <button className="edit-add-to-card-checklist"> Checklist</button>
      <button className="edit-add-to-card-dates"> Dates</button>
      <button className="edit-add-to-card-attachment"> Attachment</button>
      <button className="edit-add-to-card-cover"> Cover</button>
    </div>
    </div>
    </div>
  )
}