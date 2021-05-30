import React from 'react'
import { CardList } from './CardList'
import { CardAdd } from './CardAdd'
import { Draggable } from 'react-beautiful-dnd'
import { GroupTitleEdit } from './GroupTitleEdit'


export function GroupPreview({ onSaveGroup, onRemoveGroup, group, onRemoveCard, onSaveCard, index }) {
    return (
        <Draggable
            draggableId={group.id}
            index={index}
        >
            {(provided) => (
                <div
                    className='group-preview'
                    {...provided.dragHandleProps}
                    {...provided.draggableProps}
                    ref={provided.innerRef}

                >
                    <div className="group-preview-header">
                        <GroupTitleEdit group={group} onSaveGroup={onSaveGroup} value="group" />
                        <button onClick={() => onRemoveGroup(group.id)} className="group-preview-header-btn"></button>
                    </div>

                    <div className="card-list-and-add">
                        <CardList group={group} onRemoveCard={onRemoveCard} />
                        <CardAdd groupId={group.id} onSaveCard={onSaveCard} />
                    </div>
                </div>

            )}
        </Draggable>

    )
}


