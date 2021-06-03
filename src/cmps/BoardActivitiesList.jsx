import React from 'react'
import Moment from 'react-moment'
import { MemberIcon } from './MemberIcon'

export function BoardActivitiesList({ activities }) {
    if (!activities) return <></>
    console.log(activities)
    return (
        <span className="activity-list">
            {activities.map(activity => {
                return <div className="activity-list-container" key={activity.id}>
                   <div  className="activity-list-container-icon-txt" >
                   <MemberIcon member={activity.byMember} />
                    <div><h5>{activity.txtBoard} <Moment fromNow>{activity.createdAt}</Moment></h5></div>
                   </div>
                </div>
            })}
        </span>
    )
}
