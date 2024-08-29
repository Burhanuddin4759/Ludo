import { StyleSheet, Text, View } from 'react-native'
import React, { useMemo } from 'react'
import Cell from '../../../components/components/Cell'

const VerticalPath = (props) => {
  const { data, color } = props

  const grouping = useMemo(() => {
    const grouped = []
    for (let i = 0; i < data.length; i += 3) {
      grouped.push(data.slice(i, i + 3))
    }
    return grouped
  }, [data])

  return (
    <View style={styles.container}>
      {
        grouping.map((item, index) => {
          return (
            <View key={index} style={{ flexDirection: 'row', height: '16.6%', width: '100%'}}>
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

export default VerticalPath

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '20%',
    // borderWidth: 0.8,
    backgroundColor: '#f5f5f5'
  }
})