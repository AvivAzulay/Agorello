import { GroupPreview } from './GroupPreview.jsx'
import { GroupAdd } from './GroupAdd.jsx'
import { Droppable } from 'react-beautiful-dnd'

export function GroupList({ onRemoveGroup, groups, onSaveCard, onRemoveCard, onSaveGroup }) {
  let idx = 0
  idx++
  return (
    <div className="group-list-container">
      <Droppable
        droppableId={idx.toString()}
        direction="horizontal"
        type="group">
        {provided => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="group-list">
            {groups.map((group, index) => <GroupPreview
              key={group.id}
              onRemoveGroup={onRemoveGroup}
              onSaveCard={onSaveCard}
              onRemoveCard={onRemoveCard}
              group={group}
              index={index}
            />)}
            <GroupAdd onSaveGroup={onSaveGroup} />
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  )
}