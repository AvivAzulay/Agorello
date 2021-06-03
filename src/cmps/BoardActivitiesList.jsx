import React from 'react'
import TimeAgo from 'react-timeago'
import Moment from 'react-moment'

export function BoardActivitiesList({ activities }) {
    if (!activities) return <></>
    console.log(activities)
    return (
        <div className="flex column">
            {activities.map(activity => {
                return <div key={activity.id}>
                    <h5>{activity.txtBoard}
                        <span> </span>
                        <Moment fromNow> {activity.createdAt}</Moment>
                    </h5>
                </div>
            })}
        </div>
    )
}
