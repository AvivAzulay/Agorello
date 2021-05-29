import { GroupPreview } from './GroupPreview.jsx'
import { GroupAdd } from './GroupAdd.jsx'
import { Droppable } from 'react-beautiful-dnd'

export function GroupList({ onRemoveGroup, groups, onSaveCard, onRemoveCard, onSaveGroup }) {
  return (
    <div className="group-list-container">
      {/* <> */}
      <Droppable droppableId="changeToBoardId" direction="horizontal" type="group">
        {provided => (
          <div {...provided.droppableProps}
            ref={provided.innerRef}
            className="group-list">
            {groups.map((group) => <GroupPreview group={group}
              key={group.id}
              onRemoveGroup={onRemoveGroup}
              onSaveCard={onSaveCard}
              onRemoveCard={onRemoveCard}
              group={group}
            />)}
      <GroupAdd onSaveGroup={onSaveGroup} />
          </div>
        )}
      </Droppable>
      {/* </> */}
    </div>

  )
}