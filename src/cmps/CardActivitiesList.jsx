import React, { Component } from 'react'
import Moment from 'react-moment'

import { MemberIcon } from './MemberIcon'

export class CardActivitiesList extends Component {

    render() {
        const { activities, card } = this.props
        if (!activities) return <></>
        return (
            <>
                {activities.map((activity, index) => {
                    if (!activity.card) return <></>
                    if (activity.card.id === card.id) {

                        return <div className="activity-list-card" key={index}>
                            <MemberIcon member={activity.byMember} />
                            {activity.txtCard && <span>{activity.txtCard}
                                <span> </span>
                                <Moment fromNow>{activity.createdAt}</Moment>
                            </span>}
                            {activity.commentTxt && <h5>{activity.commentTxt}
                                <span> </span>
                                <Moment fromNow>{activity.createdAt}</Moment>
                            </h5>}
                        </div>
                    }
                })}
            </>
        )
    }
}
