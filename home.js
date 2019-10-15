import React, {Component} from 'react'
import {
  View,
  Text,
  Image,
  StyleSheet,
  Button,
  TextInput,
  TouchableNativeFeedback,
  Picker
} from 'react-native'
import {NavigationProp} from 'react-navigation'

class InputTitle extends React.Component<{}, {value: string}> {
  state = {
    value: 'Placeholder',
    language: ''
  }

  onChangeText = text => {
    this.setState({value: text})
  }

  render() {
    return (
      <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
        <Text style={[styles.title]}>Home</Text>
        <TextInput
          style={[styles.titleInput]}
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
  _onPressButton = () => {
    this.props.navigation.navigate('Movies')
  }

  render() {
    return (
      <View style={[styles.container]}>
        <Text>Home Screen</Text>
        <Text>{this.state.count}</Text>
        <TouchableNativeFeedback
          onPress={this._onPressButton}
          background={TouchableNativeFeedback.SelectableBackground()}>
          <View style={{backgroundColor: 'rgb(33, 150, 243)', margin: 5}}>
            <Text style={[styles.buttonText]}>go to Movies</Text>
          </View>
        </TouchableNativeFeedback>
        <Button
          title="go to RandomParam"
          onPress={() =>
            this.props.navigation.navigate('RandomParam', {
              itemId: 86,
              otherParam: 'anything you want here',
            })
          }
        />
        <Picker
          selectedValue={this.state.language}
          style={{height: 50, width: 100}}
          onValueChange={(itemValue, itemIndex) =>
            this.setState({language: itemValue})
          }>
          <Picker.Item label="Java" value="java" />
          <Picker.Item label="JavaScript" value="js" />
        </Picker>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    margin: 10,
  },
  title: {
    marginHorizontal: 15,
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
  },
  titleInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 5,
    marginHorizontal: 10,
    maxWidth: 200,
    flex: 2,
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
    padding: 8,
    fontWeight: '500',
  },
})

export default HomeScreen
