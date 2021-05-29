import React, { Component } from 'react'
import { connect } from 'react-redux'
import { CardDetails } from '../cmps/CardDetails'
import { BoardHeader } from '../cmps/BoardHeader.jsx'
import { loadBoard, removeGroup, saveCard, removeCard, saveGroup } from '../store/action/board.action.js'
import { GroupList } from '../cmps/GroupList'


class _BoardApp extends Component {

    state = {
        currGroupIdx: null,
    }

    componentDidMount() {
        this.onLoadBoard()
    }

    componentDidUpdate() {
    }

    onLoadBoard = () => {
        this.props.loadBoard().then(board => this.setState({ board }))
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
        this.props.removeCard(card.id, card.currGroup.groupId)
    }

    onSetGroupIdx = (idx) => {
        this.setState(...this.state, { currGroupIdx: idx })
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
}



export const BoardApp = connect(mapStateToProps, mapDispatchToProps)(_BoardApp)
