import { GroupPreview } from './GroupPreview.jsx'

export function GroupList({ groups }) {
  return (
    <div className="group-list">
      { groups.map(group => <GroupPreview group={group} key={group.id} />)}
    </div>
  )
}