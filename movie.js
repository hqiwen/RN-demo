import React, {Component} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  ActivityIndicator,
  TouchableHighlight,
  Alert
} from 'react-native';
import { withNavigation } from 'react-navigation';

const REQUEST_URL =
  'https://raw.githubusercontent.com/facebook/react-native/0.51-stable/docs/MoviesExample.json';

class Movies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loaded: false,
    };
  }

  componentDidMount() {
    this.fetchData();
    console.log(this.state.data)
  }

  componentWillUnmount() {
    this.setState({ data: [] })
  }
  
  fetchData = () => {
    fetch(REQUEST_URL)
      .then(res => res.json())
      .then(responseDate => {
        this.setState({
          data: this.state.data.concat(responseDate.movies),
          loaded: true,
        });
      });
  }

  _onPressButton = (e, itemId) => {
    this.props.navigation.navigate('MovieDetails', {
      itemId: itemId
    });
  }


  render() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }

    return (
      <FlatList
        data={this.state.data}
        renderItem={this.renderMovie}
        style={styles.list}
        keyExtractor={item => item.id}
      />
    );
  }

  renderLoadingView() {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  renderMovie = ({item}) => {
    return (
      <View>
        <TouchableHighlight onPress={(e, itemId) => this._onPressButton(e, itemId)} underlayColor="white">
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
    );
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
});

export default withNavigation(Movies)