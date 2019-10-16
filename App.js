/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import React from 'react'
import {createAppContainer} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'
import HomeScreen from './pages/home'
import MoviesScreen from './pages/movieList'
import MovieDetailsScreen from './pages/movieDetails'
import RandomParamScreen from './pages/randomParam'
import {Provider} from 'react-redux'
import configureStore from './store/store'
const store = configureStore()

const AppNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    Movies: MoviesScreen,
    RandomParam: RandomParamScreen,
    MovieDetails: MovieDetailsScreen,
  },
  {
    initialRouteName: 'Home',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#f4511e',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  },
)

const AppContainer = createAppContainer(AppNavigator)

export default class App extends React.Component<{}, {}> {
  render() {
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    )
  }
}
