import React, { Component } from 'react'
import { CardList } from './CardList'
import { CardAdd } from './CardAdd'
import { GroupTitleEdit } from './GroupTitleEdit'
import { removeGroup, saveGroup } from '../store/action/board.action.js'
import { connect } from 'react-redux'


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