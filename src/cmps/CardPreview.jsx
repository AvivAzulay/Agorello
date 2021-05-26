import React, { Component } from 'react'

export class CardPreview extends Component {
    state = {
        card: null
    }

    componentDidMount() {
     
    }

    render() {
        return (
            <article className="card-preview" >
                <p>{this.props.card.title}</p>
            </article>
        )
    }
}