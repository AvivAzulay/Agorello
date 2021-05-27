import { boardService } from '../../services/board-service'

export function loadBoard(filter = '') {
    return async dispatch => {
        try {
            const board = await boardService.query()
            dispatch({ type: 'SET_BOARD', board })

        } catch (err) {
            console.log('BoardActions: err in loadBoards', err)
        }
    }

}

export function saveCard(card, groupId) {
    return async dispatch => {
        try {
            const board = await boardService.saveCard({ ...card }, groupId)
            dispatch({ type: card.id ? 'SET_BOARD' : 'SET_BOARD', board })
        } catch (err) {
            console.log(`BoardActions: err in ${card.id ? 'update card' : 'add card'}${err}`)
        }
    }
}

export function saveGroup(group) {
<<<<<<< HEAD
    console.log('action:', group);
    return async dispatch => {
        try {
            const board = await boardService.saveGroup({ ...group })
            dispatch({ type: group.id ? 'UPDATE_GROUP' : 'ADD_GROUP', board })
=======
    return async dispatch => {
        try {
            const board = await boardService.saveGroup({ ...group })
            dispatch({ type: group.id ? 'SET_BOARD' : 'ADD_GROUP', board })
>>>>>>> 771a6a035d9dfdf92ca91c372d732e4f28301e61
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
<<<<<<< HEAD
            dispatch({ type: 'REMOVE_GROUP', board })
=======
            dispatch({ type: 'SET_BOARD', board })
>>>>>>> 771a6a035d9dfdf92ca91c372d732e4f28301e61
        } catch (err) {
            console.log('BoardActions: err in removeGroup', err)
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


