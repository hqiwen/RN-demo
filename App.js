/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import React from 'react'
import {Button, View, Text, StyleSheet} from 'react-native'
import {createAppContainer, NavigationProp} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'
import HomeScreen from './home'
import MoviesScreen from './movie'
import MovieDetailsScreen from './movieDetails'

class RandomParamScreen extends React.Component<NavigationProp, {}> {
  static navigationOptions = ({navigation}) => {
    return {
      title: navigation.getParam('otherParam', 'A Nested Details Screen'),
    }
  }
  render() {
    const {navigation} = this.props
    return (
      <View style={[styles.container]}>
        <Text>RandomParam</Text>
        <Text>
          item.id: {JSON.stringify(navigation.getParam('itemId', 'NO-ID'))}
        </Text>
        <Text>
          otherParam:{' '}
          {JSON.stringify(navigation.getParam('otherParam', 'default value'))}
        </Text>
        <Button
          title='Go to Items...'
          onPress={() =>
            navigation.push('RandomParam', {
              itemId: Math.floor(Math.random() * 100),
            })
          }
        />
        <Button
          title='Update the title'
          onPress={() => navigation.setParams({otherParam: 'Update'})}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

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
    return <AppContainer />
  }
}
