/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import React from 'react'
import {
  Button,
  View,
  Text,
  TextInput,
  TouchableHighlight,
  Alert,
  ActivityIndicator,
  StyleSheet,
} from 'react-native'
import {createAppContainer, NavigationProp} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'
import Movies from './movie'

class InputTitle extends React.Component<{}, {value: string}> {
  state = {
    value: 'Useless Placeholder',
  }

  onChangeText = text => {
    this.setState({value: text})
  }

  render() {
    return (
      <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
        <Text style={{padding: 5}}>Home</Text>
        <TextInput
          style={{
            height: 40,
            borderColor: 'gray',
            borderWidth: 1,
            padding: 5,
            marginHorizontal: 10,
            maxWidth: 200,
            flex: 2,
          }}
          onChangeText={text => this.onChangeText(text)}
          value={this.state.value}
        />
      </View>
    )
  }
}

class HomeScreen extends React.Component<NavigationProp, {count: number}> {
  static navigationOptions = ({navigation}) => {
    return {
      headerTitle: <InputTitle />,
      headerRight: (
        <Button
          onPress={navigation.getParam('increaseCount')}
          title="+1"
          color="#666"
        />
      ),
    }
  }
  componentDidMount() {
    this.props.navigation.setParams({increaseCount: this._increaseCount})
  }
  state = {
    count: 0,
  }
  _increaseCount = () => {
    this.setState({count: this.state.count + 1})
  }

  _onPressButton() {
    Alert.alert('You tapped the button!')
  }

  render() {
    return (
      <>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Text>Home Screen</Text>
          <Text>{this.state.count}</Text>
          <Button
            title="go to details"
            onPress={() => this.props.navigation.navigate('Movies')}
          />
          <Button
            title="go to IHome"
            onPress={() =>
              this.props.navigation.navigate('IHome', {
                itemId: 86,
                otherParam: 'anything you want here',
              })
            }
          />
        </View>
      </>
    )
  }
}

class IHomeScreen extends React.Component<NavigationProp, {}> {
  static navigationOptions = ({navigation}) => {
    return {
      title: navigation.getParam('otherParam', 'A Nested Details Screen'),
    }
  }
  render() {
    const {navigation} = this.props
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>IHome</Text>
        <Text>
          item.id: {JSON.stringify(navigation.getParam('itemId', 'NO-ID'))}
        </Text>
        <Text>
          otherParam:{' '}
          {JSON.stringify(navigation.getParam('otherParam', 'default value'))}
        </Text>
        <Button
          title="Go to Items..."
          onPress={() =>
            navigation.push('IHome', {
              itemId: Math.floor(Math.random() * 100),
            })
          }
        />
        <Button
          title="Update the title"
          onPress={() => navigation.setParams({otherParam: 'Update'})}
        />
      </View>
    )
  }
}

class MoviesScreen extends React.Component<NavigationProp, {}> {
  render() {
    return <Movies />
  }
}

type MovieDetailsState = {
  title: string,
  description: string,
  price: number,
  loaded: boolean,
}

class MovieDetailsScreen extends React.Component<
  NavigationProp,
  MovieDetailsState,
> {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      description: '',
      price: 0,
      loaded: false,
    }
  }

  static navigationOptions = ({navigation}) => {
    return {
      title: `商品号${navigation
        .getParam('itemId', 'A Nested Screen')
      }`,
    }
  }

  componentDidMount() {
    const {navigation} = this.props
    let itemId = navigation.getParam('itemId', 0)
    this.fetchData(itemId)
  }

  fetchData = itemId => {
    let responseDate = {
      title: '这里是标题',
      description:
        'withNavigation 是一个高阶组件，它可以将navigation这个 prop 传递到一个包装的组件。当你无法直接将navigation 这个 prop 传递给组件，或者不想在深度嵌套的子组件中传递它时，它将非常有用.',
      price: 5,
    }
    // fetch('url')
    //   .then(res => res.json())
    //   .then((responseDate: MovieDetailsState) => {
    //     this.setState({
    //       title: responseDate.title,
    //       price: responseDate.price,
    //       description: responseDate.description,
    //       loaded: true,
    //     })
    //   })
    this.setState({
      title: responseDate.title,
      price: responseDate.price,
      description: responseDate.description,
      loaded: true,
    })
  }

  render() {
    if (!this.state.loaded) {
      return this.renderLoadingView()
    }

    const {navigation} = this.props
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>
          item.id: {JSON.stringify(navigation.getParam('itemId', 'NO-ID'))}
        </Text>
        <Text>商品名称：{this.state.title}</Text>
        <Text>描述：{this.state.description}</Text>
        <Text>价格：{this.state.price}</Text>
      </View>
    )
  }

  renderLoadingView() {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
})

const AppNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    Movies: MoviesScreen,
    IHome: IHomeScreen,
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
