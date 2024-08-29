import { StyleSheet, Text } from 'react-native'
import React from 'react'

const TextLable = (props) => {
  const { title, style, onPress } = props
  return (
    <Text
      onPress={onPress}
      style={style}
    >
      {title}
    </Text>
  )
}

export default TextLable

const styles = StyleSheet.create({})