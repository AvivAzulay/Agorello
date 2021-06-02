import React, { Component } from 'react'
import TimeAgo from 'react-timeago'


export class CardActivitiesList extends Component {

    render() {
        const { activities, card } = this.props
        if (!activities) return <></>
        return (
            <>
                {activities.map((activity, index) => {
                    if (!activity.card) return <></>
                    if (activity.card.id === card.id) {
                        return <div key={index}>
                            {activity.txtCard && <h5>{activity.txtCard}
                                <span> </span>
                                <TimeAgo date={activity.createdAt} />
                            </h5>}
                            {activity.commentTxt && <h5>{activity.commentTxt}
                                <span> </span>
                                <TimeAgo date={activity.createdAt} />
                            </h5>}
                        </div>
                    }
                })}
            </>
        )
    }
}
