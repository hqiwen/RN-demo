import {combineReducers} from 'redux'
import {REQUEST_MOVIES, RECEIVE_MOVIES, REFRESH_MOVIES} from './actions'

function movies(
  state = {
    data: [],
    loaded: false,
    refreshing: false,
  },
  action,
) {
  switch (action.type) {
    case REQUEST_MOVIES:
      return Object.assign({}, state, {
        loaded: false,
      })
    case RECEIVE_MOVIES:
      return Object.assign({}, state, {
        data: action.movies,
        loaded: true,
        refreshing: false,
      })
    case REFRESH_MOVIES:
      return Object.assign({}, state, {
        refreshing: true,
      })
    default:
      return state
  }
}

const rootReducer = combineReducers({
  movies,
})

export default rootReducer
