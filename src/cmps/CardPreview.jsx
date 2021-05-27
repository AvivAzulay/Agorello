import React, { Component } from 'react'

export class CardPreview extends Component {
    state = {
        card: null
    }

    componentDidMount() {

    }

    render() {
        return (
            <div className="card-preview" >
                <div>{this.props.card.title}</div>
            </div>
        )
    }
}