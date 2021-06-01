const initialState = {
    board: null,
    boards:null
}

export function boardReducer(state = initialState, action) {
    switch (action.type) {
        
        case 'SET_BOARDS':
         console.log(action.boards)
        return { ...state, boards: action.boards }
        case 'ADD_BOARD':
        return { ...state,board:action.board, boards: [...state.boards, action.board]}
        case 'SET_BOARD':
            return { ...state, board: action.board }
        case 'ADD_GROUP':
            return { ...state, board: action.board }
        default:
            return state
    }
}
