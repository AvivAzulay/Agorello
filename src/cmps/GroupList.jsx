import { GroupPreview } from './GroupPreview.jsx'
import { GroupAdd } from './GroupAdd.jsx'
import { Droppable } from 'react-beautiful-dnd'

export function GroupList({ board, onRemoveGroup, groups, onSaveCard, onRemoveCard, onSaveGroup, getActivitiesByCardId, onOpenPreviewLabels, isLebelOpen, onSaveActivity }) {
  return (
    <div className="group-list-container">
      <Droppable
        droppableId={board._id}
        direction="horizontal"
        type="group">
        {provided => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="group-list">
            {groups.map((group, index) => <GroupPreview
              key={group.id}
              group={group}
              index={index}
              board={board}
              onSaveCard={onSaveCard}
              isLebelOpen={isLebelOpen}
              onSaveGroup={onSaveGroup}
              onRemoveCard={onRemoveCard}
              onRemoveGroup={onRemoveGroup}
              onOpenPreviewLabels={onOpenPreviewLabels}
              getActivitiesByCardId={getActivitiesByCardId}
              onSaveActivity={onSaveActivity}
            />)}
            {provided.placeholder}
            <GroupAdd onSaveGroup={onSaveGroup} />
          </div>
        )}
      </Droppable>
    </div>
  )
}