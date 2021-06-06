import { boardService } from '../../services/board-service'
import { utilService } from '../../services/util-service'

export function loadBoard(boardId) {
    return async dispatch => {
        try {
            const board = await boardService.getById(boardId)
            dispatch({ type: 'SET_BOARD', board })
            return board
        } catch (err) {
            console.log('BoardActions: err in loadBoard', err)
        }
    }
}

export function saveCard(card, groupId, board) {
    return async dispatch => {
        try {
            let newBoard = _deepCloneBoard(board)
            if (card.id) {
                const groupIdx = newBoard.groups.findIndex(group => group.id === groupId)
                const cardIdx = newBoard.groups[groupIdx].cards.findIndex(currCard => {
                    return (currCard.id === card.id)
                })
                newBoard.groups[groupIdx].cards[cardIdx] = card
            } else {
                const newCard = _getNewCardObj(groupId)
                newCard.title = card.title
                const groupIdx = newBoard.groups.findIndex(group => group.id === groupId)
                newBoard.groups[groupIdx].cards.push(newCard)
            }
            dispatch({ type: 'SET_BOARD', board: newBoard })
            await boardService.updateBoard(newBoard)
        } catch (err) {
            console.log(`BoardActions: err in ${card.id ? 'update card' : 'add card'}${err}`)
        }
    }
}

export function saveGroup(group, board) {
    return async dispatch => {
        try {
            const newBoard = _deepCloneBoard(board)
            if (group.id) {
                const groupIdx = board.groups.findIndex(currGroup => currGroup.id === group.id)
                newBoard.groups[groupIdx] = group
            } else {
                group.id = utilService.makeId()
                group.cards = []
                newBoard.groups.push(group)
            }

            dispatch({ type: 'SET_BOARD', board: newBoard })
            await boardService.updateBoard(newBoard)
        } catch (err) {
            console.log(`BoardActions: err in ${group.id ? 'update group' : 'add group'}${err}`)
        }
    }
}

export function removeCard(card, board) { // Action Creator
    return async dispatch => {
        try {
            const newBoard = _deepCloneBoard(board)
            const groupIdx = newBoard.groups.findIndex(group => group.id === card.currGroup.groupId)
            const cardIdx = newBoard.groups[groupIdx].cards.findIndex(currCard => currCard.id === card.id)
            newBoard.groups[groupIdx].cards.splice(cardIdx, 1)
            dispatch({ type: 'SET_BOARD', board: newBoard })
            await boardService.updateBoard(newBoard)
        } catch (err) {
            console.log('BoardActions: err in removeCard', err)
        }
    }
}

export function removeGroup(groupId, board) { // Action Creator
    return async dispatch => {
        try {
            const newBoard = _deepCloneBoard(board)
            const groupIdx = newBoard.groups.findIndex(group => group.id === groupId)
            newBoard.groups.splice(groupIdx, 1)
            dispatch({ type: 'SET_BOARD', board: newBoard })
            await boardService.updateBoard(newBoard)
        } catch (err) {
            console.log('BoardActions: err in removeGroup', err)
        }
    }
}

export function updatePosition(newBoardPositioning) {
    return async dispatch => {
        try {
            let newBoard = JSON.parse(JSON.stringify(newBoardPositioning))
            dispatch({ type: 'SET_BOARD', board: newBoardPositioning })
            await boardService.updateBoard(newBoard)
        } catch (err) {
            console.log('error updating board', err)
        }
    }
}

export function updateBoard(board) {
    return async dispatch => {
        try {
            const newBoard = JSON.parse(JSON.stringify(board))
            dispatch({ type: 'SET_BOARD', board: newBoard })
            await boardService.updateBoard(newBoard) // updating the DB
        } catch (err) {
            console.log('error updating board', err)
        }
    }
}

export function updateBoardSockets(board) {
    return async dispatch => {
        try {
            const newBoard = JSON.parse(JSON.stringify(board))
            dispatch({ type: 'SET_BOARD', board: newBoard })
        } catch (err) {
            console.log('error updating board', err)
        }
    }
}

export function addBoard(title, backgroundURL, board = null) {
    return async dispatch => {
        try {
            const newBoard = await boardService.addBoard(title, backgroundURL, board)
            dispatch({ type: 'ADD_BOARD', board: newBoard })
        } catch (err) {
            console.log('error adding board', err)
        }
    }
}

export function loadBoards() {
    return async dispatch => {
        try {
            const boards = await boardService.query()
            dispatch({ type: 'SET_BOARDS', boards })
        } catch (err) {
            console.log(`BoardsActions: err in get board'}${err}`)
        }
    }
}

///***********  NOT DONE  ***********///
export function saveActivity(board, data, action) {
    return async dispatch => {
        try {
            const newBoard = await boardService.updateActivityList(board, data, action)
            // console.log(newBoard);
            // dispatch({ type: 'SET_BOARD', board: newBoard })
        } catch (err) {
            console.log(`BoardActions: err in ${action} - can't add activity`)
        }
    }
}///***********  NOT DONE  ***********///


function _deepCloneBoard(board) {
    return JSON.parse(JSON.stringify(board))
}

function _getNewCardObj(groupId) {
    return {
        id: utilService.makeId(),
        members: [],
        labels: [],
        attachments: [],
        members: [],
        checklist: [],
        currGroup: { groupId },
        createdAt: Date.now()
    }
}


// export function removeBoard(boardId) { // Action Creator
//     return async dispatch => {
//         try {
//             await toyService.remove(boardId)
//             dispatch({ type: 'REMOVE_TOY', boardId })
//         } catch (err) {
//             console.log('ToysActions: err in removeToy', err)
//         }
//     }
// }


// export function setFilter(filterBy) {
//     return dispatch => {
//         const action = {
//             type: 'SET_FILTER',
//             filterBy
//         }
//         dispatch(action)

//     }
// }

// export function saveBoard(board) {
//     return async dispatch => {
//         try {
//             const newBoard = await boardService.saveBoard(board)
//             dispatch({ type: 'SET_BOARD', newBoard })
//         } catch (err) {
//             console.log(`BoardActions: err in ${board._id} : ${err}`)
//         }
//     }
// }

