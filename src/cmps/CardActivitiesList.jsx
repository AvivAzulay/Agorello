import React, { Component } from 'react'

export class CardActivitiesList extends Component {

    render() {
        const { activities, card } = this.props
        console.log(activities);
        activities.map(activity => console.log(activity.card.id === card.id))
        console.log('cardId:  ', card.id);
        return (
            <div>
                {activities.map((activity, index) => {
                    if (activity.card.id === card.id) {
                        return <div key={index}>
                            <h1>{activity.byMember.fullname}</h1>
                            <h1>{activity.txt}</h1>
                            <p>time ago</p>
                        </div>
                    }
                })}
            </div>
        )
    }
}
