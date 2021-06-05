import React from 'react'
// import Checkbox from './Checkbox';
import { Link } from 'react-router-dom'
import { Draggable } from 'react-beautiful-dnd'
import { MemberIcon } from './MemberIcon'

export function CardPreview({ onRemoveCard, card, index, onSaveCard, getActivitiesByCardId, onOpenPreviewLabels, isLebelOpen, board, toggleDueDate }) {


    function toggleDueDate(ev) {
        ev.stopPropagation()
        card.dueDate.isCompleted = !card.dueDate.isCompleted
        onSaveCard(card, card.currGroup.groupId)
    }

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
                        {card.cover&&<div className="card-preview-cover" style={{ backgroundImage: `url(${card.cover})` }}></div>}
                       <div  className="card-preview-body">
                        <div className="card-preview-labels" onClick={onOpenPreviewLabels}>{
                            card?.labels?.map((label, index) =>
                                <div className={`card-preview-label ${label.color}`} key={index}>
                                    {isLebelOpen && <span>{label.name}</span>}
                                </div>
                            )}
                        </div>
                        <button className="card-preview-remove-btn" onClick={() => onRemoveCard(card)}></button>
                        <Link to={`/board/${board._id}/${card.id}`} >
                            <button className="card-preview-edit-icon" ></button>

                            <div className="test-white-space">{card.title} </div>

                            <div className="card-preview-attachments" >{

                                card?.attachments?.map((attachment, index) =>
                                    <img className="card-preview-attachments-img" src={attachment} alt="" key={index} />)}
                            </div>

                            <div className="card-preview-bottom">
                            <div className="card-preview-bottom-list">
                                {getActivitiesByCardId(card.id).length !== 0 &&
                                    <span className="card-preview-activities ">{getActivitiesByCardId(card.id).length}</span>}
                                {card?.dueDate?.time ? <span onClick={(event) => toggleDueDate(event)} className={card.dueDate.isCompleted ? "card-preview-date checked" : "card-preview-date not-checked"}>
                                    <div className="card-preview-date-clock"></div>
                                    {(new Date(card.dueDate.time)).toString().split(' ')[1]
                                        + ' ' +
                                        (new Date(card.dueDate.time)).getUTCDate()
                                    }</span> : <span></span>}
                                {card.description && <span className="icon-desription"></span>}
                                    </div>
                                    
                                <div className="card-preview-members">{
                                    card.members &&
                                    card.members.map((member, index) =>
                                        // <div key={index}>{member.fullname.split(' ').map(name => name[0]).slice(0, 2)[0] + member.fullname.split(' ').map(name => name[0]).slice(0, 2)[1]}</div>
                                        <MemberIcon member={member} key={index} />
                                    )}
                                </div>

                            </div>
                        </Link >

                    </div>
                    {provided.placeholder}
                    </div>
                </div>
            )}
        </Draggable>
    )
}
