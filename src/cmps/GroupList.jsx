import { GroupPreview } from './GroupPreview.jsx'
import { GroupAdd } from './GroupAdd.jsx'

export function GroupList({ groups }) {
  return (
    <div className="group-list">
      { groups.map(group => <GroupPreview group={group} key={group.id} />)}
      <GroupAdd />
    </div>
  )
}