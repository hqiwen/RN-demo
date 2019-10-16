export const REQUEST_MOVIES = 'REQUEST_MOVIES'
export const RECEIVE_MOVIES = 'RECEIVE_MOVIES'
export const REFRESH_MOVIES = 'REFRESH_MOVIES'

const REQUEST_URL =
  'https://raw.githubusercontent.com/facebook/react-native/0.51-stable/docs/MoviesExample.json'

function fetchMovies() {
  return dispatch => {
    dispatch(requestMovies())
    return fetch(REQUEST_URL)
      .then(response => response.json())
      .then(json => dispatch(receiveMovies(json)))
  }
}

function receiveMovies(json) {
  return {
    type: RECEIVE_MOVIES,
    movies: json.movies,
  }
}

function requestMovies() {
  return {
    type: REQUEST_MOVIES,
  }
}

function shouldFetchMovies(state) {
  const movies = state.movies
  return !movies.loaded || movies.refreshing
}

export function fetchMoviesIfNeeded() {
  return (dispatch, getState) => {
    if (shouldFetchMovies(getState())) {
      return dispatch(fetchMovies())
    }
  }
}
