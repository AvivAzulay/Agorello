import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { removeCard } from '../store/action/board.action.js'


export class _CardPreview extends Component {
    state = {

    }

    componentDidMount() {

    }

    onRemoveCard = () => {
        const { card } = this.props
        this.props.removeCard(card.id, card.currGroup.groupId)
    }


    onOpenCardDetails = () => {
        // to later be switched to using history
        let url = window.location.href
        if (url.charAt(url.length - 1) !== '/') url += ''
        url += `${this.props.card.id}`
        window.location.assign(url)
        // onClick = { this.onOpenCardDetails }
    }

    render() {
        const { card } = this.props
        return (
            // <Link to={`/board?cardId=${card.id}`} >
            <Link to={`/board/${card.id}`} >
                <div className="card-preview" >
                    <p>{card.title}</p>
                    <button onClick={this.onRemoveCard}>&times;</button>
                    <p>{card.desription}</p>
                </div>
            </Link >
        )
    }
}

function mapStateToProps() {
    return {
    }
}
const mapDispatchToProps = {
    removeCard
}

export const CardPreview = connect(mapStateToProps, mapDispatchToProps)(_CardPreview)