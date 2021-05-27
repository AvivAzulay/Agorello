import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { removeCard } from '../store/action/board.action.js'

import { Route } from 'react-router-dom'
import { CardEdit } from '../cmps/CardEdit'

export class _CardPreview extends Component {
    state = {
      
    }

    componentDidMount() {

    }

    onRemoveCard = () => {
        const { card } = this.props
        this.props.removeCard(card.id, card.currGroup.groupId)
    }

    render() {
        const { card } = this.props
        return (
            <div>
            <NavLink className="card-edit" to={`/board/${card.id}/`}>
            <div className="card-preview">
                <p>{card.title}</p>
                <button onClick={this.onRemoveCard}>&times;</button>
            </div>
            </NavLink>
            <Route component={CardEdit} path="/board/:CardId" />
            </div>
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