import React, { Component } from 'react'
import { CardCheckList } from './CardCheckList'

export class CardCheckListContainer extends Component {
    state = {
        checklist: null
    }

    componentDidMount() {
        this.setState({checklist: this.props.checklist})
    }

    render() {
        const { checklist, addActivity, onUpdateCardProps }   = this.props
        if (!checklist || !checklist.length) return <div>Loading...</div>
        return (
            <div className="checklists-container">
                {checklist.map(list => <CardCheckList key={list.id} checklist={checklist} list={list} addActivity={addActivity} onUpdateCardProps={onUpdateCardProps} />)}
            </div>
        )
    }
}

// export function CardCheckListContainer({ checklist, addActivity, onUpdateCardProps }) {