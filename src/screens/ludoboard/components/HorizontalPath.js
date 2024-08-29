import { StyleSheet, Text, View } from 'react-native'
import React, { useMemo } from 'react'
import Cell from '../../../components/components/Cell'

const HorizontalPath = (props) => {
  const { data, color } = props

  const grouping = useMemo(() => {
    const grouped = []
    for (let i = 0; i < data.length; i += 6) {
      grouped.push(data.slice(i, i + 6))
    }
    return grouped
  }, [data])

  return (
    <View style={styles.container}>
      {
        grouping.map((item, index) => {
          return (
            <View key={index} style={{ flexDirection: 'row', height: '33.3%', width: '100%'}}>
              {
                item.map((id) => {
                  return (
                    <Cell key={`cell- ${id}`} cellData={id} color={color} />
                  )
                })
              }
            </View>
          )
        })
      }
    </View>
  )
}

export default HorizontalPath

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '40%',
    // borderWidth: 0.8,
    backgroundColor: '#f5f5f5'
  }
})