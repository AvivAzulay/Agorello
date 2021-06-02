import React, { Component } from 'react'

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
                            <h5>{activity.txtCard} time ago</h5>
                        </div>
                    }
                })}
            </>
        )
    }
}
