import React from 'react'
import { CardList } from './CardList'
import { CardAdd } from './CardAdd'
import { GroupTitleEdit } from './GroupTitleEdit'
import { Droppable } from 'react-beautiful-dnd'
import { CardPreview } from './CardPreview.jsx'



export function GroupPreview({ onRemoveGroup, group, onRemoveCard, onSaveCard, groupIdx }) {
    return (
        <div className="group-preview" >
            <div className="group-preview-header">
                <h3 className="card-title">{group.title}</h3>
                <button className="group-preview-header-btn"></button>
                <button onClick={() => onRemoveGroup(group.id)} className="group-preview-header-btn"></button>
            </div>
            <div className="card-list-and-add ">
                <CardList cards={group.cards} group={group} onRemoveCard={onRemoveCard} />
                <CardAdd groupId={group.id} onSaveCard={onSaveCard} />
            </div>
        </div>
    )
}
