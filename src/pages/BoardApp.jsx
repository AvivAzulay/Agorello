import React, { Component } from 'react'
import { connect } from 'react-redux'
import { CardDetails } from '../cmps/CardDetails'
import { BoardHeader } from '../cmps/BoardHeader.jsx'
import { loadBoard, removeGroup, saveCard, removeCard, saveGroup } from '../store/action/board.action.js'
import { GroupList } from '../cmps/GroupList'
import { DragDropContext } from 'react-beautiful-dnd'


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

    onDragEnd = result => {
        const { destination, source, draggableId } = result
        console.log('draggableId', draggableId);
        if (!destination) return
        if (
            destination.draggableId === source.draggableId &&
            destination.index === source.index
        ) return

        const column = this.state.board.groups[source.draggableId]
        console.log(column);
        const newTaskIds = Array.from(column.cards)
        const card = newTaskIds.splice(source.index, 1)
        newTaskIds.splice(destination.index, 0, card)

        const newColumn = {
            ...column,
            taskIds: newTaskIds
        }

        const newState = {
            ...this.state,
            groups: {
                ...this.state.groups,
                [newColumn.id]: newColumn,
            }
        }

        this.setState(newState)

    }

    render() {
        if (!this.props.board) return <div>Loading...</div>


        return (<>

            {(this.props.match.params.cardId) ? <CardDetails cardId={this.props.match.params.cardId} history={this.props.history} /> : <div></div>}
            <div className="board">
                <BoardHeader
                    board={this.props.board}
                />
                <DragDropContext
                    onDragEnd={this.onDragEnd}
                >
                    <GroupList
                        groups={this.props.board.groups}
                        onSaveGroup={this.onSaveGroup}
                        onRemoveGroup={this.onRemoveGroup}
                        onSaveCard={this.onSaveCard}
                        onRemoveCard={this.onRemoveCard}
                    />
                </DragDropContext>
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
