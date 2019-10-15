import React, {Component} from 'react'
import {
  View,
  Text,
  Image,
  StyleSheet,
  ActivityIndicator,
} from 'react-native'
import {withNavigation, NavigationProp} from 'react-navigation'

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
      title: `商品号${navigation.getParam('itemId', 'A Nested Screen')}`,
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
      <View style={[styles.container]}>
        <View style={{flexDirection:'row'}}>
          <Image
            source={{uri: navigation.getParam('imageURL', '')}}
            resizeMode='contain'
            style={[styles.thumbnail]}
          />
          <View style={{flex: 2,alignItems: 'center',  justifyContent: 'center'}}>
            <Text style={[styles.textBold]}>
              item.id: {navigation.getParam('itemId', 'NO-ID')}
            </Text>
            <Text style={[styles.textBold]}>商品名称：{this.state.title}</Text>
            <Text style={[styles.textBold]}>价格：<Text style={{color: 'red'}}>{this.state.price}</Text></Text>
          </View>
        </View>
        <View style={{margin: 20}}>
          <Text style={[styles.textBold]}>描述：<Text style={{fontWeight: 'normal'}}>{this.state.description}</Text></Text>
        </View>
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
    backgroundColor: '#F5FCFF',
  },
  thumbnail: {
    width: 120,
    height: 160,
    flex: -1,
    margin: 20
  },
  textBold: {
    fontWeight: 'bold'
  }
})

export default MovieDetailsScreen
