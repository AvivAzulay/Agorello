import React from 'react'
import { CardList } from './CardList'
import { CardAdd } from './CardAdd'
import { Draggable } from 'react-beautiful-dnd'
// import { Droppable } from 'react-beautiful-dnd'
// import { GroupTitleEdit } from './GroupTitleEdit'


export function GroupPreview({ onRemoveGroup, group, onRemoveCard, onSaveCard, index }) {
    // console.log('card list:', group.id);
    // console.log('card list:', group);
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
                        <h3 className="card-title">{group.title}</h3>
                        <button className="group-preview-header-btn"></button>
                        <button onClick={() => onRemoveGroup(group.id)} className="group-preview-header-btn"></button>
                    </div>

                    <div className="card-list-and-add ">
                        <CardList group={group} onRemoveCard={onRemoveCard} />
                        <CardAdd groupId={group.id} onSaveCard={onSaveCard} />
                    </div>
                </div>

            )}
        </Draggable>
        /* <Draggable
draggableId={group.id}
index={index}
>
{(provided, snapshot) => (
    <div
        className='group-preview'
        {...provided.dragHandleProps}
        div {...provided.draggableProps}
        ref={provided.innerRef}
    >
        <div className="group-preview-header">
            <h3 className="card-title">{group.title}</h3>
            <button className="group-preview-header-btn"></button>
            <button onClick={() => onRemoveGroup(group.id)} className="group-preview-header-btn"></button>
        </div>
        <div className="card-list-and-add ">
            <CardList group={group} onRemoveCard={onRemoveCard} />
            <CardAdd groupId={group.id} onSaveCard={onSaveCard} />
        </div>
    </div>

)}
</Draggable> */
    )
}


