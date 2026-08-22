import { StyleSheet, Text, View } from 'react-native'
import React, { memo, useMemo } from 'react'
import Cell from '../../../components/components/Cell'

const VerticalPath = (props) => {
  const { data, color } = props

  const groupedCells = useMemo(() => {
    const grouped = []
    for (let i = 0; i < data.length; i += 3) {
      grouped.push(data.slice(i, i + 3))
    }
    return grouped
  }, [data])

  return (
    <View style={styles.container}>
      {
        groupedCells.map((group, index) => {
          return (
            <View key={`group-${index}`} style={{ flexDirection: 'row', height: '16.6%', width: '100%' }}>
              {
                group.map((id) => {
                  return (
                    <Cell
                      key={`cell- ${id}`}
                      id={id}
                      color={color}
                    />
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

export default memo(VerticalPath)

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '20%',
    // borderWidth: 0.8,
    backgroundColor: '#f5f5f5'
  }
})