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
                            {activity.txtCard && <>
                                <span className="activity-list-name">{activity.byMember.fullname}</span>
                                <span className="activity-list-txt">{activity.txtCard}</span>
                                <span className="activity-list-time"><Moment fromNow>{activity.createdAt}</Moment></span>
                            </>
                            }
                            {activity.attachment && <>
                                <span className="activity-list-name">{activity.byMember.fullname}</span>
                                <a href={activity.attachment} className="activity-list-txt">attachment</a>
                                <span className="activity-list-time"><Moment fromNow>{activity.createdAt}</Moment></span>
                            </>
                            }
                            {activity.commentTxt && <>
                                <span className="activity-list-name">{activity.byMember.fullname}</span>
                                <span className="activity-list-time"><Moment fromNow>{activity.createdAt}</Moment></span>
                                <span className="activity-list-txt">{activity.commentTxt} </span>
                            </>}
                        </div>
                    }
                })}
            </>
        )
    }
}
