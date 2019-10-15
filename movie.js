import React, {Component} from 'react'
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  ActivityIndicator,
  TouchableHighlight,
  Alert,
  RefreshControl
} from 'react-native'
import {withNavigation, NavigationProp} from 'react-navigation'

const REQUEST_URL =
  'https://raw.githubusercontent.com/facebook/react-native/0.51-stable/docs/MoviesExample.json'

class MoviesScreen extends Component<NavigationProp, {data: [], loaded: boolean,}> {

  static navigationOptions = ({navigation}) => {
    return {
      headerTitle: '电影列表',
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      data: [],
      loaded: false,
      refreshing: false
    }
  }

  componentDidMount() {
    this.fetchData()
  }

  componentWillUnmount() {
    this.setState({data: []})
  }

  fetchData = () => {
    fetch(REQUEST_URL)
      .then(res => res.json())
      .then(responseDate => {
        this.setState({
          data: this.state.data.concat(responseDate.movies),
          loaded: true,
          refreshing: false
        })
      })
  }

  _onPressButton = (itemId, imageURL) => {
    console.log(itemId)
    this.props.navigation.navigate('MovieDetails', {
      itemId: itemId,
      imageURL: imageURL,
    })
  }

  _onRefresh = () => {
    this.setState({refreshing: true})
    this.fetchData()
  }

  render() {
    if (!this.state.loaded) {
      return this.renderLoadingView()
    }

    return (
      <FlatList
        data={this.state.data}
        renderItem={this.renderMovie}
        style={styles.list}
        keyExtractor={item => item.id + Math.random() * 50 }
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh}
          />
        }
      />
    )
  }

  renderLoadingView() {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    )
  }

  renderMovie = ({item}) => {
    const itemId = item.id
    const imageURL = item.posters.thumbnail
    return (
      <View>
        <TouchableHighlight
          onPress={() => {
            this._onPressButton(itemId, imageURL)
          }}
          underlayColor="white">
          <View style={styles.container}>
            <Image
              source={{uri: item.posters.thumbnail}}
              style={styles.thumbnail}></Image>
            <View style={styles.rightContainer}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.year}>{item.year}</Text>
            </View>
          </View>
        </TouchableHighlight>
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
    margin: 10
  },
  rightContainer: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    marginBottom: 8,
    textAlign: 'center',
  },
  year: {
    textAlign: 'center',
  },
  thumbnail: {
    width: 53,
    height: 81,
  },
  list: {
    paddingTop: 20,
    backgroundColor: '#F5FCFF',
  },
})

export default withNavigation(MoviesScreen)
