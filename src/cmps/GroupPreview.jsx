import React, { Component } from 'react'
import { CardList } from './CardList'
import { CardAdd } from './CardAdd'


export class GroupPreview extends Component {
    state = {
    }

    componentDidMount() {

    }

    render() {
        const { group, group: { title, cards } } = this.props
        return (
           

        
           <div className="group-preview" >
                <div className="group-preview-header">
                <h3  className="card-title">{title}</h3>
                <button className="group-preview-header-btn"></button>
                </div>
                <div className="card-list-and-add ">
                <CardList cards={cards} />
                <CardAdd groupId={group.id} />
                </div>
            </div>
        )
    }
}