import React, { Component } from 'react'
import { connect } from 'react-redux'
import { boardService } from '../services/board-service'

export class _CardEdit extends Component {
    state = {
        card: null
    }

    componentDidMount() {
        const id = this.props.match.params.cardId
        console.log(id)
        if (!id) return
        boardService.getCardById(id).then(card => { // TO replace 'then'
            this.setState({ card })
        })
    }

    render() {
        return (
            <div className="card-preview" >
                <h1>EDIT</h1>
                {/* <p>{this.props.card.id}</p> */}
            </div>
        )
    }
}

function mapStateToProps() {
    return {
    }
}
const mapDispatchToProps = {

}

export const CardEdit = connect(mapStateToProps, mapDispatchToProps)(_CardEdit)