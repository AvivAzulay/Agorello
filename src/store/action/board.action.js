import { boardService } from '../../services/board-service'

export function loadBoard(bordId) {
    return async dispatch => {
        try {
            const board = await boardService.query(bordId)
            dispatch({ type: 'SET_BOARD', board })
            return board

        } catch (err) {
            console.log('BoardActions: err in loadBoards', err)
        }
    }

}

export function saveCard(card, groupId) {
    return async dispatch => {
        try {
            const board = await boardService.saveCard(card, groupId)
            dispatch({ type: card.id ? 'SET_BOARD' : 'SET_BOARD', board })
        } catch (err) {
            console.log(`BoardActions: err in ${card.id ? 'update card' : 'add card'}${err}`)
        }
    }
}

export function saveGroup(group) {
    console.log(group);
    return async dispatch => {
        try {
            const board = await boardService.saveGroup(group)
            dispatch({ type: group.id ? 'SET_BOARD' : 'SET_BOARD', board })
        } catch (err) {
            console.log(`BoardActions: err in ${group.id ? 'update group' : 'add group'}${err}`)
        }
    }
}

export function removeCard(cardId, groupId) { // Action Creator
    return async dispatch => {
        try {
            const board = await boardService.removeCard(cardId, groupId)
            dispatch({ type: 'SET_BOARD', board })
        } catch (err) {
            console.log('BoardActions: err in removeCard', err)
        }
    }
}

export function removeGroup(groupId) { // Action Creator
    return async dispatch => {
        try {
            const board = await boardService.removeGroup(groupId)
            dispatch({ type: 'SET_BOARD', board })
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

export function addBoard(title, backgroundURL, bord = null) {
    return async dispatch => {
        try {
            const newBoard = await boardService.addBoard(title, backgroundURL, bord)
            dispatch({ type: 'ADD_BOARD', board: newBoard })
        } catch (err) {
            console.log('error adding board', err)
        }
    }
}

export function getboards() {
    return async dispatch => {
        try {
            const boards = await boardService.getGboards()
            dispatch({ type: 'SET_BOARDS', boards })
        } catch (err) {
            console.log(`BoardsActions: err in get board'}${err}`)
        }
    }
}

export function saveActivity(value, txtActivity, type) {
    console.log('value', value);
    console.log('txtActivity', txtActivity);
    console.log('type', type);
    return async dispatch => {
        try {
            const board = await boardService.updateActivityList(value, txtActivity, type)
            dispatch({ type: 'SET_BOARD', board })
        } catch (err) {
            console.log(`BoardActions: err in ${txtActivity} - cant add activity`)
        }
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


