import { StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { COLORS, HEIGHT, WIDTH } from '../../../enums/StyleGuides'
import { useDispatch, useSelector } from 'react-redux';
import { selectFireWorks } from '../../../redux/reducers/gameSelector';
import { updateFireworks } from '../../../redux/reducers/gameSlice';
import Pile from './child/Pile';
import Fireworks from '../../../assets/animation/firework.json';
import LottieView from 'lottie-react-native';
import Svg, { Polygon } from 'react-native-svg'


const MidSquare = ({ player1, player2, player3, player4 }) => {
    const size = 300;
    const isFireWork = useSelector(selectFireWorks)
    const [blast, setBlast] = useState(false)
    const dispatch = useDispatch()

    useEffect(() => {
        if (isFireWork) {
            setBlast(true);
            const timer = setTimeout(() => {
                setBlast(false)
                dispatch(updateFireworks(false))
            }, 5000);
            return () => clearTimeout(timer)
        }
    }, [isFireWork, dispatch])


    const playersData = useMemo(() => [
        {
            player: player1,
            top: 55,
            left: 15,
            pieceColor: COLORS.RED,
            translate: 'translateX'
        },
        {
            player: player3,
            bottom: 52,
            left: 15,
            pieceColor: COLORS.YELLOW,
            translate: 'translateX'
        },
        {
            player: player2,
            top: 20,
            left: -2,
            pieceColor: COLORS.GREEN,
            translate: 'translateY'
        },
        {
            player: player4,
            top: 20,
            right: -2,
            pieceColor: COLORS.BLUE,
            translate: 'translateY'
        },
    ],
        [player1, player2, player3, player4]
    )

    const renderPlayerPieces = useCallback(
        (data, index) => (
            <PlayerPieces
                key={index}
                player={data.player.filter(item => item.travelCount === 57)}
                style={{
                    top: data.top,
                    bottom: data.bottom,
                    left: data.left,
                    right: data.right
                }}
                pieceColor={data.pieceColor}
                translate={data.translate}
            />
        ), [])

    return (
        <View style={styles.mainContainer}>
            {
                blast && (
                    <LottieView
                        source={Fireworks}
                        autoPlay
                        loop
                        hardwareAccelerationAndroid
                        style={styles.lottieView}
                        speed={1}
                    />
                )
            }

            <Svg height={size} width={size - 5}>
                <Polygon
                    points={`0,0 ${size / 2},${size / 2} ${size},0`}
                    fill={COLORS.YELLOW}
                />
                <Polygon
                    points={`${size},0 ${size},${size} ${size / 2},${size / 2}`}
                    fill={COLORS.BLUE}
                />
                <Polygon
                    points={`0, ${size} ${size / 2},${size / 2} ${size}, ${size}`}
                    fill={COLORS.RED}
                />
                <Polygon
                    points={`0,0 ${size / 2},${size / 2} 0, ${size}`}
                    fill={COLORS.GREEN}
                />
            </Svg>

            {playersData.map(renderPlayerPieces)}
        </View>
    )
}


const PlayerPieces = React.memo(({ player, style, pieceColor, translate }) => {
    return (
        <View style={[styles.container, style]}>
            {
                player.map((piece, index) => (
                    <View style={{
                        top: 0,
                        zIndex: 99,
                        position: 'absolute',
                        bottom: 0,
                        transform: [{ scale: 0.5 }, { [translate]: 14 * index }]
                    }}
                    >
                        <Pile
                            cell={true}
                            player={player}
                            onPress={() => { }}
                            pieceId={piece.id}
                            color={pieceColor}
                        />
                    </View>
                ))
            }
        </View>
    )
})

export default MidSquare

const styles = StyleSheet.create({
    mainContainer: {
        height: '100%',
        width: '20%',
        // borderWidth:0.8,
        overflow: 'hidden',
        borderColor: COLORS.BORDER_COLOR,
        justifyContent: 'center',
        alignItems: 'center'
    },
    lottieView: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        zIndex: 1
    },
    container: {
        width: WIDTH * 0.063,
        height: HEIGHT * 0.032,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute'
    }
})