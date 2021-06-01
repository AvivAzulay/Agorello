import React, { Component } from 'react'
import { CardCheckList } from './CardCheckList'

export class CardCheckListContainer extends Component {
    state = {
        checklist: null
    }

    componentDidMount() {
        this.setState({ checklist: this.props.checklist })
    }

    render() {
        const { saveActivity, onUpdateCardProps, card } = this.props
        if (!card.checklist || !card.checklist.length) return <></>
        return (
            <div className="checklists-container">
                {card.checklist.map(list => <CardCheckList
                    card={card}
                    list={list}
                    key={list.id}
                    // checklist={checklist}
                    saveActivity={saveActivity}
                    onUpdateCardProps={onUpdateCardProps}
                />)}
            </div>
        )
    }
}

// export function CardCheckListContainer({ checklist, addActivity, onUpdateCardProps }) {