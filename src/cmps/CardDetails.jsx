import React, { Component } from 'react'
import { connect } from 'react-redux'
import { boardService } from '../services/board-service'
import { GroupTitleEdit } from './GroupTitleEdit'
import { CardDescription } from './CardDescription'
import { saveCard } from '../store/action/board.action'

export class _CarDetails extends Component {
    state = {
        card: null
    }

    componentDidMount() {
        const id = this.props.cardId
        const card = boardService.getCardById(id)
        this.setState({ card })
    }

    onUpdateCardProps = (key, value) => {
        const { card } = this.state
        card[key] = value
        this.onSaveCard()
    }

    onSaveCard = () => {
        const { card } = this.state
        this.props.saveCard(card, card.currGroup.groupId)
    }

    render() {
        const { card } = this.state
        if (!card) return <h1>Loading...</h1>
        return (
            <div className="card-details" >
                <GroupTitleEdit title={card.title} group={card} />
                <CardDescription description={card.description} onUpdateCardProps={this.onUpdateCardProps} onSaveCard={this.onSaveCard} />
            </div>
        )
    }
}

function mapStateToProps() {
    return {
    }
}
const mapDispatchToProps = {
    saveCard
}

export const CardDetails = connect(mapStateToProps, mapDispatchToProps)(_CarDetails)