import React from 'react'
// import Checkbox from './Checkbox';
import { Link } from 'react-router-dom'
import { Draggable } from 'react-beautiful-dnd'
export function CardPreview({ onRemoveCard, card, index, getActivitiesByCardId, onOpenPreviewLabels, isLebelOpen 
}) {
    return (

        <Draggable
            draggableId={card.id}
            index={index}

        >
            {(provided, snapshot) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={snapshot.isDragging ? '' : 'card-preview'}>
                    <div className={snapshot.isDragging ? 'card-preview-drag' : 'drag-flex'}>

                        <div className="card-preview-labels" >{
                            card.labels.map((label) =>
                                <a className={`card-preview-label ${label.color}`}><span>{label.name}</span></a>
                            )}
                        </div>
                        <button className="card-preview-remove-btn" onClick={() => onRemoveCard(card)}></button>
                        <Link to={`/board/${card.id}`} >


                            <button className="card-preview-edit-icon" ></button>
                           
                            <div className="test-white-space">{card.title} </div>
                            
                            <div className="card-preview-attachments" >{
                                
                                card.attachments.map((attachment) => 
                                    <img className="card-preview-attachments-img" src={attachment} alt="" /> )}
                            </div>
                            <div className="card-preview-bottom">
                                {getActivitiesByCardId(card.id).length !== 0 &&
                                    <span className="card-preview-activities ">{getActivitiesByCardId(card.id).length}</span>}
                                {card.dueDate ? <span className="card-preview-date">
                                    <div className="card-preview-date-clock">
                                        {/* <Checkbox
                                            label={label}
                                            // handleCheckboxChange={this.toggleCheckbox}
                                            key={label}
                                        /> */}
                                    </div>
                                    {(new Date(card.dueDate)).toString().split(' ')[1]
                                        + ' ' +
                                        (new Date(card.dueDate)).getUTCDate()
                                    }</span> : <span></span>}
                                {card.description && <span className="icon-desription"></span>}
                               
                                <div className="card-preview-members">{
                                    card.members &&
                                    card.members.map((member) =>
                                        <div>{member.fullname.split(' ').map(name => name[0]).slice(0, 2)[0] + member.fullname.split(' ').map(name => name[0]).slice(0, 2)[1]}</div>
                                    //   { !member.imgUrl &&
                                    //     <div style={{ backgroundImage: `url(${member.imgUrl})` }}></div>}
                                    )}
                                </div>

                            </div>
                        </Link >

                    </div>
                    {provided.placeholder}
                </div>
            )}
        </Draggable>
    )
}
