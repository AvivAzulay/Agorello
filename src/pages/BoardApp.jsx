import React, { Component } from 'react'
import { connect } from 'react-redux'
import { CardDetails } from '../cmps/CardDetails'
import { BoardHeader } from '../cmps/BoardHeader.jsx'
import { loadBoard, removeGroup, saveCard, removeCard, saveGroup, updateBoard, saveActivity, updateBoardSockets } from '../store/action/board.action.js'
import { GroupList } from '../cmps/GroupList'
import { socketService } from '../services/socketService'


class _BoardApp extends Component {

    ngOnInit() {
        /** spinner starts on init */
        this.spinner.show();

        setTimeout(() => {
            /** spinner ends after 5 seconds */
            this.spinner.hide();
        }, 5000);
    }
    state = {
        currGroupIdx: null,
        isLebelOpen: false,
    }

    async componentDidMount() {
        const boardId = this.props.match.params.boardId
        try {
            await this.onLoadBoard()
            socketService.emit('join board', boardId)
            socketService.on('board updated', (board) => {
                this.props.updateBoardSockets(board)
            })
        } catch (err) {
            console.log('Huge error', err);
        }
    }
    //?!?!?!?!??!?!?!?!??!?!?!?!??!?!?!?!??!?!?!?!??!?!?!?!??!?!?!?!??!?!?!?!??!?!?!?!?//
    //?!?!?!?!??!?!?!?!??!?!?!?!??!?!?!?!??!?!?!?!??!?!?!?!??!?!?!?!??!?!?!?!??!?!?!?!?//
    //?!?!?!?!??!?!?!?!??!?!?!?!??!?!?!?!??!?!?!?!??!?!?!?!??!?!?!?!??!?!?!?!??!?!?!?!?//
    //?!?!?!?!??!?!?!?!??!?!?!?!??!?!?!?!??!?!?!?!??!?!?!?!??!?!?!?!??!?!?!?!??!?!?!?!?//
    //?!?!?!?!??!?!?!?!??!?!?!?!??!?!?!?!??!?!?!?!??!?!?!?!??!?!?!?!??!?!?!?!??!?!?!?!?//
    componentWillUnmount() {
        // socketService.off('board updated')
        // socketService.terminate()
    }
    //?!?!?!?!??!?!?!?!??!?!?!?!??!?!?!?!??!?!?!?!??!?!?!?!??!?!?!?!??!?!?!?!??!?!?!?!?//
    //?!?!?!?!??!?!?!?!??!?!?!?!??!?!?!?!??!?!?!?!??!?!?!?!??!?!?!?!??!?!?!?!??!?!?!?!?//
    //?!?!?!?!??!?!?!?!??!?!?!?!??!?!?!?!??!?!?!?!??!?!?!?!??!?!?!?!??!?!?!?!??!?!?!?!?//
    //?!?!?!?!??!?!?!?!??!?!?!?!??!?!?!?!??!?!?!?!??!?!?!?!??!?!?!?!??!?!?!?!??!?!?!?!?//
    //?!?!?!?!??!?!?!?!??!?!?!?!??!?!?!?!??!?!?!?!??!?!?!?!??!?!?!?!??!?!?!?!??!?!?!?!?//

    onLoadBoard = () => {
        this.props.loadBoard(this.props.match.params.boardId)
    }

    onUpdateBoard = (key, value) => {
        const newBoard = { ...this.props.board }
        newBoard[key] = value
        this.props.updateBoard(newBoard)
        socketService.emit('board updated', { newBoard, id: newBoard._id })
        // socketService.emit('board updated', { from, txt: this.state.msg.txt })
    }

    onUpdateBoard = (key, value) => {
        const newBoard = { ...this.props.board }
        newBoard[key] = value
        this.props.updateBoard(newBoard)
        // socketService.emit('board updated', { newBoard })
    }

    onSaveGroup = (group, board, action) => {
        return this.props.saveGroup(group, board, action)
    }

    onRemoveGroup = (group) => {
        return this.props.removeGroup(group, this.props.board, 'REMOVE_GROUP')
    }

    onSaveCard = (card, groupId, action) => {
        console.log(action);
        this.props.saveCard(card, groupId, this.props.board, action)
    }

    onRemoveCard = (card) => {
        return this.props.removeCard(card, this.props.board)
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

    onSaveActivity = (board, data, action) => {
        this.props.saveActivity(board, data, action)
    }

    render() {
        const { board } = this.props
        console.log(board);
        if (!board) return <div>Loading...</div>
        console.log(board);
        return (<>
            { (this.props.match.params.cardId) ? <CardDetails cardId={this.props.match.params.cardId} history={this.props.history} /> : <div></div>}

            <div className="board" style={{ backgroundImage: `url(${board?.style?.bgImg})` }}>
                <div className="fade"></div>
                <div className="borad-nav-color"></div>
                <BoardHeader
                    board={board}
                    props={this.props.history}
                    onUpdateBoard={this.onUpdateBoard}
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
    loadBoard,
    saveGroup,
    removeCard,
    updateBoard,
    removeGroup,
    saveActivity,
    updateBoardSockets
}



export const BoardApp = connect(mapStateToProps, mapDispatchToProps)(_BoardApp)
