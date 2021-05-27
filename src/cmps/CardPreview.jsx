<<<<<<< HEAD
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
=======
import React from 'react'
import { Link } from 'react-router-dom'

export function CardPreview({ onRemoveCard, card }) {
    return (
        <div className="card-preview" >
            <Link to={`/board/${card.id}`} >
                <div className="test-white-space">{card.title}</div>
            </Link >
            <button className="card-preview-remove-btn" onClick={() => onRemoveCard(card)}></button>
            <p>{card.desription}</p>
        </div>
    )
>>>>>>> 771a6a035d9dfdf92ca91c372d732e4f28301e61
}
