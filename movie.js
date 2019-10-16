import React from 'react'
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  ActivityIndicator,
  TouchableHighlight,
  RefreshControl,
} from 'react-native'
import {withNavigation, NavigationProp} from 'react-navigation'
import {connect} from 'react-redux'
import {fetchMoviesIfNeeded, REFRESH_MOVIES} from './store/actions'

class MoviesScreen extends React.Component<
  NavigationProp,
  {data: [], loaded: boolean, refreshing: boolean},
> {
  static navigationOptions = ({navigation}) => {
    return {
      headerTitle: '电影列表',
    }
  }

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const {dispatch} = this.props
    dispatch(fetchMoviesIfNeeded())
  }

  _onPressButton = (itemId, imageURL) => {
    this.props.navigation.navigate('MovieDetails', {
      itemId: itemId,
      imageURL: imageURL,
    })
  }

  _onRefresh = () => {
    const {dispatch} = this.props
    dispatch({type: REFRESH_MOVIES})
    dispatch(fetchMoviesIfNeeded())
  }

  render() {
    const {loaded, data, refreshing} = this.props
    if (!loaded) {
      return this.renderLoadingView()
    }

    return (
      <FlatList
        data={data}
        renderItem={this.renderMovie}
        style={styles.list}
        keyExtractor={item => item.id + Math.random() * 50}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={this._onRefresh} />
        }
      />
    )
  }

  renderLoadingView() {
    return (
      <View style={styles.container}>
        <ActivityIndicator size='large' color='#0000ff' />
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
          underlayColor='white'>
          <View style={styles.container}>
            <Image
              source={{uri: item.posters.thumbnail}}
              style={styles.thumbnail}
            />
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

function mapStateToProps(state) {
  const {movies} = state
  const {data, loaded} = movies || {
    loaded: false,
    data: [],
  }

  return {
    data,
    loaded,
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    margin: 10,
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

export default connect(mapStateToProps)(withNavigation(MoviesScreen))
