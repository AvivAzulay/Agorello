import React, { Component } from 'react'
import { connect } from 'react-redux'
import { CardDetails } from '../cmps/CardDetails'
import { BoardHeader } from '../cmps/BoardHeader.jsx'
import { loadBoard, removeGroup, saveCard, removeCard, saveGroup, updateBoard, saveActivity } from '../store/action/board.action.js'
import { GroupList } from '../cmps/GroupList'
import { utilService } from '../services/util-service'


class _BoardApp extends Component {

    state = {
        currGroupIdx: null,
        isLebelOpen: false
    }

    componentDidMount() {
        this.onLoadBoard()
    }

    componentDidUpdate() {
    }

    onLoadBoard = () => {
        this.props.loadBoard(this.props.match.params.boardId)
    }

    onSaveGroup = (group) => {
        this.props.saveGroup(group)
    }

    onRemoveGroup = (groupId) => {
        this.props.removeGroup(groupId)
    }

    onSaveCard = (card, groupId) => {
        this.props.saveCard(card, groupId)
    }

    onRemoveCard = (card) => {
        // ev.stopPropogetion()
        this.props.removeCard(card.id, card.currGroup.groupId)
    }

    onSetGroupIdx = (idx) => {
        this.setState(...this.state, { currGroupIdx: idx })
    }

    onOpenPreviewLabels = () => {
        this.setState({ isLebelOpen: !this.state.isLebelOpen })
    }

    onSetBackground = (background) => {
        const newBoard = { ...this.props.board, style: { ...this.props.board.style, bgImg: background } }
        this.props.updateBoard(newBoard)
    }

    getActivitiesByCardId = (cardId) => {
        const cardActivities = this.props.board.activities.filter(activity => activity.card.id === cardId)
        return cardActivities;
    }

    onSaveActivity = (value, txtActivity, type) => {
        console.log('saving activity')
        this.props.saveActivity(value, txtActivity, type)
    }

    render() {
        if (!this.props.board) return <div>Loading...</div>
        return (<>

            {(this.props.match.params.cardId) ? <CardDetails cardId={this.props.match.params.cardId} history={this.props.history} /> : <div></div>}
            <div className="board" style={{ backgroundImage: `url(${this.props.board.style.bgImg})` }}>
                <BoardHeader
                    board={this.props.board} onSetBackground={this.onSetBackground}
                />
                <div className="board-container">
                    <GroupList
                        groups={this.props.board.groups}
                        onSaveGroup={this.onSaveGroup}
                        onRemoveGroup={this.onRemoveGroup}
                        onSaveCard={this.onSaveCard}
                        onRemoveCard={this.onRemoveCard}
                        board={this.props.board}
                        getActivitiesByCardId={this.getActivitiesByCardId}
                        onOpenPreviewLabels={this.onOpenPreviewLabels}
                        isLebelOpen={this.state.isLebelOpen}
                        onSaveActivity={this.onSaveActivity}
                    />
                </div>
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
    updateBoard,
    saveActivity
}



export const BoardApp = connect(mapStateToProps, mapDispatchToProps)(_BoardApp)
