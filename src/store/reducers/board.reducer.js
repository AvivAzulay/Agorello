const initialState = {
    board: null
}

export function boardReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_BOARD':
            return { board: { ...action.board } }
        case 'ADD_CARD':
            console.log(action.board)
            return { ...state, board: { ...action.board } }
        case 'REMOVE_CARD':
            return { board: { ...action.board } }
        case 'ADD_GROUP':
            return { board: { ...action.board } }
        case 'REMOVE_GROUP':
            return { board: { ...action.board } }
        case 'UPDATE_GROUP':
            return { board: { ...action.board } }
        // return { ...state, toys: state.toys.filter(toy => toy._id !== action.toyId) }
        // case 'CAR_ERR':
        //     return { ...state, err: action.err, isLoading: false }
        // return { ...state, groups: [...state.group, state.groups[]action.card] }
        // case 'LOADING_CARS':
        //     return { ...state, isLoading: action.isLoading, err: null }
        // case 'ADD_TO_CART':
        //     return { ...state, shoppingCart: [...state.shoppingCart, action.item] }
        default:
            return state
    }
}
