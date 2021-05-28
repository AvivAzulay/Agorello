import React from 'react'
import { Link } from 'react-router-dom'

export function CardPreview({ onRemoveCard, card }) {
    return (
        <div className="card-preview" >
            <Link to={`/board/${card.id}`} >
                <div className="test-white-space">{card.title}</div>
            </Link >
            <button className="card-preview-remove-btn" onClick={() => onRemoveCard(card)}></button>
            <p>{card.desription}</p>
        </div>
    )
}
