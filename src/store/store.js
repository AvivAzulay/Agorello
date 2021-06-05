import ReduxThunk from 'redux-thunk';
import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import { userReducer } from './reducers/user.reducer.js'
import { boardReducer } from './reducers/board.reducer.js';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


const rootReducer = combineReducers({
    userModule: userReducer,
    boardModule: boardReducer,
})


// export const store = createStore(rootReducer,
//     compose(applyMiddleware(ReduxThunk))) //Passing the reducer
export const store = createStore(rootReducer,
    composeEnhancers(applyMiddleware(ReduxThunk))) //Passing the reducer




