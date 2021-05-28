import { GroupPreview } from './GroupPreview.jsx'
import { GroupAdd } from './GroupAdd.jsx'

export function GroupList({ onRemoveGroup, groups, onSaveCard, onRemoveCard, onSaveGroup }) {
  return (
    <div className="group-list">
      {groups.map((group, idx) => <GroupPreview group={group}
        key={group.id}
        onRemoveGroup={onRemoveGroup}
        onSaveCard={onSaveCard}
        onRemoveCard={onRemoveCard}
        groupIdx={idx}
      />)}
      <GroupAdd onSaveGroup={onSaveGroup} />
    </div>
  )
}