import React, { Component } from 'react'
import { connect } from 'react-redux'
import { CardDetails } from '../cmps/CardDetails'
import { BoardHeader } from '../cmps/BoardHeader.jsx'
import { loadBoard, removeGroup, saveCard, removeCard, saveGroup, updateBoard, saveActivity, saveBoard } from '../store/action/board.action.js'
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

    onSaveBoard = (board) => {
        this.props.saveBoard(board)
    }

    onSaveGroup = (group) => {
        return this.props.saveGroup(group)
    }

    onRemoveGroup = (groupId) => {
        return this.props.removeGroup(groupId)
    }

    onSaveCard = (card, groupId) => {
        this.props.saveCard(card, groupId)
    }

    onRemoveCard = (card) => {
        return this.props.removeCard(card.id, card.currGroup.groupId)
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
        const cardActivities = this.props.board.activities.filter(activity => activity.card?.id === cardId)
        return cardActivities;
    }

    onSaveActivity = (data, action) => {
        this.props.saveActivity(data, action)
    }

    render() {
        const { board } = this.props
        if (!board) return <div>Loading...</div>
        // console.log(board);
        return (<>

            {(this.props.match.params.cardId) ? <CardDetails cardId={this.props.match.params.cardId} history={this.props.history} /> : <div></div>}
            <div className="board" style={{ backgroundImage: `url(${board.style.bgImg})` }}>
                <BoardHeader
                    board={board}
                    onSaveBoard={this.onSaveBoard}
                    onSetBackground={this.onSetBackground}
                />
                <div className="board-container">
                    <GroupList
                        board={board}
                        onSaveCard={this.onSaveCard}
                        onSaveGroup={this.onSaveGroup}
                        groups={board.groups}
                        onRemoveCard={this.onRemoveCard}
                        onRemoveGroup={this.onRemoveGroup}
                        isLebelOpen={this.state.isLebelOpen}
                        onSaveActivity={this.onSaveActivity}
                        onOpenPreviewLabels={this.onOpenPreviewLabels}
                        getActivitiesByCardId={this.getActivitiesByCardId}
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
    saveCard,
    saveBoard,
    loadBoard,
    saveGroup,
    removeCard,
    updateBoard,
    removeGroup,
    saveActivity
}



export const BoardApp = connect(mapStateToProps, mapDispatchToProps)(_BoardApp)
