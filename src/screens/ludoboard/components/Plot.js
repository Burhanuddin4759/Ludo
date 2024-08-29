import { Animated, Easing, Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useMemo, useRef } from 'react'
import { COLORS } from '../../../enums/StyleGuides'
import Pile from './child/Pile'

const Plot = (props) => {
  const { color } = props

  const rotation = useRef(new Animated.Value(0)).current

  useEffect(() => {
    const rotateAnimation = Animated.loop(
      Animated.timing(rotation, {
        toValue: 1,
        duration: 1500,
        easing: Easing.linear,
        useNativeDriver: true
      })
    )
    rotateAnimation.start()
    return () => rotateAnimation.stop()
  }, [])

  const rotateWhite = useMemo(() => rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  }), [rotation])

  return (
    <View style={styles.container(color)}>
      <View style={styles.innerContainer}>

        <View style={styles.row}>
          <View style={styles.circle(color)}>
            <Animated.View
              style={[styles.animated,
              { transform: [{ rotate: rotateWhite }] }
              ]}
            />
            <Pile color={color} />
          </View>
          <View style={styles.circle(color)}>
            <Animated.View
              style={[styles.animated,
              { transform: [{ rotate: rotateWhite }] }
              ]}
            />
            <Pile color={color} />
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.circle(color)}>
            <Animated.View
              style={[styles.animated,
              { transform: [{ rotate: rotateWhite }] }
              ]}
            />
            <Pile color={color} />
          </View>
          <View style={styles.circle(color)}>
            <Animated.View
              style={[styles.animated,
              { transform: [{ rotate: rotateWhite }] }
              ]}
            />
            <Pile color={color} />
          </View>
        </View>

      </View>
    </View>
  )
}

export default Plot

const styles = StyleSheet.create({
  container: (color) => ({
    height: '100%',
    width: '40%',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.8,
    borderColor: COLORS.BORDER_COLOR,
    backgroundColor: color
  }),
  innerContainer: {
    height: '70%',
    width: '70%',
    borderWidth: 0.5,
    borderColor: COLORS.BORDER_COLOR,
    backgroundColor: '#fff',
    justifyContent: 'space-around'
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  circle: (color) => ({
    borderColor: COLORS.BORDER_COLOR,
    borderWidth: 0.8,
    height: 30,
    width: 30,
    borderRadius: 15,
    backgroundColor: color,
    alignItems: 'center',
    justifyContent: 'center'
  }),
  animated: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#f5f5f5'
  }
})