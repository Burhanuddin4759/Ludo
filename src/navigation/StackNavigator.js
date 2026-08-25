import React from 'react'
import LudoBoardScreen from '../screens/ludoboard/LudoBoardScreen'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import SplashScreen from '../screens/splash/SplashScreen'
import Home from '../screens/home/Home'

const StackNavigator = () => {
    const Stack = createNativeStackNavigator()
    return (
        <Stack.Navigator initialRouteName='SplashScreen' screenOptions={{ headerShown: false }}>
            <Stack.Screen name='SplashScreen' component={SplashScreen} />
            <Stack.Screen name='HomeScreen' component={Home} options={{animation:'fade'}} />
            <Stack.Screen name='LudoBoard' component={LudoBoardScreen} />
        </Stack.Navigator>
    )
}

export default StackNavigator