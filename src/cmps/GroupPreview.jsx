import React from 'react'
import { CardList } from './CardList'
import { CardAdd } from './CardAdd'
import { GroupTitleEdit } from './GroupTitleEdit'
import { removeGroup, saveGroup } from '../store/action/board.action.js'
import { connect } from 'react-redux'


<<<<<<< HEAD
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
=======
export function GroupPreview({ onRemoveGroup, group, onRemoveCard, onSaveCard, groupIdx }) {
    return (
        <div className="group-preview" >
            <div className="group-preview-header">
                <h3 className="card-title">{group.title}</h3>
>>>>>>> 8f20375f6bccd0d3ec142b133bbf66603e03c78a
                <button className="group-preview-header-btn"></button>
                <button onClick={() => onRemoveGroup(group.id)} className="group-preview-header-btn"></button>
            </div>
            <div className="card-list-and-add ">
                <CardList cards={group.cards} onRemoveCard={onRemoveCard} groupIdx={groupIdx} />
                <CardAdd groupId={group.id} onSaveCard={onSaveCard} />
            </div>
        </div>
    )
}
