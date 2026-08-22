import { Animated, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { LinearGradient } from 'react-native-linear-gradient'
import { COLORS } from '../../../enums/StyleGuides'
import LottieView from 'lottie-react-native'
import DiceRoll from '../../../assets/animation/diceroll.json'
import Arrow from '../../../assets/images/arrow.png'
import { useDispatch, useSelector } from 'react-redux'
import { selectCurrentPlayerChance, selectDiceNumber, selectDiceRolled } from '../../../redux/reducers/gameSelector'
import { enableCellSelection, enablePileSelection, updateDiceNo, updatePlayerChance } from '../../../redux/reducers/gameSlice'

const Dice = (props) => {

    const { rotate, color, player, data } = props
    console.log('rotate', rotate, 'color', color, 'player', player)

    const currentPlayerChance = useSelector(selectCurrentPlayerChance)
    const diceNo = useSelector(selectDiceNumber)
    const isDiceRolled = useSelector(selectDiceRolled)
    console.log('isDiceRolled=-->', isDiceRolled)
    const playerPieces = useSelector(state => state.game[`player${currentPlayerChance}`])
    const dispatch = useDispatch()

    const [diceRolling, setDiceRolling] = useState(false)

    // console.log('diceNo->', diceNo, 'currentchancePlayer->', currentPlayerChance, 'isDiceRolled=>', isDiceRolled, 'playerPieces', playerPieces)

    // Define the pile source based on the color prop
    const getPilesSource = () => {
        if (color == COLORS.BLUE) {
            return require('../../../assets/images/piles/blue.png')
        }
        else if (color == COLORS.GREEN) {
            return require('../../../assets/images/piles/green.png')
        }
        else if (color == COLORS.YELLOW) {
            return require('../../../assets/images/piles/yellow.png')
        }
        else {
            return require('../../../assets/images/piles/red.png')
        }
    };

    const diceImages = {
        1: require('../../../assets/images/dice/1.png'),
        2: require('../../../assets/images/dice/2.png'),
        3: require('../../../assets/images/dice/3.png'),
        4: require('../../../assets/images/dice/4.png'),
        5: require('../../../assets/images/dice/5.png'),
        6: require('../../../assets/images/dice/6.png'),
    }

    const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

    const handleDicePress = async () => {
        const newDiceNo = Math.floor(Math.random() * 6) + 1
        // const newDiceNo = 6
        // playSound('dice_roll');
        setDiceRolling(true);
        await delay(800)
        dispatch(updateDiceNo({ diceNo: newDiceNo }))
        setDiceRolling(false)

        const isAnyPieceAlive = data?.findIndex(i => i.pos != 0 && i.pos != 57)
        const isAnyPieceLocked = data?.findIndex(i => i.pos == 0)

        if (isAnyPieceAlive == -1) {
            if (newDiceNo == 6) {
                dispatch(enablePileSelection({ playerNo: player }))
            }
            else {
                let chancePlayer = player + 1
                if (chancePlayer > 4) {
                    chancePlayer = 1
                }
                await delay(700)
                dispatch(updatePlayerChance({ chancePlayer: chancePlayer }))
            }
        }
        else {
            const canMove = playerPieces.some(
                pile => pile.travelCount + newDiceNo <= 57 && pile.pos != 0
            );
            if (
                (!canMove && newDiceNo == 6 && isAnyPieceLocked == -1) ||
                (!canMove && newDiceNo != 6 && isAnyPieceLocked != -1) ||
                (!canMove && newDiceNo != 6 && isAnyPieceLocked == -1)
            ) {
                let chancePlayer = player + 1
                if (chancePlayer > 4) {
                    chancePlayer = 1
                }
                await delay(700)
                dispatch(updatePlayerChance({ chancePlayer: chancePlayer }))
                return
            }
            if (newDiceNo == 6) {
                dispatch(enablePileSelection({ playerNo: player }))
            }
            dispatch(enableCellSelection({ playerNo: player }))
        }
    }

    return (
        <View style={[styles.container, { transform: [{ scaleX: rotate ? -1 : 1 }] }]}>
            <View style={styles.border1}>
                <LinearGradient
                    style={styles.linearGradient}
                    colors={['#0052be', '#5f9fcb', '#97c6c9']}
                    start={{ x: 0, y: 0.5 }}
                    end={{ x: 1, y: 0.5 }}
                >
                    <Image
                        source={getPilesSource()}
                        style={{ height: 32, width: 32 }}
                    />
                </LinearGradient>
            </View>
            <View style={styles.border2}>
                <View style={styles.innerborder2}>
                    {
                        currentPlayerChance == player && !diceRolling &&
                        <TouchableOpacity
                            disabled={isDiceRolled}
                            activeOpacity={0.4}
                            onPress={handleDicePress}
                        >
                            <Image
                                source={diceImages[diceNo]}
                                style={{ height: 35, width: 35 }}
                            />
                        </TouchableOpacity>
                    }
                </View>
            </View>
            {currentPlayerChance === player && !isDiceRolled &&
                <Animated.View>
                    <Image source={Arrow} style={{ width: 50, height: 30 }} />
                </Animated.View>
            }

            {
                currentPlayerChance === player && diceRolling &&
                <LottieView
                    loop={true}
                    source={DiceRoll}
                    style={styles.rollingDice}
                    autoPlay
                    cacheComposition={true}
                    hardwareAccelerationAndroid
                />
            }

        </View>
    )
}

export default Dice

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    border1: {
        borderRightWidth: 0,
        borderWidth: 3,
        borderColor: '#f0ce2c'
    },
    linearGradient: {

    },
    border2: {
        height: 55,
        width: 55,
        borderRadius: 12,
        backgroundColor: '#97c6c9',
        padding: '4%'
    },
    innerborder2: {
        borderRadius: 10,
        height: '100%',
        width: '100%',
        borderWidth: 2,
        borderColor: '#000',
        backgroundColor: '#e8c0c1',
        justifyContent: 'center',
        alignItems: 'center'
    },
    rollingDice: {
        height: 70,
        width: 70,
        position: 'absolute',
        bottom: '10%',
        left: '20%',
        // top:-25,
        zIndex: 99
    }
})