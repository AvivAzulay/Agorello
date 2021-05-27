import React from 'react'
import { CardList } from './CardList'
import { CardAdd } from './CardAdd'
import { GroupTitleEdit } from './GroupTitleEdit'
import { removeGroup, saveGroup } from '../store/action/board.action.js'
import { connect } from 'react-redux'

<<<<<<< HEAD

export class _GroupPreview extends Component {
    state = {
    }

    onRemoveGroup = () => {
        const { group } = this.props
        this.props.removeGroup(group.id)
    }

    render() {
        const { group, group: { title, cards } } = this.props
        return (
            <div className="group-preview" >
                <GroupTitleEdit title={title} group={group} saveGroup={this.props.saveGroup} />
                <button onClick={this.onRemoveGroup}>&times;</button>
                <CardList cards={cards} />
                <CardAdd groupId={group.id} />
            </div>
        )
    }
}


function mapStateToProps() {
    return {
    }
}
const mapDispatchToProps = {
    removeGroup,
    saveGroup
}

export const GroupPreview = connect(mapStateToProps, mapDispatchToProps)(_GroupPreview)
=======
export function GroupPreview({ onRemoveGroup, group, onRemoveCard, onSaveCard }) {
    return (
        <div className="group-preview" >
            <div className="group-preview-header">
                <h3 className="card-title">{group.title}</h3>
                <button className="group-preview-header-btn"></button>
                <button onClick={() => onRemoveGroup(group.id)} className="group-preview-header-btn"></button>
            </div>
            <div className="card-list-and-add ">
                <CardList cards={group.cards} onRemoveCard={onRemoveCard} />
                <CardAdd groupId={group.id} onSaveCard={onSaveCard} />
            </div>
        </div>
    )
}
>>>>>>> 771a6a035d9dfdf92ca91c372d732e4f28301e61
