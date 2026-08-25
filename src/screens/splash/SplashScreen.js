import { ActivityIndicator, Animated, StyleSheet } from 'react-native'
import React, { useEffect, useRef } from 'react'
import Wrapper from '../../components/reusable/Wrapper'
import Logo from '../../assets/images/logo.png'
import { HEIGHT, WIDTH } from '../../enums/StyleGuides'
import { prepareNavigation, resetAndNavigate } from '../../utils/NavigationUtils'

const SplashScreen = () => {
  const scale = useRef(new Animated.Value(1)).current

  useEffect(() => {
    prepareNavigation()

    // Breathing animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(scale, {
          toValue: 1.1,
          duration: 1500,
          useNativeDriver: true,
        }),

        Animated.timing(scale, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
      ]),
    ).start()

    // Navigate after splash
    const timer = setTimeout(() => {
      resetAndNavigate('HomeScreen')
    }, 2500)

    return () => {
      clearTimeout(timer)
      scale.stopAnimation()
    }
  }, [scale])

  return (
    <Wrapper>
        <Animated.Image
          source={Logo}
          style={[styles.img,{transform:[{scale}]}]}
          resizeMode='contain'
        />

      <ActivityIndicator color={'#fff'} size={'small'}/>
    </Wrapper>
  )
}

export default SplashScreen

const styles = StyleSheet.create({
  img: {
    width: WIDTH * 0.7,
    height: HEIGHT * 0.6,
    alignSelf: 'center'
  }
})