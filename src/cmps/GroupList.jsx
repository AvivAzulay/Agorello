import { GroupPreview } from './GroupPreview.jsx'
import { GroupAdd } from './GroupAdd.jsx'
<<<<<<< HEAD
=======
import { Droppable } from 'react-beautiful-dnd'
>>>>>>> 771a6a035d9dfdf92ca91c372d732e4f28301e61

export function GroupList({ onRemoveGroup, groups, onSaveCard, onRemoveCard, onSaveGroup }) {
  return (
    <div className="group-list">
<<<<<<< HEAD
      { groups.map(group => <GroupPreview group={group} key={group.id} />)}
      <GroupAdd />
=======
      {groups.map(group => <GroupPreview group={group}
        key={group.id}
        onRemoveGroup={onRemoveGroup}
        onSaveCard={onSaveCard}
        onRemoveCard={onRemoveCard}
      />)}
      <GroupAdd onSaveGroup={onSaveGroup} />
>>>>>>> 771a6a035d9dfdf92ca91c372d732e4f28301e61
    </div>
  )
}