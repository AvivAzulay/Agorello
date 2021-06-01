import React, { Component } from 'react'

export class CardActivitiesList extends Component {

    render() {
        const { activities, card } = this.props
        return (
            <div>
                {activities.map((activity, index) => {
                    if (activity.card.id === card.id) {
                        return <div key={index}>
                            <h5>{activity.txtCard} time ago</h5>
                        </div>
                    }
                })}
            </div>
        )
    }
}
