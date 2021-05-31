import { GroupPreview } from './GroupPreview.jsx'
import { GroupAdd } from './GroupAdd.jsx'
import { Droppable } from 'react-beautiful-dnd'

export function GroupList({ board, onRemoveGroup, groups, onSaveCard, onRemoveCard, onSaveGroup, getActivitiesByCardId, onOpenPreviewLabels, isLebelOpen }) {
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
              onSaveGroup={onSaveGroup}
              onRemoveGroup={onRemoveGroup}
              onSaveCard={onSaveCard}
              onRemoveCard={onRemoveCard}
              group={group}
              index={index}
              getActivitiesByCardId={getActivitiesByCardId}
              onOpenPreviewLabels={onOpenPreviewLabels}
              isLebelOpen={isLebelOpen}
            />)}
            {provided.placeholder}
            <GroupAdd onSaveGroup={onSaveGroup} />
          </div>
        )}
      </Droppable>
    </div>
  )
}