import React from 'react'
import StackNavigator from './StackNavigator'
import { NavigationContainer } from '@react-navigation/native'

const RootNavigator = () => {
  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  )
}

export default RootNavigator