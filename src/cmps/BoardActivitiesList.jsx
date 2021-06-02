import { DialogContent } from '@material-ui/core'
import React from 'react'

export function BoardActivitiesList({ activities }) {
    if (!activities) return <></>
    console.log(activities)
    return (
        <div className="flex column">
            {activities.map(activity => {
                return <div key={activity.id}>
                    <h5>{activity.txtBoard} time ago</h5>
                </div>
            })}
        </div>
    )
}
