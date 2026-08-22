import { Alert, StyleSheet, View } from 'react-native'
import React from 'react'
import { COLORS } from '../../../enums/StyleGuides'
import Pile from './child/Pile'
import { useDispatch } from 'react-redux'
import { unfreezeDice, updatePlayerPieceValue } from '../../../redux/reducers/gameSlice'
import { StartingCells } from '../../../helpers/PlotData'

const Plot = (props) => {
  const { color, data, player } = props

  const dispatch = useDispatch()

  const handlePress = (value) => {
    let playerNo = value?.id?.slice(0, 1)

    switch (playerNo) {
      case 'A':
        playerNo = 'player1';
        break;
      case 'B':
        playerNo = 'player2';
        break;
      case 'C':
        playerNo = 'player3';
        break;
      case 'D':
        playerNo = 'player4';
        break;
    }
    dispatch(updatePlayerPieceValue({
      playerNo: playerNo,
      pieceId: value.id,
      pos: StartingCells[parseInt(playerNo.match(/\d+/)[0], 10) - 1],
      travelCount: 1
    })
    )
    dispatch(unfreezeDice())
  }

  return (
    <View style={styles.container(color)}>
      <View style={styles.innerContainer}>

        <View style={styles.row}>
          <Pocket
            pieceNo={0}
            color={color}
            data={data}
            player={player}
            handlePress={handlePress}
          />
          <Pocket
            pieceNo={1}
            color={color}
            data={data}
            player={player}
            handlePress={handlePress}
          />
        </View>

        <View style={styles.row}>
          <Pocket
            pieceNo={2}
            color={color}
            data={data}
            player={player}
            handlePress={handlePress}
          />
          <Pocket
            pieceNo={3}
            color={color}
            data={data}
            player={player}
            handlePress={handlePress}
          />
        </View>
      </View>
    </View>
  )
}

const Pocket = ({ pieceNo, color, player, data, handlePress }) => {
  return (
    <View style={styles.circle(color)}>
      {
        data && data[pieceNo]?.pos === 0 &&
        (
          <Pile
            player={player}
            color={color}
            onPress={() => {
              handlePress(data[pieceNo])
            }}
          />
        )
      }
    </View>
  )
}

export default Plot

const styles = StyleSheet.create({
  container: (color) => ({
    // height: '100%',
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
  })
})