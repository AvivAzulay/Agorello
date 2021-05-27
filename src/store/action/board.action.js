import { boardService } from '../../services/board-service'

export function loadBoard() {
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
            dispatch({ type: card.id ? 'UPDATE_CARD' : 'ADD_CARD', board })
        } catch (err) {
            console.log(`BoardActions: err in ${card.id ? 'update card' : 'add card'}${err}`)
        }
    }
}

export function saveGroup(group) {
    console.log('action:', group);
    return async dispatch => {
        try {
            const board = await boardService.saveGroup({ ...group })
            dispatch({ type: group.id ? 'UPDATE_GROUP' : 'ADD_GROUP', board })
        } catch (err) {
            console.log(`BoardActions: err in ${group.id ? 'update group' : 'add group'}${err}`)
        }
    }
}

export function removeCard(cardId, groupId) { // Action Creator
    return async dispatch => {
        try {
            const board = await boardService.removeCard(cardId, groupId)
            dispatch({ type: 'REMOVE_CARD', board })
        } catch (err) {
            console.log('BoardActions: err in removeCard', err)
        }
    }
}

export function removeGroup(groupId) { // Action Creator
    return async dispatch => {
        try {
            const board = await boardService.removeGroup(groupId)
            dispatch({ type: 'REMOVE_GROUP', board })
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


