import React from 'react'
import TimeAgo from 'react-timeago'
import {MemberIcon} from './MemberIcon'

export function BoardActivitiesList({ activities }) {
    if (!activities) return <></>
    console.log(activities)
    return (
        <div className="flex column">
            {activities.map(activity => {
                return <div key={activity.id}>
                  <MemberIcon member={activity.byMember
 }/>
                    <h5>{activity.txtBoard}
                        <span> </span>
                        <TimeAgo date={activity.createdAt} />
                    </h5>
                </div>
            })}
        </div>
    )
}
