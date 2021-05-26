import React, { Component } from 'react'

import { CardList } from './CardList'

export class GroupPreview extends Component {
    state = {
        group: null
    }

    componentDidMount() {
     
    }

    render() {
        const { group:{title, cards} } = this.props
        return (
            <article className="group-preview" >
                <p>{title}</p>
                <CardList cards={cards}/>
                {/* <AddCard /> */}
            </article>
        )
    }
}