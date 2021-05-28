import React, { Component } from 'react'
import { connect } from 'react-redux'
import { CardDetails } from '../cmps/CardDetails'
import { BoardHeader } from '../cmps/BoardHeader.jsx'
import { loadBoard, removeGroup, saveCard, removeCard, saveGroup } from '../store/action/board.action.js'
import { GroupList } from '../cmps/GroupList'


class _BoardApp extends Component {

    state = {

    }

    componentDidMount() {
        this.onLoadBoard()
    }

    onLoadBoard = () => {
        this.props.loadBoard()
    }

    onSaveGroup = (group) => {
        this.props.saveGroup(group)
    }

    onRemoveGroup = (group) => {
        this.props.removeGroup(group.id)
    }

    onSaveCard = (card, groupId) => {
        this.props.saveCard(card, groupId)
    }

    onRemoveCard = (card) => {
        this.props.removeCard(card.id, card.currGroup.groupId)
    }

    render() {
        if (!this.props.board) return <div>Loading...</div>
        return (<>
            {(this.props.match.params.cardId) ? <CardDetails cardId={this.props.match.params.cardId} history={this.props.history} /> : <div></div>}
            <div className="board">
                <BoardHeader
                    board={this.props.board}
                />
                <GroupList
                    groups={this.props.board.groups}
                    onSaveGroup={this.onSaveGroup}
                    onRemoveGroup={this.onRemoveGroup}
                    onSaveCard={this.onSaveCard}
                    onRemoveCard={this.onRemoveCard}
                />
            </div>
        </>
        )
    }
}



function mapStateToProps(state) {
    return {
        board: state.boardModule.board,
    }
}
const mapDispatchToProps = {
    loadBoard,
    saveGroup,
    removeGroup,
    saveCard,
    removeCard,

}



export const BoardApp = connect(mapStateToProps, mapDispatchToProps)(_BoardApp)
