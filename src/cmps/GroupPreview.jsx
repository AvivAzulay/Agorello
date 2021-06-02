import React from 'react'
import { CardList } from './CardList'
import { CardAdd } from './CardAdd'
import { Draggable } from 'react-beautiful-dnd'
import { GroupTitleEdit } from './GroupTitleEdit'


export function GroupPreview({ onSaveGroup, onRemoveGroup, group, onRemoveCard, onSaveCard, index, getActivitiesByCardId, onOpenPreviewLabels, isLebelOpen, board, onSaveActivity }) {


    function removeGroup(groupId) {
        onRemoveGroup(groupId)
        onSaveActivity(group, 'REMOVE_GROUP')
    }


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
                        <button onClick={() => removeGroup(group.id)} className="group-preview-header-btn"></button>
                    </div>

                    <div className="card-list-and-add">
                        <CardList
                            group={group}
                            board={board}
                            isLebelOpen={isLebelOpen}
                            onRemoveCard={onRemoveCard}
                            onOpenPreviewLabels={onOpenPreviewLabels}
                            getActivitiesByCardId={getActivitiesByCardId} />
                        <CardAdd
                            group={group}
                            onSaveCard={onSaveCard}
                            onSaveActivity={onSaveActivity} />
                    </div>
                </div>

            )}
        </Draggable>

    )
}


