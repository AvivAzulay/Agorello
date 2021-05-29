import React from 'react'
import { Link } from 'react-router-dom'
import { Draggable } from 'react-beautiful-dnd'
export function CardPreview({ onRemoveCard, card, index }) {
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
                    className={snapshot.isDragging ? '' : 'card-preview'}
                >
                    <div className={snapshot.isDragging ? 'card-preview-drag' : 'flex'}>
                        <Link to={`/board/${card.id}`} >
                            <div className="test-white-space">{card.title}</div>
                        </Link >
                        <button className="card-preview-remove-btn" onClick={() => onRemoveCard(card)}></button>
                        <p>{card.desription}</p>
                    </div>
                    {provided.placeholder}
                </div>
            )}
        </Draggable>
    )
}
