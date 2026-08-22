import { Animated, Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import Wrapper from '../../components/reusable/Wrapper'
import { COLORS, HEIGHT, WIDTH } from '../../enums/StyleGuides'
import Plot from './components/Plot'
import VerticalPath from './components/VerticalPath'
import HorizontalPath from './components/HorizontalPath'
import MidSquare from './components/MidSquare'
import { Plot1Data, Plot2Data, Plot3Data, Plot4Data } from '../../helpers/PlotData'
import Dice from './components/Dice'
import { useSelector } from 'react-redux'
import { selectDiceTouch, selectPlayer1, selectPlayer2, selectPlayer3, selectPlayer4 } from '../../redux/reducers/gameSelector'
import { useIsFocused } from '@react-navigation/native'
import startImage from '../../assets/images/start.png'

const LudoBoardScreen = () => {

    const player1 = useSelector(selectPlayer1)
    const player2 = useSelector(selectPlayer2)
    const player3 = useSelector(selectPlayer3)
    const player4 = useSelector(selectPlayer4)
    const isDiceTouch = useSelector(selectDiceTouch)
    const winner = useSelector(state => state.game.winner)

    const isFocused = useIsFocused()

    const [startGameImage, setStartGameImage] = useState(false)
    const [menuVisible, setMenuVisible] = useState(false)
    const opacity = useRef(new Animated.Value(1)).current

    useEffect(() => {
        if (isFocused) {
            setStartGameImage(true)
            const blinkAnimation = Animated.loop(Animated.sequence([
                Animated.timing(opacity, {
                    toValue: 0,
                    duration: 500,
                    useNativeDriver: true
                }),
                Animated.timing(opacity, {
                    toValue: 1,
                    duration: 500,
                    useNativeDriver: true
                }),
            ])
            )

            blinkAnimation.start()

            const timeout = setTimeout(() => {
                blinkAnimation.stop()
                setStartGameImage(false)
            }, 2500)

            return () => {
                blinkAnimation.stop()
                clearTimeout(timeout)

            }
        }
    }, [isFocused])


    return (

        <Wrapper>
            <View style={styles.DiceRow}>
                <Dice player={3} data={player3} color={COLORS.GREEN} />
                <Dice player={4} data={player4} rotate color={COLORS.YELLOW} />
            </View>

            <View style={styles.board}>
                <View style={styles.plotContainer}>
                    <Plot
                        color={COLORS.GREEN}
                        player={3}
                        data={player3}
                    />
                    <VerticalPath
                        data={Plot2Data}
                        color={COLORS.YELLOW}
                    />
                    <Plot
                        color={COLORS.YELLOW}
                        player={4}
                        data={player4}
                    />
                </View>
                <View style={styles.midContainer}>
                    <HorizontalPath
                        data={Plot1Data}
                        color={COLORS.GREEN}
                    />
                    <MidSquare
                        player1={player1}
                        player2={player2}
                        player3={player3}
                        player4={player4}
                    />
                    <HorizontalPath
                        data={Plot3Data}
                        color={COLORS.BLUE}
                    />
                </View>
                <View style={styles.plotContainer}>
                    <Plot
                        color={COLORS.RED}
                        player={2}
                        data={player2}
                    />
                    <VerticalPath
                        data={Plot4Data}
                        color={COLORS.RED}
                    />
                    <Plot
                        color={COLORS.BLUE}
                        data={player1}
                        player={1}
                    />
                </View>
            </View>

            <View style={styles.DiceRow}>
                <Dice data={player2} player={2} color={COLORS.RED} />
                <Dice data={player1} player={1} rotate color={COLORS.BLUE} />
            </View>

            {
                startGameImage &&
                <Animated.Image
                    source={startImage}
                    style={[styles.startGameImg, { opacity }]}
                />
            }
        </Wrapper>

    )
}

export default LudoBoardScreen

const styles = StyleSheet.create({
    DiceRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: '2%'
    },
    board: {
        height: HEIGHT / 2,
        width: WIDTH,
        alignSelf: 'center',
        padding: '2%'
    },
    plotContainer: {
        height: '40%',
        flexDirection: 'row',
        width: '100%'
    },
    midContainer: {
        height: '20%',
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center'
    },
    startGameImg: {
        width: WIDTH * 0.5,
        height: WIDTH * 0.2,
        position: 'absolute',
        alignSelf: 'center'
    }
})