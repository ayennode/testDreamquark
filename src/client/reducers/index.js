import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'

const loadingReducer = (state = false, action) => {
  switch (action.type) {
    case 'FETCH_IN_PROGRESS':
      return true
    case 'FETCH_DONE':
      return false
    default:
      return state
  }
}

const usersReducer = (state = [], action) => {
  switch (action.type) {
    case 'LIST_USERS':
      return action.users
    default:
      return state
  }
}

const reducer = combineReducers({
  loading: loadingReducer,
  users: usersReducer,
})

export default (initialState) =>
  createStore(reducer, initialState, applyMiddleware(thunkMiddleware))
