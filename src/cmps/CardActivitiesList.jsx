import React, { Component } from 'react'

export class CardActivitiesList extends Component {

    componentDidMount() {
        console.log(this.props.activities)
        console.log(this.props.card)
    }

    render() {
        const { activities, card } = this.props
        console.log('card', card.id);
        activities.map(activity => console.log(activity.card.id))
        return (
            <div>
                {activities.map(activity => {
                    if (activity.card.id === card.id) {
                        return <div>
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
