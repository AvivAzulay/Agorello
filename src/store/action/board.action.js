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


