import React, { Component } from 'react'
import { connect } from 'react-redux'
import { CardDetails } from '../cmps/CardDetails'
import { BoardHeader } from '../cmps/BoardHeader.jsx'
import { loadBoard, removeGroup, saveCard, removeCard, saveGroup, updatePosition, updateBoard } from '../store/action/board.action.js'
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

    onRemoveGroup = (group) => {
        this.props.removeGroup(group.id)
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

    // onDragEnd = result => {
    //     const { destination, source, draggableId } = result
    //     console.log('draggableId', draggableId);
    //     if (!destination) return
    //     if (
    //         destination.draggableId === source.draggableId &&
    //         destination.index === source.index
    //     ) return

    //     const column = this.state.board.groups[source.draggableId]
    //     console.log(column);
    //     const newTaskIds = Array.from(column.cards)
    //     const card = newTaskIds.splice(source.index, 1)
    //     newTaskIds.splice(destination.index, 0, card)

    //     const newColumn = {
    //         ...column,
    //         taskIds: newTaskIds
    //     }

    //     const newState = {
    //         ...this.state,
    //         groups: {
    //             ...this.state.groups,
    //             [newColumn.id]: newColumn,
    //         }
    //     }

    //     this.setState(newState)

    // }

    onDragEnd = (result) => {
        const { destination, source, draggableId, type } = result
        console.log(type);

        if (!destination) return
        if (destination.droppableId === source.droppableId && destination.index === source.index) return
        if (!draggableId) return
        if (type === 'card') {
            console.log('here');
            const startGroupIndex = this.props.board.groups.findIndex(group => group.id === source.droppableId)
            const endGroupIndex = this.props.board.groups.findIndex(group => group.id === destination.droppableId)

            // moving in the same group
            if (source.droppableId === destination.droppableId) {

                const currGroup = this.props.board.groups.find(group => group.id === source.droppableId)
                const currCard = currGroup.cards.find(card => card.id === draggableId)
                const newCardsGroup = Array.from(currGroup.cards)
                newCardsGroup.splice(source.index, 1)
                newCardsGroup.splice(destination.index, 0, currCard)
                const newGroup = { ...currGroup, cards: newCardsGroup }
                const newGroups = [...this.props.board.groups]
                newGroups[startGroupIndex] = newGroup
                const newBoard = { ...this.props.board, groups: newGroups }
                this.props.updatePosition(newBoard)
                return
            }

            // moving between groups
            if (source.droppableId !== destination.droppableId) {

                const destinationGroup = this.props.board.groups.find(group => group.id === destination.droppableId)
                const formerGroup = this.props.board.groups.find(group => group.id === source.droppableId)
                const currCard = formerGroup.cards.find(card => card.id === draggableId)
                const formerCardIndex = formerGroup.cards.findIndex(card => card.id === draggableId)
                const newCardsArray = Array.from(destinationGroup.cards)

                newCardsArray.splice(destination.index, 0, currCard)
                formerGroup.cards.splice(formerCardIndex, 1)

                const newGroups = [...this.props.board.groups]
                newGroups[startGroupIndex] = formerGroup
                newGroups[endGroupIndex].cards = newCardsArray

                const newBoard = { ...this.props.board, groups: newGroups }
                this.props.updatePosition(newBoard, draggableId)

                this.props.updateBoard(newBoard)

                if (type === 'group') {

                    const newGroupsOrder = Array.from(this.props.board.groups)
                    const currGroup = this.props.board.groups.find(group => group.id === draggableId)
                    newGroupsOrder.splice(source.index, 1)
                    newGroupsOrder.splice(destination.index, 0, currGroup)

                    const newBoard = {
                        ...this.props.board,
                        groups: newGroupsOrder
                    }
                    this.props.updatePosition(newBoard)
                    return

                }
            }
        }
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
    updatePosition,
    updateBoard,

}



export const BoardApp = connect(mapStateToProps, mapDispatchToProps)(_BoardApp)
