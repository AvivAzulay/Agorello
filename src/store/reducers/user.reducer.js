const initialState = {
    users: []
}

export function userReducer(state = initialState, action) {
    switch (action.type) {
        // case 'SET_BOARD':
        //     return { ...state, board: action.board }
        // case 'REMOVE_TOY':
        //     return { ...state, toys: state.toys.filter(toy => toy._id !== action.toyId) }
        // case 'CAR_ERR':
        //     return { ...state, err: action.err, isLoading: false }
        // case 'ADD_CAR':
        //     return { ...state, cars: [...state.cars, action.car] }
        // case 'LOADING_CARS':
        //     return { ...state, isLoading: action.isLoading, err: null }
        // case 'ADD_TO_CART':
        //     return { ...state, shoppingCart: [...state.shoppingCart, action.item] }
        default:
            return state
    }
}
