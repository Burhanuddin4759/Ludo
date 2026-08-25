import React from 'react'
import StackNavigator from './StackNavigator'
import { NavigationContainer } from '@react-navigation/native'
import { navigationRef } from '../utils/NavigationUtils'

const RootNavigator = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <StackNavigator />
    </NavigationContainer>
  )
}

export default RootNavigator