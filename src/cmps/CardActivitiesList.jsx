import React, { Component } from 'react'

import Moment from 'react-moment'


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
                                <Moment fromNow>{activity.createdAt}</Moment>

                            </h5>}
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
