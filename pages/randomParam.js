import React from 'react'
import {View, Text, StyleSheet, Button} from 'react-native'
import {NavigationProp} from 'react-navigation'

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

export default RandomParamScreen
