import { boardService } from '../../services/board-service'

export function loadBoard() {
    return async dispatch => {
        try {
            const board = await boardService.query()
            console.log(board);
            dispatch({ type: 'SET_BOARD', board })

        } catch (err) {
            console.log('BoardActions: err in loadBoards', err)
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

// export function saveToy(board) {
//     return async dispatch => {
//         try {
//             const savedToy = await toyService.save(board)
//             dispatch({ type: board._id ? 'UPDATE_TOY' : 'ADD_TOY', board: savedToy })
//         } catch (err) {
//             console.log(`ToysActions: err in ${board._id ? 'update board' : 'add board'}${err}`)
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


